import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const SettingsAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/settings',
            component: FuseLoadable({
                loader: () => import('./Settings')
            })
        },
        {
            path     : '/apps/settings',
            component: () => <Redirect to="/apps/settings"/>
        }
    ]
};
