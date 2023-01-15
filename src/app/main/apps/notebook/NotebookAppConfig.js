import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const NotebookAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/notebook/posts/:postId/:postHandle?',
            component: FuseLoadable({
                loader: () => import('./post/Post')
            })
        },
        {
            path     : '/apps/notebook/posts',
            component: FuseLoadable({
                loader: () => import('./posts/Posts')
            })
        },	
        {
            path     : '/apps/notebook',
            component: () => <Redirect to="/apps/notebook/posts"/>
        }
    ]
};
