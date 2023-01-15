import React, {Component} from 'react';
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
	FormControlLabel,
	Checkbox,
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
//import moment from 'moment/moment';
import _ from '@lodash';
import * as Actions from '../store/actions';
import classNames from 'classnames';
import { withTranslate } from 'react-redux-multilingual';

const newOrdersStatusState = {
    'id'       		: '',
    'stcode'        : '',
    'name'    		: '', 
    'description'   : '',
    'starred'  		: false,
    'important'		: false,
    'disable'  		: false,
	'state' 		: '',
	'type' 			: '',
	'color' 		: '',
	'order' 		: 0,	
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

class OrdersStatusDialog extends Component {

	constructor(props) {
		super(props);
		this.backgroundInputRef = React.createRef();
		this.iconInputRef = React.createRef();
	}
  
    state = {
        form       : {...newOrdersStatusState},
		background: null,
		icon: null
    };

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.ordersStatusDialog.props.open && this.props.ordersStatusDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.ordersStatusDialog.type === 'edit' &&
                this.props.ordersStatusDialog.data &&
                !_.isEqual(this.props.ordersStatusDialog.data, prevState) )
            {
                this.setState({form: {...this.props.ordersStatusDialog.data}});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.ordersStatusDialog.type === 'new' &&
                !_.isEqual(newOrdersStatusState, prevState) )
            {
                this.setState({
                    form: {
                        ...newOrdersStatusState,
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

    closeOrdersStatusDialog = () => {
        this.props.ordersStatusDialog.type === 'edit' ? this.props.closeEditOrdersStatusDialog() : this.props.closeNewOrdersStatusDialog();
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

    canBeSubmitted()
    {
        
      const {name} = this.state.form;
        return (
            name.length > 0 &&    this.props.roleuser  === "superadmin"  
        );
          
       
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
        const {roleuser,ordersStatusDialog, addOrdersStatus, updateOrdersStatus, removeOrdersStatus, classes, translate} = this.props;
        const {form} = this.state;

        return (
            <Dialog {...ordersStatusDialog.props} onClose={this.closeOrdersStatusDialog} fullWidth maxWidth="sm">

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {ordersStatusDialog.type === 'new' ? translate('New_Orders_Status') : translate('Edit_Orders_Status')}
                            {this.props.roleuser }
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
                        

                        <div className="flex">                                                                         
                            <TextField
                                className="mt-8 mb-16 mr-8"
                                label={translate("Name")}
                                autoFocus
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={this.handleChange}
                                required
                                variant="outlined"
                                fullWidth
                            />
                            <TextField
                                className="mt-4 mb-16 mr-8"
                                label={translate('Stcode')}  
                                id="stcode"
                                name="stcode"
                                value={form.stcode}   
                                onChange={this.handleChange}
                                required
                                variant="outlined"                                
                              /> 
                        </div>                 

                    <div className="flex">   
                        <FormControl className="mt-8 mb-16  mr-8" fullWidth>
                            <TextField
                                label={translate("Code_Color")}                               
                                name="color"
                                value={form.color}
                                onChange={this.handleChange}                               
                                variant="outlined"
                            />
                        </FormControl>	
                        <FormControl className="mt-8 mb-16 mr-8" fullWidth>
                            <TextField
                                label={translate("Order_Status_Label")}
                                id="order"
                                name="order"
                                value={form.order}
                                onChange={this.handleChange}
                                type="number"
                                variant="outlined"
                            />  
                        </FormControl>  
                    </div> 

                        <FormControl className="mt-8 mb-16" fullWidth>
                            <TextField
                                label={translate("Description")}   
                                name="description"
                                multiline
                                rows="2"
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
									{translate("Choose_Image")}
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
                        										
						<FormControl className="mt-8 mb-16" fullWidth>
							<FormControlLabel
								control={
									<Checkbox checked={form.disable} name="disable" onChange={this.handleChange} value="status" />
								}
								label={translate("Disabled")}
							/>
						</FormControl>							
                    </div>

                </DialogContent>

                {ordersStatusDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addOrdersStatus(this.state.form);
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            {translate("Add")}
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {  
                                updateOrdersStatus(this.state.form);
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            {translate("Save")}
                        </Button>
                        <IconButton
                            className="min-w-auto"
                            onClick={() => {
                                removeOrdersStatus(this.state.form.id);
                                this.closeOrdersStatusDialog();
                            }}
                             disabled={!this.canBeSubmitted()}
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
        closeEditOrdersStatusDialog: Actions.closeEditOrdersStatusDialog,
        closeNewOrdersStatusDialog : Actions.closeNewOrdersStatusDialog,
        addOrdersStatus            : Actions.addOrdersStatus,
        updateOrdersStatus         : Actions.updateOrdersStatus,
        removeOrdersStatus         : Actions.removeOrdersStatus
    }, dispatch);
}

function mapStateToProps({OrdersStatusApp , auth })
{
    return { 
        ordersStatusDialog	: OrdersStatusApp.ordersStatus.ordersStatusDialog,
		loading			: OrdersStatusApp.ordersStatus.loading,
        roleuser              : auth.user.role,
           
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(withTranslate(OrdersStatusDialog)));
