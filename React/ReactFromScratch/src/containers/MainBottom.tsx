import * as React from 'react';
import {useStyles} from '../styles/style';

export default function MainBottom() {
    const classes = useStyles({});

    return (

        <div className={classes.footer}>
            <p style={{
                fontSize: 12
            }}>
                .List component .person .async action .ui axios service
                .complicated local state object
                .break app into components .router .Hook .jtest
            </p>
            <p style={{
                fontSize: 10
            }}>                
                .babel
                .build .deploy with server .create new material ui theme .auth2 .sticky
                .databank blocks .Generic components .block design .create blocks .connect
                Generic blocks with server .connect Generic blocks, server and DB .framework for
                creating SPA by domain experts .Non-functional requirements framework .RN
                .apollo graphql .Reason .Scalability, Testablility, Maintainability,
                Performance, Security, Availablility .domain model/framework
                .HTTP c
            </p>
            <p style={{
                fontSize: 10
            }}>Have done               
            </p>            
        </div>

    )
}