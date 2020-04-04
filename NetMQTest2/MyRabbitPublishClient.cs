using System;
using System.Text;
using RabbitMQ.Client;

public class MyRabbitPublishClient
{
    private IConnection _conn;
    private IModel _channel;
    public MyRabbitPublishClient(IConnection conn)
    {
        _conn = conn;
        _channel = conn.CreateModel();

        _channel.QueueDeclare(queue: "hello",
                        durable: false,
                        exclusive: false,
                        autoDelete: false,
                        arguments: null);
    }

    public void Send(string message)
    {        
        var body = Encoding.UTF8.GetBytes(message);

        _channel.BasicPublish(exchange: "",
                                routingKey: "hello",
                                basicProperties: null,
                                body: body);
        Console.WriteLine(" [x] Sent {0}", message);
    }
}