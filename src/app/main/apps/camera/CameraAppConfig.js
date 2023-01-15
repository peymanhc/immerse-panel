import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const CameraAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/camera/posts/:postId/:postHandle?',
            component: FuseLoadable({
                loader: () => import('./post/Post')
            })
        },
        {
            path     : '/apps/camera/posts',
            component: FuseLoadable({
                loader: () => import('./posts/Posts')
            })
        },	
        {
            path     : '/apps/camera',
            component: () => <Redirect to="/apps/camera/posts"/>
        }
    ]
};
