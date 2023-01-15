import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const ImmerseMeAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/immerse-me/products/:productId/:productHandle?',
            component: FuseLoadable({
                loader: () => import('./product/Product')
            })
        },
        {
            path     : '/apps/immerse-me/products',
            component: FuseLoadable({
                loader: () => import('./products/Products')
            })
        },	
        {
            path     : '/apps/immerse-me',
            component: () => <Redirect to="/apps/immerse-me/products"/>
        }
    ]
};
