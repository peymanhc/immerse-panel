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
import '../../RTL.css'; 

const newCategoryState = {
    'id'       		: '',
    'title'    		: '',
    'description'   : '',
    'starred'  		: false,
    'important'		: false,
    'disable'  		: false,
	'imageSrc' 		: '',
	'iconSrc' 		: '',
	'images' 		: {},
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
		background: null,
		icon: null
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
        const {categoryDialog, addCategory, updateCategory, removeCategory, classes} = this.props;
        const {form} = this.state;
		let background = form.imageSrc;
		let icon = form.iconSrc;
		if(form.images){
			if(form.images.background)
				background = form.images.background.url || background;
			if(form.images.icon)
				icon = form.images.icon.url || icon;
		} 
        return (
            <Dialog className="fuse" {...categoryDialog.props} onClose={this.closeCategoryDialog} fullWidth maxWidth="sm">

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {categoryDialog.type === 'new' ? 'New Category Label' : 'Edit Category Label'}
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
                                label="Title"
                                autoFocus
                                name="title"
                                value={form.title}
                                onChange={this.handleChange}
                                required
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl className="mt-8 mb-16" required fullWidth>
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
							{
								(background && 
									<div
										className={
											classNames(
												classes.productImageItem,
												"flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
										}
									>									
										<img className="max-w-none w-auto h-full" src={background} alt="background"
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
										<img className="max-w-none w-auto h-full" src={icon} alt="icon" 
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
											Choose Background
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
											Choose Icon
										</Button>
								</label>
							</div>									
						</div>					
						<FormControl className="mt-8 mb-16" fullWidth>
							<FormControlLabel
								control={
									<Checkbox checked={form.disable} name="disable" onChange={this.handleChange} value="status" />
								}
								label="Disable"
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
                            Add
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
                            Save
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
        closeEditCategoryDialog: Actions.closeEditCategoryLabelsDialog,
        closeNewCategoryDialog : Actions.closeNewCategoryLabelsDialog,
        addCategory            : Actions.addCategoryLabels,
        updateCategory         : Actions.updateCategoryLabel,
        removeCategory         : Actions.removeCategoryLabels
    }, dispatch);
}

function mapStateToProps({adsCategoryApp})
{
    return { 
        categoryDialog	: adsCategoryApp.categorylabels.categoryDialog,
		loading			: adsCategoryApp.categorylabels.loading,
		//types			: adsCategoryApp.categorylabels.types,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(CategoryDialog));
