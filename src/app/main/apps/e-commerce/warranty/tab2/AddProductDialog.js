import React, {Component} from 'react';
import {Button, Dialog, DialogActions, DialogContent, Toolbar, AppBar, Typography, Icon, withStyles, CircularProgress, ExpansionPanel,
	ExpansionPanelSummary, ExpansionPanelDetails, TextField, InputAdornment, FormControlLabel, Radio} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';	
import {bindActionCreators} from 'redux';
import * as Actions from '../../store/actions/newWarranty.actions';
import {connect} from 'react-redux';
import {FuseChipSelect} from '@fuse';
import _ from '@lodash';
import {FuseUtils} from '@fuse';
import { withTranslate } from 'react-redux-multilingual';


const NewIcon = withStyles({
	root: {
		fontSize:'3rem',
	},
})(props => <Icon color="action" className="mr-8" {...props} />);

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
	hidden:{
		display: 'none'
	},
	loading:{
		marginLeft: theme.spacing.unit * 10
	},	
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},	
	tag:{
		padding:'1px 5px',
		marginRight:5,
		border:'1px solid silver',
	},	
});

const newData = {
	product			: null,
	quantity		: 1,
	properties		: {},
};
	
class AddProductDialog extends Component {

    state = {...newData};

    canBeSubmitted()
    {
		const { product } = this.state;
		return product ? true : false;		
    }
		
	componentDidUpdate(prevProps, prevState, snapshot){
        if (prevProps.warrantyAddProductDialog.open === false && this.props.warrantyAddProductDialog.open )
        {
			const product = this.props.warrantyAddProductDialog.data;
            if(product !== null && !_.isEqual(product, prevState.product)){
				const {quantity, properties} = product; 
				const newProperty = _.keyBy(properties, 'PropertyLabelName'); 
                this.setState({product:{...product, priceTaxExcl:product.price}, quantity, properties:newProperty });
            }

            else if( product === null && !_.isEqual(newData, prevState)){
                this.setState({...newData});
            }
        }		
	}
	
	productChange = (productId) => { //it chooses new product
		const product = this.props.products.find(({id}) => id === productId);
		this.setState({product:{...product, productId:product.id}});
	}
	
	productOnChange = (name, value) => this.setState({product:{...this.state.product, [name]: value}});
	
	stateChange = (name, value) => this.setState({[name]: value});

	removeProperty = (name, ) => { 
		if(this.state.properties[name]){
			const newProperties = this.state.properties;
			delete newProperties[name];
			this.setState({properties:newProperties});
		}
	};
	
	radioCheck = (name, id) => {
		const { properties } = this.state;
		if(properties[name])
			return properties[name].id === id ?  true : false;
		return false;
	};
	
	propertyOnChange = (name, value) => this.setState({properties:{...this.state.properties, [name]: value}});
	
	calPrice = (price, discount) => {		
		let newPrice = price - ( price * discount / 100 );
		const {properties} = this.state;
		_.values(properties).forEach(({PropertyPrice, PropertyPercent}) => {
			if(PropertyPrice)
				newPrice += parseInt(PropertyPrice);
			if(PropertyPercent)
				newPrice += parseInt(price) * parseInt(PropertyPercent) /100;				
		});	
		return newPrice;
	};
	
	addProduct = () => {
		const {product, quantity, properties} = this.state;
		const {id, name, images, featuredImageId, priceTaxExcl, image:image2, productId} = product;
		const image = featuredImageId ? images.find(({id}) => id === featuredImageId) : null;
		//const price = this.calPrice(parseFloat(priceTaxExcl), discount || 0); //it calculates product's descount
		const price = parseFloat(priceTaxExcl);
		const total = quantity * price;  
		const data = this.props.warrantyAddProductDialog.data;
		const newProduct = {id:data === null ? FuseUtils.generateGUID() : id, productId: data === null ? id: productId,
			name, price, quantity, total, image: image? image.url : image2 || '', properties:_.values(properties)
		}; 
		this.props.addProduct(newProduct);		
	}

    render()
    {  
        const {classes, warrantyAddProductDialog, closeAddProductDialog, products , translate } = this.props; 
        const {product, quantity} = this.state; 
		
		const allProducts = products.map(item => ({...item, value:item.id, label:item.name}));
		let selectedProduct = null;
		
		if(product)
			selectedProduct = allProducts.find(({value:id}) => id === product.productId);
		
		let propertiseSorted = [];
		let colors = [];

		if(selectedProduct){ 
			propertiseSorted = _.keyBy(selectedProduct.properties.filter(({isColor}) => !isColor), 'PropertyLabelId');  //split products by their properties
			colors = selectedProduct.properties.filter(({isColor}) => isColor); 
		}

        return (
            <Dialog
				open={warrantyAddProductDialog.open}
                classes={{
                    paper: "m-24"
                }}
                onClose={closeAddProductDialog}
                fullWidth
                maxWidth="sm" 
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="block w-full p-24">
						<span>  {translate('Add_Product')} </span>
						<div>
							<CircularProgress 
								className={warrantyAddProductDialog.loading? classes.loading:classes.hidden} 
								color="secondary"
							/>
						</div>						
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{root: "p-24"}} style={{minHeight:350}}>
					<div>
						<FuseChipSelect
							onChange={(row) => {this.productChange(row.value)}}
							className="w-full mb-8"
							value={selectedProduct || null}
							placeholder='Search a product'
							textFieldProps={{
								label          : 'Products',
								InputLabelProps: {
									shrink: true,
								},
								variant        : 'outlined',
							}}										
							options={allProducts}
							variant='fixed'
						/> 
						{
							selectedProduct &&	
								<>
									<ExpansionPanel defaultExpanded>
										<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
											<div className="flex items-center">
												<NewIcon>shop</NewIcon>		
												<Typography className="truncate">
													{selectedProduct.name} 
												</Typography>											
											</div>										
										</ExpansionPanelSummary>
										<ExpansionPanelDetails className="block">
											<div className="flex mt-8 mb-16 mr-8">	
												<TextField
													label='Price'
													className='w-1/2 mr-16'
													id="priceTaxExcl"
													name="priceTaxExcl"
													value={product.priceTaxExcl}
													onChange={(event)=> this.productOnChange('priceTaxExcl', event.target.value)}
													InputProps={{
														startAdornment: <InputAdornment position="start">$</InputAdornment>
													}}
													type="number"
													variant="outlined"
													autoFocus
													helperText={'قیمت اصلی : (' + this.calPrice(selectedProduct.priceTaxExcl, selectedProduct.discount) +')'}
												/>
												<TextField
													label='Quantity'
													className='w-1/2 mr-16'
													id="quantity"
													name="quantity"
													value={quantity}
													onChange={(event)=> this.stateChange('quantity', event.target.value)}
													type="number"
													variant="outlined"																										
												/>												
											</div>	
											<div className="flex mt-8 mb-16 mr-8">	
												<div className="w-1/2">
												{
													selectedProduct.tags.map((item, index) => <span key={index} className={classes.tag}>{item}</span>)
												}
												</div>
												<div className="w-1/2 text-right">
												{
													selectedProduct.categories.map((item, index) => <span key={index}>{item.replace('/', ' > ')}</span>)
												}
												</div>
											</div>											
										</ExpansionPanelDetails>
									</ExpansionPanel>
									<ExpansionPanel>
										<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
											<div className="flex items-center">
												<NewIcon>featured_play_list</NewIcon>		
												<Typography className="truncate">Propertises</Typography>	
											</div>										
										</ExpansionPanelSummary>
										<ExpansionPanelDetails className="block">
										{
											(colors && colors.length !== 0)  &&
											<div className="form-group product__option">
												<div className="product__option-label">Color</div>
												<div className="input-radio-color">
													<div className="input-radio-color__list">
													{
														colors.map((property, index) => 														
															<FormControlLabel1
																	key={index}
																	control={
																		<WhiteRadio
																			checked={this.radioCheck(colors[0].PropertyLabelName, property.id)}
																			onChange={() => this.propertyOnChange(colors[0].PropertyLabelName, property)}
																			value={property.PropertyName}
																			name="color"
																			inputProps={{ 'aria-label': {title:property.PropertyName} }}	
																			onClick={() => this.removeProperty(colors[0].PropertyLabelName)}
																		/>									
																	}
																	label={property.PropertyName}
																	labelPlacement="end"
															/>																									
														)
													}
													</div>
												</div>
											</div>							
										}										
										{
											Object.keys(propertiseSorted).map(key => 
												<div className="mb-16" key={key}>
													<div className="mb-16">{propertiseSorted[key].PropertyLabelName}</div>
													<div className="input-radio-label">
														<div className="input-radio-label__list">
														{
															selectedProduct.properties.filter(({PropertyLabelId}) => PropertyLabelId === key).map(
																(property) => 
																	<FormControlLabel1
																		key={property.PropertyId}
																		control={
																			<WhiteRadio
																				checked={this.radioCheck(propertiseSorted[key].PropertyLabelName, property.id)}
																				onChange={() => this.propertyOnChange(propertiseSorted[key].PropertyLabelName, property)}
																				onClick={() => this.removeProperty(propertiseSorted[key].PropertyLabelName)}
																				value={property.PropertyName}
																				name={propertiseSorted[key].PropertyLabelName} 
																				inputProps={{ 'aria-label': {title:property.PropertyName} }}										
																			/>									
																		}
																		label={property.PropertyName}
																		labelPlacement="end"
																	/>																	
															)												
														}
														</div>
													</div>
												</div>
											)
										}
										</ExpansionPanelDetails>
									</ExpansionPanel>	
								</>
						}						
					</div>
                </DialogContent>
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
								this.addProduct();
								closeAddProductDialog();
							}}
                            disabled={!this.canBeSubmitted()}
                        >
						{warrantyAddProductDialog.data === null ? 'Add' : 'Save'}
                        </Button>
                    </DialogActions>
            </Dialog>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeAddProductDialog	: Actions.closeAddProductDialog,
    }, dispatch);
}

function mapStateToProps({eCommerceApp})
{ 
    return {
		warrantyAddProductDialog	: eCommerceApp.newWarranty.warrantyAddProductDialog,
		products				: eCommerceApp.newWarranty.products,
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withTranslate(AddProductDialog)));
