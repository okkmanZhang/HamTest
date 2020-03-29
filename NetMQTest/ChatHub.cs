using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace NetMQTest.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage()
        {
            await Clients.All.SendAsync("ReceiveMessage");
        }
    }
}