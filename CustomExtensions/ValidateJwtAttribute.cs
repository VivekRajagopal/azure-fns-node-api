using System;
using Microsoft.Azure.WebJobs.Description;

namespace CustomExtensions
{
    [Binding]
    [AttributeUsage(AttributeTargets.Parameter | AttributeTargets.ReturnValue)]
    public sealed class ValidateJwtAttribute: Attribute {
        [AutoResolve]
        public string IdentityAuthorityUrl {get; set;}
    }
}
