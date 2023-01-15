import React, {Component} from 'react';
import {withStyles, Avatar, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Icon, Tab, Tabs, Tooltip, Menu, MenuList, MenuItem, ListItemIcon, ListItemText,
	Typography, Checkbox, IconButton, Button, } from '@material-ui/core';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';
import GoogleMap from 'google-map-react';
import withReducer from 'app/store/withReducer';
import AccdocsStatus from './AccdocsStatus';
import AccdocInvoice from './AccdocInvoice';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import { withTranslate } from 'react-redux-multilingual';  //--maddahi-and addtranslate words--//
import AccdocAddStatusDialog from './AccdocAddStatusDialog';
import AccdocChat from './AccdocChat';
import AccdocAddPriceDialog from './AccdocAddPriceDialog';
import AccdocImagesShow from './AccdocImagesShow';

function Marker({text})
{
    return (
        <Tooltip title={text} placement="top">
            <Icon className="text-red">place</Icon>
        </Tooltip>
    );
}

const styles = {
	tag:{
		padding:'1px 5px',
		marginRight:5,
		border:'1px solid silver',
	},
	tags:{
		marginTop:7,
	},
};

class Order extends Component {

    state = {
        tabValue			: 0,
        form    			: null,
        map     			: 'invoice',
		selected  			: [],
		statusSelected		: [],
		selectedContactsMenu: null,
    };
	
    openSelectedContactMenu = (event) => {
        this.setState({selectedContactsMenu: event.currentTarget});
    };

    closeSelectedContactsMenu = () => {
        this.setState({selectedContactsMenu: null});
    };
	
