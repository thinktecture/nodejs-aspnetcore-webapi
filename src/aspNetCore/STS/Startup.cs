using System.IO;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using IdentityServer4.Core.Services;
using IdentityServer4.Core.Services.Default;

namespace CustomerWebApi
{
    public class Startup
    {
        private X509Certificate2 _certificate;
        private const string CORS_POLICY_NAME = "allowAll";

        public Startup(IHostingEnvironment env)
        {
            // Set up configuration sources.
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables();
            Configuration = builder.Build();

            _certificate = new X509Certificate2(Path.Combine(env.WebRootPath, "idsrv4test.pfx"), "idsrv3test");
        }

        public IConfigurationRoot Configuration { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Configure CORS
            ConfigureCors(services);

            // Configure security related things
            ConfigureSecurity(services);

            // Configure Web API
            ConfigureMvc(services);
        }

        private void ConfigureCors(IServiceCollection services)
        {
            // For this demo allow everything so we don't have to hastle around
            services.AddCors(options =>
            {
                options.AddPolicy(CORS_POLICY_NAME, cors =>
                {
                    cors.AllowAnyHeader();
                    cors.AllowAnyMethod();
                    cors.AllowAnyOrigin();
                    cors.AllowCredentials();
                });
            });
        }

        private void ConfigureSecurity(IServiceCollection services)
        {            
            var identityServer = services.AddIdentityServer(options =>
            {
                // Use ONLY for developing! Never use this in production. Never.
                options.RequireSsl = false;
                options.IssuerUri = "http://localhost:5001/";
                options.SigningCertificate = _certificate;
            });

            identityServer.AddInMemoryClients(Clients.Get());
            identityServer.AddInMemoryScopes(Scopes.Get());
            identityServer.AddInMemoryUsers(Users.Get());
            
            // Enable CORS on identity server
            identityServer.Services.AddTransient<ICorsPolicyService>(p => {
                var corsService = new DefaultCorsPolicyService(p.GetRequiredService<ILogger<DefaultCorsPolicyService>>());
                corsService.AllowAll = true;
                return corsService;
            });
        }

        private void ConfigureMvc(IServiceCollection services)
        {
            var mvcCore = services.AddMvcCore();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseCors(CORS_POLICY_NAME);
            
            app.UseIISPlatformHandler();

            app.UseIdentityServer();

            app.UseMvc();
        }

        // Entry point for the application.
        public static void Main(string[] args) => Microsoft.AspNet.Hosting.WebApplication.Run<Startup>(args);
    }
}
