import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const AdsAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/ads/posts/:postId/:postHandle?',
            component: FuseLoadable({
                loader: () => import('./post/Post')
            })
        },
        {
            path     : '/apps/ads/posts',
            component: FuseLoadable({
                loader: () => import('./posts/Posts')
            })
        },	
        {
            path     : '/apps/ads',
            component: () => <Redirect to="/apps/ads/posts"/>
        }
    ]
};
