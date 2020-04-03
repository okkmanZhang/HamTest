using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;
using NetMQ;
using NetMQ.Sockets;

namespace NetMQTest.Hubs {
    public class ChatHub : Hub {

        private MyClient _myClient;

        public ChatHub (MyClient myClient) {
            _myClient = myClient;
        }

        public async Task SendMessage () {

            //1 client1 locked patient1.
            await _myClient.Start();
            //2 patient1 is locked.
            await _myClient.Send("test");                
            _myClient.clientClients = Clients;

            //await Clients.All.SendAsync ("ReceiveMessage");
        }

    }
}