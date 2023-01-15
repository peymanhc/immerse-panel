import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import CompaniesHeader from './CompaniesHeader';
import CompaniesTable from './CompaniesTable';
import reducer from '../store/reducers';

const Companies = () => {
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <CompaniesHeader/>
            }
            content={
                <CompaniesTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('companyApp', reducer)(Companies);
//export default Companies;