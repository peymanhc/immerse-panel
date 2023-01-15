import React, {Component  } from 'react';
import {withStyles, Button, Tab, Tabs, TextField, Icon, Typography, Checkbox, IconButton, FormControlLabel } from '@material-ui/core';
import {FuseAnimate, FusePageCarded, FuseChipSelect, FuseUtils} from '@fuse';
import {orange, red} from '@material-ui/core/colors';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions/post';
import {addImagePost} from '../store/actions/post';
import reducer from '../store/reducers';
import CircularProgress from '@material-ui/core/CircularProgress';
import CategoryDialog from './CategoryDialog';
import { withTranslate } from 'react-redux-multilingual';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const styles = theme => ({
    postImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    postImageDelete: {
        position: 'absolute',
        bottom     : 0,
        left   : 0,
        color   : red[400],
        opacity : 0
    },
    postImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            boxShadow                    : theme.shadows[5],
            '& $postImageFeaturedStar': {
                opacity: .8
            },
			 '& $postImageDelete': {
                opacity: 1
            },			
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $postImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $postImageFeaturedStar': {
                opacity: 1
            }
        }
    },
	input: {
		display: 'none',
	},
	hidden: {
		display: 'none',
	},
	fileRow:{
		marginBottom:20,
	},
	fileBtn:{
		display:'inline-block',
		marginLeft:10,
		'&:first-child':{
			marginLeft:0,
		}
	},	
	typesRow:{
		marginBottom:10,
	},
	uploadButton:{
		fontSize: '3.6rem',
		width: '1em',
		height: '1em',
		overflow: 'hidden',
		flexShrink: '0',
		color: 'rgba(0, 0, 0, 0.54)',		
	},
	shadow1:{
		boxShadow: '0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12)',
	},
});

class Post extends Component {

    state = {
        tabValue: 0,
        form    : null,
		canSubmit: false, 
    };

 

    componentDidMount()
    {
        this.updatePostState();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.updatePostState();
        }

        if (
            (this.props.post.data && !this.state.form) ||
            (this.props.post.data && this.state.form && this.props.post.data.id !== this.state.form.id)
        )
        {
            this.updateFormState();
        }	
		if(this.props.post.data !== null && prevProps.post.data !== null &&
			!_.isEqual(_.sortBy(this.props.post.data.properties), _.sortBy(prevProps.post.data.properties)))
			this.updateFormState2();

