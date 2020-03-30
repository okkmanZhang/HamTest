import React, { useState, useEffect, useRef } from 'react';
import * as signalR from "@microsoft/signalr";

const TestBlock1 = (props) => {

    let conn = useRef();
    const [message, setMessage] = useState("");

    function connS () {

        if (conn.current) return;
        conn.current = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:5002/chatHub")
            .build() as any;

        (conn.current as any).on("ReceiveMessage", () => setMessage( prevMessage => prevMessage + ", ReceiveMessage"));

        (conn.current as any).start();
    }

    function sendM () {
        (conn.current as any).send("SendMessage");
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
        <button onClick={sendM}>send</button>
    </div>
</div>);
};

export default TestBlock1;