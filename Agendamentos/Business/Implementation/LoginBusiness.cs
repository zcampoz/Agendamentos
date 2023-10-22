using Agendamentos.Commom.DTO;
using Agendamentos.Configurations;
using Agendamentos.Data.VO;
using Agendamentos.Model;
using Agendamentos.Repository;
using Agendamentos.Services;
using Agendamentos.Services.Implementations;
using Azure.Core;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Agendamentos.Business.Implementation
{
    public class LoginBusiness : ILoginBusiness
    {
        private const string DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
        private TokenConfiguration _configuration;
        private IUsuarioRepository _usuariosRepository;
        private ITokenService _tokenService;

        public LoginBusiness(TokenConfiguration configuration, IUsuarioRepository usuariosRepository, ITokenService tokenService)
        {
            _configuration = configuration;
            _usuariosRepository = usuariosRepository;
            _tokenService = tokenService;
        }

        public bool RevokeToken(string username)
        {
            return _usuariosRepository.RevokeToken(username);
        }

        public TokenVO ValidateCredentials(AuthDTO credenciais)
        {
            var usuario = _usuariosRepository.ValidarUsuario(credenciais);
            if (usuario == null) return null;
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                new Claim(JwtRegisteredClaimNames.UniqueName, usuario.Email),
            };

            var accessToken = _tokenService.GenerateAccessToken(claims);
            var refreshToken = _tokenService.GenerateRefreshToken();

            usuario.RefreshToken = refreshToken;
            usuario.DataExpiracaoRefreshToken = DateTime.Now.AddDays(_configuration.DaysToExpire);

            _usuariosRepository.AtualizaInfoUsuario(usuario);

            DateTime createdDate = DateTime.Now;
            DateTime expirationDate = createdDate.AddMinutes(_configuration.Minutes);

            return new TokenVO(true, createdDate.ToString(DATE_FORMAT), expirationDate.ToString(DATE_FORMAT), accessToken, refreshToken);
        }

        public TokenVO ValidateCredentials(TokenVO token)
        {
            var accessToken = token.AcessToken;
            var refreshToken = token.RefreshToken;

            var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);

            var username = principal.Identity.Name;

            var user = _usuariosRepository.ValidarUsuario(username);

            if (user == null 
                || user.RefreshToken != refreshToken 
                || user.DataExpiracaoRefreshToken <= DateTime.Now) 
                return null; 

            accessToken = _tokenService.GenerateAccessToken(principal.Claims);
            refreshToken = _tokenService.GenerateRefreshToken();
            user.RefreshToken = refreshToken;

            _usuariosRepository.AtualizaInfoUsuario(user);

            DateTime createdDate = DateTime.Now;
            DateTime expirationDate = createdDate.AddMinutes(_configuration.Minutes);

            return new TokenVO(true, 
                createdDate.ToString(DATE_FORMAT), 
                expirationDate.ToString(DATE_FORMAT), 
                accessToken, refreshToken);
        }
    }
}
