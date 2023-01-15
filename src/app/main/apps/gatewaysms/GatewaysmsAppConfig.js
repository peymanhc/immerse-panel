import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const GatewaysmsAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/gatewaysms',
            component: FuseLoadable({
                loader: () => import('./GatewaysmsApp')
            })
        },	
        {
            path     : '/apps/gatewaysms',
            component: () => <Redirect to="/apps/gatewaysms"/>
        }
    ]
};
