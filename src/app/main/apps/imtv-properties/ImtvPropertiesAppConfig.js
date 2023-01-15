import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const ImtvPropertiesAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [	
        {
            path     : '/apps/imtv-properties/label/:labelHandle/:propertyId?',
            component: FuseLoadable({
                loader: () => import('./Properties/PropertyApp')
            })
        },
        {
            path     : '/apps/imtv-properties/filter/:filterHandle/:propertyId?',
            component: FuseLoadable({
                loader: () => import('./Properties/PropertyApp')
            })
        },
        {
            path     : '/apps/imtv-properties/:folderHandle/:propertyId?',
            component: FuseLoadable({
                loader: () => import('./Properties/PropertyApp')
            })
        },		
        {
            path     : '/apps/imtv-properties',
            component: () => <Redirect to="/apps/imtv-properties/all"/>
        },	
        {
            path     : '/apps/imtv-property/labels/all',
            component: FuseLoadable({
                loader: () => import('./PropertyLabels/PropertyLabelsEdit')
            })
        },
        {
            path     : '/apps/imtv-property/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./PropertyLabels/PropertyLabelsEdit')
            })
        },	
        {
            path     : '/apps/imtv-property',
            component: () => <Redirect to="/apps/imtv-property/labels/all"/>
        }
    ]
};
