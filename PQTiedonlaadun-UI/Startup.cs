using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using PQTiedonlaadun_UI.Data;
using PQTiedonlaadun_UI.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PQ_TiedonLaatuService.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.UI;


namespace PQTiedonlaadun_UI
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.Unspecified;
                // Handling SameSite cookie according to https://docs.microsoft.com/en-us/aspnet/core/security/samesite?view=aspnetcore-3.1
                options.HandleSameSiteCookieCompatibility();
            });

            // Sign-in users with the Microsoft identity platform
            services.AddSignIn(Configuration);

            services.AddControllersWithViews(options =>
            {
                var policy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
                options.Filters.Add(new AuthorizeFilter(policy));
            }).AddMicrosoftIdentityUI();
            services.AddDbContext<PrimusAlertContext>();
            services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseSqlServer(
                        Configuration.GetConnectionString("DefaultConnection")));

            services.AddRazorPages();
                // In production, the React files will be served from this directory
                services.AddSpaStaticFiles(configuration =>
                {
                    configuration.RootPath = "ClientApp/build";
                });


            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  builder =>
                                  {
                                      builder.WithOrigins("https://localhost:5001",
                                                          "https://primusvalvonta.hallinto.local");
                                  });
            });

            services.AddRouting(r => r.SuppressCheckForUnhandledSecurityMetadata = true);



        }

        // This method gets called by the runtime. Use this method to add services to the container.
        //public void ConfigureServices(IServiceCollection services)
        //{
        //    // DI: Connect to database from service project.
        //    //services.AddDbContext<PrimusAlertContext>(opt => opt.UseSqlServer(Configuration.GetConnectionString("PrimusAlertContext")));
        //    services.AddDbContext<PrimusAlertContext>();



        //    services.AddDbContext<ApplicationDbContext>(options =>
        //        options.UseSqlServer(
        //            Configuration.GetConnectionString("DefaultConnection")));

        //    services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
        //        .AddEntityFrameworkStores<ApplicationDbContext>();

        //    services.AddIdentityServer()
        //        .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

        //    services.AddAuthentication()
        //        .AddIdentityServerJwt();

        //    services.AddControllersWithViews();
        //    services.AddRazorPages();

        //    // In production, the React files will be served from this directory
        //    services.AddSpaStaticFiles(configuration =>
        //    {
        //        configuration.RootPath = "ClientApp/build";
        //    });
        //}

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseCors(builder =>
            {
                builder
                    .SetIsOriginAllowed(_ => true)
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });



            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();
            app.UseSpaStaticFiles();

            app.UseRouting();

            // app.UseAuthentication();
            // app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            }
                

            
            );

            app.Use((context, next) =>
            {
                context.Items["__CorsMiddlewareInvoked"] = true;
                return next();
            });



            app.UseCors(MyAllowSpecificOrigins);

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });


            // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
            //public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
            //{
            //    if (env.IsDevelopment())
            //    {
            //        app.UseDeveloperExceptionPage();
            //        app.UseDatabaseErrorPage();
            //    }
            //    else
            //    {
            //        app.UseExceptionHandler("/Error");
            //        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            //        app.UseHsts();
            //    }

            //    app.UseHttpsRedirection();
            //    app.UseStaticFiles();
            //    app.UseSpaStaticFiles();

            //    app.UseRouting();

            //    app.UseAuthentication();
            //    app.UseIdentityServer();
            //    app.UseAuthorization();
            //    app.UseEndpoints(endpoints =>
            //    {
            //        endpoints.MapControllerRoute(
            //            name: "default",
            //            pattern: "{controller}/{action=Index}/{id?}");
            //        endpoints.MapRazorPages();
            //    });

            //    app.UseSpa(spa =>
            //    {
            //        spa.Options.SourcePath = "ClientApp";

            //        if (env.IsDevelopment())
            //        {
            //            spa.UseReactDevelopmentServer(npmScript: "start");
            //        }
            //    });
            //}
        }
    }
}
