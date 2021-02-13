using System.IdentityModel.Tokens.Jwt;

namespace CustomExtensions {
    public class TokenValidationResult
    {
        public static TokenValidationResult Valid(JwtSecurityToken token)
        {
            return new TokenValidationResult(token);
        }

        public static TokenValidationResult Invalid()
        {
            return new TokenValidationResult(null);
        }

        public TokenValidationResult(JwtSecurityToken token)
        {
            Token = token;
        }

        public bool IsValid => Token != null;

        public JwtSecurityToken Token { get; }
    }
}