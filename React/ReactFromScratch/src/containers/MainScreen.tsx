import * as React from 'react';
import { useStyles } from '../styles/style';
import { Paper, Grid } from '@material-ui/core';
import Example from './Hook1';
import { useSelector, useDispatch } from 'react-redux';
import Counter from './blocks/Counter';
import Person from './blocks/Person';
import Address from './blocks/Address';
import Alias from './blocks/Alias';

export default function MainScreen(t: any) {    
    const classes = useStyles({});

    return (
        <div
            style={{
                marginLeft: "20px",
                marginRight: "20px",
                marginTop: "20px",
                marginBottom: "10px"
            }}>

            <Grid container className={classes.root} justify="center" spacing={6}>
                <Grid item xs={6}>
                    <Paper>
                        <Counter />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <Person />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>

                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <Address />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <Alias />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}