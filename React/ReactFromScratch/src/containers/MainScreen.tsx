import * as React from 'react';
import {useStyles} from '../styles/style';
import {withStyles} from '@material-ui/core/styles';
import {purple, green, blue} from '@material-ui/core/colors';
import {
    createMuiTheme,
    Paper,
    List,
    ListItem,
    ListItemText,
    Grid,
    TextField
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import {PositionProperty} from 'csstype';
import Button from '@material-ui/core/Button';
import Example from './Hook1';
import axios from 'axios';
import {useState, useEffect} from 'react';

export default function MainScreen(t : any) {
    const [isEditing, setIsEditing] = useState(false);
    const [personId, setPersonId] = useState(null);
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        getPersons();
    }, []);

    const classes = useStyles({});

    const Cancel = () => {
        setIsEditing(false);
        setPersonId(null);
        setName('');
        setError(null);
    }

    const itemRemove = (e : any) => {
        axios
            .post(`https://localhost:5001/api/Values/RemovePerson`, {personId: e.personId})
            .then(res => {
                this.getPersons();
            })
    }

    const itemEdit = (e : any) => {
        setIsEditing(true);
        setPersonId(e.personId);
        setName(e.name);
    }

    const itemDoEdit = () => {
        axios
            .post(`https://localhost:5001/api/Values/EditPerson`, {personId, name})
            .then(res => {
                this.getPersons();
            })
    }

    const validate = () => {

        if (!!name) {
            setError(null);
        } else {
            setError({
                error: {
                    name: "Name is required."
                }
            })
        }

        return !!name
            ? true
            : false;

    }

    const addPerson = () => {

        if (!this.validate()) {
            return;
        }

        if (!isEditing) {
            axios
                .post(`https://localhost:5001/api/Values/SavePerson`, {name})
                .then(res => {
                    this.getPersons();
                })
        } else {
            this.itemDoEdit();
        }
        this.Cancel();
    }

    const getPersons = () => {
        axios.get(`https://localhost:5001/api/values`, {},).then(res => {
            const persons = res.data;
            this.setState({persons});
        })
    }

    const addClick = () => {
        // this
        //     .props
        //     .actions
        //     .incrementSuccess();
    }
    const minusClick = () => {
        // this
        //     .props
        //     .actions
        //     .decrementSuccess();
    }

    return (
        <div
            style={{
            marginLeft: "20px",
            marginRight: "20px",
            marginTop: "20px",
            marginBottom: "10px"
        }}>
            <Button className={classes.button} onClick={addClick}>
                +
            </Button>
            <Button className={classes.button} onClick={minusClick}>
                -
            </Button>
            <label>
                count of bread: {
                    //this.props.count
                    }
            </label>

            <Grid container className={classes.root} justify="center" spacing={6}>
                <Grid item xs={6}>
                    <Paper>
                        <div className={classes.paper}>

                            <div>Persons</div>
                            <List component="nav">
                                {persons && (persons || [])
                                    .map((p : any, index : number) => <ListItem key={`person${index}`} button>
                                    <ListItemText primary={`${p.personId}:${p.name}`}/>
                                    <Button disabled={!!isEditing} onClick={() => itemRemove(p)}>
                                        Remove
                                    </Button>
                                    <Button disabled={!!isEditing} onClick={() => itemEdit(p)}>
                                        Edit
                                    </Button>
                                </ListItem>)
}
                            </List>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
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
                                        aria-describedby="component-error-text"/> 
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
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <div className={classes.paper}>
                            <div>
                                <div>
                                    Person Addresses
                                </div>
                            </div>
                            <div></div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <div className={classes.paper}>
                            <div>
                                <div>
                                    Aliases
                                    <Example/>
                                </div>
                            </div>
                            <div></div>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}