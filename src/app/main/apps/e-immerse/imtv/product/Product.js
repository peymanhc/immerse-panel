import React, {Component} from 'react';
import {withStyles, Button, Tab, Tabs, TextField, InputAdornment, Icon, Typography, Grid, Checkbox, FormControlLabel, IconButton, 
	Radio, ListSubheader } from '@material-ui/core';
import {FuseAnimate, FusePageCarded, FuseChipSelect, FuseUtils} from '@fuse';
 import Lightbox from 'react-image-lightbox';
 
import {orange, red, green} from '@material-ui/core/colors';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import {addImageProduct} from '../store/actions';
import reducer from '../store/reducers';
import CircularProgress from '@material-ui/core/CircularProgress';
import CategoryDialog from './CategoryDialog';
import CropDialog from './CropDialog';
import PropertyDialog from './PropertyDialog';
import PropertyList from './PropertyList';
import PropertySidebarContent from './PropertySidebarContent';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Editor's style - Please don't remove it
 import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import 'react-quill/dist/quill.bubble.css';


import { withTranslate } from 'react-redux-multilingual';
  import jMoment from "moment-jalaali";
jMoment.loadPersian({ dialect: "persian", usePersianDigits: true });

//import green from '@material-ui/core/colors/green';
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
		borderRadius:8,
		height:45,
		border: '1px solid #c4c4c4',
		marginRight:10,
		marginLeft:5,	
	},
	label:{
		paddingLeft:10,
	}, 
})(props => <FormControlLabel {...props} />);

const styles = theme => ({
  
    labelCustom :{
      transformOrigin: "top right",
      right: 25,
      left: "auto"
    },
    
   fuse: {
        direction: 'rtl',
    },
    arrow: {
        transform: 'scaleX(-1)'
    },
    field: {
        InputLabel : {paddingRight:   8,right:   8,},
        direction: 'ltr',
        paddingRight:   8
    },
    productImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    productImageDelete: {
        position: 'absolute',
        bottom     : 0,
        left   : 0,
        color   : red[400],
        opacity : 0
    },
    productImageCrop: {
        position: 'absolute',
        bottom     : 0,
        right   	: 0,
        color   : green[400],
        opacity : 0
    },
    productImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            boxShadow                    : theme.shadows[5],
            '& $productImageFeaturedStar': {
                opacity: .8
            },
			 '& $productImageDelete': {
                opacity: 1
            },			
			 '& $productImageCrop': {
                opacity: 1
            },			
        },
        '&.featured'            : {
           
            boxShadow                          : theme.shadows[5],
            '& $productImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            },
             '& $productImageDelete': {
                opacity: 1
            },          
             '& $productImageCrop': {
                opacity: 1
            },  
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
});

class Product extends Component {