		try{
			if(this.props.post.data !== null && this.state.form !== null && !_.isEqual(_.sortBy(this.props.post.data.properties), _.sortBy(this.state.form.properties)))
				this.updateFormState2();
		}
		catch(er){
			
		}
    }

    updateFormState = () => {
        this.setState({form: this.props.post.data});
    };
    updateFormState2 = () => {
		const form = this.state.form;
		if(form && form.properties && this.props.post.data !== null){
			form.properties = this.props.post.data.properties || [];
			this.setState({form});			
		}

    };
    updatePostState = () => {
        const params = this.props.match.params;
        const {postId} = params;

        if ( postId === 'new' )
        {
            this.props.newPost();
        }
        else
        {
            this.props.getPost(this.props.match.params);	
        }
    };

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChange = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };
	handleCategoryChipChange = (value, object) => { 
		var form = this.state.form;
		var categories = form.categories;
		if(categories.indexOf(value) === -1){
			categories = [...categories, value];
			if(object === null)
				this.handleChipChange(categories.map(cat => ({value: cat})),'categories');
			else
				this.handleChipChange(categories.map(cat => ({value: cat})),'categories', {...object, value});
		}
		else
			this.handleChipChange(categories.map(cat => ({value: cat})),'categories');
	};
    handleChipChange = (value, name, object) => {
		const form = _.set({...this.state.form}, name, value.map(item => item.value));
		if(object){ 
			form.categoriesObject = [...form.categoriesObject, object]; 				
		}
		form.categoriesObject = form.categoriesObject.filter(cat1 => {
			const catFound = form.categories.find(cat2 => cat2 === cat1.value);
			if(catFound)
				return true;
			return false;
		});
		this.setState({form});
    };

    setFeaturedImage = (id) => {
        this.setState({form: _.set({...this.state.form}, 'featuredImageId', id)});
    };
 ckEditorHandleChange = ( event, editor ) => {
        const data = editor.getData();
        this.setState({form: _.set({...this.state.form}, "description", data)});
    };
    canBeSubmitted()
    {
        const {name} = this.state.form;
		delete this.state.form._id;
        return (
            name.length > 0 &&
            !_.isEqual(this.props.post.data, this.state.form)
        );
    }
	
	canBeSubmitted2 = () => {
		const {name} = this.state.form;
		if(this.canBeSubmitted() || (this.props.post.files.length > 0 && name.length > 0) || (name.length > 0 && this.props.post.propertyUpdate))
			return true;		
		return false;
	}
	
	addFiles = (event, type="image") => {
		if(type === "image"){
			const files = [...event.target.files].map(file => ({
				id: FuseUtils.generateGUID(),
				url: URL.createObjectURL(file),
				type: 'image',
				file
			}));
			this.props.addImagePost(files);			
		}
		else if(type === "sound"){
			
		}
		else if(type === "video"){
			
		}		
	};
	
	constructor(props) {
		super(props);
		this.handleChipChange = this.handleChipChange.bind(this);
	}
	
	categoryOnClick = (event) => { 
		this.props.openNewCategoryDialog();
	};	
	removeImage = (event, id) => {
		event.stopPropagation();
		const {form} = this.state;
		this.props.removeImagePost(id);
		const newForm = {
			...form, 
			images: form.images.filter(({id:imageId}) => imageId !== id)
		};
		if(form.featuredImageId === id)
			delete newForm.featuredImageId;	
		this.setState({form: newForm});
	}
	


    render()
    {
        const {classes, savePost, translate} = this.props;
        const {tabValue, form    } = this.state;
          


		const getImageList = () => [...form.images, ...this.props.post.files];
		let postLink = "";
		if(form && form.id && form.name)
			postLink = window.location.origin + "/bookstore/post-full/" + form.id + "/" + form.name.split(' ').join('-');
		
 


        return (
		 <React.Fragment>
            <FusePageCarded
                classes={{
                    toolbar: "p-0",
                    header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    form && (
                        <div className="flex flex-1 w-full items-center justify-between">

                            <div className="flex flex-col items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/bookstore/posts">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        {translate('Posts')}
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        {form.images.length > 0 && form.featuredImageId ? (
                                            <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src={_.find(getImageList(), {id: form.featuredImageId}).url} alt={form.name}/>
                                        ) : (
                                            <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={form.name}/>
                                        )}
                                    </FuseAnimate>
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {form.name ? form.name : translate('New_Post')}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">{translate('Post_Detail')}</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
							<div>
								<CircularProgress 
									className={this.props.post.loading ? '': classes.hidden} 
									color="secondary"
								/>
							</div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    disabled={ !this.canBeSubmitted2()  }
                                    onClick={() =>{
										const params = this.props.match.params;
										const {postId} = params;										
										savePost({form, images : this.props.post.files}, postId)
									}}
                                >
								{translate('Save')}
                                </Button>
                            </FuseAnimate>
                        </div>
                    )
                }
                contentToolbar={
                    <Tabs
                        value={tabValue}
                        onChange={this.handleChangeTab}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{root: "w-full h-64"}}
                    >
                        <Tab className="h-64 normal-case" label={translate('Basic_Info')}/>
                        <Tab className="h-64 normal-case" label={translate('Product_Media')}/>
                    </Tabs>
                }
                content={
                    form && (
                        <div className="p-16 sm:p-24 max-w-2xl">
                            {tabValue === 0 &&
                            (
                                <div>
									<TextField
										className="mt-8 mb-16"
										error={form.name === ''}
										required
										label={translate('Name')}
										autoFocus
										id="name"
										name="name"
										value={form.name}
										onChange={this.handleChange}
										variant="outlined"
										fullWidth
									/>
									{
										postLink &&
										<div className="mt-8 mb-16">
											<a href={postLink}>{postLink}</a>
										</div>
									}																		
                                    <FuseChipSelect
                                        className="mt-8 mb-24"
                                        value={
                                            form.categories.map(item => ({
                                                value: item,
                                                label: item
                                            }))
                                        }
										onClick={this.categoryOnClick}
                                        onChange={(value) => this.handleChipChange(value, 'categories')}
                                        placeholder={translate('Select_multiple_categories')}
                                        textFieldProps={{
                                            label          : translate('Categories'),
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant        : 'outlined'
                                        }}
                                        isMulti
                                    />	
                            
          
                
            
                   <CKEditor
                    editor={ ClassicEditor }
                    id="description"
                    name="description"
                    data={form.description}
                    rows={3}
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        // console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={this.ckEditorHandleChange} 
                    onBlur={ ( event, editor ) => {
                        //console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                       // console.log( 'Focus.', editor );
                    } }
                />

                                     <FuseChipSelect
                                        className="mt-8 mb-16"
                                        value={
                                            form.tags.map(item => ({
                                                value: item,
                                                label: item
                                            }))
                                        }
                                        onChange={(value) => this.handleChipChange(value, 'tags')}
                                        placeholder={translate('Select_multiple_tags')}
                                        textFieldProps={{
                                            label          : translate('Tags'),
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant        : 'outlined'
                                        }}
                                        isMulti
                                    />  

                                
									<FormControlLabel
										value="publish"
										control={<Checkbox color="primary" onChange={this.handleChange} checked={form.publish} name="publish" />}
										label={translate('Publish')}
										labelPlacement="start"
										
									/>										
                                </div>
                            )}
                            {tabValue === 1 && (
                                <div>
									<div className={classes.fileRow}>
										<div className={classes.fileBtn}>

	
										</div>										
									</div>

                                    <div className="flex justify-center sm:justify-start flex-wrap">	
										<div>
											<input accept="image/*" className={classes.input} 
												id="imageUploadBtn" multiple type="file"
												onChange={this.addFiles}
											/>									
											<label
												htmlFor="imageUploadBtn"
												className={
													classNames(
														classes.postImageItem,
														"flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer",
														classes.shadow1
													)
												}
											>
												<Icon className={classNames("mr-4", classes.uploadButton)}>cloud_upload</Icon>
											</label>
										</div>		
                                        {getImageList().map((media, index) => (
                                            <div
                                                onClick={() => this.setFeaturedImage(media.id)}
                                                className={
                                                    classNames(
                                                        classes.postImageItem,
                                                        "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer",
                                                        (media.id === form.featuredImageId) && 'featured')
                                                }
                                                key={index}
                                            >
                                                <Icon className={classes.postImageFeaturedStar}>star</Icon>
												 <IconButton className={classes.postImageDelete} onClick={(event) => this.removeImage(event, media.id)}>
													<Icon>delete</Icon>
												</IconButton>
                                                <img className="max-w-none w-auto h-full" src={media.url} alt={translate('Post')}/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                }
                innerScroll
            />
			<CategoryDialog onCategorySelect={this.handleCategoryChipChange}/>
		 </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getPost : Actions.getPost,
        newPost : Actions.newPost,
        savePost: Actions.savePost,
		addImagePost: addImagePost,
		removeImagePost: Actions.removeImagePost,
		openNewCategoryDialog: Actions.openNewCategoryDialog,
    }, dispatch);
}

function mapStateToProps({bookstoreApp})
{
    return {
        post: bookstoreApp.post
    }
}

export default 
	withReducer('bookstoreApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(Post)))));
