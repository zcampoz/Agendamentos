using Agendamentos.Business;
using Agendamentos.Business.Implementation;
using Agendamentos.Configurations;
using Agendamentos.Model.Context;
using Agendamentos.Repository;
using Agendamentos.Repository.Generic;
using Agendamentos.Services;
using Agendamentos.Services.Implementations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var configuration = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json")
    .Build();

var tokenConfigurations = new TokenConfiguration();

new ConfigureFromConfigurationOptions<TokenConfiguration>(configuration.GetSection("TokenConfigurations")).Configure(tokenConfigurations);

builder.Services.AddSingleton(tokenConfigurations);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = tokenConfigurations.Issuer,
        ValidAudience = tokenConfigurations.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenConfigurations.Secret))
    };
});

builder.Services.AddAuthorization(auth => 
{ 
    auth.AddPolicy("Bearer", new AuthorizationPolicyBuilder()
        .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
        .RequireAuthenticatedUser().Build());
});

builder.Services.AddCors(options => options.AddDefaultPolicy(corsBuilder =>
    corsBuilder.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
));

builder.Services.AddControllersWithViews();

builder.Services.AddScoped<IAgendamentoBusiness, AgendamentoBusiness>();
builder.Services.AddScoped<IAvaliacaoBusiness, AvaliacaoBusiness>();
builder.Services.AddScoped<ICategoriaServicoBusiness, CategoriaServicoBusiness>();
builder.Services.AddScoped<IHorarioDisponibilidadeBusiness, HorarioDisponibilidadeBusiness>();
builder.Services.AddScoped<IServicoBusiness, ServicoBusiness>();
builder.Services.AddScoped<IUsuarioBusiness, UsuarioBusiness>();
builder.Services.AddScoped<ILoginBusiness, LoginBusiness>();

builder.Services.AddScoped<IAgendamentoRepository, AgendamentoRepository>();
//builder.Services.AddScoped<IAvaliacaoRepository, AvaliacaoRepository>();
//builder.Services.AddScoped<ICategoriaServicoRepository, CategoriaServicoRepository>();
builder.Services.AddScoped<IHorarioDisponibilidadeRepository, HorarioDisponibilidadeRepository>();
builder.Services.AddScoped<IServicoRepository, ServicoRepository>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();

builder.Services.AddTransient<ITokenService, TokenService>();

builder.Services.AddScoped(typeof(IRepository<>), typeof(GenericRepository<>));

builder.Services.AddDbContext<SqlContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Agendamentos", Version = "v1" });
    //c.EnableAnnotations();
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme 
    { 
        Description = @"Enter 'Bearer' [space] and your token!",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement 
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.UseCors();

if (builder.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Agendamentos v1");
        c.RoutePrefix = string.Empty;
    });

    var option = new RewriteOptions();
    option.AddRedirect("^$", "swagger");
    app.UseRewriter(option);
}

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=values}/{id?}");
    //pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
