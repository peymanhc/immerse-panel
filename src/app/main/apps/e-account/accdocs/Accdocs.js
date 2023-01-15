import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import AccdocsHeader from './AccdocsHeader';
import AccdocsTable from './AccdocsTable';
import reducer from '../store/reducers';

const Accdocs = () => {
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <AccdocsHeader/>
            }
            content={
                <AccdocsTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('eAccountApp', reducer)(Accdocs);
