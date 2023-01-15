import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const CataloglistAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/cataloglist/labels/all',
            component: FuseLoadable({
                loader: () => import('./CataloglistEdit')
            })
        },
        {
            path     : '/apps/cataloglist/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./CataloglistEdit')
            })
        },	
        {
            path     : '/apps/cataloglist',
            component: () => <Redirect to="/apps/cataloglist/labels/all"/>
        },
    ]
};
