import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const BlogAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/blog/posts/:postId/:postHandle?',
            component: FuseLoadable({
                loader: () => import('./post/Post')
            })
        },
        {
            path     : '/apps/blog/posts',
            component: FuseLoadable({
                loader: () => import('./posts/Posts')
            })
        },	
        {
            path     : '/apps/blog',
            component: () => <Redirect to="/apps/blog/posts"/>
        }
    ]
};
