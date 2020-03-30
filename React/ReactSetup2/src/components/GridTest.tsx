import React from "react";
import { IListItem } from "../model/index";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 }];

export const GridTest = (props: IListItem) => {

    const defaultProps = {
        options: top100Films,
        getOptionLabel: option => option.title
    };


    return (
        <Autocomplete style={{ width: 300 }}
            {...defaultProps}
            debug
            renderInput={params => <TextField {...params} label="debug" margin="normal" fullWidth />}
        />
    );
};