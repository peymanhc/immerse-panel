import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const TourismAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/tourism/posts/:postId/:postHandle?',
            component: FuseLoadable({
                loader: () => import('./post/Post')
            })
        },
        {
            path     : '/apps/tourism/posts',
            component: FuseLoadable({
                loader: () => import('./posts/Posts')
            })
        },	
        {
            path     : '/apps/tourism',
            component: () => <Redirect to="/apps/tourism/posts"/>
        }
    ]
};
