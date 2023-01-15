import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const ImTvAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/im-tv/products/:productId/:productHandle?',
            component: FuseLoadable({
                loader: () => import('./product/Product')
            })
        },
        {
            path     : '/apps/im-tv/products',
            component: FuseLoadable({
                loader: () => import('./products/Products')
            })
        },	
        {
            path     : '/apps/immerse-me',
            component: () => <Redirect to="/apps/im-tv/products"/>
        }
    ]
};
