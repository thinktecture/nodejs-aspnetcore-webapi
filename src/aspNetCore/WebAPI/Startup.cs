using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Cors.Infrastructure;
using Microsoft.AspNet.Hosting;
using Microsoft.Data.Entity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using Swashbuckle.SwaggerGen;
using Swashbuckle.SwaggerGen.XmlComments;

namespace CustomerWebApi
{
    public class Startup
    {
        private const string CORS_POLICY_NAME = "allowAll";
        private IHostingEnvironment _hostingEnvironment;

        public Startup(IHostingEnvironment env)
        {
            _hostingEnvironment = env;

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

            // Configure Swagger API documentation
            ConfigureSwaggerApiDocumentation(services);
        }

        private void ConfigureSwaggerApiDocumentation(IServiceCollection services)
        {            
            string pathToXmlDoc = Path.Combine(_hostingEnvironment.WebRootPath, "bin", "Debug", "dnxcore50", "WebAPI.xml");
            Console.WriteLine(pathToXmlDoc);

            if (!File.Exists(pathToXmlDoc))
            {
                pathToXmlDoc = String.Empty;
            }

            services.AddSwaggerGen();
            services.ConfigureSwaggerDocument(options =>
            {
                options.SingleApiVersion(new Info()
                {
                    Version = "v1",
                    Title = "Sample ASP.NET Core 1.0 API",
                    Description = "Sample Web API to show case ASP.NET Core 1.0 compared to Node.js",
                    Contact = new Contact()
                    {
                        Name = "Thinktecture AG",
                        Email = "office@thinktecture.com",
                        Url = "http://thinktecture.com"
                    }
                });

                if (!String.IsNullOrWhiteSpace(pathToXmlDoc))
                {
                    options.OperationFilter(new ApplyXmlActionComments(pathToXmlDoc));
                }
            });

            services.ConfigureSwaggerSchema(options =>
            {
                if (!String.IsNullOrWhiteSpace(pathToXmlDoc))
                {
                    options.ModelFilter(new ApplyXmlTypeComments(pathToXmlDoc));
                }
            });
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
                options.AddPolicy(CORS_POLICY_NAME, corsBuilder.Build());
            });
        }

        private void ConfigureMvc(IServiceCollection services)
        {
            var mvcCore = services.AddMvcCore();

            mvcCore.AddApiExplorer();
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

            app.UseCors(CORS_POLICY_NAME);
            app.UseIISPlatformHandler();
        
            UseIdentityServerSecurity(app);

            app.UseMvc();
            
            app.UseSwaggerGen();
            app.UseSwaggerUi(baseRoute: "docs");
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
