using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NetMQTest.Hubs;

namespace NetMQTest {
    public class Startup {
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services) {
            services.AddCors (options => {
                options.AddPolicy ("AllowOrigin", builder => {
                    builder
                        .AllowAnyMethod ()
                        .AllowAnyHeader ()
                        .AllowAnyOrigin ()
                        .AllowCredentials ()
                        .WithOrigins (new string[] { "http://localhost:8080", "http://localhost:8081" });
                });
            });
            services.AddControllers ();
            services.AddSignalR ();


            //injecting a singleton SingalR client.
            var clientConn = new HubConnectionBuilder ()
                .WithUrl ("http://localhost:5010/ChatHub")
                .Build ();            

            services.AddSingleton<HubConnection> (clientConn);
            services.AddSingleton<MyClient> (new MyClient(clientConn));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            }
            app.UseHttpsRedirection ();
            app.UseRouting ();
            app.UseCors ("AllowOrigin");
            app.UseAuthorization ();

            //mapping the request to a SignalR server Hub.
            app.UseEndpoints (endpoints => {
                endpoints.MapControllers ();
                endpoints.MapHub<ChatHub> ("/chatHub");
            });
        }
    }
}