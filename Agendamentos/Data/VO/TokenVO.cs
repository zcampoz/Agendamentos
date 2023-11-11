namespace Agendamentos.Data.VO
{
    public class TokenVO
    {
        public TokenVO(bool authenticated, string created, string expiration, string accessToken, string refreshToken, long userId)
        {
            Authenticated = authenticated;
            Created = created;
            Expiration = expiration;
            AccessToken = accessToken;
            RefreshToken = refreshToken;
            UserId = userId;
        }

        public long UserId {  get; set; }
        public bool Authenticated {  get; set; }
        public string Created {  get; set; }
        public string Expiration {  get; set; }
        public string AccessToken {  get; set; }
        public string RefreshToken {  get; set; }
    }
}
