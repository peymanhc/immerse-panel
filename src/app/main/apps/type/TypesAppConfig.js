import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const TypesAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/types/labels/all',
            component: FuseLoadable({
                loader: () => import('./TypesEdit')
            })
        },
        {
            path     : '/apps/types/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./TypesEdit')
            })
        },	
        {
            path     : '/apps/types',
            component: () => <Redirect to="/apps/types/labels/all"/>
        },
    ]
};
