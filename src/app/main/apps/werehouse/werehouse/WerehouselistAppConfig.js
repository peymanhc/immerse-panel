import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const WerehouselistAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/werehouselistCASE/labels/all',
            component: FuseLoadable({
                loader: () => import('./WerehouselistEdit')
            })
        },
        {
            path     : '/apps/werehouselistCASE/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./WerehouselistEdit')
            })
        },	
        {
            path     : '/apps/werehouselistCASE',
            component: () => <Redirect to="/apps/werehouselistCASE/labels/all"/>
        },
    ]
};
