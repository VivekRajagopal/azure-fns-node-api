using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs.Description;
using Microsoft.Azure.WebJobs.Host.Config;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;

namespace CustomExtensions {
    [Extension(nameof(ValidateJwtBinding))]
    internal class ValidateJwtBinding : IExtensionConfigProvider
    {
        private readonly IServiceProvider _serviceProvider;

        public ValidateJwtBinding(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public void Initialize(ExtensionConfigContext context)
        {
            var binding = context.AddBindingRule<ValidateJwtAttribute>();
            
            binding.BindToInput(BuildItemFromAttr);

            var serializer = new JsonSerializer()
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
            binding.AddConverter<TokenValidationResult, JObject>(value => JObject.FromObject(value, serializer));
        }

        private TokenValidationResult BuildItemFromAttr(ValidateJwtAttribute attribute) {
            var httpContextAccessor = _serviceProvider.GetService<IHttpContextAccessor>();
            var tokenValidationResult = ValidateTokenAsync(httpContextAccessor.HttpContext.Request.GetAuthBearerToken(), attribute.IdentityAuthorityUrl);
            return tokenValidationResult;
        }

        private TokenValidationResult ValidateTokenAsync(string token, string identityAuthorityUrl) {
            if (string.IsNullOrWhiteSpace(token))
            {
                return TokenValidationResult.Invalid();
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            try {
                return TokenValidationResult.Valid(tokenHandler.ReadJwtToken(token));
            } catch (Exception exception) {
                return TokenValidationResult.Invalid();
            }
        }
    
    }
  }
