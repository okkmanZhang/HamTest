import React, { useState, useEffect } from 'react';

function Example() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You have clicked ${count} times.`
    })

    return(
        <div>
            <p>You have clicked {count} times</p>
            <button onClick={()=> setCount(count+1)}>
                Click me
            </button>
        </div>
    );
}

export default Example;