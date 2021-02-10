using CustomExtensions;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Hosting;

[assembly: WebJobsStartup(typeof(ValidateJwtWebJobsStartup))]
namespace CustomExtensions
{
  public class ValidateJwtWebJobsStartup : IWebJobsStartup
  {
    public void Configure(IWebJobsBuilder builder)
    {
      builder.AddValidateJwtBinding();
    }
  }
}