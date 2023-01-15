import React, {Component} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, 
	Table, TableHead, TableRow, TableCell, TableBody, Checkbox} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';

const newRoleState = {
    id         : '',
    role       : '',
	access     : {},
};

class RoleDialog extends Component {

    state = {
		...newRoleState,
		checkboxs: {},
	};

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.roleDialog.props.open && this.props.roleDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.roleDialog.type === 'edit' &&
                this.props.roleDialog.data &&
                !_.isEqual(this.props.roleDialog.data, prevState) )
            {
                this.setState({...this.props.roleDialog.data});
				this.acceccToCheckBox(this.props.roleDialog.data.access);
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.roleDialog.type === 'new' &&
                !_.isEqual(newRoleState, prevState) )
            {
                this.setState({...newRoleState, checkboxs: {}});
            }
        }
    }
	
	acceccToCheckBox = (access) => {
		const checkboxs = {};
		Object.keys(access).forEach(name => access[name].forEach(action => checkboxs[this.getCheckBoxName(name, action)] = true));
		this.setState({checkboxs, access: {}});
	};
	
    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
        this.props.roleDialog.type === 'edit' ? this.props.closeEditRoleDialog() : this.props.closeNewRoleDialog();
    };

    canBeSubmitted()
    {
        const {role} = this.state;
        return (
            role.length > 0
        );
    }
	
	getCheckBoxName = (name, action) => `${name}_${action}`;
	
	checkBoxOnClick = (Name, Action) => {
		const name = this.getCheckBoxName(Name, Action);
		const checkboxs = this.state.checkboxs;
		if(checkboxs[name])
			delete checkboxs[name];
		else{
			checkboxs[name] = true;
			if(Action === 'delete'){
				checkboxs[this.getCheckBoxName(Name, 'read')] = true;
				checkboxs[this.getCheckBoxName(Name, 'create')] = true;
				checkboxs[this.getCheckBoxName(Name, 'write')] = true;
			}
			else if(Action === 'write'){
				checkboxs[this.getCheckBoxName(Name, 'read')] = true;
				checkboxs[this.getCheckBoxName(Name, 'create')] = true;				
			}
			else if(Action === 'create'){
				checkboxs[this.getCheckBoxName(Name, 'read')] = true;			
			}				
		}
		this.setState({checkboxs});
	}
	checkboxsChecked = (name) => { 
		if(this.state.checkboxs[name])
			return true;
		return false;
	}
	
	checkboxDisabled = (Name, Action) => {
		const checkboxs = this.state.checkboxs;
		if(Action === 'read')
			if(checkboxs[this.getCheckBoxName(Name, 'create')])
				return true;
		if(Action === 'create')
			if(checkboxs[this.getCheckBoxName(Name, 'write')])
				return true;
		if(Action === 'write')
			if(checkboxs[this.getCheckBoxName(Name, 'delete')])
				return true;
		return false;	
	}
	
	sortedCheckboxAccess = () => {
		const checkboxs = Object.keys(this.state.checkboxs);
		const access = {};
		checkboxs.forEach(item => {
			const [name, action] = item.split('_');
			if(access[name] === undefined)
				access[name] = [action];
			else
				access[name] = [...access[name], action];
		});
		return access;
	};
	
    render()
    {
        const {roleDialog, updateRole, routes, addRole, removeRole} = this.props;
		const {id, role} = this.state;
        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...roleDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="md"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {roleDialog.type === 'new' ? 'New Role' : 'Edit Role'}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{root: "p-24"}}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">group_add</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Role Name"
                            autoFocus
                            id="role"
                            name="role"
                            value={this.state.role}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>
					<div className="flex">
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Role</TableCell>
									<TableCell>Read</TableCell>
									<TableCell>Create</TableCell>
									<TableCell>Write</TableCell>
									<TableCell>Delete</TableCell>
								</TableRow>
							</TableHead>
							<TableBody style={{maxHeight:'300px'}}>
								{
									routes.map(name => 
										{
											const readName   = this.getCheckBoxName(name, 'read');
											const createName = this.getCheckBoxName(name, 'create');
											const writeName  = this.getCheckBoxName(name, 'write');
											const deleteName = this.getCheckBoxName(name, 'delete');
											return (
												<TableRow key={name}>                                                                           
													<TableCell>{name}</TableCell>
													<TableCell>
														<Checkbox 
															checked={this.checkboxsChecked(readName)} 
															disabled={this.checkboxDisabled(name, 'read')}
															onChange={() => this.checkBoxOnClick(name, 'read')} 
															name={readName} 
														/>
													</TableCell>
													<TableCell>
														<Checkbox 
															checked={this.checkboxsChecked(createName)} 
															disabled={this.checkboxDisabled(name, 'create')}
															onChange={() => this.checkBoxOnClick(name, 'create')} 
															name={createName} 
														/>
													</TableCell>
													<TableCell>
														<Checkbox 
															checked={this.checkboxsChecked(writeName)} 
															disabled={this.checkboxDisabled(name, 'write')}
															onChange={() => this.checkBoxOnClick(name, 'write')} 
															name={writeName} 
														/>
													</TableCell>
													<TableCell>
														<Checkbox  
															checked={this.checkboxsChecked(deleteName)} 
															disabled={this.checkboxDisabled(name, 'delete')}
															onChange={() => this.checkBoxOnClick(name, 'delete')} 
															name={deleteName} 
														/>
													</TableCell>
												</TableRow> 											
											);
										}
									)
								}

							</TableBody>
						</Table>					
					</div>
                </DialogContent>

                {roleDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
								const access = this.sortedCheckboxAccess();
                                addRole({role, access});
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
								const access = this.sortedCheckboxAccess();							
                                updateRole({id, role, access});
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                removeRole(this.state.id, this.state.role);
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
        closeEditRoleDialog: Actions.closeEditRoleDialog,
        closeNewRoleDialog : Actions.closeNewRoleDialog,
        addRole            : Actions.addRole,
        updateRole         : Actions.updateRole,
        removeRole         : Actions.removeRole
    }, dispatch);
}

function mapStateToProps({UsersApp})
{
    return {
        roleDialog: UsersApp.roles.roleDialog
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RoleDialog);
