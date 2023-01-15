import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const ImtvCategoriesAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/imtv-categories/label/:labelHandle/:categoryId?',
            component: FuseLoadable({
                loader: () => import('./Categories/CategoryApp')
            })
        },
        {
            path     : '/apps/imtv-categories/filter/:filterHandle/:categoryId?',
            component: FuseLoadable({
                loader: () => import('./Categories/CategoryApp')
            })
        },
        {
            path     : '/apps/imtv-categories/:folderHandle/:categoryId?',
            component: FuseLoadable({
                loader: () => import('./Categories/CategoryApp')
            })
        },		
        {
            path     : '/apps/imtv-categories',
            component: () => <Redirect to="/apps/imtv-categories/all"/>
        },		
        {
            path     : '/apps/imtv-category/labels/all',
            component: FuseLoadable({
                loader: () => import('./CategoryLabels/CategoryLabelsEdit')
            })
        },
        {
            path     : '/apps/imtv-category/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./CategoryLabels/CategoryLabelsEdit')
            })
        },	
        {
            path     : '/apps/imtv-category',
            component: () => <Redirect to="/apps/imtv-category/labels/all"/>
        }
    ]
};
