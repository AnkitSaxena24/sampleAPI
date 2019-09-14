import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Chip from '@material-ui/core/Chip';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    table: {
        minWidth: 700,
    },
});

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class App extends Component {

    state = {
        first_name: '',
        last_name: '',
        age: '',
        email: '',
        user_data: [],
        edit_user_data: [],
        editDialogState: false,
        message: '',
        user_count: '',
        id: ''
    }

    componentDidMount() {
        this.getData();
    }

    //Getting the list of users
    getData = async () => {
        let result = await axios.get('http://localhost:4007/users');
        let user_count = result['data']['data'].length > 0 ? result['data']['data'].length : 0;
        this.setState({user_data: result['data']['data'], user_count: user_count});
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    }

    handleSubmit = () => {
        const { first_name, last_name, age, email } = this.state;
        const add_user_data = {
            "first_name": first_name,
            "last_name": last_name,
            "age": age,
            "email": email
        }

        this.addUser(add_user_data);
    }

    

    //Adding a user
    addUser = async (data) => {
        let add_data = await axios.post('http://localhost:4007/add-user/',{data});

        if(add_data['data']['success'] === 1 && add_data['data']['status'] === 200) {
            NotificationManager.success('User Added', 'User Added Successfully', 3000);
            this.setState({first_name: '', last_name: '', email: '', age:''});
        } else {
            alert('Something went wrong');
        }
    }

    handleEdit = () => {
        const { first_name, last_name, age, email,id } = this.state;
        const edit_user_data = {
            "first_name": first_name,
            "last_name": last_name,
            "age": age,
            "email": email,
            "id": id
        }

        this.editUser(edit_user_data);
    }

    editUser = async (data) => {
        let edit_data = await axios.post(`http://localhost:4007/add-user/update-user`,{data});
        
        if(edit_data['data']['success'] === 1 && edit_data['data']['status'] === 200) {
            NotificationManager.success('User Editted', 'User Editted Successfully', 3000);
        } else {
            alert('Something went wrong');
        }
    }

    //Deleting the a single user
    handleDelete = async (id) => {
        let delete_data = await axios.delete('http://localhost:4007/delete-user/',{data: {id: id}});
        if(delete_data['data']['status'] === 200) {
            return NotificationManager.success(delete_data['data']['message'], 'User Deleted', 3000);
        } else {
            return NotificationManager.error('Something went wrong while deleting user');
        }
    }

    //Reseting the form
    handleReset = () => {
        this.setState({first_name: '', last_name: '', email: '', age:''});
    }

    handleDialogOpen = async (id) => {
        let user_data = await axios.get(`http://localhost:4007/user-data/${id}`);
        const final_data = user_data['data']['data'][0];

        this.setState({editDialogState: true, 
            first_name:final_data['first_name'],
            last_name: final_data['last_name'],
            age: final_data['age'],
            email: final_data['email'],
            id: id
        });
    }

    handleDialogClose = () => {
        this.setState({editDialogState: false});
    }

    render() {
        const { classes } = this.props;
        const { first_name, last_name, age, email, user_data, editDialogState, message, user_count, id } = this.state;

        let final_data = [];

        if(user_data.length > 0) {
            user_data.map((data, index) => {
                final_data.push(
                    <TableRow key={index}>
                        <TableCell>{data['first_name']}</TableCell>
                        <TableCell>{data['last_name']}</TableCell>
                        <TableCell>{data['age']}</TableCell>
                        <TableCell>{data['email']}</TableCell>
                        <TableCell><Button className="mr-2" variant="contained" color="primary" onClick={()=>this.handleDialogOpen(data['id'])}>EDIT</Button>
                            <Button variant="contained" color="secondary" onClick={()=>this.handleDelete(data['id'])}>DELETE</Button>
                        </TableCell>
                    </TableRow>
                )
            });
        } else {
            final_data.push(
                <TableRow>
                    No User found
                </TableRow>
            );
        }

        return (
            <div className="App">
                <div className="container mt-4 mb-4">
                    <Paper className={classes.root} elevation={1}>
                        <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                id="standard-name"
                                label="First Name"
                                className={classes.textField}
                                onChange={this.handleChange('first_name')}
                                value={first_name}
                                margin="normal"
                            />
                            
                            <TextField
                                id="standard-name"
                                label="Last Name"
                                className={classes.textField}
                                onChange={this.handleChange('last_name')}
                                value={last_name}
                                margin="normal"
                            />
                            
                            <TextField
                                id="standard-name"
                                label="Age"
                                type="number"
                                onChange={this.handleChange('age')}
                                className={classes.textField}
                                value={age}
                                margin="normal"
                            />

                            <TextField
                                id="standard-name"
                                label="Email"
                                onChange={this.handleChange('email')}
                                className={classes.textField}
                                value={email}
                                margin="normal"
                                autoComplete="off"
                            />
                        </form>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-6">
                                    <Button className="mr-3" variant="contained" color="secondary" onClick={()=>this.handleSubmit()}>SUBMIT</Button>
                                    <Button className="mr-3" variant="contained" color="primary" onClick={()=>this.handleReset()}>RESET</Button>
                                </div>
                            </div>
                        </div>
                    </Paper>
                </div>
                <div className="container">
                    <Paper className={classes.root} elevation={1}>
                        <Chip
                            label = {`No. of users ${user_count}`}
                            color="secondary"
                        />
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {final_data}
                            </TableBody>
                        </Table>
                    </Paper>
                    <div>
                        <Dialog
                            open={editDialogState}
                            onClose={this.handleDialogClose}
                            aria-labelledby="form-dialog-title"
                            TransitionComponent={Transition}
                            keepMounted
                        >
                            <DialogTitle id="form-dialog-title">{'Edit User Details'}</DialogTitle>
                            <DialogContent>
                                Change the fields which you want to change and then click on submit
                                <form className={classes.container} noValidate autoComplete="off">
                                    <TextField
                                        label="First Name"
                                        className={classes.textField}
                                        value={first_name}
                                    />

                                    <TextField
                                        label="Last Name"
                                        className={classes.textField}
                                        value={last_name}
                                    />

                                    <TextField
                                        label="Age"
                                        className={classes.textField}
                                        value={age}
                                    />

                                    <TextField
                                        label="Email"
                                        className={classes.textField}
                                        value={email}
                                    />
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" color="secondary" onClick={()=>this.handleEdit()}>Submit</Button>
                                <Button variant="contained" onClick={this.handleDialogClose}>Cancel</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
                <NotificationContainer />
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
