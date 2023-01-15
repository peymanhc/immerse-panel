import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import DiscountsHeader from './DiscountsHeader';
import DiscountsTable from './DiscountsTable';
import reducer from '../store/reducers';

const Discounts = () => {
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <DiscountsHeader/>
            }
            content={
                <DiscountsTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('discountApp', reducer)(Discounts);
//export default Discounts;