    state = {
        tabValue: 0, 
        form    : null,
		canSubmit: false,
        isOpen: false, 
        appcode : 'immerse',
    };
    // Text Editor's modules config
    modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, true] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'code-block'],             
            [{ 'direction': 'rtl' }],                         // text direction
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean']
        ]
    }

    // Text Editor's formats conf
    formats = [
        'header', 'font', 'size','color',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'background',
        'link', 'image', 'video' ,'align' , 'font'
    ];

    componentDidMount()
    {
        this.updateProductState();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.updateProductState();
        }

        if (
            (this.props.product.data && !this.state.form) ||
            (this.props.product.data && this.state.form && this.props.product.data.id !== this.state.form.id)
        )
        {
            this.updateFormState();
        }	
		if(this.props.product.data !== null && prevProps.product.data !== null &&
			!_.isEqual(_.sortBy(this.props.product.data.properties), _.sortBy(prevProps.product.data.properties)))
			this.updateFormState2();

		try{
			if(this.props.product.data !== null && this.state.form !== null && !_.isEqual(_.sortBy(this.props.product.data.properties), _.sortBy(this.state.form.properties)))
				this.updateFormState2();
		}
		catch(er){
			
		}
    }

    updateFormState = () => {
        this.setState({form: this.props.product.data});
    };
    updateFormState2 = () => {
		const form = this.state.form;
		if(form && form.properties && this.props.product.data !== null){
			form.properties = this.props.product.data.properties || [];
			this.setState({form});			
		}

    };
    updateProductState = () => {
        const params = this.props.match.params;
        const {productId} = params;

        if ( productId === 'new' )
        {
            this.props.newProduct();
        }
        else
        {
            this.props.getProduct(this.props.match.params);	         
        }
		this.props.getTypes();	
		this.props.getClusterlist();	
        this.props.getMasterlist();    
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

    canBeSubmitted()
    {
        const {name} = this.state.form;
		delete this.state.form._id;
        return (
            name.length > 0 &&
            !_.isEqual(this.props.product.data, this.state.form)
        );
    }
	
	canBeSubmitted2 = () => {
		const {name} = this.state.form;
		if(this.canBeSubmitted() || (this.props.product.files.length > 0 && name.length > 0) || (name.length > 0 && this.props.product.propertyUpdate))
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
			this.props.addImageProduct(files);			
		}
		else if(type === "sound"){
			
		}
		else if(type === "video"){
			
		}		
	};

     handleEditorChange = (value) => {
          this.setState({form: _.set({...this.state.form}, "description", value)});        
    }

	 
	constructor(props) {
		super(props);
		this.handleChipChange = this.handleChipChange.bind(this);
	}
	 
	categoryOnClick = (event) => { 
		const {form} = this.state;
		this.props.openNewCategoryDialog({clusterId : form ? form.clusterId : -1 });
	};	
	removeImage = (event, id) => { 
		if(event !== null)
			event.stopPropagation();
		const {form} = this.state;
		this.props.removeImageProduct(id);
		const newForm = {
			...form, 
			images: form.images.filter(({id:imageId}) => imageId !== id)
		};
		if(form.featuredImageId === id)
			delete newForm.featuredImageId;	
		this.setState({form: newForm});
	}
	
	selectOnChange = (name, row) => {		
		this.setState({form: _.set({...this.state.form}, name, row.value)});
	};	
	
	correctUrl = url => url.startsWith('blob') ? url :   url;
	
    render()
    { 
        const {classes, saveProduct, translate, } = this.props;
        const {tabValue, form ,isOpen , appcode} = this.state;
		    const clusterlist = this.props.product.clusterlist;
            const masterlist = this.props.product.masterlist;
		
		const noneItem = {id:-1, name:"None"};
		    const newClusterList = [...clusterlist, noneItem];	
            const noneItemM = {id:-1, name:"None"};
            const newMasterList = [...masterlist, noneItemM];  
		
		const getImageList = () => [...form.images, ...this.props.product.files];
		let productLink = ""; 

		// let n="";  let n2=""; let n3="";  let n4=""; 
		// if ( form && form.id  &&  form.name   ) { n =  form.name.split(' ').join('-') ;		    }
		// if ( form && form.id  &&  form.name2  ) { n2=  form.name2.split(' ').join('-') ;		}
		// if ( form && form.id  &&  form.name3  ) { n3=  form.name3.split(' ').join('-') ;		}
		// if ( form && form.id  &&  form.name4  ) { n4=  form.name4.split(' ').join('-') ;		}

		// if ( form && form.id  && (form.name  || form.name2 || form.name3 || form.name4) ) {
		// 	productLink = window.location.origin + "/shop/product/" + form.id + "/"+ n+"-"+n2+"-"+n3+"-"+n4 ;
		// }
        let n=""; 

        if ( form && form.id  &&  form.name   ) { n =  form.name.split(' ').join('-') ;         }

        if ( form && form.id  && form.name  ) {
            productLink = window.location.origin + "/app/course/" + form.id + "/"+ n ;
        }

		if ( form && form.id  &&  (form.discount || form.taxRate || form.priceTaxExcl) ) { 
			  if ( form.priceTaxIncl==="0" ||  form.priceTaxIncl==="") form.priceTaxIncl=form.priceTaxExcl;

			  let d=0;              let t=0;
			  if (form.discount==="")  d=0; else  d=form.discount;
			  d= (( d *   (form.priceTaxExcl )/100) ); 
             
              let p =  parseInt(form.priceTaxExcl)-parseInt(d); 
               
              if (form.taxRate==="")  t=0; else  t=form.taxRate;
			 
			    t= ( (  t *  p )/100) ;
			 
			  form.priceTaxIncl=  parseInt(p) + parseInt(t)    ;
              if ( form.priceTaxIncl==="0" ||  form.priceTaxIncl==="") form.priceTaxIncl=form.priceTaxExcl;
		}

        if ( form && form.id ) {  if (form.discount==="")   form.discount=0; }


        
		
		const suppliers = [
			{id:'1', name:'Supplier1'},
			{id:'2', name:'Supplier2'},
			{id:'3', name:'Supplier3'},
			{id:'4', name:'Supplier4'},
		];
		
		const stocks = [
			{id:'1', name: 'first-Stock1', supplierId: '1'},
			{id:'2', name: 'Stock2', supplierId: '1'},
			{id:'3', name: 'Stock3', supplierId: '2'},
			{id:'4', name: 'Stock4', supplierId: '3'},
			{id:'5', name: 'Stock5', supplierId: '3'},
			{id:'6', name: 'Stock6', supplierId: '4'},
			{id:'7', name: 'Stock7', supplierId: '4'},
			{id:'8', name: 'Stock8', supplierId: '4'},
		];
		
		
		const 	allSupplier 		= suppliers.map(({name: label, id: value}) => ({value, label}));
		let 	allStocks 			= [];
		let 	selectedSupplier	= [];
		let 	selectedStock		= [];
		let		selectedAds 		= undefined;   let     selectedMas         = undefined;
		
		if(form){
			selectedSupplier	= allSupplier.find(({value:id}) => id === form.supplierId);
			allStocks 			= stocks.filter(({supplierId}) => supplierId === form.supplierId).map(({name: label, id: value}) => ({value, label}));
			selectedStock 		= allStocks.find(({value:id}) => id === form.stockId); 
			selectedAds = newClusterList.find(({id}) => id === form.clusterId);
            selectedMas = newMasterList.find(({id}) => id === form.masterId);
		}
	    
        const courselevel = [  { id:"1", title:"ابتدایی",  }, { id:"2", title:"متوسط", }, { id:"3", title:"پیشرفته", } ];
        return ( 
		 
           <div className={classes.fuse}>
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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/e-immerse/im-tv/products">
                                        <Icon className="mr-4 text-20"> arrow_forward </Icon>
                                        {translate('Products')}
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        {form.images.length > 0 && form.featuredImageId && (_.find(getImageList(), {id: form.featuredImageId})) ? (
                                            <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" 
                                            src={this.correctUrl( _.find(getImageList(), {id: form.featuredImageId}).url )} alt={form.name}/>
                                        ) : (
                                            <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={form.name}/>
                                        )}
                                    </FuseAnimate>
                                    <div className="flex flex-col min-w-0 mr-8">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {form.name  ? form.name  : translate('New_Product')}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">{translate('Product_Detail')}</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
							<div>
								<CircularProgress 
									className={this.props.product.loading ? '': classes.hidden} 
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
										const {productId} = params;										
										saveProduct({form, images : this.props.product.files}, productId)
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
                        <Tab className="h-64 normal-case" label={translate('Pricing')}/> 
                        <Tab className="h-64 normal-case" label={translate('Property')}/>
                    </Tabs>
                }
                content={
                    form && (
                        <div className="p-8 sm:p-8 max-w-2xl">
                            {tabValue === 0 &&
                            (
                                <div>
                                    <div className="flex">                                    
                                        <TextField
                                            className="textfield mt-8 mb-16 mr-8"											
                                            label={translate('Name')}	
                                            required
                                            autoFocus
                                             id="name"
                                            name="name"
                                            value={form.name}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth 
                                            maxLength="80"
										    InputLabelProps={{ className: classes.labelCustom,}}                                        
                                        />                                                                           
                                        <TextField
                                            className="mt-8 mb-16 mr-8"
                                            label={translate('Code')}  
                                            autoFocus
                                            id="Code"
                                            name="Code"
                                            maxLength="20"
                                            value={form.Code}
                                            
                                            onChange={this.handleChange}
                                            variant="outlined"    
                                            InputLabelProps={{ className: classes.labelCustom,}}                                
                                        />
                                    </div>  
                                    {
                                        productLink &&
                                        <div className="mt-8 mb-16" style={{direction:'ltr'}}  >
                                            <a href={productLink}>{productLink}</a>
                                        </div>
                                    } 
     
                                    <div className={classes.typesRow}>
										{  
											this.props.product.types.map(({id, title}) => 
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
                    

            
                                <div className="flex"> 
              {    appcode==='global' && ( 
										<FuseChipSelect
											className="w-1/3"
											onChange={(row) => {this.selectOnChange('clusterId', row)}}
											value={selectedAds ? {value:selectedAds.id, label:selectedAds.name} :  {value:'-1', label:'None'}}
											placeholder= {translate('search')}

											textFieldProps={{
												label          : 'Clusterlist',
												InputLabelProps: {
													shrink: true,
                                                    className: classes.labelCustom,
												},
												variant        : 'outlined',
                                                
											}}										
											options={newClusterList.map(item => ({value:item.id, label:item.name}))}
											variant='fixed'                                            
										/>    
               )}

                               <FuseChipSelect
                                            className="w-1/3"
                                            onChange={(row) => {this.selectOnChange('masterId', row)}}
                                            value={selectedMas ? {value:selectedMas.id, label:selectedMas.masterName} :  {value:'-1', label:'None'}}
                                            placeholder= {translate('search')}

                                            textFieldProps={{
                                                label          : 'Masterlist',
                                                InputLabelProps: {
                                                    shrink: true,
                                                    className: classes.labelCustom,
                                                },
                                                variant        : 'outlined',
                                                
                                            }}                                      
                                            options={newMasterList.map(item => ({value:item.id, label:item.masterName}))}
                                            variant='fixed'                                            
                                        />    
                                        

                                {    appcode==='immerse' && ( 
                                        <div className={classes.typesRow}>
                                        {
                                            courselevel.map(({id, title}) => 
                                                <FormControlLabel1
                                                    key={id}
                                                    control={
                                                        <WhiteRadio
                                                            checked={form.courselevel === title}
                                                            onChange={this.handleChange}
                                                            value={title}
                                                            name="courselevel"
                                                            inputProps={{ 'aria-label': {title} }}                                      
                                                        />                                  
                                                    }
                                                    label={title}
                                                    labelPlacement="end"
                                                />                                              
                                            )
                                        }                           
                                    </div> 
                                )}

                               </div>


                               <div className="flex">  

                                    <FuseChipSelect
                                        className="mt-8 mb-24 w-1/3"
                                        value={
                                            form.categories.map(item => ({
                                                value: item,
                                                label: item
                                            }))
                                        }
										onClick={this.categoryOnClick}
                                        onChange={(value) => this.handleChipChange(value, 'categories')}
                                        placeholder={translate('Select_multiple_categories')}
                                        PlaceholderProps={{right:12}}
                                        textFieldProps={{
                                            label          : translate('Categories'),
                                            InputLabelProps: {
                                                shrink: true,
                                                className: classes.labelCustom,
                                            },
                                            variant        : 'outlined'
                                        }}
                                        isMulti
                                    />	
                                    <TextField
                                        className="mt-8 mb-16  mr-8  w-2/3"
                                        id="info"
                                        name="info"
                                        onChange={this.handleChange}
                                        label={translate('Info')}
                                        type="text"
                                        value={form.info}
                                        multiline
                                        rows={1}
                                        variant="outlined"                                        
                                        fullWidth
                                        InputLabelProps={{ className: classes.labelCustom,}}
                                    />
                             </div>

                        <ReactQuill 
                            className="min-h-72"
                            theme="snow"
                            modules={this.modules}
                            value={form.description}
                            onChange={this.handleEditorChange}                            
                            ref={this.editorRef}>
                        </ReactQuill>
 
                                
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
                                                shrink: true,
                                                className: classes.labelCustom,
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
											<input accept="image/*" className={classes.input} 
												id="imageUploadBtn" multiple type="file"
												onChange={this.addFiles}
											/>
											<label htmlFor="imageUploadBtn">
													<Button variant="outlined" component="span">
														{translate('Choose_Image')}
													</Button>
											</label>
										</div>	
										<div className={classes.fileBtn}>
											<input accept="" className={classes.input} 
												id="voiceUploadBtn" multiple type="file"
												onChange={(event) => this.addFiles(event, 'sound')}
											/>
											<label htmlFor="voiceUploadBtn">
													<Button variant="outlined" component="span">
														{translate('Choose_Voice')}
													</Button>
											</label>
										</div>	
										<div className={classes.fileBtn}>
											<input accept="" className={classes.input} 
												id="videoUploadBtn" multiple type="file"
												onChange={(event) => this.addFiles(event, 'video')}
											/>
											<label htmlFor="videoUploadBtn">
													<Button variant="outlined" component="span">
														{translate('Choose_Video')}
													</Button>
											</label>
										</div>										
									</div>
									<ListSubheader component="div" className="flex items-center pl-0 mb-24">
										<Typography className="mr-16" variant="h6" color="textSecondary">{translate('Images')}</Typography>
									</ListSubheader>
                                    <div className="flex justify-center sm:justify-start flex-wrap">									
                                        {getImageList().map((media, index) => (
                                            <div
                                                onClick={() => this.setFeaturedImage(media.id)}
                                                className={
                                                    classNames(
                                                        classes.productImageItem,
                                                        "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer",
                                                        (media.id === form.featuredImageId) && 'featured')
                                                }
                                                key={index}
                                            >
                                                <Icon className={classes.productImageFeaturedStar}>star</Icon>
												 <IconButton className={classes.productImageDelete} onClick={(event) => this.removeImage(event, media.id)}>
													<Icon>delete</Icon>
												</IconButton>
												 <IconButton className={classes.productImageCrop} onClick={event => {
													 event.stopPropagation();
													 this.props.openCropDialog({id:media.id, url:media.url});
												 }}>
													<Icon>crop</Icon> 
												</IconButton>
                                                <img className="max-w-none w-auto h-full" onClick={() => this.setState({ isOpen: true })}   src={  media.url } alt={translate('Product')}/>
            {isOpen  && (
          <Lightbox
            mainSrc={media.url} 
            onCloseRequest={() => this.setState({ isOpen : false })}             
          />
        )}   
                                            </div>
                                        ))}
                                    </div>
                                </div> 
                            )}
                            {tabValue === 2 && (
                                <div>
                                  <div className="flex">
                                    <TextField
                                        className="mt-8 mb-16 mr-8"
                                        label={translate('Tax_Excluded_Price')}
                                        id="priceTaxExcl"
                                        required                                        
                                        name="priceTaxExcl"
                                        value={form.priceTaxExcl}
                                        onChange={this.handleChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">ریال</InputAdornment>
                                         }}
                                        type="number"
                                        variant="outlined"
                                        autoFocus                                        
                                        InputLabelProps={{ className: classes.labelCustom,}}

                                    /> 
                                     <TextField
                                        className="mt-8 mb-16 mr-8"
                                        label={translate('Discount')}
                                        id="discount"
                                        name="discount"
                                        value={form.discount}
                                        onChange={this.handleChange}
                                        type="number"
                                        InputProps={{
                                            max: 99,
                                            startAdornment: <InputAdornment position="start">ریال</InputAdornment>
                                        }}                                  
                                        variant="outlined"                                      
                                        InputLabelProps={{ className: classes.labelCustom,}}
                                    />  
                                        <TextField
                                        className="mt-8 mb-16 mr-8"
                                        label={translate('Tax_Rate')}
                                        id="taxRate"
                                        name="taxRate"
                                        value={form.taxRate}
                                        defaultValue="9"
                                        onChange={this.handleChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">ریال</InputAdornment>
                                        }}
                                        type="number"
                                        variant="outlined"                                        
                                        InputLabelProps={{ className: classes.labelCustom,}}
                                    />   
                                 </div>
                                


 <div className="pb-8">
        
                  <div className="pb-8 flex items-center">
                  <Icon className="mr-16" color="action">add_to_queue</Icon>
               <Typography className="h2" color="textSecondary"> قیمت نهایی </Typography>
 </div> </div>

 <div className="flex">
                                                                
                                  <TextField
                                        className="mt-8 mb-16  mr-8"
                                        label={translate('Tax_Included_Price')}
                                        required
                                        id="priceTaxIncl"
                                        name="priceTaxIncl"
                                        value={form.priceTaxIncl}
                                        onChange={this.handleChange}
                                        InputLabelProps={{ className: classes.labelCustom,}}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">ریال</InputAdornment>
                                        }}
                                        type="number"
                                        variant="outlined"                                       
                                        helperText={translate('main_price_show_des')}
                                    />                              
                                  </div>

 
   <div className="pb-8">        
                    <div className="pb-8 flex items-center">
                    <Icon className="mr-16" color="action"> history </Icon>
                    <Typography className="h2" color="textSecondary"> آخرین به روزرسانی قیمت دسته ای </Typography>
                    </div>
                </div>
                              

                                <TextField
                                        className="mt-16 mb-16 mr-16"                                        
                                        id="lastUpdatePriceDate"
                                        name="lastUpdatePriceDate"                                          
                                        value={jMoment(form.lastUpdatePriceDate).format("jYYYY/jMM/jDD hh:mm A") }
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        type="text"                                         
                                        InputLabelProps={{ className: classes.labelCustom,}}
                                />  
                                
                                
  <div className="pb-8">        
                    <div className="pb-8 flex items-center">
                    <Icon className="mr-16" color="action"> history </Icon>
                    <Typography className="h2" color="textSecondary"> بازدید </Typography>
                    </div>
                </div>
                                 <div className="flex"> 
                                    <TextField
                                        className="mt-8 mb-16 mr-8"
                                        label={translate('Like')}                                       
                                        id="like"
                                        name="like"
                                        value={form.like}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        type="number"
                                        
                                        InputLabelProps={{ className: classes.labelCustom,}}
                                    />
                                    <TextField
                                        className="mt-8 mb-16 mr-8"
                                        label={translate('Wish')}                                       
                                        id="wish"
                                        name="wish"
                                        value={form.wish}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        type="number"
                                        
                                        InputLabelProps={{ className: classes.labelCustom,}}
                                    />
                                 

                                    <TextField
                                        className="mt-8 mb-16 mr-8"
                                        label={translate('Quantity')}
                                        id="quantity"
                                        name="quantity"
                                        value={form.quantity}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        type="number"
                                        
                                        InputLabelProps={{ className: classes.labelCustom,}}
                                    />
                                 </div>
                                  </div>
                            )}
                            
							{ tabValue === 3 && (
								<Grid container spacing={8}>
									<Grid item xs={3}>
										<PropertySidebarContent />
									</Grid>								
									<Grid item xs={9}>
										<PropertyList />
									</Grid>
								</Grid>
							)}
                        </div>
                    )
                }
                innerScroll
            />
			<CategoryDialog onCategorySelect={this.handleCategoryChipChange}/>
			<PropertyDialog />
			<CropDialog removeImage={this.removeImage}/>
		  
           </div> 
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getProduct : Actions.getProduct,
        newProduct : Actions.newProduct,
        saveProduct: Actions.saveProduct,
        getTypes: Actions.getTypes,
        getClusterlist: Actions.getClusterlist,       getMasterlist: Actions.getMasterlist,   
		addImageProduct: addImageProduct,
		removeImageProduct: Actions.removeImageProduct,
		openNewCategoryDialog: Actions.openNewCategoryDialog,
		openNewPropertyDialog: Actions.openNewPropertyDialog,
		openCropDialog: Actions.openCropDialog
    }, dispatch);
}

function mapStateToProps({eCommerceApp})
{
    return {
        product: eCommerceApp.product
    }
}

export default 
	withReducer('eCommerceApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(Product)))));
