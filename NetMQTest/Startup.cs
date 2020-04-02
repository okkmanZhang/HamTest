using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NetMQ;
using NetMQ.Sockets;
using NetMQTest.Hubs;

namespace NetMQTest
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => {
                options.AddPolicy("AllowOrigin", builder =>
            {
                builder
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowAnyOrigin()                    
                    .AllowCredentials()
                    .WithOrigins(new string[]{"http://localhost:8080", "http://localhost:8081"});
            });
            });
            services.AddControllers();
            services.AddSignalR();

            // var _pubSocket = new PublisherSocket();            
            // _pubSocket.Bind("tcp://localhost:6881");
            // _pubSocket.Options.SendHighWatermark = 1000;
            // services.AddSingleton<PublisherSocket>(_pubSocket);

            // var subSocket = new SubscriberSocket();
            // subSocket.Connect("tcp://localhost:7881");
            // subSocket.Options.ReceiveHighWatermark = 1000;
            // subSocket.Subscribe("");
            // services.AddSingleton<SubscriberSocket>(subSocket);

            var actor = Bus.Create(9999);            
            services.AddSingleton<NetMQActor>(actor);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors("AllowOrigin");

            app.UseAuthorization();
            //app.UseMiddleware<NetMQMiddleware>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chatHub");
            });
        }
    }
}
