using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs;

namespace CustomExtensions {
  public static class TypeExtensions
    {
        public static IWebJobsBuilder AddValidateJwtBinding(this IWebJobsBuilder builder)
        {
            if (builder == null)
            {
                throw new ArgumentNullException(nameof(builder));
            }
            
            builder.AddExtension<ValidateJwtBinding>();
            return builder;
        }

        private const string AuthHeaderName = "Authorization";
        private const string BearerPrefix = "Bearer ";

        public static string GetAuthBearerToken(this HttpRequest httpRequest)
        {
            if (!httpRequest.Headers.ContainsKey(AuthHeaderName) ||
                !httpRequest.Headers[AuthHeaderName].ToString().StartsWith(BearerPrefix))
            {
                return null;
            }

            return httpRequest.Headers[AuthHeaderName].ToString().Substring(BearerPrefix.Length).Trim();
        }
    }
}