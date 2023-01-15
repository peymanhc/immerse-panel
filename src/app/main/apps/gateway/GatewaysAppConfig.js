import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const GatewaysAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/gateways/labels/all',
            component: FuseLoadable({
                loader: () => import('./GatewaysEdit')
            })
        },
        {
            path     : '/apps/gateways/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./GatewaysEdit')
            })
        },	
        {
            path     : '/apps/gateways',
            component: () => <Redirect to="/apps/gateways/labels/all"/>
        },
    ]
};