    componentDidMount()
    {
        this.props.getAccdoc(this.props.match.params);
		this.props.getAccdocStatus();
    }

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };
	
    handleSelectAllClick = (event, name = 'selected') => {
        if ( event.target.checked )
        {
			if(name === 'selected')
				this.setState(state => ({[name]: this.props.order.products.map(n => n.id)}));
			else if(name === 'statusSelected')
				this.setState(state => ({[name]: this.props.order.status.map(n => n.id)}));
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
		const {order, saveOrder} = this.props;
		const {selected} = this.state;
		const products = order.products;
		products.forEach((product) => {
			if(selected.includes(product.id))
				product["deleted"] = true;
		});
		const newAccdoc = {...order, products};
		saveOrder(newAccdoc);
		this.setState({selected:[]});
	};
	
	undoProducts = () => {
		const {order, saveOrder} = this.props;
		const {selected} = this.state;
		const products = order.products;
		products.forEach((product) => {
			if(selected.includes(product.id))
				product["deleted"] = false;
		});
		const newAccdoc = {...order, products};
		saveOrder(newAccdoc);
		this.setState({selected:[]});
	};	
	
	formatDate = (date) => date ? date.toString().replace('T', ' ').split('Z')[0] : '';
	
    render()
    {
        const {order, translate, openAddStatusDialog, removeOrderToStatus, openAddPriceDialog, openAccdocShowImageDialog, classes} = this.props;
        const {tabValue, selectedContactsMenu} = this.state;

        return (
			<>
				<FusePageCarded
					classes={{
						content: "flex",
						header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
					}}
					header={
						order && (
							<div className="flex flex-1 w-full items-center justify-between">
	
								<div className="flex flex-1 flex-col items-center sm:items-start">
	
									<FuseAnimate animation="transition.slideRightIn" delay={300}>
										<Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/e-account/accdocs">
											<Icon className="mr-4 text-20">arrow_back</Icon>
											{translate('Accdocs')}
										</Typography>
									</FuseAnimate>
	
									<div className="flex flex-col min-w-0 items-center sm:items-start">
	
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography className="text-16 sm:text-20 truncate">
												{ translate('Order') + order.reference.split('-')[0]}
											</Typography>
										</FuseAnimate>
	
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography variant="caption">
												{ translate('From')  + order.customer.firstName + ' ' + order.customer.lastName}
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
							<Tab className="h-64 normal-case" label={translate('Order_Details')}/>
							<Tab className="h-64 normal-case" label={translate('Prescription')}/>
							<Tab className="h-64 normal-case" label={translate('Invoice')}/>
							<Tab className="h-64 normal-case" label={translate('Address')}/>
							<Tab className="h-64 normal-case" label={translate('Chat')}/>
						</Tabs>
					}
					content={
						order && (
							<div className="p-16 sm:p-24 max-w-2xl w-full">
								{/*Order Details*/}
								{tabValue === 0 &&
								(
									<div>
										<div className="pb-48">
		
											<div className="pb-16 flex items-center">
												<Icon className="mr-16" color="action">account_circle</Icon>
												<Typography className="h2" color="textSecondary">{translate('Customer')}</Typography>
											</div>
		
											<div className="mb-24">
		
												<div className="table-responsive mb-16">
													<table className="simple">
														<thead>
															<tr>
																<th>{translate('order_Name')}</th>
																<th>{translate('order_Email')}</th>
																<th>{translate('order_Phone')}</th>
																<th>{translate('order_Company')}</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td>
																	<div className="flex items-center">
																		<Avatar className="mr-8" src={order.customer.avatar}/>
																		<Typography className="truncate">
																			{order.customer.firstName + ' ' + order.customer.lastName}
																		</Typography>
																	</div>
																</td>
																<td>
																	<Typography className="truncate">{order.customer.email}</Typography>
																</td>
																<td>
																	<Typography className="truncate">{order.customer.phone}</Typography>
																</td>
																<td>
																	<span className="truncate">{order.customer.company}</span>
																</td>
															</tr>
														</tbody>
													</table>
												</div>
		

											</div>
										</div>
		
										<div className="pb-48">
		
											<div className="pb-16 flex items-center">
												<Icon className="mr-16" color="action">access_time</Icon>
												<Typography className="h2" color="textSecondary">{translate('order_Status')}</Typography>
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
																			aria-owns='selectedAccdocsMenu'
																			aria-haspopup="true"
																			onClick={() => removeOrderToStatus(order.id, this.state.statusSelected)}																			
																		>
																			<Icon>delete</Icon>
																		</IconButton>													
																	:
																		translate('row')
																}
														    </th>
															<th>  {translate('order_Status')}      </th>
															<th>  {translate('order_Updated_On')}  </th>
														</tr>
													</thead>
													<tbody>
														{order.status.map((status, index) => (
															<tr key={index}>
																<td>
																	<Checkbox 
																		onChange={() => this.checkboxChange(status.id, 'statusSelected')}
																		onClick={event => event.stopPropagation()}
																		checked={this.isSelected(status.id, 'statusSelected')}
																	/>
																</td>	
																<td>
																	{ status.id }
																</td>	
																<td>
																	<AccdocsStatus name={status.name} color={status.color} />
																</td>
																<td>
																	{this.formatDate(status.date)}
																</td>
															</tr>
														))}
													</tbody>
												</table>
											</div>
											<div className='mt-8' style={{float:'right'}} >
												<Button variant="outlined" color="primary" onClick={() => openAddStatusDialog()}>
													{translate('Add_OrderStatus')} 
												</Button>											
											</div>
										</div>
		
										<div className="pb-48">
		
											<div className="pb-16 flex items-center">
												<Icon className="mr-16" color="action">attach_money</Icon>
												<Typography className="h2" color="textSecondary">{translate('order_Payment')}</Typography>
											</div>
		
											<div className="table-responsive">
												<table className="simple">
													<thead>
														<tr>
															<th>{translate('order_TransactionID')}</th>
															<th>{translate('order_Payment_Method')}</th>
															<th>{translate('order_Amount')}</th>
															<th>{translate('order_Date')}</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>
																<span className="truncate">
																	{order.payment.transactionId}
																</span>
															</td>
															<td>
																<span className="truncate">
																	{order.payment.method}
																</span>
															</td>
															<td>
																<span className="truncate">
																	{order.payment.amount}
																</span>
															</td>
															<td>
																<span className="truncate">
																	{order.payment.date}
																</span>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
		
										<div className="pb-48">
		
											<div className="pb-16 flex items-center">
												<Icon className="mr-16" color="action">local_shipping</Icon>
												<Typography className="h2" color="textSecondary">{translate('order_Shipping')}</Typography>
											</div>
		
											<div className="table-responsive">
												<table className="simple">
													<thead>
														<tr>
															<th>{translate('order_Tracking_Code')}</th>
															<th>{translate('order_Carrier')}</th>
															<th>{translate('order_Weight')}</th>
															<th>{translate('order_Fee')}</th>
															<th>{translate('order_Date')}</th>
														</tr>
													</thead>
													<tbody>
														{order.shippingDetails.map(shipping => (
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
										<Button className='ml-8' variant="outlined" color="primary" onClick={openAccdocShowImageDialog}>
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
														translate('order_Image')
													}
													</th>
													<th>{translate('order_Name')}</th>		
													<th>{translate('Code')}</th>
													<th>{translate('order_Price')}</th>																								
													<th>{translate('order_Quantity')}</th>
												</tr>
											</thead>
											<tbody>
												{order.products.map(product => (
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
																to={'/apps/e-account/products/' + product.id}
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
									<AccdocInvoice order={order}/>
								)}
								{tabValue === 3 &&
								(
									<>
										<ExpansionPanel
											elevation={1}
											expanded={this.state.map === 'invoice'}
											onChange={() => this.setState({map: this.state.map !== 'invoice' ? 'invoice' : false})}
										>
											<ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
												<Typography className="font-600">{translate('order_Invoice_Address')}</Typography>
											</ExpansionPanelSummary>
											<ExpansionPanelDetails className="flex flex-col md:flex-row">
											{
												order.invoiceAddress.length !== 0 &&
													<>
														<Typography className="w-full md:max-w-256 mb-16 md:mb-0">
															{order.invoiceAddress[0].address}
														</Typography>
														<div className="w-full h-320">
															<GoogleMap
																bootstrapURLKeys={{
																	key: process.env.REACT_APP_MAP_KEY
																}}
																defaultZoom={15}
																defaultCenter={[order.invoiceAddress[0].lat, order.invoiceAddress[0].long]}
															>
																<Marker
																	text={order.invoiceAddress[0].address}
																	lat={order.invoiceAddress[0].lat}
																	lng={order.invoiceAddress[0].long}
																/>
															</GoogleMap>
														</div>	
													</>
											}
											</ExpansionPanelDetails>
										</ExpansionPanel>										
										<ExpansionPanel
											elevation={1}
											expanded={this.state.map === 'shipping'}
											onChange={() => this.setState({map: this.state.map !== 'shipping' ? 'shipping' : false})}
										>
											<ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
												<Typography className="font-600">{translate('order_Shipping_Address')}</Typography>
											</ExpansionPanelSummary>
											<ExpansionPanelDetails className="flex flex-col md:flex-row">
											{ 
												order.shippingAddress.length !== 0 &&
													<>
														<Typography className="w-full md:max-w-256 mb-16 md:mb-0">
															{order.shippingAddress[0].address}
														</Typography>
														<div className="w-full h-320">
															<GoogleMap
																bootstrapURLKeys={{
																	key: process.env.REACT_APP_MAP_KEY
																}}
																defaultZoom={15}
																defaultCenter={[order.shippingAddress[0].lat, order.shippingAddress[0].long]}
															>
																<Marker
																	text={order.shippingAddress[0].address}
																	lat={order.shippingAddress[0].lat}
																	lng={order.shippingAddress[0].long}
																/>
															</GoogleMap>
														</div>		
													</>
												
											}
											</ExpansionPanelDetails>
										</ExpansionPanel>										
									</>
								)}
								{
									tabValue === 4 &&
										<AccdocChat order={order}/>
								}								
							</div>						
						)
					}
					innerScroll				
				/>
				<AccdocAddStatusDialog accdocId={order? order.id : null}/>
				<AccdocAddPriceDialog order={order}/>
				<AccdocImagesShow images={order && order.images ? order.images : []}/>
			</>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getAccdoc 					: Actions.getAccdoc,
        saveOrder					: Actions.saveOrder,
		getAccdocStatus				: Actions.getAccdocStatus,
		openAddStatusDialog			: Actions.openAddStatusDialog,
		openAddPriceDialog			: Actions.openAddPriceDialog,
		removeOrderToStatus			: Actions.removeOrderToStatus,
		openAccdocShowImageDialog	: Actions.openAccdocShowImageDialog
    }, dispatch);
}

function mapStateToProps({eAccountApp})
{
    return {
        order		: eAccountApp.order.order,
    }
}

export default withReducer('eAccountApp', reducer)(withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(Order)))));

