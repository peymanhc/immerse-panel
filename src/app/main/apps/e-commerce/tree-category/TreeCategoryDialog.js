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
	Radio,	
	FormControlLabel,
	Checkbox,
} from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import _ from '@lodash';
import * as Actions from '../store/actions/treeCategory.actions';
import classNames from 'classnames';
import { withTranslate } from 'react-redux-multilingual';
import {FuseUtils} from '@fuse';


const newCategoryState = {
    'id'       		: '',
    'title'    		: '',
    'notes'    		: '',
    'startDate'		: new Date(),
    'dueDate'  		: new Date(),
    'completed'		: false,
    'starred'  		: false,
	'disable'  		: false,
    'important'		: false,
    'deleted'  		: false,
    'labels'   		: [],
	'imageSrc' 		: '',
	'iconSrc' 		: '',
	'images' 		: {},
	'labelsObject'	: [],
    'categorylabel'	: null,
    'cluster'		: null,
	'address' 		: '',
	'mail'			: '',
	'phone'			: '',
	'type'			: null,
	'children'		: [],
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

class TreeCategoryDialog extends Component {
	
	constructor(props) {
		super(props);
		this.backgroundInputRef = React.createRef();
		this.iconInputRef = React.createRef();
	}
    state = {
        form		: {...newCategoryState},
        treeInfo	: {},
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
                this.setState({form: {...this.props.categoryDialog.data}, treeInfo: this.props.categoryDialog.treeInfo});
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
                    },
					treeInfo: this.props.categoryDialog.treeInfo
                });
            }
        }
    }

    handleChange = (event) => {
        const form = _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
        this.setState({form});
    };

    closeCategoryDialog = () => {
		this.setState({form:{...newCategoryState}, treeInfo: {}});
        this.props.categoryDialog.type === 'edit' ? this.props.closeEditCategoryDialog() : this.props.closeNewCategoryDialog();
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
        const {categoryDialog, addCategory, updateCategory, removeCategory, classes, translate, types} = this.props;

        const {form, treeInfo} = this.state; 
		let background = form.imageSrc;
		let icon = form.iconSrc;
		
		if(form.images){
			if(form.images.background)
				background = form.images.background.url || background;
			if(form.images.icon)
				icon = form.images.icon.url || icon;
		} 
		
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
                                addCategory(form, treeInfo.treeIndex);
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
                                updateCategory(form, treeInfo);
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            {translate('Save')}
                        </Button>
                        <IconButton
                            className="min-w-auto"
                            onClick={() => {
                                removeCategory(treeInfo.path);
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
        removeCategory        	: Actions.removeCategory,			
    }, dispatch);
}

function mapStateToProps({eCommerceApp:{treeCategory}})
{
    return {
		categories		: treeCategory.categories,		
        categoryDialog	: treeCategory.categoryDialog,
		loading			: treeCategory.loading,		
		types			: treeCategory.types,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(withTranslate(TreeCategoryDialog)));
