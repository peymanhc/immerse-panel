import React, {Component} from 'react';
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    Chip,
    Icon,
    IconButton,
    Typography,
    Toolbar,
    AppBar,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider,
	withStyles,
	CircularProgress,
	Radio,	
	FormControlLabel,
	Checkbox,
} from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import moment from 'moment/moment';
import _ from '@lodash';
import * as Actions from '../store/actions';
import classNames from 'classnames';
import { withTranslate } from 'react-redux-multilingual';
import {FuseUtils} from '@fuse';
//import {openDialog, closeDialog} from 'app/store/actions';

const newCategoryState = {
    'id'       : '',
    'title'    : '',
    'notes'    : '',
    'startDate': new Date(),
    'dueDate'  : new Date(),
    'completed': false,
    'starred'  : false,
	'disable'  : false,
    'important': false,
    'deleted'  : false,
    'labels'   : [],
	'imageSrc' : '',
	'iconSrc' : '',
	'images' : {},
	'labelsObject': [],
    'categorylabel'          : null,
    'cluster'          : null,
	'address' : '',
	'mail' : '',
	'phone' : '',
	type: null,
};

const WhiteRadio = withStyles({
  root: {
    color: '#c4c4c4',
    '&$checked': {
		color: '#4dbcf9',
    },
    '&:hover': {
		color: '#4dbcf9',
    },	
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

const FormControlLabel1 = withStyles({
	root: {
		background:'white',
		borderRadius:22,
		height:33,
		border: '1px solid #c4c4c4',
		marginRight:25,
		marginLeft:0,		
	},
	label:{
		marginRight:10,
	},
})(props => <FormControlLabel {...props} />);

const styles = theme => ({
    productImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            boxShadow                    : theme.shadows[5]
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
        }
    },
	hidden:{
		display: 'none'
	},
	loading:{
		marginLeft: theme.spacing.unit * 10
	},
	typesRow:{
		marginBottom:10,
	},	
});

class CategoryDialog extends Component {
	
	constructor(props) {
		super(props);
		this.backgroundInputRef = React.createRef();
		this.iconInputRef = React.createRef();
	}
    state = {
        form       : {...newCategoryState},
        labelMenuEl: null
    };

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.categoryDialog.props.open && this.props.categoryDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.categoryDialog.type === 'edit' &&
                this.props.categoryDialog.data &&
                !_.isEqual(this.props.categoryDialog.data, prevState) )
            {
                this.setState({form: {...this.props.categoryDialog.data}});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.categoryDialog.type === 'new' &&
                !_.isEqual(newCategoryState, prevState) )
            {
                this.setState({
                    form: {
                        ...newCategoryState,
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

    closeCategoryDialog = () => {
        this.props.categoryDialog.type === 'edit' ? this.props.closeEditCategoryDialog() : this.props.closeNewCategoryDialog();
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

    handleToggleLabel = (event, id) => { 
        event.stopPropagation();
		const form = _.set({
            ...this.state.form,
            labels: this.state.form.labels.includes(id) ? this.state.form.labels.filter(labelId => labelId !== id) : [...this.state.form.labels, id]
        });
		const labels = this.props.labels;
		const labelsObject = form.labels.map(item => {
			const labelObject = labels.find(label => label.id === item);
			return {
				title: labelObject.title,
				id: labelObject.id,
			};
		});
		form["labelsObject"] = labelsObject;
        this.setState({form}); 
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
        const {title} = this.state.form;
        return (
            title.length > 0
        );
    }

	addFiles = (event) => {
		const files = [...event.target.files].map(file => ({
			url: URL.createObjectURL(file),
			file
		}));
		let form = this.state.form;
		if(!form["images"])
			form["images"] = {};
		form["images"][event.target.name] = files[0];
		this.setState({form});
	};
		
    render()
    {
        const {categoryDialog, addCategory, updateCategory, removeCategory, labels, classes, types, translate, clusterlist} = this.props;

       

        const {form, labelMenuEl} = this.state;
		let background = form.imageSrc;
		let icon = form.iconSrc;
		
		if(form.images){
			if(form.images.background)
				background = form.images.background.url || background;
			if(form.images.icon)
				icon = form.images.icon.url || icon;
		} 
		
		let selectedLabels =  form.labels.map(item => {
			let label = _.find(labels, {id: item});
			if(label){
				let cluster = clusterlist.find(item => item.id === label.clusterId);
				if(cluster)
					return cluster.name;	
			}
			return null;
		}).filter(item => item !== null);

        return (
            <Dialog {...categoryDialog.props} onClose={this.closeCategoryDialog} fullWidth maxWidth="sm">

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {categoryDialog.type === 'new' ? translate('New_Category') : translate('Edit_Category')}
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
                                <div>
                                    <IconButton
                                        aria-owns={labelMenuEl ? 'label-menu' : null}
                                        aria-haspopup="true"
                                        onClick={this.handleLabelMenuOpen}
                                    >
                                        <Icon>label</Icon>
                                    </IconButton>
                                    <Menu
                                        id="label-menu"
                                        anchorEl={labelMenuEl}
                                        open={Boolean(labelMenuEl)}
                                        onClose={this.handleLabelMenuClose}
                                    >
                                        {labels.length > 0 && labels.map((label) => (
                                            <MenuItem onClick={(ev) => this.handleToggleLabel(ev, label.id)} key={label.id}>
                                                <ListItemIcon>
                                                    <Icon className="mr-0" color="action">
                                                        {form.labels.includes(label.id) ? 'check_box' : 'check_box_outline_blank'}
                                                    </Icon>
                                                </ListItemIcon>
                                                <ListItemText primary={label.title} disableTypography={true}/>
                                                <ListItemIcon>
                                                    <Icon className="mr-0" style={{color: label.color}} color="action">
                                                        label
                                                    </Icon>
                                                </ListItemIcon>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </div>
                            </div>
                        </div>
                        <Divider className="mx-24"/>
                    </div>

                    {form.labels.length > 0 && (
                        <div className="flex flex-wrap  px-16 sm:px-24 mb-16">
                            {form.labels.map(label => (
                                <Chip
                                    avatar={(
                                        <Avatar
                                            classes={{colorDefault: "bg-transparent"}}>
                                            <Icon
                                                className="text-20"
                                                style={{color: _.find(labels, {id: label}).color}}
                                            >
                                                label
                                            </Icon>
                                        </Avatar>
                                    )}
                                    label={_.find(labels, {id: label}).title}
                                    onDelete={(ev) => this.handleToggleLabel(ev, label)}
                                    className="mr-8 my-8"
                                    classes={{label: "pl-4"}}
                                    key={label}
                                />
                            ))}
                        </div>
                    )}

                    {selectedLabels.length > 0 && (
                        <div className="flex flex-wrap  px-16 sm:px-24 mb-16">
                            {selectedLabels.map((label, index) => (
                                <Chip
                                    avatar={(
                                        <Avatar
                                            classes={{colorDefault: "bg-transparent"}}>
                                            <Icon
                                                className="text-20"
                                                style={{color: 'orange'}}
                                            >
                                                label
                                            </Icon>
                                        </Avatar>
                                    )}
                                    label={label}
                                    className="mr-8 my-8"
                                    classes={{label: "pl-4"}}
                                    key={index}
                                />
                            ))}
                        </div>
                    )}

                    <div className="px-16 sm:px-24">
					

					
						
                        <FormControl className="mt-8 mb-16" required fullWidth>
                            <TextField
                                label={translate('Title')}
                                autoFocus
                                name="title"
                                value={form.title}
                                onChange={this.handleChange}
                                required
                                variant="outlined"
                            />
                        </FormControl>
						<div className={classes.typesRow}>
							{
								types.map(({id, title}) => 
									<FormControlLabel1
										key={id}
										control={
											<WhiteRadio
												checked={form.type === title}
												onChange={this.handleChange}
												value={title}
												name="type"
												inputProps={{ 'aria-label': {title} }}										
											/>									
										}
										label={title}
										labelPlacement="end"
									/>												
								)
							}							
						</div>	
                        <FormControl className="mt-8 mb-16" required fullWidth>
                            <TextField
                                label={translate('Description')}
                                name="notes"
                                multiline
                                rows="6"
                                value={form.notes}
                                onChange={this.handleChange}
                                variant="outlined"
                            />
                        </FormControl>
						<div className="flex">
							<div className="mt-8 mb-16 mr-8"> 
							{
								(background && 
									<div
										className={
											classNames(
												classes.productImageItem,
												"flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
										}
									>									
										<img className="max-w-none w-auto h-full" src={background} alt=""
											onClick={() => {this.backgroundInputRef.current.click();}}/>
									</div>
								)
							}							
							</div>
							<div className="mt-8 mb-16 mr-8"> 
							{
								(icon && 
									<div
										className={
											classNames(
												classes.productImageItem,
												"flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
										}
									>									
										<img className="max-w-none w-auto h-full" src={icon} alt="" 
											onClick={() => {this.iconInputRef.current.click();}}/>
									</div>
								)
							}							
							</div>							
						</div>
						<div className="flex">
							<div className="mt-8 mb-16 mr-8"> 
								<input ref={this.backgroundInputRef} name="background" accept="image/*"  style={{display:'none'}}
									id="contained-button-file"  type="file"
									onChange={this.addFiles}
								/>
								<label htmlFor="contained-button-file">
										<Button variant="contained" component="span" className="whitespace-no-wrap">
											{translate('Choose_Background')}
										</Button>
								</label>							
							</div>
							<div className="mt-8 mb-16 mr-8"> 
								<input ref={this.iconInputRef} name="icon" accept="image/png"  style={{display:'none'}}
									id="contained-button-file1"  type="file"
									onChange={this.addFiles}
								/>
								<label htmlFor="contained-button-file1">
										<Button variant="contained" component="span" className="whitespace-no-wrap">
											{translate('Choose_Icon')}
										</Button>
								</label>
							</div>									
						</div>
                        <FormControl className="mt-8 mb-16" fullWidth>
                            <TextField
                                label={translate('Phone')}
                                name="phone"
                                value={form.phone}
                                onChange={this.handleChange}
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl className="mt-8 mb-16" fullWidth>
                            <TextField
                                label={translate('Mail')}
                                name="mail"
                                value={form.mail}
                                onChange={this.handleChange}
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl className="mt-8 mb-16" fullWidth>
                            <TextField
                                label={translate('Address')}
                                name="address"
                                multiline
                                rows="6"								
                                value={form.address}
                                onChange={this.handleChange}
                                variant="outlined"
                            />
                        </FormControl>	
						<FormControl className="mt-8 mb-16" fullWidth>
							<FormControlLabel
								control={
									<Checkbox checked={form.disable} name="disable" onChange={this.handleChange} value="status" />
								}
								label={translate('Disabled')}
							/>
						</FormControl>							
                    </div>

                </DialogContent>

                {categoryDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addCategory(this.state.form);
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            {translate('Add')}
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                updateCategory(this.state.form);
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            {translate('Save')}
                        </Button>
                        <IconButton
                            className="min-w-auto"
                            onClick={() => {
                                removeCategory(this.state.form.id);
                                this.closeCategoryDialog();
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
        closeEditCategoryDialog	: Actions.closeEditCategoryDialog,
        closeNewCategoryDialog 	: Actions.closeNewCategoryDialog,
        addCategory				: Actions.addCategory,
        updateCategory			: Actions.updateCategory,
        removeCategory         	: Actions.removeCategory,
//		openDialog				: openDialog,
//		closeDialog				: closeDialog,			
    }, dispatch);
}

function mapStateToProps({CategoryApp})
{
    return {
        categoryDialog	: CategoryApp.categorys.categoryDialog,
        clusterlist			: CategoryApp.categorys.clusterlist,
        labels    		: CategoryApp.labels,
		loading			: CategoryApp.categorys.loading,
		types			: CategoryApp.categorylabels.types,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(withTranslate(CategoryDialog)));
