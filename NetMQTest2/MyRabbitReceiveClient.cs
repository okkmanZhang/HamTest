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
        _channel.ExchangeDeclare(exchange: "logs", type: ExchangeType.Fanout);

        var queueName = _channel.QueueDeclare().QueueName;
        _channel.QueueBind(queue: queueName,
                            exchange: "logs",
                            routingKey: "");

         var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body;
                var message = Encoding.UTF8.GetString(body);
                Console.WriteLine(" [x] Received {0} from asp.net core ", message);
            };

            _channel.BasicConsume(queue: queueName,
                                 autoAck: true,
                                 consumer: consumer);                                 
    }

}