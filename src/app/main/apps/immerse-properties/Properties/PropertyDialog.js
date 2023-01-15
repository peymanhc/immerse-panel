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
	CircularProgress	
} from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';
import {FuseUtils} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from '@lodash';
import * as Actions from '../store/actions';
import classNames from 'classnames';

const newPropertyState = {
    'id'       : '',
    'title'    : '',
	'price'    : '',
	'addPrice' : '',
    'description'    : '',
    'starred'  : false,
    'important': false,
    'labels'   : [],
	'iconSrc' : '',
	'images' : {}	
};

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
	}
});

class PropertyDialog extends Component {
	
	constructor(props) {
		super(props);
		this.iconInputRef = React.createRef();
	}
    state = {
        form       : {...newPropertyState},
        labelMenuEl: null
    };

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.propertyDialog.props.open && this.props.propertyDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.propertyDialog.type === 'edit' &&
                this.props.propertyDialog.data &&
                !_.isEqual(this.props.propertyDialog.data, prevState) )
            {
                this.setState({form: {...this.props.propertyDialog.data}});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.propertyDialog.type === 'new' &&
                !_.isEqual(newPropertyState, prevState) )
            {
                this.setState({
                    form: {
                        ...newPropertyState,
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

    closePropertyDialog = () => {
        this.props.propertyDialog.type === 'edit' ? this.props.closeEditPropertyDialog() : this.props.closeNewPropertyDialog();
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
        this.setState({
            form: _.set({
                ...this.state.form,
                labels: this.state.form.labels.includes(id) ? this.state.form.labels.filter(labelId => labelId !== id) : [...this.state.form.labels, id]
            })
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
        const {title, addPrice, price} = this.state.form;
        return (
            title.length > 0 && addPrice.length > 0 && price.length > 0
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
        const {propertyDialog, addProperty, updateProperty, removeProperty, labels, classes} = this.props;
        const {form, labelMenuEl} = this.state;
		let icon = form.iconSrc;
		if(form.images){
			if(form.images.icon)
				icon = form.images.icon.url || icon;
		} 
        return (
            <Dialog {...propertyDialog.props} onClose={this.closePropertyDialog} fullWidth maxWidth="sm">

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {propertyDialog.type === 'new' ? 'New Property' : 'Edit Property'}
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

                    <div className="px-16 sm:px-24">
                        <FormControl className="mt-8 mb-16" required fullWidth>
                            <TextField
                                label="Title"
                                autoFocus
                                name="title"
                                value={form.title}
                                onChange={this.handleChange}
                                required
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl className="mt-8 mb-16" fullWidth>
                            <TextField
                                label="Price"
                                autoFocus
                                name="price"
                                value={form.price}
                                onChange={this.handleChange}
                                required
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl className="mt-8 mb-16" fullWidth>
                            <TextField
                                label="Percent"
                                autoFocus
                                name="addPrice"
                                value={form.addPrice}
                                onChange={this.handleChange}
                                required
                                variant="outlined"
                            />
                        </FormControl>						
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
						<div className="flex">
							<div className="mt-8 mb-16 mr-8"> 
								<input ref={this.iconInputRef} name="icon" accept="image/png"  style={{display:'none'}}
									id="contained-button-file1"  type="file"
									onChange={this.addFiles}
								/>
								<label htmlFor="contained-button-file1">
										<Button variant="contained" component="span" className="whitespace-no-wrap">
											Choose Icon
										</Button>
								</label>							
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
										<img className="max-w-none w-auto h-full" src={icon} alt="icon" 
											onClick={() => {this.iconInputRef.current.click();}}/>
									</div>
								)
							}							
							</div>							
						</div>
                    </div>

                </DialogContent>

                {propertyDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addProperty(this.state.form);
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
                                updateProperty(this.state.form);
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            className="min-w-auto"
                            onClick={() => {
                                removeProperty(this.state.form.id);
                                this.closePropertyDialog();
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
        closeEditPropertyDialog: Actions.closeEditPropertyDialog,
        closeNewPropertyDialog : Actions.closeNewPropertyDialog,
        addProperty            : Actions.addProperty,
        updateProperty         : Actions.updateProperty,
        removeProperty         : Actions.removeProperty
		//removeProperty         : null,
    }, dispatch);
}

function mapStateToProps({immersePropertyApp})
{
    return {
        propertyDialog: immersePropertyApp.propertys.propertyDialog,
        labels    : immersePropertyApp.labels,
		loading: immersePropertyApp.propertys.loading
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(PropertyDialog));
