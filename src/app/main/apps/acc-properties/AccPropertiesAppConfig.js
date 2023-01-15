import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const AccPropertiesAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [	
        {
            path     : '/apps/acc-properties/label/:labelHandle/:propertyId?',
            component: FuseLoadable({
                loader: () => import('./Properties/PropertyApp')
            })
        },
        {
            path     : '/apps/acc-properties/filter/:filterHandle/:propertyId?',
            component: FuseLoadable({
                loader: () => import('./Properties/PropertyApp')
            })
        },
        {
            path     : '/apps/acc-properties/:folderHandle/:propertyId?',
            component: FuseLoadable({
                loader: () => import('./Properties/PropertyApp')
            })
        },		
        {
            path     : '/apps/acc-properties',
            component: () => <Redirect to="/apps/acc-properties/all"/>
        },	
        {
            path     : '/apps/acc-property/labels/all',
            component: FuseLoadable({
                loader: () => import('./PropertyLabels/PropertyLabelsEdit')
            })
        },
        {
            path     : '/apps/acc-property/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./PropertyLabels/PropertyLabelsEdit')
            })
        },	
        {
            path     : '/apps/acc-property',
            component: () => <Redirect to="/apps/acc-property/labels/all"/>
        }
    ]
};
