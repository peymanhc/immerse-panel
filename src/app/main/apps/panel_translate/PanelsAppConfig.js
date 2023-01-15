import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const PanelsAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [

        {
            path     : '/apps/panels/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./PanelsEdit')
            })
        },	
        {
            path     : '/apps/panels',
            component: () => <Redirect to="/apps/panels/labels/english" />
        },
    ]
};
