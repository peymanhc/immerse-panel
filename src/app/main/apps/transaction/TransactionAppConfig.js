import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const TransactionAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/transaction/list',
            component: FuseLoadable({
                loader: () => import('./transactions/TransactionsApp')
            })
        },
        {
            path     : '/apps/transaction/credit',
            component: FuseLoadable({
                loader: () => import('./transaction/Transaction')
            })
        },
        {
            path     : '/apps/transaction',
            component: () => <Redirect to="/apps/transaction/list" />
        }
    ]
};
