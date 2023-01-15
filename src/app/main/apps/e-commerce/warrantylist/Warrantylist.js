import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import WarrantylistHeader from './WarrantylistHeader';
import WarrantylistTable from './WarrantylistTable';
import reducer from '../store/reducers';
import '../RTL.css';

const Warrantylist = () => {
    return (
       <div className="fuse">
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <WarrantylistHeader/>
            }
            content={
                <WarrantylistTable/>
            }
            innerScroll
        />
        </div>
    );
};

export default withReducer('eCommerceApp', reducer)(Warrantylist);
