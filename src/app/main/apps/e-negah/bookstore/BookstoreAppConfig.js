import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const BookstoreAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/e-negah/bookstore/posts/:postId/:postHandle?',
            component: FuseLoadable({
                loader: () => import('./post/Post')
            })
        },
        {
            path     : '/apps/e-negah/bookstore/posts',
            component: FuseLoadable({
                loader: () => import('./posts/Posts')
            })
        },	
        {
            path     : '/apps/e-negah/bookstore',
            component: () => <Redirect to="/apps/bookstore/posts"/>
        }
    ]
};
