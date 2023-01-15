import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const SlidersAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/sliders/labels/all',
            component: FuseLoadable({
                loader: () => import('./SlidersEdit')
            })
        },
        {
            path     : '/apps/sliders/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./SlidersEdit')
            })
        },	
        {
            path     : '/apps/sliders',
            component: () => <Redirect to="/apps/sliders/labels/all"/>
        },
    ]
};
