import React, {Component} from 'react';
import {Button, Dialog, DialogActions, DialogContent, Toolbar, AppBar, Paper, Avatar, Typography, Icon, withStyles, CircularProgress} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from '../../store/actions';
import {connect} from 'react-redux';
import {FuseChipSelect} from '@fuse';
import { withTranslate } from 'react-redux-multilingual';

const NewIcon = withStyles({
	root: {
		fontSize:'3rem',
	},
})(props => <Icon color="action" className="mr-8" {...props} />);

const styles = theme => ({
	hidden:{
		display: 'none'
	},
	loading:{
		marginLeft: theme.spacing.unit * 10
	},	
});

class AddUserDialog extends Component {

    state = {
		userId		: null,
		addressId 	: null,
	};

    canBeSubmitted()
    {
		const { userId, addressId } = this.state;
		return userId && addressId ? true : false;
    }
	
	chipsOnChange = (value, name) => { 
		this.setState({[name]: value});
		if(name === "userId"){
			this.setState({addressId: null});
			this.props.getAddress(value);
		}
	}
	
    render()
    { 
        const {classes, accdocAddUserDialog, closeAddUserDialog, users, addresses, addDataToOrder, translate} = this.props; 
        const {userId, addressId} = this.state; 
		const allUsers = users.map(({id:value, firstName:label}) => ({value, label}));
		const selectedUser = allUsers.find(({value:id}) => id === userId);
		const user = users.find(({id}) => id === userId);
		
		const allAddress = addresses.map(({id:value, address:label}) => ({value, label}));
		const selectedAddress = allAddress.find(({value:id}) => id === addressId);
		const address = addresses.find(({id}) => id === addressId);

        return (
            <Dialog
				open={accdocAddUserDialog.open}
                classes={{
                    paper: "m-24"
                }}
                onClose={closeAddUserDialog}
                fullWidth
                maxWidth="sm"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="block w-full p-24">
						<span>  {translate('Add_User')}  </span>
						<div>
							<CircularProgress 
								className={accdocAddUserDialog.loading? classes.loading:classes.hidden} 
								color="secondary"
							/>
						</div>						
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{root: "p-24"}} style={{minHeight:250}}>
					<div>
						<FuseChipSelect
							onChange={(row) => {this.chipsOnChange(row.value, 'userId')}}
							className="w-full"
							value={selectedUser || null}
							placeholder='Search a user'
							textFieldProps={{
								label          : 'Users',
								InputLabelProps: {
									shrink: true,
								},
								variant        : 'outlined',
							}}										
							options={allUsers}
							variant='fixed'
						/> 
						<FuseChipSelect
							onChange={(row) => {this.chipsOnChange(row.value, 'addressId')}}
							className="w-full mt-16"
							value={selectedAddress || null}
							placeholder='Search a address'
							textFieldProps={{
								label          : 'Addresses',
								InputLabelProps: {
									shrink: true,
								},
								variant        : 'outlined',
							}}										
							options={allAddress}
							variant='fixed'
						/>						
						{
							user !== undefined && 
								<Paper classes={{root: "p-8 mb-16 mt-20"}}>
									<div className="flex justify-between">
										<div className="flex items-center mt-8 mb-16 mr-8">
											<Avatar className="mr-8" src={user.avatar}/>
											<Typography className="truncate">
												{user.firstName}
											</Typography>											
										</div>
										<div className="min-w-auto mt-16 mb-16 mr-8">										
										</div>
									</div>
									<div className="flex items-center w-full mt-8 mb-16 mr-8">
										<NewIcon>location_on</NewIcon>		
										{
											address !== undefined && 
												<Typography className="truncate">
													{address.address}
												</Typography>											
										}												
									</div>	
									<div className="flex justify-between">
										<div className="flex items-center mt-8 mb-16 mr-8">
											<NewIcon>email</NewIcon>										
											<Typography className="truncate">
												{user.email}
											</Typography>												
										</div>
										{
											user.phone && 
												<div className="flex items-center min-w-auto mt-16 mb-16 mr-8">
													<NewIcon>phone</NewIcon>
													<Typography className="truncate">
														{user.phone}
													</Typography>	
												</div>											
										}																
									</div>									
								</Paper>							
						}
						{
							user !== undefined && 
								<Paper classes={{root: "p-8 mb-16 mt-20"}}>	
									<div className="flex justify-between">
										<div className="flex items-center mt-8 mb-16 mr-8">									
											<Typography className="truncate">
												Invoice count : -
											</Typography>												
										</div>
										<div className="flex items-center mt-8 mb-16 mr-8">									
											<Typography className="truncate">
												Invoice total : -
											</Typography>												
										</div>																					
									</div>	
									<div className="flex justify-between">
										<div className="flex items-center mt-8 mb-16 mr-8">									
											<Typography className="truncate">
												Customer Grade : -
											</Typography>												
										</div>		
										<div className="flex items-center mt-8 mb-16 mr-8">									
											<Typography className="truncate">
												Status : -
											</Typography>												
										</div>									
									</div>									
								</Paper>							
						}						
					</div>
                </DialogContent>
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
								addDataToOrder({'customer':user, invoiceAddress:[address]});
								closeAddUserDialog();
							}}
                            disabled={!this.canBeSubmitted()}
                        >
                            Add
                        </Button>
                    </DialogActions>
            </Dialog>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeAddUserDialog	: Actions.closeAddUserDialog,
        getAddress			: Actions.getAddress,
    }, dispatch);
}

function mapStateToProps({eAccountApp})
{ 
    return {
		accdocAddUserDialog	: eAccountApp.newAccdoc.accdocAddUserDialog,
		users				: eAccountApp.newAccdoc.users,
		addresses			: eAccountApp.newAccdoc.addresses,
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withTranslate(AddUserDialog)));
