import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const ShopsAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [

        {
            path     : '/apps/shops/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./ShopsEdit')
            })
        },	
        {
            path     : '/apps/shops',
            component: () => <Redirect to="/apps/shops/labels/english" />
        },
    ]
};
