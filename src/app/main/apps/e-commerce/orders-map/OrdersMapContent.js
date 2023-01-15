import React, {useEffect} from 'react';
import {Card, Icon, Tooltip} from '@material-ui/core';
import GoogleMap from 'google-map-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
import _ from '@lodash';
//import {FuseAnimateGroup} from '@fuse';

function Marker({text, openOrdersMapDialog, order})
{
    return (
        <Tooltip title={text} placement="top" onClick={() => {openOrdersMapDialog(order)}}>
            <Icon className="text-red">place</Icon>
        </Tooltip>
    );
}

const OrdersMapContent = ({openOrdersMapDialog, getOrders, orders, getMasters, getOrdersStatus, statusRadio}) => {
	
	useEffect(() => {
		getOrders();
		getMasters();
		getOrdersStatus();
	}, []); 
	 
	let filteredOrders = [];
	
	try{
		filteredOrders = orders.filter(({invoiceAddress}) => 
			invoiceAddress[0].lat  && invoiceAddress[0].long);				
	}
	catch(err){
		//console.log(err);
	}
		
	let newFilter = filteredOrders; 

	if(statusRadio !== null){
		newFilter = filteredOrders.filter(({status}) => {
			const lastStatus = _.orderBy(status, ['date'], ['desc']); 
			if(lastStatus.length > 0 && lastStatus[0].statusId === statusRadio)
				return true;
			return false;
		});		
	}

	console.log(newFilter);
    return (
        <Card className="w-full rounded-8 shadow-none border-1" style={{height:470,}}>

            <GoogleMap
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_MAP_KEY
                }}
                defaultZoom={4}
                defaultCenter={[34.3419779, 47.0880629]}
                options={{
                   // styles: data.styles
                }}
            >
					{
						newFilter.map((order, index) => (
							<Marker
								key={index}
								text={order.RefID || order.customer.firstName}
								lat={order.invoiceAddress[0].lat}
								lng={order.invoiceAddress[0].long}
								openOrdersMapDialog={openOrdersMapDialog}
								order={order}
							/>
						))
					}			
            </GoogleMap>
        </Card>
    );
};
 
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
		openOrdersMapDialog	: Actions.openOrdersMapDialog,
		getOrders			: Actions.getOrders,
		getMasters			: Actions.getMasters,
		getOrdersStatus		: Actions.getOrdersStatus,
    }, dispatch);
}

function mapStateToProps({eCommerceApp})
{ 
    return {
		orders    	: eCommerceApp.orders.data,
		statusRadio	: eCommerceApp.orders.statusRadio,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersMapContent);