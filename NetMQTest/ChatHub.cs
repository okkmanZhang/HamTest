using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;
using NetMQ;
using NetMQ.Sockets;

namespace NetMQTest.Hubs {
    public class ChatHub : Hub {

        private HubConnection _conn;
        public ChatHub (HubConnection conn) {
            _conn = conn;

        }

        public async Task SendMessage () {
            if (_conn.State != HubConnectionState.Connected) {

                try {
                    await _conn.StartAsync ();
                    Console.WriteLine ("connected..");
                } catch (Exception ex) {
                    Console.WriteLine (ex.Message);
                }
            }

            await _conn.SendAsync ("SendMessage");

            await Clients.All.SendAsync ("ReceiveMessage");
        }

    }
}