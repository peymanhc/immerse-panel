import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import PostsTable from './PostsTable';
import PostsHeader from './PostsHeader';
import reducer from '../store/reducers';

const Posts = () => {
    return (
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
    );
};

export default withReducer('newsApp', reducer)(Posts);
