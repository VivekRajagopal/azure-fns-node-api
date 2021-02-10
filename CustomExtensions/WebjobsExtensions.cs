using System;
using Microsoft.Azure.WebJobs;

namespace CustomExtensions {
  public static class ValidateJwtExtension
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
    }
}