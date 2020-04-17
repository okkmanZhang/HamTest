using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;
using NetMQ;
using NetMQ.Sockets;

namespace NetMQTest.Hubs {

    public interface IQOOLMessageClient
    {
        Task ReceivedNewAdminMessage(string msg);
    }

    public class AllClients
    {
        public IHubCallerClients<IQOOLMessageClient> clients {get; set;}
    }
    public class ChatHub : Hub<IQOOLMessageClient> {

        private MyClient _myClient;
        private MyRabbitPublishClient _myRabbitPublishClient;
        private MyRabbitReceiveClient _myRabbitReceiveClient;
        private AllClients _allClients;

        public ChatHub (MyClient myClient, MyRabbitPublishClient myRabbitPublishClient, 
            MyRabbitReceiveClient myRabbitReceiveClient, AllClients allClients) {
            _myClient = myClient;
            _myRabbitPublishClient = myRabbitPublishClient;
            _myRabbitReceiveClient = myRabbitReceiveClient;
            _allClients = allClients;
        }

        public async Task SendMessage () {

            //1 client1 locked patient1.
            await _myClient.Start();
            //2 patient1 is locked.
            await _myClient.Send("test");                
            _myClient.clientClients = Clients;
        }

        public async Task SendRabbitMessage() {
            _myRabbitPublishClient.Send("Rabbit Message.");
            _allClients.clients = this.Clients;

            // Console.WriteLine("start rabbit event.");
            // _myRabbitReceiveClient.SendRabbitMessageEvent += async (s, e) => {
            //     Console.WriteLine("send ReceivedNewAdminMessage from rabbit -> signalr -> me");
            //     await Clients.All.ReceivedNewAdminMessage(e.Message);
            // };

            return;
        }

    }
}