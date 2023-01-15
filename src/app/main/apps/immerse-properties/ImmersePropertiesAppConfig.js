import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const ImmersePropertiesAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [	
        {
            path     : '/apps/immerse-properties/label/:labelHandle/:propertyId?',
            component: FuseLoadable({
                loader: () => import('./Properties/PropertyApp')
            })
        },
        {
            path     : '/apps/immerse-properties/filter/:filterHandle/:propertyId?',
            component: FuseLoadable({
                loader: () => import('./Properties/PropertyApp')
            })
        },
        {
            path     : '/apps/immerse-properties/:folderHandle/:propertyId?',
            component: FuseLoadable({
                loader: () => import('./Properties/PropertyApp')
            })
        },		
        {
            path     : '/apps/immerse-properties',
            component: () => <Redirect to="/apps/immerse-properties/all"/>
        },	
        {
            path     : '/apps/immerse-property/labels/all',
            component: FuseLoadable({
                loader: () => import('./PropertyLabels/PropertyLabelsEdit')
            })
        },
        {
            path     : '/apps/immerse-property/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./PropertyLabels/PropertyLabelsEdit')
            })
        },	
        {
            path     : '/apps/immerse-property',
            component: () => <Redirect to="/apps/immerse-property/labels/all"/>
        }
    ]
};
