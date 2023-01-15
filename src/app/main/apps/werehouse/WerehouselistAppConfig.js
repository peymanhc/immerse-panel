import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const WerehouselistAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/werehouselist/labels/all',
            component: FuseLoadable({
                loader: () => import('./WerehouselistEdit')
            })
        },
        {
            path     : '/apps/werehouselist/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./WerehouselistEdit')
            })
        },	
        {
            path     : '/apps/werehouselist',
            component: () => <Redirect to="/apps/werehouselist/labels/all"/>
        },
    ]
};
