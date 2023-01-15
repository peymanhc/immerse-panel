import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const TradepageAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/tradepage/posts/:postId/:postHandle?',
            component: FuseLoadable({
                loader: () => import('./post/Post')
            })
        },
        {
            path     : '/apps/tradepage/posts',
            component: FuseLoadable({
                loader: () => import('./posts/Posts')
            })
        },	
        {
            path     : '/apps/tradepage',
            component: () => <Redirect to="/apps/tradepage/posts"/>
        }
    ]
};
