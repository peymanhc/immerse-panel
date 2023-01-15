import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import PostsTable from './PostsTable';
import PostsHeader from './PostsHeader';
import reducer from '../store/reducers';
import '../../RTL.css';

const Posts = () => {
    return (
        <div className="fuse">
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <PostsHeader/>
            }
            content={
                <PostsTable/>
            }
            innerScroll
        />
        </div>
    );
};

export default withReducer('adsApp', reducer)(Posts);
