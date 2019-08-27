import * as React from 'react';
import { Button } from '@material-ui/core';
import { useStyles } from '../../styles/style';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState } from '../../models';
import { INCREMENT, DECREMENT } from '../../store/actionTypes';

const Counter = () => {
  const classes = useStyles({});
  const count = useSelector((state: IStoreState) => state.count);
  const dispatch = useDispatch();

  const addClick = () => dispatch({ type: INCREMENT });
  const minusClick = () => dispatch({ type: DECREMENT });


    return (
        <>
            <Button className={classes.button} onClick={addClick}>
                + </Button>
            <Button className={classes.button} onClick={minusClick}>
                - </Button>
            <label>
                count of bread: {count}
            </label>
        </>
    )
}

export default Counter;