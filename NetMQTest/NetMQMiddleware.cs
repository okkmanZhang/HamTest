using Microsoft.AspNetCore.Http;
using NetMQ;
using NetMQ.Sockets;
using System;
using System.Globalization;
using System.Threading.Tasks;

namespace NetMQTest
{
    public class NetMQMiddleware
    {
        private readonly RequestDelegate _next;
        private PublisherSocket _pubSocket;

        public NetMQMiddleware(RequestDelegate next, PublisherSocket publisherSocket)
        {
            _next = next;
            _pubSocket = publisherSocket;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // var cultureQuery = context.Request.Query["culture"];
            // if (!string.IsNullOrWhiteSpace(cultureQuery))
            // {
            //     var culture = new CultureInfo(cultureQuery);

            //     CultureInfo.CurrentCulture = culture;
            //     CultureInfo.CurrentUICulture = culture;

            // }

            // Call the next delegate/middleware in the pipeline
            // if (_pubSocket == null)            
            //     _pubSocket = new PublisherSocket();

            
            // if(!context.WebSockets.IsWebSocketRequest)
            // {
            //     await _next(context);
            // }
                
           
            Console.WriteLine("Publisher socket binding...");
            _pubSocket.SendMoreFrame("TopicA").SendFrame("First message.");           

            Console.WriteLine("NetMQ middleware called.");

            await _next(context);
        }
    }
}