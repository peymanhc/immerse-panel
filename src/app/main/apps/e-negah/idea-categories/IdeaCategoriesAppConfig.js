import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const IdeaCategoriesAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/e-negah/idea-categories/label/:labelHandle/:categoryId?',
            component: FuseLoadable({
                loader: () => import('./Categories/CategoryApp')
            })
        },
        {
            path     : '/apps/e-negah/idea-categories/filter/:filterHandle/:categoryId?',
            component: FuseLoadable({
                loader: () => import('./Categories/CategoryApp')
            })
        },
        {
            path     : '/apps/e-negah/idea-categories/:folderHandle/:categoryId?',
            component: FuseLoadable({
                loader: () => import('./Categories/CategoryApp')
            })
        },		
        {
            path     : '/apps/e-negah/idea-categories',
            component: () => <Redirect to="/apps/idea-categories/all"/>
        },		
        {
            path     : '/apps/e-negah/idea-category/labels/all',
            component: FuseLoadable({
                loader: () => import('./CategoryLabels/CategoryLabelsEdit')
            })
        },
        {
            path     : '/apps/e-negah/idea-category/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./CategoryLabels/CategoryLabelsEdit')
            })
        },	
        {
            path     : '/apps/e-negah/idea-category',
            component: () => <Redirect to="/apps/idea-category/labels/all"/>
        }
    ]
};
