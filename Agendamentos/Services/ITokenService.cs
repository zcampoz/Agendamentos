using System.Security.Claims;

namespace Agendamentos.Services
{
    public interface ITokenService
    {
        string GenerateAccessToken(IEnumerable<Claim> claim);
        string GenerateRefreshToken();
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}
