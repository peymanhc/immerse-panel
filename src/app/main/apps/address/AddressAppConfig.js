import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const AddressAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/address/labels/:labelHandle/:addressId?',
            component: FuseLoadable({
                loader: () => import('./AddressApp')
            })
        },
        {
            path     : '/apps/address',
            component: () => <Redirect to="/apps/address/labels/all"/>
        }
    ]
};
