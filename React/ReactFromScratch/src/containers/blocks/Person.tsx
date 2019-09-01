import * as React from 'react';
import { useStyles } from '../../styles/style';
import { List, ListItemText, Button, FormControl, Input, FormHelperText, ListItem } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState, IPerson } from '../../models';
import axios from 'axios';


const Person = () => {

    const defaultPerson = {personId: null, name: ''} as IPerson;

    //local state
    const [error, setError] = useState(null);
    const [persons, setPersons] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [person, setPerson] = useState(defaultPerson);

    //Redux
    const personsStore = useSelector((state: IStoreState) => state.persons);
    const dispatch = useDispatch();

    useEffect(() => { getPersons(); }, []);
    const classes = useStyles({});


    const Cancel = () => {
        setIsEditing(false);
        setPerson(defaultPerson);
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
        setPerson({personId: e.personId, name: e.name} as IPerson);
    }

    const itemDoEdit = () => {
        axios
            .post(`https://localhost:5001/api/Values/EditPerson`, { personId: person.personId, name: person.name })
            .then(res => {
                getPersons();
            })
    }

    const validate = () => {

        if (!!person.name) {
            setError(null);
        } else {
            setError({ name: "Name is required." });
        }

        return !!person.name ? true : false;
    }

    const addPerson = () => {

        if (!validate()) {
            return;
        }

        if (!isEditing) {
            axios
                .post(`https://localhost:5001/api/Values/SavePerson`, {name: person.name })
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
                            value={person && person.name}
                            onChange={(d) => {
                                //cache the value before accessing SyntheticEvent async
                                const { value } = d.target;
                                setPerson(person => ({...person, name: value}))
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