import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import MastersHeader from './MastersHeader';
import MastersTable from './MastersTable';
import reducer from '../store/reducers';

const Masters = () => {
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <MastersHeader/>
            }
            content={
                <MastersTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('masterApp', reducer)(Masters);
//export default Masters;