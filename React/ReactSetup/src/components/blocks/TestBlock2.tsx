import React, { useContext } from 'react';
import { TestContext } from '../../containers/App';

const TestBlock2 = () => {

    const testContext = useContext(TestContext);
return (<div>Test block2 ..{testContext}</div>);
};

export default TestBlock2;