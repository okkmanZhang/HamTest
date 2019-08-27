import * as React from 'react';
import { useStyles } from '../../styles/style';
import { List, ListItemText, Button, FormControl, Input, FormHelperText, ListItem } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState, IPerson } from '../../models';
import axios from 'axios';


const Person = () => {

    const [error, setError] = useState(null);
    const [persons, setPersons] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [personId, setPersonId] = useState(null);
    const [name, setName] = useState("");
    const personsStore = useSelector((state: IStoreState) => state.persons);
    const dispatch = useDispatch();

    useEffect(() => { getPersons(); }, []);
    const classes = useStyles({});

    const Cancel = () => {
        setIsEditing(false);
        setPersonId(null);
        setName('');
        setError(null);
    }

    const itemRemove = (e: any) => {
        axios
            .post(`https://localhost:5001/api/Values/RemovePerson`, { personId: e.personId })
            .then(res => {
                getPersons();
            })
    }

    const itemEdit = (e: any) => {
        setIsEditing(true);
        setPersonId(e.personId);
        setName(e.name);
    }

    const itemDoEdit = () => {
        axios
            .post(`https://localhost:5001/api/Values/EditPerson`, { personId, name })
            .then(res => {
                getPersons();
            })
    }

    const validate = () => {

        if (!!name) {
            setError(null);
        } else {
            setError({ name: "Name is required." });
        }

        return !!name
            ? true
            : false;

    }

    const addPerson = () => {

        if (!validate()) {
            return;
        }

        if (!isEditing) {
            axios
                .post(`https://localhost:5001/api/Values/SavePerson`, { name })
                .then(res => {
                    getPersons();
                })
        } else {
            itemDoEdit();
        }
        Cancel();
    }

    const getPersons = () => {
        axios.get(`https://localhost:5001/api/values`, {}).then(res => {
            const persons = res.data as IPerson[];
            setPersons(persons);
            dispatch({ type: "GET_PERSONS_SUCCESS", payload: persons })
        })
    }

    return (
        <>
            <div className={classes.paper}>

                <div>Persons</div>
                <List component="nav">
                    {persons && (persons || [])
                        .map((p: any, index: number) => <ListItem key={`person${index}`} button>
                            <ListItemText primary={`${p.personId}:${p.name}`} />
                            <Button disabled={!!isEditing} onClick={() => itemRemove(p)}>
                                Remove</Button>
                            <Button disabled={!!isEditing} onClick={() => itemEdit(p)}>
                                Edit</Button>
                        </ListItem>)
                    }
                </List>
            </div>
            <div className={classes.paper}>
                <div>
                    <div>
                        Create Person
                                </div>
                    <FormControl
                        margin="normal"
                        error={!!error && !!error.name}>
                        <Input
                            placeholder="name"
                            id="component-error"
                            value={name}
                            onChange={(d) => {
                                setName(d.currentTarget.value)
                            }}
                            aria-describedby="component-error-text" />
                        {error
                            && error.name && <FormHelperText id="component-error-text">
                                {error && error.name}</FormHelperText>}
                    </FormControl>

                </div>
                <div>
                    <Button variant="contained" color="primary" onClick={addPerson}>
                        {!isEditing
                            ? "ADD"
                            : "EDIT"}
                    </Button>
                    <Button onClick={Cancel}>
                        CANCEL
                                </Button>
                </div>
            </div>
        </>
    )
}

export default Person;