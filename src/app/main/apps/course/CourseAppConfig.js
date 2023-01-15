import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const CourseAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/course/posts/:postId/:postHandle?',
            component: FuseLoadable({
                loader: () => import('./post/Post')
            })
        },
        {
            path     : '/apps/course/posts',
            component: FuseLoadable({
                loader: () => import('./posts/Posts')
            })
        },	
        {
            path     : '/apps/course',
            component: () => <Redirect to="/apps/course/posts"/>
        }
    ]
};
