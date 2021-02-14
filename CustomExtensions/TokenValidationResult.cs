using System.IdentityModel.Tokens.Jwt;

namespace CustomExtensions {
    public class TokenValidationResult
    {
        public JwtSecurityToken Token { get; }
        public string BindingParam { get; }

        public bool IsValid => Token != null;

        public static TokenValidationResult Valid(JwtSecurityToken token, string bindingParam)
        {
            return new TokenValidationResult(token, bindingParam);
        }

        public static TokenValidationResult Invalid()
        {
            return new TokenValidationResult(null);
        }

        public TokenValidationResult(JwtSecurityToken token, string bindingParam = null)
        {
            Token = token;
            BindingParam = bindingParam;
        }
    }
}