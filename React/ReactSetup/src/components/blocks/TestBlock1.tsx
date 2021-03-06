import React, { useState, useEffect, useRef } from 'react';
import * as signalR from "@microsoft/signalr";
import { Button } from '@material-ui/core';

const TestBlock1 = (props) => {

    let conn = useRef();
    const [message, setMessage] = useState("");

    function connS() {

        if (conn.current) return;
        conn.current = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:5001/chatHub")
            .build() as any;

        (conn.current as any).on("ReceiveMessage", () => setMessage(prevMessage => prevMessage + ", ReceiveMessage"));

        (conn.current as any).on("ReceivedNewAdminMessage", (msg) => {
            console.log("get msg -> signalr -> RabbitMQ -> signalr -> me: " + msg);
        });

        (conn.current as any).start();
    }

    function sendM() {
        (conn.current as any).send("SendMessage");
    }

    function sendR() {
        (conn.current as any).send("SendRabbitMessage");
    }

    useEffect(() => {
        connS();
    });

    return (<div>
        <div>Test block1 ..{props.children}</div>
        <div>
            {message}
        </div>
        <div>
            <Button variant="contained" color="primary" onClick={sendM}>
                send message to server
            </Button>

            <Button variant="contained" color="primary" onClick={sendR}>
                send RabbitMQ message
            </Button>


        </div>
    </div>);
};

export default TestBlock1;