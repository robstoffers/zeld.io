using Owin;
using Microsoft.Owin;

[assembly: OwinStartup(typeof(zeld.io.NetCode.Startup))]
namespace zeld.io.NetCode
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}