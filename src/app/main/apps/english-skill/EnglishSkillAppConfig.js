import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const EnglishSkillAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/english-skill/products/:productId/:productHandle?',
            component: FuseLoadable({
                loader: () => import('./product/Product')
            })
        },
        {
            path     : '/apps/english-skill/products',
            component: FuseLoadable({
                loader: () => import('./products/Products')
            })
        },	
        {
            path     : '/apps/immerse-me',
            component: () => <Redirect to="/apps/english-skill/products"/>
        }
    ]
};
