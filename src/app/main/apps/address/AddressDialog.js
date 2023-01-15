import React, {Component} from 'react';
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    Icon,
    IconButton,
    Typography,
    Toolbar,
    AppBar,
    Divider,
	withStyles,
	CircularProgress,
} from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';
import {FuseUtils} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from '@lodash';
import * as Actions from './store/actions';
import {FuseChipSelect} from '@fuse';
import classNames from 'classnames';

const newAddressState = {
    'id'			: '',
    'address'		: '',
    'lat'    		: '',
    'long'    		: '',
    'description'   : '',	
    'starred'  		: false,
    'important'		: false,
	'uid'			: null,
	'username'		: '',
	'city'			: null,
	'title'			: '',
	'imgSrc'		: '',
};

const styles = theme => ({

	hidden: {
		display: 'none',
	},
    productImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            boxShadow                    : theme.shadows[5],
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
        }
    },	
	uploadBtn:{
		fontSize:12,
	},	
	loading:{
		marginLeft: theme.spacing.unit * 10
	},	
});
class AddressDialog extends Component {

    state = {
        form       : {...newAddressState},
        labelMenuEl: null
    };

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.addressDialog.props.open && this.props.addressDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.addressDialog.type === 'edit' &&
                this.props.addressDialog.data &&
                !_.isEqual(this.props.addressDialog.data, prevState) )
            {
                this.setState({form: {...this.props.addressDialog.data}});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.addressDialog.type === 'new' &&
                !_.isEqual(newAddressState, prevState) )
            {
                this.setState({
                    form: {
                        ...newAddressState,
                        id: FuseUtils.generateGUID()
                    }
                });
            }
        }
    }

    handleChange = (event) => {
        const form = _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
        this.setState({form});
    };

    closeAddressDialog = () => {
        this.props.addressDialog.type === 'edit' ? this.props.closeEditAddressDialog() : this.props.closeNewAddressDialog();
    };

    handleLabelMenuOpen = (event) => {
        this.setState({labelMenuEl: event.currentTarget});
    };

    handleLabelMenuClose = (event) => {
        this.setState({labelMenuEl: null});
    };

    handleToggleImportant = () => {
        this.setState({
            form: {
                ...this.state.form,
                important: !this.state.form.important
            }
        });
    };

    handleToggleStarred = () => {
        this.setState({
            form: {
                ...this.state.form,
                starred: !this.state.form.starred
            }
        });
    };

    toggleCompleted = () => {
        this.setState({
            form: {
                ...this.state.form,
                completed: !this.state.form.completed
            }
        })
    };

    canBeSubmitted()
    {
        const {address, uid} = this.state.form;
        return (
            address.length > 0 && uid !== null && !this.props.loading 
        );
    }

	onChangeSelect = (row, name) => {
		const newform = {...this.state.form, [name]:row.value};
		this.setState({
			form:newform
		});		
	}
	
	userOnChangeSelect = (row) => {
		const newform = {...this.state.form, uid:row.value, username:row.label};
		this.setState({
			form:newform
		});		
	}	

	addFiles = (event) => {
		const file = event.target.files[0];
		this.setState({form: {...this.state.form, 
			[event.target.name] :{
				url: URL.createObjectURL(file),
				file				
			}
		}});
	};
	
    render()
    { 
        const {addressDialog, addAddress, updateAddress, removeAddress, users, cities, classes} = this.props;
        const {form} = this.state; 
		const allUsers = users.map(({id:value, displayName:label}) => ({value, label}));
		const allCities = cities.map(({id:value, title:label}) => ({value, label}));
		const selectedUser = allUsers.find(({value:id}) => id === form.uid); 
		const selectedCity = allCities.find(({value:id}) => id === form.city);
        return (
            <Dialog {...addressDialog.props} onClose={this.closeAddressDialog} fullWidth maxWidth="sm">

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {addressDialog.type === 'new' ? 'New Address' : 'Edit Address'}
                        </Typography>
						<div>
							<CircularProgress 
								className={this.props.loading? classes.loading:classes.hidden} 
								color="secondary"
							/>
						</div>						
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{root: "p-0"}}>

                    <div className="mb-16">
                        <div className="flex items-center justify-between p-12">
                            <div className="flex items-center justify-start" aria-label="Toggle star">
                                <IconButton onClick={this.handleToggleImportant}>
                                    {form.important ? (
                                        <Icon style={{color: red[500]}}>error</Icon>
                                    ) : (
                                        <Icon>error_outline</Icon>
                                    )}
                                </IconButton>
                                <IconButton onClick={this.handleToggleStarred}>
                                    {form.starred ? (
                                        <Icon style={{color: amber[500]}}>star</Icon>
                                    ) : (
                                        <Icon>star_outline</Icon>
                                    )}
                                </IconButton>
                            </div>
                        </div>
                        <Divider className="mx-24"/>
                    </div>

                    <div className="px-16 sm:px-24">
                        <FormControl className="mt-8 mb-16" fullWidth>
                            <TextField
                                label="Title"
                                name="title"
                                value={form.title}
                                onChange={this.handleChange}
                                variant="outlined"
								autoFocus								
                            />
                        </FormControl>					
                        <FormControl className="mt-8 mb-16" required fullWidth>
                            <TextField
                                label="Address"
                                name="address"
                                multiline
                                rows="6"
                                value={form.address}
                                onChange={this.handleChange}
                                variant="outlined"								
								required
                            />
                        </FormControl>
						<FuseChipSelect
							onChange={(row) => {this.userOnChangeSelect(row);}}
							className="w-full mb-16"
							value={selectedUser}
							placeholder="Search a User"
							textFieldProps={{
								label          : "Users",
								InputLabelProps: {
									shrink: true
								},
								variant        : 'outlined',
								required:true,
							}}
							options={allUsers}
							
						/>		
						<FuseChipSelect
							onChange={(row) => {this.onChangeSelect(row, 'city');}}
							className="w-full mb-16"
							value={selectedCity}
							placeholder="Search a City"
							textFieldProps={{
								label          : "Cities",
								InputLabelProps: {
									shrink: true
								},
								variant        : 'outlined',
								required:true,
							}}
							options={allCities}
							
						/>							
						<div className="flex">
							<FormControl className="mt-8 mb-16 mr-8" fullWidth>
								<TextField
									label="Lat"
									name="lat"
									value={form.lat}
									onChange={this.handleChange}
									variant="outlined"
								/>
							</FormControl>
							<FormControl className="mt-8 mb-16 mr-8" fullWidth>
								<TextField
									label="Long"
									name="long"
									value={form.long}
									onChange={this.handleChange}
									variant="outlined"
								/>
							</FormControl>						
						</div>

						<FormControl className="mt-8 mb-16" fullWidth>
                            <TextField
                                label="Description"
                                name="description"
                                multiline
                                rows="6"
                                value={form.description}
                                onChange={this.handleChange}
                                variant="outlined"
                            />
                        </FormControl>	

						<div className="mt-8 mb-16">
							<input accept="image/*" className={classes.hidden} name="imgSrc"  
								id="imgSrc" type="file" onChange={this.addFiles}
							/>
							<label htmlFor="imgSrc">
								<Button variant="outlined" component="span" className={classes.uploadBtn}>
									Choose Image
								</Button>
							</label>									
						</div>	
						<div className="mt-8 mb-16">
						{
							(form.imgSrc && 
								<div
									className={
										classNames(
											classes.productImageItem,
											"flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
									}
								>									
									<img className="max-w-none w-auto h-full" 
										src={typeof form.imgSrc === "object" ? form.imgSrc.url : form.imgSrc} 
										alt="" 
									/>
								</div>
							)										
						}
						</div>						
                    </div>

                </DialogContent>

                {addressDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addAddress(this.state.form);
                               // this.closeAddressDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Add
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => { 
                                updateAddress(this.state.form);
                               // this.closeAddressDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            className="min-w-auto"
                            onClick={() => {
                                removeAddress(this.state.form.id);
                                this.closeAddressDialog();
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
        closeEditAddressDialog: Actions.closeEditAddressDialog,
        closeNewAddressDialog : Actions.closeNewAddressDialog,
        addAddress            : Actions.addAddress,
        updateAddress         : Actions.updateAddress,
        removeAddress         : Actions.removeAddress
    }, dispatch);
}

function mapStateToProps({addressApp})
{
    return { 
        addressDialog	: addressApp.addresses.addressDialog,
        users			: addressApp.addresses.users,
        cities			: addressApp.addresses.cities,
        loading			: addressApp.addresses.loading		
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(AddressDialog));
