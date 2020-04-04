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
        private MyRabbitPublishClient _myRabbitPublishClient;

        public ChatHub (MyClient myClient, MyRabbitPublishClient myRabbitPublishClient) {
            _myClient = myClient;
            _myRabbitPublishClient = myRabbitPublishClient;
        }

        public async Task SendMessage () {

            //1 client1 locked patient1.
            await _myClient.Start();
            //2 patient1 is locked.
            await _myClient.Send("test");                
            _myClient.clientClients = Clients;
        }

        public void SendRabbitMessage() {
            _myRabbitPublishClient.Send("Rabbit Message.");
        }

    }
}