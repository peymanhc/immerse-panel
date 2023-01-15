import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const KandidaCategoriesAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/kandida-categories/label/:labelHandle/:categoryId?',
            component: FuseLoadable({
                loader: () => import('./Categories/CategoryApp')
            })
        },
        {
            path     : '/apps/kandida-categories/filter/:filterHandle/:categoryId?',
            component: FuseLoadable({
                loader: () => import('./Categories/CategoryApp')
            })
        },
        {
            path     : '/apps/kandida-categories/:folderHandle/:categoryId?',
            component: FuseLoadable({
                loader: () => import('./Categories/CategoryApp')
            })
        },		
        {
            path     : '/apps/kandida-categories',
            component: () => <Redirect to="/apps/kandida-categories/all"/>
        },		
        {
            path     : '/apps/kandida-category/labels/all',
            component: FuseLoadable({
                loader: () => import('./CategoryLabels/CategoryLabelsEdit')
            })
        },
        {
            path     : '/apps/kandida-category/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./CategoryLabels/CategoryLabelsEdit')
            })
        },	
        {
            path     : '/apps/kandida-category',
            component: () => <Redirect to="/apps/kandida-category/labels/all"/>
        }
    ]
};
