import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const EtelafCategoriesAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/e-negah/etelaf-categories/label/:labelHandle/:categoryId?',
            component: FuseLoadable({
                loader: () => import('./Categories/CategoryApp')
            })
        },
        {
            path     : '/apps/e-negah/etelaf-categories/filter/:filterHandle/:categoryId?',
            component: FuseLoadable({
                loader: () => import('./Categories/CategoryApp')
            })
        },
        {
            path     : '/apps/e-negah/etelaf-categories/:folderHandle/:categoryId?',
            component: FuseLoadable({
                loader: () => import('./Categories/CategoryApp')
            })
        },		
        {
            path     : '/apps/e-negah/etelaf-categories',
            component: () => <Redirect to="/apps/etelaf-categories/all"/>
        },		
        {
            path     : '/apps/e-negah/etelaf-category/labels/all',
            component: FuseLoadable({
                loader: () => import('./CategoryLabels/CategoryLabelsEdit')
            })
        },
        {
            path     : '/apps/e-negah/etelaf-category/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./CategoryLabels/CategoryLabelsEdit')
            })
        },	
        {
            path     : '/apps/e-negah/etelaf-category',
            component: () => <Redirect to="/apps/etelaf-category/labels/all"/>
        }
    ]
};
