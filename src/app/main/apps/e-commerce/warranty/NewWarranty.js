import React, {Component} from 'react';
import {withStyles ,Icon, Tab, Tabs, Typography, Button} from '@material-ui/core';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions/newWarranty.actions';
import reducer from '../store/reducers';
import { withTranslate } from 'react-redux-multilingual';  
import AddUserDialog from './tab1/AddUserDialog';
import Specification from './tab1/Specification';
import Products from './tab2/Products';
import AddProductDialog from './tab2/AddProductDialog';
import AddDiscountDialog from './tab2/AddDiscountDialog';
import AddTaxDialog from './tab2/AddTaxDialog';
import WarrantyInvoice from './WarrantyInvoice';
import Address from './tab4/Address';
import WarrantyChat from './WarrantyChat';


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
const newWarranty = {
	id				: null,
	products		: [],
	status			: [],
	payment			: {},
	shippingDetails	: [],
	shippingAddress	: [],
	invoiceAddress	: [],
	customer		: null,
	reference		: '',
	date			: new Date(),
	tax				: 0,
	discount		: 0,
	subtotal		: 0,
	total			: 0,
	success			: true,
	chat			: [],
	setPrice		: [],
	images			: [],
	companies		: [],
	totalCount		: 0,
};


class NewWarranty extends Component {

    state = {
        tabValue			: 0,
        warranty    			: null,
    };
	
    componentDidMount()
    {
		const {warrantyId} = this.props.match.params;
		if(warrantyId === "new")
			this.setState({warranty:newWarranty});
		this.props.getData();
    }

    handleChangeTab = (event, tabValue) => this.setState({tabValue});
	
	
	addProduct = (product) => {
		const {products, discount, tax} = this.state.warranty;
		const productIndex = products.findIndex(({id}) => id === product.id);
		let newProducts = [];
		
		if(productIndex !== -1)
			newProducts = [
				...products.slice(0, productIndex),
				product,
				...products.slice(productIndex + 1),
			];	
		else
			newProducts = [...products, product];
		
		const subtotal = newProducts.reduce((total, num) => total + parseFloat(num.total), 0);
		const totalCount = newProducts.reduce((total, num) => total + parseFloat(num.quantity), 0);
		const total = subtotal - discount + tax;
		this.setState({warranty:{...this.state.warranty, products:newProducts, subtotal, total, totalCount}});			
	}
	
	addDataToWarranty = (data) => this.setState({warranty:{...this.state.warranty, ...data}});

	addWarranty = () => {
		const {warranty} = this.state;
		this.props.createWarranty(warranty).then((data) => {
			this.props.history.push('/apps/e-commerce/warrantylist/' + data.id);
		});
	};
	
    render()
    {
        const {translate , classes} = this.props;
        const {tabValue, warranty} = this.state;

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
												{ translate('Warranty') }
											</Typography>
										</FuseAnimate>
	
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography variant="caption">
												{ translate('From') }
											</Typography>
										</FuseAnimate>
									</div>
	
								</div>
								
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
									onClick={this.addWarranty}
									disabled={warranty.customer !== null && warranty.products.length ? false:true}
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
							<Tab className="h-64 normal-case" label={translate('Warranty_Details')}/>
							<Tab className="h-64 normal-case" label={translate('Prescription')}/>
							<Tab className="h-64 normal-case" label={translate('Invoice')}/>
							<Tab className="h-64 normal-case" label={translate('Address')}/>
							<Tab className="h-64 normal-case" label={translate('Chat')}/>
						</Tabs>
					}
					content={
						warranty && (
							<div className="p-16 sm:p-24 max-w-2xl w-full">
								{/*Warranty Details*/}
								{tabValue === 0 &&
								(
									<Specification warranty={warranty} addDataToWarranty={this.addDataToWarranty}/>
								)}
								{/*Products*/}
								{tabValue === 1 &&
								(
									<Products warranty={warranty} addDataToWarranty={this.addDataToWarranty} />	
								)}
								{/*Invoice*/}
								{tabValue === 2 &&
								(
									<WarrantyInvoice warranty={warranty}/>
								)}
								{tabValue === 3 &&
								(
									<Address warranty={warranty} />	
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
				<AddUserDialog addDataToWarranty={this.addDataToWarranty} />
				<AddProductDialog addProduct={this.addProduct} addDataToWarranty={this.addDataToWarranty} />
				<AddDiscountDialog />
				<AddTaxDialog />
				</div> 
			</>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
		getData				: Actions.getData,
		createWarranty			: Actions.createWarranty,
    }, dispatch);
}

//export default withReducer('eCommerceApp', reducer)(withRouter(connect(null, mapDispatchToProps)(withTranslate(NewWarranty))));

export default withReducer('eCommerceApp', reducer)(withStyles(styles)(withRouter(connect(null, mapDispatchToProps)(withTranslate(NewWarranty)))));

