import React, {Component  } from 'react';
import {withStyles, Button, Tab, Tabs, TextField, Icon, Typography, Checkbox, IconButton, Radio, FormControlLabel } from '@material-ui/core';
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
import CityStateDialog from './CityStateDialog';
import { withTranslate } from 'react-redux-multilingual';
      
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



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
    animat:{
        animation: 'green-glowing 2s infinite;' ,
    }
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
            this.props.getUsers();
        }
        else
        {
            this.props.getPost(this.props.match.params);	
            this.props.getUsers();	
        }
    };

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChange = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    ckEditorHandleChange = ( event, editor ) => {
        const data = editor.getData();
        this.setState({form: _.set({...this.state.form}, "description", data)});
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
   handleCityStateChipChange = (value, object) => { 
        var form = this.state.form; 
        var cityStates = form.cityStates || [];
        if(cityStates.indexOf(value) === -1){
            cityStates = [...cityStates, value];
            if(object === null)
                this.handleChipChange(cityStates.map(cat => ({value: cat})),'cityStates');
            else
                this.handleChipChange(cityStates.map(cat => ({value: cat})),'cityStates', {...object, value});
        }
        else
            this.handleChipChange(cityStates.map(cat => ({value: cat})),'cityStates');
    };
    handleChipChange = (value, name, object) => { 
		const form = _.set({...this.state.form}, name, value.map(item => item.value));

		if(object){ 
			form.categoriesObject = [...form.categoriesObject, object]; 				
             form.cityStatesObject = [...form.cityStatesObject, object];  
        }
	    form.categoriesObject = form.categoriesObject.filter(cat1 => {
			const catFound = form.categories.find(cat2 => cat2 === cat1.value);
			if(catFound) 	return true;		return false;
		});
          form.cityStatesObject = form.cityStatesObject.filter(cat1 => {
            const catFound = form.cityStates.find(cat2 => cat2 === cat1.value);
            if(catFound)    return true;        return false;
            }); 
        
		this.setState({form});
    };

    setFeaturedImage = (id) => {
        this.setState({form: _.set({...this.state.form}, 'featuredImageId', id)});
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
   cityStateOnClick = (event) => { 
        this.props.openNewCityStateDialog();
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
	
	usersOnChange = (value, name) => {
		this.setState({form: {...this.state.form, [name]: value}});
	}   

    render()
    {
        const {classes, savePost, users, translate} = this.props; console.log(users);
        const {tabValue, form    } = this.state;console.log(form);
        //let selectedUser        = null; 
       const allUsers = users.map(({id:value, displayName:label}) => ({value, label}));
	   let selectedUser = null;
	   if(form)
		 selectedUser = allUsers.find(({value:id}) => id === form.uid); 
		

		const getImageList = () => [...form.images, ...this.props.post.files];
		let postLink = "";
		if(form && form.id && form.name)
			postLink = window.location.origin + "/kandida/post-full/" + form.id + "/" + form.name.split(' ').join('-');
		
    const kandidatypes = [
            {
                id:"1", title:"رایگان",
            }, 
            {
                id:"2", title:"ویژه",
            } 
        ];


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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/kandida/posts">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        {translate('kandida')}
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
                                                {form.name ? form.name : translate('New_kandida')}
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
                                 <div className="flex">   
									<TextField
										className="mt-8 mb-16 mr-8"
										error={form.name === ''}
										required
										label={translate('KandidaTitle')}
										autoFocus
										id="name"
										name="name"
										value={form.name}
										onChange={this.handleChange}
										variant="outlined"
										fullWidth
									/>
                                          <TextField
                                        className="mt-8 mb-16 mr-8"
                                        error={form.code === ''}                                        
                                        label={translate('code')}                                        
                                        id="code"
                                        name="code"
                                        value={form.code}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                    />
                                </div>
									{
										postLink &&
										<div className="mt-8 mb-16 animat"  >
											<a href={postLink}>{postLink}</a>
										</div>
									}	
                    <div className="flex">                  
                        <div className={classes.typesRow}>
                            {
                                kandidatypes.map(({id, title}) => 
                                    <FormControlLabel1
                                        key={id}
                                        control={
                                            <WhiteRadio
                                                checked={form.showType === title}
                                                onChange={this.handleChange}
                                                value={title}
                                                name="showType"
                                                inputProps={{ 'aria-label': {title} }}                                      
                                            />                                  
                                        }
                                        label={title}
                                        labelPlacement="end"
                                    />                                              
                                )
                            }                           
                        </div>             
                        <FuseChipSelect                           
                            onChange={(row) => this.usersOnChange(row.value, 'uid')}
                            className="w-1/2 mb-16"
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
                    </div>  
                    <TextField
                        className="mt-8 mb-16 mr-8"
                        label={translate('price')}
                        id="price"
                        required                                        
                        name="price"
                        value={form.price}
                        onChange={this.handleChange}                    
                        type="number"
                        variant="outlined"                  
             /> 
                <CKEditor
                    editor={ ClassicEditor }
                    id="description"
                    name="description"
                    data={form.description}
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        //console.log( 'Editor is ready to use!', editor );
                    } }
                     onChange={this.ckEditorHandleChange} 
                    onBlur={ ( event, editor ) => {
                        //console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        //console.log( 'Focus.', editor );
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

                                      <FuseChipSelect
                                        className="mt-8 mb-24"
                                        value={
                                            form.cityStates.map(item => ({
                                                value: item,
                                                label: item
                                            }))											
										}
                                        onClick={this.cityStateOnClick}
                                        onChange={(value) => this.handleChipChange(value, 'cityStates')}
                                        placeholder={translate('Select_multiple_cityStates')}
                                        textFieldProps={{
                                            label          : translate('CityStates'),
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant        : 'outlined'
                                        }}
                                        isMulti
                                    />  


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
                            
          
             <TextField
                                        className="mt-8 mb-16"
                                        id="text"
                                        name="text"
                                        onChange={this.handleChange}
                                        label={translate('text')}
                                        type="text"
                                        value={form.text}
                                        multiline
                                        rows={2}
                                        variant="outlined"
                                        hidden
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
            <CityStateDialog onCityStateSelect={this.handleCityStateChipChange}/>
		 </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getPost : Actions.getPost,
        getUsers : Actions.getUsers,
        newPost : Actions.newPost,
        savePost: Actions.savePost,
		addImagePost: addImagePost,
		removeImagePost: Actions.removeImagePost,
		openNewCategoryDialog: Actions.openNewCategoryDialog,
        openNewCityStateDialog: Actions.openNewCityStateDialog,
    }, dispatch);
} 

function mapStateToProps({kandidaApp})
{
    return {
        post: kandidaApp.post ,
        users         : kandidaApp.post.users
    }
}

export default 
	withReducer('kandidaApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(Post)))));
