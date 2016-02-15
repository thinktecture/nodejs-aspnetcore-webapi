using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Cors.Infrastructure;
using Microsoft.AspNet.Hosting;
using Microsoft.Data.Entity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;

namespace CustomerWebApi
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            // Set up configuration sources.
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddWebEncoders();

            // Configure CORS
            ConfigureCors(services);

            // Configure Web API
            ConfigureMvc(services);

            // Configure DI
            ConfigureDI(services);

            // Configure Database & EntityFramework
            ConfigureDatabase(services);
        }

        private void ConfigureDatabase(IServiceCollection services)
        {
            // Configures EntityFramework with PostgreSQL
            services.AddEntityFramework()
                .AddNpgsql()
                .AddDbContext<CustomerContext>(options =>
                    options.UseNpgsql("Server=127.0.0.1;Port=5432;Database=CustomerSampleVNext;User Id=CustomerSample;Password=CustomerSample;"));
        }

        private void ConfigureDI(IServiceCollection services)
        {
            // Either use this or the other customer service by switching the comments
            //services.AddSingleton<ICustomerService, InMemoryCustomerService>();
            services.AddSingleton<ICustomerService, DatabaseCustomerService>();
        }

        private void ConfigureCors(IServiceCollection services)
        {
            // For this demo allow everything so we don't have to hastle around
            var corsBuilder = new CorsPolicyBuilder();
            corsBuilder.AllowAnyHeader();
            corsBuilder.AllowAnyMethod();
            corsBuilder.AllowAnyOrigin();
            corsBuilder.AllowCredentials();

            services.AddCors(options =>
            {
                options.AddPolicy("allowAll", corsBuilder.Build());
            });
        }

        private void ConfigureMvc(IServiceCollection services)
        {
            services.AddMvc();
            return;
            var mvcCore = services.AddMvcCore();

            mvcCore.AddAuthorization();

            mvcCore.AddFormatterMappings();

            // Razor is only needed for token things. 
            mvcCore.AddRazorViewEngine();
            mvcCore.AddDataAnnotations();
            mvcCore.AddJsonFormatters(options => options.ContractResolver = new CamelCasePropertyNamesContractResolver());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseIISPlatformHandler();

            UseIdentityServerSecurity(app);

            app.UseMvc();
        }

        private void UseIdentityServerSecurity(IApplicationBuilder app)
        {
            JwtSecurityTokenHandler.DefaultInboundClaimFilter.Clear();

            app.UseIdentityServerAuthentication(options =>
            {
                options.Authority = "http://localhost:5001/";
                options.ScopeName = "api";
                options.ScopeSecret = "apisecret";

                options.AutomaticAuthenticate = true;
                options.AutomaticChallenge = true;
            });
        }

        // Entry point for the application.
        public static void Main(string[] args) => Microsoft.AspNet.Hosting.WebApplication.Run<Startup>(args);
    }
}
