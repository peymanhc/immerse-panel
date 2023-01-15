import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const WarrantycodesAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/warrantycodes/labels/all',
            component: FuseLoadable({
                loader: () => import('./WarrantycodesEdit')
            })
        },
        {
            path     : '/apps/warrantycodes/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./WarrantycodesEdit')
            })
        },	
        {
            path     : '/apps/warrantycodes',
            component: () => <Redirect to="/apps/warrantycodes/labels/all"/>
        },
    ]
};
