import React, { useContext, useState, useEffect } from 'react';
import { TestContext } from '../../containers/App';
import { async } from 'rxjs/internal/scheduler/async';


const TestBlock2 = () => {

    const [testState, setTestState] = useState("");
    // const testContext = useContext(TestContext);
    // async function fetchData() {
    //     const res = await fetch("https://localhost:5001/WeatherForecast");

    //     res.text().then(res => setTestState(res));
    // }

    // useEffect(() => {
    //     fetchData();
    // });


return (<div> Test block2 ..{testState}</div>);
};

export default TestBlock2;