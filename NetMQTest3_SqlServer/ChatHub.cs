using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using NetMQ;
using NetMQ.Sockets;

namespace NetMQTest.Hubs {
    public class ChatHub : Hub {

        public async Task SendMessage (string message) {

            
            Console.WriteLine("SQL server message from : " + message);
            // 4 patient 1 is locked.
            await Clients.All.SendAsync ("ReceiveMessageFromSqlServer", message);

        }
    }
}