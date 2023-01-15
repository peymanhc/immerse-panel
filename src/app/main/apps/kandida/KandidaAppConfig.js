import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const KandidaAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/kandida/posts/:postId/:postHandle?',
            component: FuseLoadable({
                loader: () => import('./post/Post')
            })
        },
        {
            path     : '/apps/kandida/posts',
            component: FuseLoadable({
                loader: () => import('./posts/Posts')
            })
        },	
        {
            path     : '/apps/kandida',
            component: () => <Redirect to="/apps/kandida/posts"/>
        }
    ]
};
