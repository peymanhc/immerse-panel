import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const BookstoreAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/bookstore/posts/:postId/:postHandle?',
            component: FuseLoadable({
                loader: () => import('./post/Post')
            })
        },
        {
            path     : '/apps/bookstore/posts',
            component: FuseLoadable({
                loader: () => import('./posts/Posts')
            })
        },	
        {
            path     : '/apps/bookstore',
            component: () => <Redirect to="/apps/bookstore/posts"/>
        }
    ]
};
