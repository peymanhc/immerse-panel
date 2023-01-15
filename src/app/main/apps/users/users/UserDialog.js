import React, {Component} from 'react';
import {TextField, Button, Dialog,Checkbox, FormControlLabel,  DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar,
	FormControl, InputLabel, Select, MenuItem, OutlinedInput} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';

//import { withTranslate } from 'react-redux-multilingual';  //--maddahi-and addtranslate words--//

const newUserState = {
    id          : '',
        scode   : '',
    displayName : '',
    role        : '',
        stype   : '',
    avatar      : 'assets/images/avatars/profile.jpg',
    country     : '',
    status      : '',
    email       : '',
    mobile      : '',
    address     : '',
       sPhone   : '',
       postCode : '',
       natCode  : '',
       echoCode : '',
       lang     : '',    
       sid      : '',
	key: '',
};

class UserDialog extends Component {

    state = {...newUserState};

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.userDialog.props.open && this.props.userDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.userDialog.type === 'edit' &&
                this.props.userDialog.data &&
                !_.isEqual(this.props.userDialog.data, prevState) )
            {
                this.setState({...this.props.userDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.userDialog.type === 'new' &&
                !_.isEqual(newUserState, prevState) )
            {
                this.setState({...newUserState});
            }
        }
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
        this.props.userDialog.type === 'edit' ? this.props.closeEditUserDialog() : this.props.closeNewUserDialog();
    };

    canBeSubmitted()
    {
        const {displayName, role, password} = this.state;
		if(this.props.userDialog.type === 'new' && password === '')
			return false;
        return (
            displayName.length > 0 && role
        );
    }

    render()
    {
        const {userDialog, addUser, updateUser, removeUser, roles} = this.props;
        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...userDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="md"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {userDialog.type === 'new' ? 'New User' : 'Edit User'}
                        </Typography>
                    </Toolbar>                   
                </AppBar>

                <DialogContent classes={{root: "p-24"}}>


            <div className="   flex-col md:flex-row">
              <div className="flex">   
                    <div className="w-full md:max-w-256 mb-16 md:mb-0 flex flex-col items-center justify-center pb-0">
                        <Avatar className="w-66 h-66" alt="user avatar" src={this.state.avatar}/>
                        {userDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {this.state.displayName}
                            </Typography>
                        )}
                    </div>
                   
                          <div className="min-w-24 pt-20">  <Icon color="action">account_circle</Icon>  </div>
                          <TextField
                            className="min-w-24 mb-24 mr-8"
                            label="User Name"
                            autoFocus
                            id="displayName"
                            name="displayName"
                            value={this.state.displayName}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                          />  
                          <TextField
                            className="min-w-24 mb-24 mr-8"
                            label="customer code"
                            autoFocus
                            id="customercode"
                            name="customercode"
                            value={this.state.customercode}
                            onChange={this.handleChange}
                            variant="outlined"
                            required 
                          /> 
                    </div> 
            </div>

 

                    <div className="flex">
                          <div className="min-w-24 pt-20 mr-8">
                            <Icon color="action">account_circle</Icon>
                    </div>                  
                    <FormControl  className="mt-8 mb-16 mr-8" required  fullWidth>
                            <InputLabel
                                htmlFor="outlined-role"
                            >
                               User Role
                            </InputLabel>
                            <Select
                                value={this.state.role}
                                onChange={(event) => { this.handleChange(event)}}
                                input={
                                    <OutlinedInput                                          
                                        name="role"
                                        id="outlined-role"
                                        labelWidth={10}
                                    />
                                }
                            >
                            {
                                roles.map(({role}) => <MenuItem key={role} value={role}>{role}</MenuItem>)
                            }                                   
                            </Select>
                    </FormControl>  
                    
                        <div className="min-w-24 pt-20 mr-8">
                            <Icon color="action">email</Icon>
                        </div>
                        <TextField
                            className="mb-24 mr-8"
                            label="Email"
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth							
                        />
                    </div>

                    <div className="flex">
                         <div className="min-w-24 pt-20 mr-8">
                            <Icon color="action">phone</Icon>
                        </div>
                        <TextField
                            className="mb-24 mr-8"
                            label="Mobile"
                            id="mobile"
                            name="mobile"
                            value={this.state.mobile}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth                           
                        />
                        <div className="min-w-24 pt-20 mr-8">
                            <Icon color="action">phone</Icon>
                        </div>
                        <TextField
                            className="mb-24 mr-8"
                            label="تلفن ثابت"
                            id="mobile"
                            name="mobile"
                            value={this.state.mobile}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth                           
                        />
                    
                        <div className="min-w-24 pt-20 mr-8">
                            <Icon color="action">email</Icon>
                        </div>
                        <TextField
                            className="mb-24 mr-8"
                            label="شناسه ملی"
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth                           
                        />
                    </div>

					{
						userDialog.type === 'new' && (
							<div className="flex">
								<div className="min-w-24 pt-20 mr-8">
									<Icon color="action">vpn_key</Icon>
								</div>
								<TextField
									className="mb-24"
									label="Password"
									id="password"
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
									variant="outlined"
									type="password"
									 
								/>
                              <FormControlLabel
                                 id="applicationLanguageRtl"
                                 label="change first login"                                       
                                 control={<Checkbox color="primary" name="applicationLanguageRtl"   />}
                                 labelPlacement="start"
                              />  

							</div>						
						)
					}	
                    <div className="flex">
                        <div className="min-w-24 pt-20">
                            <Icon color="action">location_on</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Country"
                            id="country"
                            name="country"
                            value={this.state.country}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                     
                        <div className="min-w-24 pt-20">
                            <Icon color="action">sentiment_dissatisfied</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Status"
                            id="status"
                            name="status"
                            value={this.state.status}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>
					
                    <div className="flex">
                        <div className="min-w-24 pt-20">
                            <Icon color="action">home</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Address"
                            id="address"
                            name="address"
                            value={this.state.address}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>


                    <div className="flex">
                        <div className="min-w-24 pt-20">
                            <Icon color="action">home</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="کد اقتصادی "
                            id="echoCode"
                            name="echoCode"
                            value={this.state.echoCode}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />    
                         <div className="min-w-24 pt-20">
                            <Icon color="action">home</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="کد پستی "
                            id="echoCode"
                            name="echoCode"
                            value={this.state.echoCode}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>





 
                </DialogContent>

                {userDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addUser(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Add
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                updateUser(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                removeUser(this.state.id);
                                this.closeComposeDialog();
                            }}
                        >
                            <Icon>delete</Icon>
                        </IconButton>
                    </DialogActions>
                )}
            </Dialog>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeEditUserDialog: Actions.closeEditUserDialog,
        closeNewUserDialog : Actions.closeNewUserDialog,
        addUser            : Actions.addUser,
        updateUser         : Actions.updateUser,
        removeUser         : Actions.removeUser
    }, dispatch);
}

function mapStateToProps({UsersApp})
{
    return {
        userDialog: UsersApp.users.userDialog
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserDialog);
