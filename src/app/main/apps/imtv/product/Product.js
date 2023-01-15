import React, {Component} from 'react';
import {withStyles, Button, Tab, Tabs, TextField, InputAdornment, Icon, Typography, Grid, Checkbox, FormControlLabel, IconButton, 
	Radio, ListSubheader } from '@material-ui/core';
import {FuseAnimate, FusePageCarded, FuseChipSelect, FuseUtils} from '@fuse';
import {orange, red} from '@material-ui/core/colors';
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
import PropertyDialog from './PropertyDialog';
import PropertyList from './PropertyList';
import PropertySidebarContent from './PropertySidebarContent';
import { withTranslate } from 'react-redux-multilingual';

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
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $productImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
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
});

class Product extends Component {

    state = {
        tabValue: 0,
        form    : null,
		canSubmit: false,
    };

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
            this.props.getTypes();	
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
		this.props.removeImageProduct(id);
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
        const {classes, saveProduct, translate} = this.props;
        const {tabValue, form} = this.state;
		const getImageList = () => [...form.images, ...this.props.product.files];
		let productLink = "";
		if(form && form.id && form.name)
			productLink = window.location.origin + "/shop/product/" + form.id + "/" + form.name.split(' ').join('-');
		
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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/im-tv/products">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        {translate('Products')}
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
                                                {form.name ? form.name : translate('New_Product')}
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
						<Tab className="h-64 normal-case" label={translate('Inventory')}/>
                        <Tab className="h-64 normal-case" label={translate('Shipping')}/>
                        <Tab className="h-64 normal-case" label={translate('Property')}/>
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
										productLink &&
										<div className="mt-8 mb-16">
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
                                        placeholder="{translate('Select_multiple_categories')}"
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
                                        id="description"
                                        name="description"
                                        onChange={this.handleChange}
                                        label={translate('Description')}
                                        type="text"
                                        value={form.description}
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="info"
                                        name="info"
                                        onChange={this.handleChange}
                                        label={translate('Info')}
                                        type="text"
                                        value={form.info}
                                        multiline
                                        rows={2}
                                        variant="outlined"
                                        fullWidth
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
                                        placeholder="{translate('Select_multiple_tags')}"
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
									<TextField
										className="mt-8 mb-16"
										label={translate('Like')}										
										id="like"
										name="like"
										value={form.like}
										onChange={this.handleChange}
										variant="outlined"
										type="number"
										fullWidth
									/>
									<TextField
										className="mt-8 mb-16"
										label='Wish'										
										id="wish"
										name="wish"
										value={form.wish}
										onChange={this.handleChange}
										variant="outlined"
										type="number"
										fullWidth
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
                                        {getImageList().map((media) => (
                                            <div
                                                onClick={() => this.setFeaturedImage(media.id)}
                                                className={
                                                    classNames(
                                                        classes.productImageItem,
                                                        "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer",
                                                        (media.id === form.featuredImageId) && 'featured')
                                                }
                                                key={media.id}
                                            >
                                                <Icon className={classes.productImageFeaturedStar}>star</Icon>
												 <IconButton className={classes.productImageDelete} onClick={(event) => this.removeImage(event, media.id)}>
													<Icon>delete</Icon>
												</IconButton>
                                                <img className="max-w-none w-auto h-full" src={media.url} alt={translate('Product')}/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {tabValue === 2 && (
                                <div>

                                    <TextField
                                        className="mt-8 mb-16"
                                        label={translate('Tax_Excluded_Price')}
                                        id="priceTaxExcl"
                                        name="priceTaxExcl"
                                        value={form.priceTaxExcl}
                                        onChange={this.handleChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }}
                                        type="number"
                                        variant="outlined"
                                        autoFocus
                                        fullWidth
                                    />

                                    <TextField
                                        className="mt-8 mb-16"
                                        label={translate('Tax_Included_Price')}
                                        id="priceTaxIncl"
                                        name="priceTaxIncl"
                                        value={form.priceTaxIncl}
                                        onChange={this.handleChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }}
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                    />


                                    <TextField
                                        className="mt-8 mb-16"
                                        label={translate('Tax_Rate')}
                                        id="taxRate"
                                        name="taxRate"
                                        value={form.taxRate}
                                        onChange={this.handleChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }}
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className="mt-8 mb-16"
                                        label={translate('Compared_Price')}
                                        id="comparedPrice"
                                        name="comparedPrice"
                                        value={form.comparedPrice}
                                        onChange={this.handleChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }}
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        helperText={translate('compare_price_des')}
                                    />
									
                                    <TextField
                                        className="mt-8 mb-16"
                                        label={translate('Discount')}
                                        id="discount"
                                        name="discount"
                                        value={form.discount}
                                        onChange={this.handleChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">%</InputAdornment>
                                        }}
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                    />									

                                </div>
                            )}
                            {tabValue === 3 && (
                                <div>

                                    <TextField
                                        className="mt-8 mb-16"
                                        required
                                        label={translate('SKU')}
                                        autoFocus
                                        id="sku"
                                        name="sku"
                                        value={form.sku}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className="mt-8 mb-16"
                                        label={translate('Quantity')}
                                        id="quantity"
                                        name="quantity"
                                        value={form.quantity}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        type="number"
                                        fullWidth
                                    />
									
									<TextField
										className="mt-8 mb-16"
										label={translate('Expiraton_Date')}										
										id="expirationDate"
										name="expirationDate"
										value={form.expirationDate}
										onChange={this.handleChange}
										variant="outlined"
										fullWidth
										type="date"	
										InputLabelProps={{shrink: true}}
									/>									
									
                                </div>
                            )}
                            {tabValue === 4 && (
                                <div>
                                    <div className="flex">
                                        <TextField
                                            className="mt-8 mb-16 mr-8"
                                            label={translate('Width')}	
                                            autoFocus
                                            id="width"
                                            name="width"
                                            value={form.width}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <TextField
                                            className="mt-8 mb-16 mr-8"
                                            label={translate('Height')}	
                                            id="height"
                                            name="height"
                                            value={form.height}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <TextField
                                            className="mt-8 mb-16 mr-8"
                                            label={translate('Depth')}	
                                            id="depth"
                                            name="depth"
                                            value={form.depth}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
										
                                    </div>

                                    <TextField
                                        className="mt-8 mb-16"
                                        label={translate('Weight')}	
                                        id="weight"
                                        name="weight"
                                        value={form.weight}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className="mt-8 mb-16"
                                        label={translate('Extra_Shipping_Fee')}	
                                        id="extraShippingFee"
                                        name="extraShippingFee"
                                        value={form.extraShippingFee}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }}
                                        fullWidth
                                    />
                                    <TextField
										className="mt-8 mb-16"
										label={translate('Comission_Persentage')}	
										id="commisionPercentage"
										name="commisionPercentage"
										value={form.commisionPercentage}
										onChange={this.handleChange}
										variant="outlined"
										InputProps={{
											startAdornment: <InputAdornment position="start">%</InputAdornment>
										}}
										fullWidth
                                    />									

                                </div>
                            )}
							{tabValue === 5 && (
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
		 </React.Fragment>
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
		addImageProduct: addImageProduct,
		removeImageProduct: Actions.removeImageProduct,
		openNewCategoryDialog: Actions.openNewCategoryDialog,
		openNewPropertyDialog: Actions.openNewPropertyDialog
    }, dispatch);
}

function mapStateToProps({imTvApp})
{
    return {
        product: imTvApp.product
    }
}

export default 
	withReducer('imTvApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(Product)))));
