using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using NetMQ;
using NetMQ.Sockets;

namespace NetMQTest.Hubs {
    public class ChatHub : Hub {

        public async Task SendMessage () {


            Console.WriteLine("message from xxx" + DateTime.Now.ToString());
       
            await Clients.All.SendAsync ("ReceiveMessage");

        }
    }
}