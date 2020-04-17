using System;
using System.Text;
using NetMQTest.Hubs;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

public class SendRabbitMessageArgs
{
        public SendRabbitMessageArgs(string s) { Message = s; }
    public String Message { get; } // readonly
}

public class MyRabbitReceiveClient
{
    private IConnection _conn;
    private IModel _channel;
     private AllClients _allClients;

    public delegate void SendRabbitMessageHandle(object sender, SendRabbitMessageArgs e);
    public event SendRabbitMessageHandle SendRabbitMessageEvent;
    public MyRabbitReceiveClient(IConnection conn, AllClients allClients)
    {
        _allClients = allClients;
        _conn = conn;
        _channel = conn.CreateModel();
        _channel.ExchangeDeclare(exchange: "logs", type: ExchangeType.Fanout);

        var queueName = _channel.QueueDeclare().QueueName;
        _channel.QueueBind(queue: queueName,
                            exchange: "logs",
                            routingKey: "");

         var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += async (model, ea) =>
            {
                var body = ea.Body;
                var message = Encoding.UTF8.GetString(body);
                Console.WriteLine(" [x] Received {0} from asp.net core ", message);

                Console.WriteLine("start rabbit event.");
                await _allClients.clients.All.ReceivedNewAdminMessage(message);


                //SendRabbitMessageEvent?.Invoke(this, new SendRabbitMessageArgs(message));
                //call hub to call client method;
            };

            _channel.BasicConsume(queue: queueName,
                                 autoAck: true,
                                 consumer: consumer);                                 
    }


}