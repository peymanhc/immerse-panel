import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const IdeaAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/idea/posts/:postId/:postHandle?',
            component: FuseLoadable({
                loader: () => import('./post/Post')
            })
        },
        {
            path     : '/apps/idea/posts',
            component: FuseLoadable({
                loader: () => import('./posts/Posts')
            })
        },	
        {
            path     : '/apps/idea',
            component: () => <Redirect to="/apps/idea/posts"/>
        }
    ]
};
