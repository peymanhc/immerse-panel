import React, {Component} from 'react';
import {FusePageSimple} from '@fuse';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import OrdersMapHeader from './OrdersMapHeader';
import OrdersMapContent from './OrdersMapContent';
import OrdersMapDialog from './OrdersMapDialog';


class OrdersMap extends Component {

    render()
    {	

        return (
			<div>
				<FusePageSimple
					classes={{
						contentCardWrapper: "p-16 sm:p-24 pb-80",
						leftSidebar       : "w-256 border-0",
						header            : "min-h-72 h-72 sm:h-136 sm:min-h-136"
					}}
					header={
						<OrdersMapHeader />
					}				
					content={
						<div>
							<OrdersMapContent />
						</div>						
					}							
					sidebarInner				
				/>
				<OrdersMapDialog />
			</div>
        )
    }
}

export default withReducer('eCommerceApp', reducer)(OrdersMap);