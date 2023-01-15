import React, {useState} from 'react';
import {withStyles, Icon,  Menu, MenuList, MenuItem, ListItemIcon, ListItemText, Typography, Checkbox, IconButton, Button, 
	Table, TableBody, TableRow, TableCell, TableHead} from '@material-ui/core';
import {Link} from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual'; 
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';
import * as Actions from '../../store/actions';
import DiscountDialog from './DiscountDialog';
import TaxDialog from './TaxDialog';

const styles = {
	tag:{
		padding:'1px 5px',
		marginRight:5,
		border:'1px solid silver',
	},
	tags:{
		marginTop:7,
	},
	tableRow:{
		'&:hover':{
			cursor:'pointer',
		}
	},	
};

const Products = ({translate, order, classes, openAddProductDialog, addDataToOrder, openAddDiscountDialog, addedDiscounts, deleteDiscount, 
		deleteTax, openAddTaxDialog, addedTax, 
	}) => {

	const [selectedContactsMenu, setSelectedContactsMenu] = useState(null);
    const openSelectedContactMenu = (event) => setSelectedContactsMenu(event.currentTarget);		
    const closeSelectedContactsMenu = () => setSelectedContactsMenu(null);

	const [selected, setSelected] = useState([]);
	const isSelected = (id) => selected.indexOf(id) !== -1;
	
	const handleSelectAllClick = (event) => setSelected(event.target.checked ? order.products.map(n => n.id) : []);
	
	const checkboxChange = (id) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];
        if ( selectedIndex === -1 )
        {
            newSelected = newSelected.concat(selected, id);
        }		
        else if ( selectedIndex === 0 )
        {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if ( selectedIndex === selected.length - 1 )
        {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if ( selectedIndex > 0 )
        {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
		setSelected(newSelected)
	};	
	
	const removeProducts = () => {
		const products = order.products.filter(({id}) => !selected.includes(id));
		addDataToOrder({products});
	};
	
	const subtotal = order.products.reduce((total, num) => total + parseFloat(num.total), 0);
	
	const [open, setOpen] = useState(false);
	const [taxOpen, setTaxOpen] = useState(false);
	
	const [selectedDiscount, setSelectedDiscount] = useState(null);
	const [selectedTax, setSelectedTax] = useState(null);
	
	const handleClickOpen = () => {
		setOpen(true);
	};
	
	const taxClickOpen = () => {
		setTaxOpen(true);
	};
		
	const handleClose = discount => {
		if(discount){
			setSelectedDiscount(discount);			
			const newDiscount = discount.discountType === "Percentage" ? calPercentage(subtotal, discount.discountPercentage) : discount.discountPrice;
			const total = subtotal - newDiscount + order.tax;
			addDataToOrder({discount : newDiscount, total});
		}
		setOpen(false);
	};
	
	const taxClose = tax => {
		if(tax){
			const newTax = calPercentage(subtotal, tax.taxPercentage);
			const total = subtotal - order.discount + newTax;
			addDataToOrder({tax : newTax, total});
			setSelectedTax(tax);
		}
		setTaxOpen(false);
	};	
	
	const calPercentage = (price, percent) => price * percent / 100;	

	const calTotal = () => {
		let price = 0;
		price -= order.discount;
		price += order.tax;
		return price + subtotal; 
	};
	
	const removeDiscount = () => {
		const total = subtotal  + order.tax;
		addDataToOrder({discount:0, total})
		setSelectedDiscount(null);
	};
	
	const removeTax = () => {
		const total = subtotal - order.discount;
		addDataToOrder({tax:0, total})
		setSelectedTax(null);
	};	
	
	return (
		<>
			<Button className='ml-8' variant="outlined" color="primary" onClick={() => openAddProductDialog()}>
				{translate('New_Product')} 
			</Button>
			<div className="table-responsive mb-16">											
				<Table className="simple">
					<TableHead>
						<TableRow>
							<TableCell>
								<Checkbox 
									onChange={(event) => handleSelectAllClick(event) }
								/>
							</TableCell>
							<TableCell>
							{
								selected.length ? 
									<React.Fragment>
										<IconButton
											aria-owns={selectedContactsMenu ? 'selectedContactsMenu' : null}
											aria-haspopup="true"
											onClick={openSelectedContactMenu}
										>
											<Icon>more_horiz</Icon>
										</IconButton>
										<Menu
											id="selectedContactsMenu"
											anchorEl={selectedContactsMenu}
											open={Boolean(selectedContactsMenu)}
											onClose={closeSelectedContactsMenu}
										>
											<MenuList>
												<MenuItem
													onClick={removeProducts}
												>
													<ListItemIcon>
														<Icon>delete</Icon>
													</ListItemIcon>
													<ListItemText inset primary="Remove"/>
												</MenuItem>																		
											</MenuList>
										</Menu>
									</React.Fragment>												
								:
								translate('ID')
							}
							</TableCell>
							<TableCell>{translate('order_Image')}</TableCell>
							<TableCell>{translate('order_Name')}</TableCell>
							<TableCell>{translate('order_Price')}</TableCell>
							<TableCell>{translate('order_Quantity')}</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{order.products.map((product, index) => (
							<TableRow key={index} hover className={classes.tableRow} onClick={() => openAddProductDialog(product)}>
								<TableCell>
									<Checkbox 
										onChange={() => checkboxChange(product.id)}
										onClick={event => event.stopPropagation()}
										checked={isSelected(product.id)}
									/>
								</TableCell>
								<TableCell className="w-64">
									{product.id}
								</TableCell>
								<TableCell className="w-80">
									<img className="product-image" src={product.image} alt="product"/>
								</TableCell>
								<TableCell>
									<Typography
										component={Link}
										to={'/apps/e-commerce/products/' + product.productId}
										className="truncate"
										style={{
											color         : 'inherit',
											textDecoration: product.deleted ? 'line-through' : 'underline'
										}}
									>
										{product.name}
									</Typography>
									<div className={classes.tags}>
									{
										product.properties && product.properties.map(({PropertyName}, index) => <span key={index} className={classes.tag}>{PropertyName}</span>)
									}
									</div>
								</TableCell>
								<TableCell className="w-64 text-right">
									<span className="truncate">
										${product.total}
									</span>
								</TableCell>
								<TableCell className="w-64 text-right">
									<span className="truncate">
										{product.quantity}
									</span>
								</TableCell>
							</TableRow>				
						))}
						{
							order.products.length > 0 &&
								<>
									<TableRow>
										<TableCell colSpan={3} rowSpan={4}/>
										<TableCell colSpan={2}>Subtotal</TableCell>
										<TableCell>{'$' +subtotal}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell colSpan={2}>{selectedDiscount ? selectedDiscount.discountName : 'Discount'}</TableCell>
										<TableCell align="right">
											{
												order.discount ? 
													<div className="flex items-center">
														{ '$' + order.discount}
														<IconButton className="w-32 h-32 mx-4 p-0" aria-label="Delete" onClick={removeDiscount} >
															<Icon fontSize="small">delete</Icon>						
														</IconButton>												
													</div>											
												:
												<IconButton className="w-32 h-32 mx-4 p-0" aria-label="Add" onClick={handleClickOpen}>
													<Icon fontSize="small">add</Icon>						
												</IconButton>												
											}
											<DiscountDialog
												openAddDiscountDialog={openAddDiscountDialog}
												deleteDiscount={deleteDiscount}											
												open={open}
												onClose={handleClose}
												addedDiscounts={addedDiscounts}
											/>									
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell colSpan={2}>{selectedTax ? selectedTax.taxName : 'Tax'}</TableCell>
										<TableCell>
											{
												order.tax ? 
													<div className="flex items-center">
														{'$' + order.tax}
														<IconButton className="w-32 h-32 mx-4 p-0" aria-label="Delete" onClick={removeTax} >
															<Icon fontSize="small">delete</Icon>						
														</IconButton>												
													</div>											
												:
												<IconButton className="w-32 h-32 mx-4 p-0" aria-label="Add" onClick={taxClickOpen}>
													<Icon fontSize="small">add</Icon>						
												</IconButton>												
											}
											<TaxDialog
												openAddTaxDialog={openAddTaxDialog}
												deleteTax={deleteTax}											
												open={taxOpen}
												onClose={taxClose}
												addedTax={addedTax}
											/>																		
										</TableCell>
									</TableRow>	
									<TableRow>
										<TableCell colSpan={2}>Total</TableCell>
										<TableCell>
										{
											'$' + calTotal()
										}
										</TableCell>
									</TableRow>									
								</>						
						}					
					</TableBody>
				</Table>
			</div>	
		</>
	);
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        openAddProductDialog	: Actions.openAddProductDialog,
		openAddDiscountDialog	: Actions.openAddDiscountDialog,
		openAddTaxDialog		: Actions.openAddTaxDialog,
		deleteDiscount			: Actions.deleteDiscount,
		deleteTax				: Actions.deleteTax,
    }, dispatch);
}

function mapStateToProps({eCommerceApp})
{ 
    return {
		addedDiscounts	: eCommerceApp.newOrder.addedDiscounts,
		addedTax		: eCommerceApp.newOrder.addedTax,
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withTranslate(Products)));