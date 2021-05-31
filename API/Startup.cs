using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.Extensions;
using API.Interfaces;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace API
{
    // With Extension method implementation for Identity and application services
    // We have created 2 separate classes ApplicationServiceExtensions AND IdentityServiceExtensions
    // We create extension methods. for this, we need to make these 2 classes Static
    // 
    // For origina and default implementation, please refer to Startup_Old_Version.cs
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        //  ordering of service calls are not important in this method
        public void ConfigureServices(IServiceCollection services)
        {
            // all service level configuration are moved to extension class named ApplicationServiceExtensions
            services.AddApplicationServices(_config);
            // Add controllers
            services.AddControllers();
            // Access to XMLHttpRequest at 'https://localhost:5001/api/users' from origin 'http://localhost:4200' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
            services.AddCors();
            // Swagger settings
            services.AddSwaggerGen(c =>
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" }));
            // Identity services (like authentication, authorizations) are moved to extension class IDentityServiceExtensions
            services.AddIdentityServices(_config);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // here ordering of the statement is very important.
            // UseRouting must come before UseCors and UseAuthentication 
            // UseCors must come before UseAuthentication
            // UseAuthentication must come before UseAuthorization
            // And then we declare UseEndpoints
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
           
            // if (env.IsDevelopment())
            // {
            //     app.UseDeveloperExceptionPage();
            //     app.UseSwagger();
            //     app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            // }

            app.UseHttpsRedirection();

            app.UseRouting();

            // this invocation must be in between UseRouting and UseEndpoints
            app.UseCors(x => x
                .AllowAnyHeader()
                .AllowAnyMethod()
                .WithOrigins("https://localhost:4200")
                );

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => endpoints.MapControllers());
        }
    }
}
