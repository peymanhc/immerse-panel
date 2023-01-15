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
	Checkbox,
	FormControlLabel,
} from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';
import {FuseUtils} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from '@lodash';
import * as Actions from '../store/actions';
import classNames from 'classnames';
import { withTranslate } from 'react-redux-multilingual';

const newPropertyState = {
    'id'			: '',
    'title'			: '',
    'description'	: '',
    'starred'  		: false,
    'important'		: false,
	'iconSrc' 		: '',
	'images' 		: {},
	'isColor'		: false,
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
        form       : {...newPropertyState}
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
		this.setState({form:newPropertyState});
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
        const {propertyDialog, addProperty, updateProperty, removeProperty, classes, translate} = this.props;
        const {form} = this.state; 
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
                            {propertyDialog.type === 'new' ? translate('New_Property') : translate('Edit_Property')}
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
                        <FormControl className="mt-8 mb-16" fullWidth>
                            <TextField
                                label={translate('Description')}
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
											{translate('Choose_Icon')}
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
										<img className="max-w-none w-auto h-full" src={icon} alt="" 
											onClick={() => {this.iconInputRef.current.click();}}/>
									</div>
								)
							}							
							</div>							
						</div>
						<FormControlLabel
							control={
								<Checkbox checked={form.isColor} name="isColor" onChange={this.handleChange}  />
							}
							label={translate('Is_Color')}
							labelPlacement="start"
						/>						
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
                            {translate('Add')}
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
                            {translate('Save')}
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
        closeEditPropertyDialog: Actions.closeEditPropertyLabelsDialog,
        closeNewPropertyDialog : Actions.closeNewPropertyLabelsDialog,
        addProperty            : Actions.addPropertyLabels,
        updateProperty         : Actions.updatePropertyLabel,
        removeProperty         : Actions.removePropertyLabels
    }, dispatch);
}

function mapStateToProps({PropertyApp})
{
    return { 
        propertyDialog: PropertyApp.propertylabels.propertyDialog,
		loading: PropertyApp.propertylabels.loading
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(withTranslate(PropertyDialog)));
