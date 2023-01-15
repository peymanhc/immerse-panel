import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const NewsAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/news/posts/:postId/:postHandle?',
            component: FuseLoadable({
                loader: () => import('./post/Post')
            })
        },
        {
            path     : '/apps/news/posts',
            component: FuseLoadable({
                loader: () => import('./posts/Posts')
            })
        },	
        {
            path     : '/apps/news',
            component: () => <Redirect to="/apps/news/posts"/>
        }
    ]
};
