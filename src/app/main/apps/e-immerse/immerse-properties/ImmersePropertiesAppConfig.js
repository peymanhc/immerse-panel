import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const ImmersePropertiesAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [	
        {
            path     : '/apps/e-immerse/immerse-properties/label/:labelHandle/:propertyId?',
            component: FuseLoadable({
                loader: () => import('./Properties/PropertyApp')
            })
        },
        {
            path     : '/apps/e-immerse/immerse-properties/filter/:filterHandle/:propertyId?',
            component: FuseLoadable({
                loader: () => import('./Properties/PropertyApp')
            })
        },
        {
            path     : '/apps/e-immerse/immerse-properties/:folderHandle/:propertyId?',
            component: FuseLoadable({
                loader: () => import('./Properties/PropertyApp')
            })
        },		
        {
            path     : '/apps/e-immerse/immerse-properties',
            component: () => <Redirect to="/apps/e-immerse/immerse-properties/all"/>
        },	
        {
            path     : '/apps/e-immerse/immerse-property/labels/all',
            component: FuseLoadable({
                loader: () => import('./PropertyLabels/PropertyLabelsEdit')
            })
        },
        {
            path     : '/apps/e-immerse/immerse-property/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./PropertyLabels/PropertyLabelsEdit')
            })
        },	
        {
            path     : '/apps/e-immerse/immerse-property',
            component: () => <Redirect to="/apps/e-immerse/immerse-property/labels/all"/>
        }
    ]
};
