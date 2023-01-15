import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const DiscountAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/discount/discounts',
            component: FuseLoadable({
                loader: () => import('./discounts/Discounts')
            })
        },
        {
            path     : '/apps/discount/:discountId/:discountName?',
            component: FuseLoadable({
                loader: () => import('./discount/discount')
            })
        },
        {
            path     : '/apps/discount',
            component: () => <Redirect to="/apps/discount/discounts"/>
        }
    ]
};
