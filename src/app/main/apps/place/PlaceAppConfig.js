import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const PlaceAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/place',
            component: FuseLoadable({
                loader: () => import('./PlaceApp')
            })
        },	
        {
            path     : '/apps/place',
            component: () => <Redirect to="/apps/place"/>
        }
    ]
};
