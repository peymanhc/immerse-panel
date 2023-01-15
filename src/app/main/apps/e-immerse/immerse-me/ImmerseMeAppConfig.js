import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const ImmerseMeAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/e-immerse/immerse-me/products/:productId/:productHandle?',
            component: FuseLoadable({
                loader: () => import('./product/Product')
            })
        },
        {
            path     : '/apps/e-immerse/immerse-me/products',
            component: FuseLoadable({
                loader: () => import('./products/Products')
            })
        },	
        {
            path     : '/apps/e-immerse/immerse-me',
            component: () => <Redirect to="/apps/e-immerse/immerse-me/products"/>
        }
    ]
};
