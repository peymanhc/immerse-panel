import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const EAccountAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
     
 
        {
            path     : '/apps/e-account/accdocs/accdoc/:accdocId',
            component: FuseLoadable({
                loader: () => import('./accdoc/NewAccdoc')
            })
        },      
        {
            path     : '/apps/e-account/accdocs/:accdocId',
            component: FuseLoadable({
                loader: () => import('./accdoc/Accdoc')
            })
        },
        {
            path     : '/apps/e-account/accdocs',
            component: FuseLoadable({
                loader: () => import('./accdocs/Accdocs')
            })
        },
        
        {
            path     : '/apps/e-account/accdocs-status/labels/all',
            component: FuseLoadable({
                loader: () => import('./accdocs-status/AccdocsStatusEdit')
            })
        },
        {
            path     : '/apps/e-account/accdocs-status/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./accdocs-status/AccdocsStatusEdit')
            })
        },  
        {
            path     : '/apps/e-account/accdocs-status',
            component: () => <Redirect to="/apps/e-account/accdocs-status/labels/all"/>
        },      
        {
            path     : '/apps/e-account',
            component: () => <Redirect to="/apps/e-account/products"/>
        }
    ]
};
