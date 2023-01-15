import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const GalleryAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/gallery/posts/:postId/:postHandle?',
            component: FuseLoadable({
                loader: () => import('./post/Post')
            })
        },
        {
            path     : '/apps/gallery/posts',
            component: FuseLoadable({
                loader: () => import('./posts/Posts')
            })
        },	
        {
            path     : '/apps/gallery',
            component: () => <Redirect to="/apps/gallery/posts"/>
        }
    ]
};
