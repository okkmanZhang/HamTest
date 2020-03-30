using Microsoft.AspNetCore.Http;
using NetMQ;
using NetMQ.Sockets;
using System;
using System.Globalization;
using System.Threading;
using System.Threading.Tasks;

namespace NetMQTest
{
    public class NetMQMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly SubscriberSocket _subSocket;

        public NetMQMiddleware(RequestDelegate next, SubscriberSocket subSocket)
        {
            _next = next;
            _subSocket = subSocket;
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

            // if(!context.WebSockets.IsWebSocketRequest)
            // {
            //     await _next(context);
            // }


                try
                {
                // while (true)
                // {
                    // string messageTopicReceived = _subSocket.ReceiveFrameString();
                    var xxx = _subSocket.TryReceiveFrameString(out var ttt);
                    Console.WriteLine(xxx);
                    Console.WriteLine(ttt);
                    Console.WriteLine(_subSocket.Options.LastEndpoint);
                    Console.WriteLine("2 is working..");
                //}

                } catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }

            Console.WriteLine("NetMQ2 middleware called.");

            await _next(context);
        }
    }
}