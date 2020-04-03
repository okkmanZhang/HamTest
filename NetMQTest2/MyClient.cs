using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;

public class MyClient {

    private HubConnection _clientConn;
    public IHubCallerClients clientClients;

    public MyClient (HubConnection clientConn) {
        _clientConn = clientConn;

        clientConn.On<string> ("ReceiveMessageFromSqlServer", (message) => {
            //5 patient1 is locked.
            Console.WriteLine ("message from SQL Server: " + message);
            //6 patient1 is locked.
            clientClients.All.SendAsync ("ReceiveMessage");

        });        
    }

    public async Task Start()
    {
        if (_clientConn.State != HubConnectionState.Connected) {
            try {
                await _clientConn.StartAsync ();
                Console.WriteLine ("connected..");
            } catch (Exception ex) {
                Console.WriteLine (ex.Message);
            }
        }
    }

    public async Task Send(string message)
    {
        if (_clientConn.State == HubConnectionState.Connected)
        {
            // 3 patient1 is locked.
            await _clientConn.SendAsync ("SendMessage", DateTime.Now.TimeOfDay.ToString());
            Console.WriteLine("sent message to SQL Server from NetMQTest.");
        }
    }
}