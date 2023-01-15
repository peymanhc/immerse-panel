import React, {Component} from 'react';
import {withStyles, Avatar, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Icon, Tab, Tabs, 
	    Tooltip, Menu, MenuList, MenuItem, ListItemIcon, ListItemText,Typography, Checkbox, IconButton, Button, 
	     DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';
import GoogleMap from 'google-map-react';
import withReducer from 'app/store/withReducer';
import WarrantylistStatus from './WarrantylistStatus';
import WarrantyInvoice from './WarrantyInvoice';
import * as Actions from '../store/actions/warranty.actions';
import reducer from '../store/reducers';
import { withTranslate } from 'react-redux-multilingual';  //--maddahi-and addtranslate words--//
import WarrantyAddStatusDialog from './WarrantyAddStatusDialog';
import WarrantyChat from './WarrantyChat';
import WarrantyAddPriceDialog from './WarrantyAddPriceDialog';
import WarrantyImagesShow from './WarrantyImagesShow';
import WarrantyShowStatusDialog from './WarrantyShowStatusDialog';
import {openDialog, closeDialog} from 'app/store/actions';													

function Marker({text})
{
    return (
        <Tooltip title={text} placement="top">
            <Icon className="text-red">place</Icon>
        </Tooltip>
    );
}

const styles = {
	 labelCustom :{
      transformOrigin: "top right",
      right: 22,
      left: "auto"
    },
    
   fuse: {
        direction: 'rtl',
    },
    arrow: {
        transform: 'scaleX(-1)'
    },
	tag:{
		padding:'1px 5px',
		marginRight:5,
		border:'1px solid silver',
	},
	tags:{
		marginTop:7,
	},
};
class Warranty extends Component {

    state = {
        tabValue			: 0,
        form    			: null,
        map     			: 'invoice',
		selected  			: [], 
		statusSelected		: [],
		selectedContactsMenu: null,
        rowStatusWarr  : 1,
    };
	

    openSelectedContactMenu = (event) => {
        this.setState({selectedContactsMenu: event.currentTarget});
    };

    closeSelectedContactsMenu = () => {
        this.setState({selectedContactsMenu: null});
    };
	
    componentDidMount()
    {
        this.props.getWarranty(this.props.match.params);
		this.props.getWarrantyStatus();
    }

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };
	
    handleSelectAllClick = (event, name = 'selected') => {
        if ( event.target.checked )
        {
			if(name === 'selected')
				this.setState(state => ({[name]: this.props.warranty.products.map(n => n.id)}));
			else if(name === 'statusSelected')
				this.setState(state => ({[name]: this.props.warranty.status.map(n => n.id)}));
            return;
        }
        this.setState({[name]: []});
    };
	
	checkboxChange = (id, name = "selected") => {
		const selected = this.state[name];
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
		this.setState({[name]: newSelected});
	};
	
	isSelected = (id, name = "selected") => this.state[name].indexOf(id) !== -1;
	
	removeProducts = () => {
		const {warranty, saveWarranty} = this.props;
		const {selected} = this.state;
		const products = warranty.products;
		products.forEach((product) => {
			if(selected.includes(product.id))
				product["deleted"] = true;
		});
		const newWarranty = {...warranty, products};
		saveWarranty(newWarranty);
		this.setState({selected:[]});
	};
	
	undoProducts = () => {
		const {warranty, saveWarranty} = this.props;
		const {selected} = this.state;
		const products = warranty.products;
		products.forEach((product) => {
			if(selected.includes(product.id))
				product["deleted"] = false;
		});
		const newWarranty = {...warranty, products};
		saveWarranty(newWarranty);
		this.setState({selected:[]});
	};	
	
	formatDate = (date) => date ? date.toString().replace('T', ' ').split('Z')[0] : '';
		removeItems = () => {
		this.props.removeWarrantyToStatus(this.props.warranty.id, this.state.statusSelected);
		this.props.closeDialog();
	}
	
	statusRowClick = status => {
		const {statusId, description, imgSrc1, imgSrc2} = status;
		const {closeDialog, openDialog} = this.props;
		openDialog({
			children: (<WarrantyShowStatusDialog onClose={closeDialog} status={{statusId, description, imgSrc1, imgSrc2}} />),
			maxWidth:'sm', fullWidth:true, classes:{paper:"m-0 md:m-48"}
		})		
	}
	
    render()
    {
        const {warranty, translate, openAddStatusDialog, removeWarrantyToStatus, openAddPriceDialog,  openWarrantyShowImageDialog, classes, closeDialog, openDialog} = this.props;
        const {tabValue, selectedContactsMenu} = this.state;
	   this.state.rowStatusWarr=1;
        return (
			<>
			  <div className={classes.fuse}>
				<FusePageCarded
					classes={{
						content: "flex",
						header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
					}}
					header={
						warranty && (
							<div className="flex flex-1 w-full items-center justify-between">
	
								<div className="flex flex-1 flex-col items-center sm:items-start">
	
									<FuseAnimate animation="transition.slideRightIn" delay={300}>
										<Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/e-commerce/warrantylist">
											<Icon className="mr-4 text-20">arrow_back</Icon>
											{translate('Warrantylist')}
										</Typography>
									</FuseAnimate>
	
									<div className="flex flex-col min-w-0 items-center sm:items-start">
	
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography className="text-16 sm:text-20 truncate">
											{translate('Warranty')}
											{warranty.reference.split('-')[0]}
											</Typography>
										</FuseAnimate>
	
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography variant="caption">
												{ translate('From')  + warranty.customer.firstName + ' ' + warranty.customer.lastName}
											</Typography>
										</FuseAnimate>
									</div>
	
								</div>
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
							<Tab className="h-64 normal-case" label={translate('Warranty_Details')}/>
							<Tab className="h-64 normal-case" label={translate('Prescription')}/>
							<Tab className="h-64 normal-case" label={translate('Invoice')}/>
							<Tab className="h-64 normal-case" label={translate('Warrantylist_Status')}/>
							<Tab className="h-64 normal-case" label={translate('Chat')}/>
						</Tabs>
					}
					content={
						warranty && (
							<div className="p-16 sm:p-24 max-w-2xl w-full">
								{/*Warranty Details*/}
								{tabValue === 0 &&
								(
									<div>
										<div className="pb-8">
		
											<div className="pb-16 flex items-center">
												<Icon className="mr-16" color="action">account_circle</Icon>
												<Typography className="h2" color="textSecondary">{translate('CustomerWarranty')}</Typography>
											</div>
		
											<div className="mb-8">
		
												<div className="table-responsive mb-16">
													<table className="simple">
														<thead>
															<tr>
																<th>{translate('warranty_Name')}</th>
																<th>{translate('warranty_Email')}</th>
																<th>{translate('warranty_Phone')}</th>
																<th>{translate('warranty_Company')}</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td>
																	<div className="flex items-center">
																		<Avatar className="mr-8" src={warranty.customer.avatar}/>
																		<Typography className="truncate">
																			{warranty.customer.firstName + ' ' + warranty.customer.lastName}
																		</Typography>
																	</div>
																</td>
																<td>
																	<Typography className="truncate">{warranty.customer.email}</Typography>
																</td>
																<td>
																	<Typography className="truncate">{warranty.customer.phone}</Typography>
																</td>
																<td>
																	<span className="truncate">{warranty.customer.company}</span>
																</td>
															</tr>
														</tbody>
													</table>
												</div>
		

											</div>
										</div>
		
									
		
										<div className="pb-8">
		
											<div className="pb-16 flex items-center">
												<Icon className="mr-16" color="action">attach_money</Icon>
												<Typography className="h2" color="textSecondary">{translate('warranty_Payment')}</Typography>
											</div>
		
											<div className="table-responsive">
												<table className="simple">
													<thead>
														<tr>
															<th>{translate('warranty_TransactionID')}</th>
															<th>{translate('warranty_Payment_Method')}</th>
															<th>{translate('warranty_Amount')}</th>
															<th>{translate('warranty_Date')}</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>
																<span className="truncate">
																	{warranty.payment.transactionId}
																</span>
															</td>
															<td>
																<span className="truncate">
																	{warranty.payment.method}
																</span>
															</td>
															<td>
																<span className="truncate">
																	{warranty.payment.amount}
																</span>
															</td>
															<td>
																<span className="truncate">
																	{warranty.payment.date}
																</span>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
		
										<div className="pb-8">
		
											<div className="pb-16 flex items-center">
												<Icon className="mr-16" color="action">local_shipping</Icon>
												<Typography className="h2" color="textSecondary">{translate('warranty_Shipping')}</Typography>
											</div>
		
											<div className="table-responsive">
												<table className="simple">
													<thead>
														<tr>
															<th>{translate('warranty_Tracking_Code')}</th>
															<th>{translate('warranty_Carrier')}</th>
															<th>{translate('warranty_Weight')}</th>
															<th>{translate('warranty_Fee')}</th>
															<th>{translate('warranty_Date')}</th>
														</tr>
													</thead>
													<tbody>
														{warranty.shippingDetails.map(shipping => (
															<tr key={shipping.date}>
																<td>
																	<span className="truncate">
																		{shipping.tracking}
																	</span>
																</td>
																<td>
																	<span className="truncate">
																		{shipping.carrier}
																	</span>
																</td>
																<td>
																	<span className="truncate">
																		{shipping.quantity}
																	</span>
																</td>
																<td>
																	<span className="truncate">
																		{shipping.fee}
																	</span>
																</td>
																<td>
																	<span className="truncate">
																		{this.formatDate(shipping.date)}
																	</span>
																</td>
															</tr>
														))}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								)}
								{/*Products*/}
								{tabValue === 1 &&
								(
									<div className="table-responsive">
										<Button variant="outlined" color="primary" onClick={openAddPriceDialog}>
											{translate('Add_Price')} 
										</Button>	
										<Button className='ml-8' variant="outlined" color="primary" onClick={openWarrantyShowImageDialog}>
											{translate('Show_Images')} 
										</Button>										
										<table className="simple">
											<thead>
												<tr>
													<th>
														<Checkbox 
															onChange={(event) => this.handleSelectAllClick(event) }
														/>
													</th>
													<th>
													{
														this.state.selected.length ? 
															<React.Fragment>
																<IconButton
																	aria-owns={selectedContactsMenu ? 'selectedContactsMenu' : null}
																	aria-haspopup="true"
																	onClick={this.openSelectedContactMenu}
																>
																	<Icon>more_horiz</Icon>
																</IconButton>
																<Menu
																	id="selectedContactsMenu"
																	anchorEl={selectedContactsMenu}
																	open={Boolean(selectedContactsMenu)}
																	onClose={this.closeSelectedContactsMenu}
																>
																	<MenuList>
																		<MenuItem
																			onClick={this.removeProducts}
																		>
																			<ListItemIcon>
																				<Icon>delete</Icon>
																			</ListItemIcon>
																			<ListItemText inset primary="Remove"/>
																		</MenuItem>
																		<MenuItem
																			onClick={this.undoProducts}
																		>
																			<ListItemIcon>
																				<Icon>undo</Icon>
																			</ListItemIcon>
																			<ListItemText inset primary="Undo"/>
																		</MenuItem>																		
																	</MenuList>
																</Menu>
															</React.Fragment>												
														:
														translate('warranty_Image')
													}
													</th>
													<th>{translate('warranty_Name')}</th>		
													<th>{translate('Code')}</th>
													<th>{translate('warranty_Price')}</th>																								
													<th>{translate('warranty_Quantity')}</th>
												</tr>
											</thead>
											<tbody>
												{warranty.products.map(product => (
													<tr key={product.id}>
														<td>
															<Checkbox 
																onChange={() => this.checkboxChange(product.id)}
																onClick={event => event.stopPropagation()}
																checked={this.isSelected(product.id)}
															/>
														</td>
														<td className="w-80">
															<img className="product-image" src={product.image} alt="product"/>
														</td>
														<td>
															<Typography
																component={Link}
																to={'/apps/e-commerce/products/' + product.id}
																className="truncate"
																style={{
																	color         : 'inherit',
																	textDecoration: product.deleted ? 'line-through' : 'underline'
																}}
															>
																{product.name }
															</Typography>
															<div className={classes.tags}>
															{
																product.properties && product.properties.map(({PropertyName}) => <span className={classes.tag}>{PropertyName}</span>)
															}
															</div>
														</td>
														<td className="w-64">
															{product.code}
														</td>
														
														
														<td className="w-64 text-right">
															<span className="truncate">
																{product.quantity}
															</span>
														</td>
														<td className="w-64 text-right">
															<span className="truncate  currency-rtl ">
																${product.total}
															</span>
														</td>
														
													</tr>
												))}
											</tbody>
										</table>
									</div>
								)}
								{/*Invoice*/}
								{tabValue === 2 &&
								(
									<WarrantyInvoice warranty={warranty}/>
								)}
								{tabValue === 3 &&
								( 
									<>

										<div className="pb-8">
		
											<div className="pb-8 flex items-center">
												<Icon className="mr-16" color="action">access_time</Icon>
												<Typography className="h2" color="textSecondary"> {translate('Warrantylist_Status')}</Typography>
											</div>
											<div className="table-responsive">
												<table className="simple">
													<thead>
														<tr>
															<th>
																<Checkbox 
																	onChange={(event) => this.handleSelectAllClick(event, 'statusSelected') }																	
																/>
															</th>
															<th>
																{
																	this.state.statusSelected.length ? 
																		<IconButton style={{marginLeft:-20}}  
																			aria-owns='selectedWarrantylistMenu'
																			aria-haspopup="true"
																				onClick={() => openDialog({
																				children: (
																					<React.Fragment>
																						<DialogTitle id="alert-dialog-title"> {translate('warranty_state_dialog_delete')}   </DialogTitle>
																						<DialogContent>
																							<DialogContentText id="alert-dialog-description">
																								{translate('warranty_state_dialog_delete_msg')}
																							</DialogContentText>
																						</DialogContent>
																						<DialogActions>
																							<Button onClick={closeDialog} color="primary">
																								{translate('Disagree')} 
																							</Button>
																							<Button onClick={this.removeItems} color="primary" autoFocus>
																								{translate('Agree')} 
																							</Button>
																						</DialogActions>
																					</React.Fragment>
																				)
																			})}																			
																		>
																			<Icon>delete</Icon>
																		</IconButton>													
																	:
																		translate('row')
																}
														    </th>
															<th>  {translate('warranty_Status')}      </th>
															<th>  {translate('warranty_Updated_On')}  </th>
														</tr>
													</thead>
													<tbody>
														{warranty.status.map((status, index) => (
															<tr key={index} onClick={() => this.statusRowClick(status)} className="cursor-pointer">
																<td>
																	<Checkbox 
																		onChange={() => this.checkboxChange(status.id, 'statusSelected')}
																		onClick={event => event.stopPropagation()}
																		checked={this.isSelected(status.id, 'statusSelected')}
																	/>
																</td>	
																<td>
																	 	{  this.state.rowStatusWarr++ }
                                                             
																</td>	
																<td>
																	<WarrantylistStatus name={status.name} color={status.color} />
																</td>
																<td>
																	     {this.formatDate(status.fdate)+'    '+ this.formatDate(status.date)}
																</td>
															</tr>
														))}
													</tbody>
												</table>
											</div>
											<div className='mt-8' style={{float:'left'}} >
												<Button variant="outlined" color="primary" onClick={() => openAddStatusDialog()}>
													{translate('Add_WarrantyStatus')} 
												</Button>											
											</div>
										</div>									
									</>
								)}
								{
									tabValue === 4 &&
										<WarrantyChat warranty={warranty}/>
								}								
							</div>						
						)
					}
					innerScroll				
				/>
				<WarrantyAddStatusDialog warrantyId={warranty? warranty.id : null}/>
				<WarrantyAddPriceDialog warranty={warranty}/>
				<WarrantyImagesShow images={warranty && warranty.images ? warranty.images : []}/>
					</div> 
			</>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getWarranty 					: Actions.getWarranty,
        saveWarranty					: Actions.saveWarranty,
		getWarrantyStatus				: Actions.getWarrantyStatus,
		openAddStatusDialog			: Actions.openAddStatusDialog,
		openAddPriceDialog			: Actions.openAddPriceDialog,
		removeWarrantyToStatus			: Actions.removeWarrantyToStatus,
		openWarrantyShowImageDialog	: Actions.openWarrantyShowImageDialog ,
		openDialog 					: openDialog,
		closeDialog					: closeDialog		
    }, dispatch);
}

function mapStateToProps({eCommerceApp})
{
    return {
        warranty		: eCommerceApp.warranty.warranty,
    }
}

 
export default withReducer('eCommerceApp', reducer)(withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(Warranty)))));

