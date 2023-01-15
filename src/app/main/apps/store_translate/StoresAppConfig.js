import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const StoresAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [

        {
            path     : '/apps/stores/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./StoresEdit')
            })
        },	
        {
            path     : '/apps/stores',
            component: () => <Redirect to="/apps/stores/labels/english" />
        },
    ]
};
