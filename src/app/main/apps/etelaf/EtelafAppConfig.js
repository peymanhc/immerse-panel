import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const EtelafAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/etelaf/posts/:postId/:postHandle?',
            component: FuseLoadable({
                loader: () => import('./post/Post')
            })
        },
        {
            path     : '/apps/etelaf/posts',
            component: FuseLoadable({
                loader: () => import('./posts/Posts')
            })
        },	
        {
            path     : '/apps/etelaf',
            component: () => <Redirect to="/apps/etelaf/posts"/>
        }
    ]
};
