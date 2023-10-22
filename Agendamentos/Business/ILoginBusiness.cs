using Agendamentos.Commom.DTO;
using Agendamentos.Data.VO;

namespace Agendamentos.Business
{
    public interface ILoginBusiness
    {
        TokenVO ValidateCredentials(AuthDTO usuario);

        TokenVO ValidateCredentials(TokenVO token);

        bool RevokeToken(string username);
    }
}
