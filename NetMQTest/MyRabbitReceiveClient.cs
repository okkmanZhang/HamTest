using System;
using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

public class MyRabbitReceiveClient
{
    private IConnection _conn;
    private IModel _channel;
    public MyRabbitReceiveClient(IConnection conn)
    {
        _conn = conn;
        _channel = conn.CreateModel();

         _channel.QueueDeclare(queue: "hello",
                                 durable: false,
                                 exclusive: false,
                                 autoDelete: false,
                                 arguments: null);

         var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body;
                var message = Encoding.UTF8.GetString(body);
                Console.WriteLine(" [x] Received {0} from asp.net core", message);
            };

            _channel.BasicConsume(queue: "hello",
                                 autoAck: true,
                                 consumer: consumer);                                 
    }


}