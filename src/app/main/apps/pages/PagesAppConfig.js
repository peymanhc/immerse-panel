import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const PagesAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/pages/labels/all',
            component: FuseLoadable({
                loader: () => import('./PagesEdit')
            })
        },
        {
            path     : '/apps/pages/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./PagesEdit')
            })
        },	
        {
            path     : '/apps/pages',
            component: () => <Redirect to="/apps/pages/labels/all"/>
        },
    ]
};
