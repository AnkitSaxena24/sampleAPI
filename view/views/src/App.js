import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
        editDialogState: false
    }

    componentDidMount() {
        this.getData();
    } 

    getData = () => {
        fetch('http://localhost:4007/users').then(results => {
            return results.json();
        }).then(data => {
            this.setState({user_data: data['data']});
        });
    }

    getSingleUserData = () => {
        
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    }

    handleDelete = (id) => {
        fetch(`http://localhost:4007/delete-user/${id}`) 
    }

    handleReset = () => {
        this.setState({first_name: '', last_name: '', email: '', age:''});
    }

    handleDialogOpen = () => {
        this.setState({editDialogState: true});
    }

    handleDialogClose = () => {
        this.setState({editDialogState: false});
    }

    render() {
        const { classes } = this.props;
        const { first_name, last_name, age, email, user_data, editDialogState } = this.state;

        let final_data = [];

        if(user_data.length > 0) {
            user_data.map((data, index) => {
                final_data.push(
                    <TableRow key={index}>
                        <TableCell>{data['first_name']}</TableCell>
                        <TableCell>{data['last_name']}</TableCell>
                        <TableCell>{data['age']}</TableCell>
                        <TableCell>{data['email']}</TableCell>
                        <TableCell><Button className="mr-2" variant="contained" color="primary" onClick={this.handleDialogOpen}>EDIT</Button>
                            <Button variant="contained" color="secondary" onClick={()=>this.handleDelete(data['id'])}>DELETE</Button>
                        </TableCell>
                    </TableRow>
                )
            });
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
                                    <Button className="mr-3" variant="contained" color="secondary">SUBMIT</Button>
                                    <Button className="mr-3" variant="contained" color="primary" onClick={()=>this.handleReset()}>RESET</Button>
                                </div>
                            </div>
                        </div>
                    </Paper>
                </div>
                <div className="container">
                    <Paper className={classes.root} elevation={1}>
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
                                />

                                <TextField
                                    label="Last Name"
                                    className={classes.textField}
                                />

                                <TextField
                                    label="Age"
                                    className={classes.textField}
                                />

                                <TextField
                                    label="Email"
                                    className={classes.textField}
                                />
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" color="secondary">Submit</Button>
                                <Button variant="contained" onClick={this.handleDialogClose}>Cancel</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
