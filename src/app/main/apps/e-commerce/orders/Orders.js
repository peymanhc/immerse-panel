import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import OrdersHeader from './OrdersHeader';
import OrdersTable from './OrdersTable';
import reducer from '../store/reducers';
import '../RTL.css';

const Orders = () => {
    return (
     <div className="fuse">
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <OrdersHeader/>
            }
            content={
                <OrdersTable/>
            }
            innerScroll
        />
    </div>
    );
};

export default withReducer('eCommerceApp', reducer) (Orders);
