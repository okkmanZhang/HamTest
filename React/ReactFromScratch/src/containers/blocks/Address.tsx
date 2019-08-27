import * as React from 'react';
import { useStyles } from '../../styles/style';

export default function Address () {
    const classes = useStyles({});

    return (
        <div className={classes.paper}>
        <div>
            <div>
                Person Addresses
            </div>
        </div>
        <div></div>
    </div>
    )
}