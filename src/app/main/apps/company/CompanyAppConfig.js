import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const CompanyAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/company/companies',
            component: FuseLoadable({
                loader: () => import('./companies/Companies')
            })
        },
        {
            path     : '/apps/company/:companyId/:companyName?',
            component: FuseLoadable({
                loader: () => import('./company/company')
            })
        },
        {
            path     : '/apps/company',
            component: () => <Redirect to="/apps/company/companies"/>
        }
    ]
};
