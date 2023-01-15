import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const EnglishSkillAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/e-immerse/english-skill/products/:productId/:productHandle?',
            component: FuseLoadable({
                loader: () => import('./product/Product')
            })
        },
        {
            path     : '/apps/e-immerse/english-skill/products',
            component: FuseLoadable({
                loader: () => import('./products/Products')
            })
        },	
        {
            path     : '/apps/e-immerse/immerse-me',
            component: () => <Redirect to="/apps/e-immerse/english-skill/products"/>
        }
    ]
};
