import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const PropertiesAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [	
        {
            path     : '/apps/properties/label/:labelHandle/:propertyId?',
            component: FuseLoadable({
                loader: () => import('./Properties/PropertyApp')
            })
        },
        {
            path     : '/apps/properties/filter/:filterHandle/:propertyId?',
            component: FuseLoadable({
                loader: () => import('./Properties/PropertyApp')
            })
        },
        {
            path     : '/apps/properties/:folderHandle/:propertyId?',
            component: FuseLoadable({
                loader: () => import('./Properties/PropertyApp')
            })
        },		
        {
            path     : '/apps/properties',
            component: () => <Redirect to="/apps/properties/all"/>
        },	
        {
            path     : '/apps/property/labels/all',
            component: FuseLoadable({
                loader: () => import('./PropertyLabels/PropertyLabelsEdit')
            })
        },
        {
            path     : '/apps/property/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./PropertyLabels/PropertyLabelsEdit')
            })
        },	
        {
            path     : '/apps/property',
            component: () => <Redirect to="/apps/property/labels/all"/>
        }
    ]
};
