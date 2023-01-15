import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const CourseAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/e-immerse/course/posts/:postId/:postHandle?',
            component: FuseLoadable({
                loader: () => import('./post/Post')
            })
        },
        {
            path     : '/apps/e-immerse/course/posts',
            component: FuseLoadable({
                loader: () => import('./posts/Posts')
            })
        },	
        {
            path     : '/apps/e-immerse/course',
            component: () => <Redirect to="/apps/e-immerse/course/posts"/>
        }
    ]
};
