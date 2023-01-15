import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const EnglishSkillCategoriesAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/e-immerse/english-skill-categories/label/:labelHandle/:categoryId?',
            component: FuseLoadable({
                loader: () => import('./Categories/CategoryApp')
            })
        },
        {
            path     : '/apps/e-immerse/english-skill-categories/filter/:filterHandle/:categoryId?',
            component: FuseLoadable({
                loader: () => import('./Categories/CategoryApp')
            })
        },
        {
            path     : '/apps/e-immerse/english-skill-categories/:folderHandle/:categoryId?',
            component: FuseLoadable({
                loader: () => import('./Categories/CategoryApp')
            })
        },		
        {
            path     : '/apps/e-immerse/english-skill-categories',
            component: () => <Redirect to="/apps/e-immerse/english-skill-categories/all"/>
        },		
        {
            path     : '/apps/e-immerse/english-skill-category/labels/all',
            component: FuseLoadable({
                loader: () => import('./CategoryLabels/CategoryLabelsEdit')
            })
        },
        {
            path     : '/apps/e-immerse/english-skill-category/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./CategoryLabels/CategoryLabelsEdit')
            })
        },	
        {
            path     : '/apps/e-immerse/english-skill-category',
            component: () => <Redirect to="/apps/e-immerse/english-skill-category/labels/all"/>
        }
    ]
};
