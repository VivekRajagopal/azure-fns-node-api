using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Description;
using Microsoft.Azure.WebJobs.Host.Bindings;
using Microsoft.Azure.WebJobs.Host.Config;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;

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
            context
                .AddBindingRule<ValidateJwtAttribute>()
                .BindToInput(
                    new Func<ValidateJwtAttribute, string>(
                        (attr) =>
                        {
                            // var httpContextAccessor = _serviceProvider.GetService<IHttpContextAccessor>();
                            // var authorization = httpContextAccessor.HttpContext.Request.Headers["Authorization"];

                            // if (authorization == StringValues.Empty) {
                            //     return null;
                            // } else {
                            //     var authorizationParts = authorization.ToString().Split(" ");
                            //     return (authorizationParts.Length == 2) ? authorizationParts[1] : null;
                            // }
                            // throw new Exception(">>>> " + attr.Argument);
                            return "HelloWorld >>> " + attr.TestInput;
                        }));
        }
    }
  }
