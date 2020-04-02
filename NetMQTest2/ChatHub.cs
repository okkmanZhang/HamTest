using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using NetMQ;
using NetMQ.Sockets;

namespace NetMQTest.Hubs {
    public class ChatHub : Hub {

        // private static PublisherSocket _publisherSocket;
        // private static SubscriberSocket _subscriberSocket;

        // public ChatHub(SubscriberSocket subscriberSocket, PublisherSocket publisherSocket)
        // {
        //     _publisherSocket = publisherSocket;
        //     _subscriberSocket = subscriberSocket;

        //     Task.Factory.StartNew( () => {
        //         while(true)
        //         {
        //             string messageTopicReceived = _subscriberSocket.ReceiveFrameString();
        //             string messageReceived = _subscriberSocket.ReceiveFrameString();                
        //             Console.WriteLine(messageReceived);
        //         }
        //     });

        // }

        private static NetMQActor actor;
          CancellationTokenSource cts;
        private static NetMQQueue<string> queue;

        public ChatHub (NetMQActor _actor) {
            queue = new NetMQQueue<string>();
            
            cts = new CancellationTokenSource();
            actor = _actor;
            //using (var actor = Bus.Create (9999))

            Task.Factory.StartNew (() => {
              

                using (var poller = new NetMQPoller { actor, queue }) {

                    actor.SendFrame (Bus.GetHostAddressCommand);
                    var hostAddress = actor.ReceiveFrameString ();
                    Thread.Sleep (1100);

                    Console.Title = $"NetMQ Beacon Demo at {hostAddress}";

                    // publish a hello message
                    // note we can use NetMQSocket send and receive extension methods
                    actor.SendMoreFrame (Bus.PublishCommand).SendMoreFrame ("Hello?").SendFrame (hostAddress);

                    //actor.SendMoreFrame (Bus.PublishCommand).SendMoreFrame ("Hello?").SendFrame (queue.Dequeue());
                    //actor.SendFrame(queue.Dequeue());
                     queue.ReceiveReady += (s, a) => {
                        actor.SendMoreFrame (Bus.PublishCommand).SendMoreFrame ("Hello?").SendFrame (queue.Dequeue());
                    };


                    actor.ReceiveReady += (s, a) => {

                        string message = actor.ReceiveFrameString ();
                        switch (message) {
                            case "Hello?":
                                // another node is saying hello
                                var fromHostAddress = actor.ReceiveFrameString ();
                                var msg = fromHostAddress + " says Hello?";
                                Console.WriteLine (msg);

                                // send back a welcome message via the Bus publisher
                                msg = hostAddress + " says Welcome!";
                                actor.SendMoreFrame (Bus.PublishCommand).SendFrame (msg);
                                break;
                            case Bus.AddedNodeCommand:
                                var addedAddress = actor.ReceiveFrameString ();
                                Console.WriteLine ("Added node {0} to the Bus", addedAddress);
                                break;
                            case Bus.RemovedNodeCommand:
                                var removedAddress = actor.ReceiveFrameString ();
                                Console.WriteLine ("Removed node {0} from the Bus", removedAddress);
                                break;
                            default:
                                // it's probably a welcome message
                                Console.WriteLine (message);
                                break;
                        }
                    };

                    poller.Run ();
                }

            }, cts.Token);
        }

        public async Task SendMessage () {
            // var tryReceive = _subscriberSocket.TryReceiveFrameString(out var recieivedMessage);
            // Console.WriteLine(tryReceive);
            // Console.WriteLine(recieivedMessage);

            //_publisherSocket.SendMoreFrame("TopicB").SendFrame("First message from chathub on Test2.");
            queue.Enqueue("test");            
            await Clients.All.SendAsync ("ReceiveMessage");
            // cts.Cancel();
            // cts.Dispose();
        }
    }
}