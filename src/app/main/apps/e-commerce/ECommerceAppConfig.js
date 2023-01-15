import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const ECommerceAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/e-commerce/products/:productId/:productHandle?',
            component: FuseLoadable({
                loader: () => import('./product/Product')
            })
        },
        {
            path     : '/apps/e-commerce/products',
            component: FuseLoadable({
                loader: () => import('./products/Products')
            })
        }, 


        {
            path     : '/apps/e-commerce/tree-category',
            component: FuseLoadable({
                loader: () => import('./tree-category/TreeCategory')
            })
        }, 





        {
            path     : '/apps/e-commerce/clusterProduct/:categoryLabelId?/:categoryId?',
            component: FuseLoadable({
                loader: () => import('./clusterProduct/ClusterProductApp')
            })
        },
        {
            path     : '/apps/e-commerce/clusterProduct',
            component: () => <Redirect to="/apps/e-commerce/clusterProduct/all"/>
        },





        {
            path     : '/apps/e-commerce/warrantylist/warranty/:warrantyId',
            component: FuseLoadable({
                loader: () => import('./warranty/NewWarranty')
            })
        },      
        {
            path     : '/apps/e-commerce/warrantylist/:warrantyId',
            component: FuseLoadable({
                loader: () => import('./warranty/Warranty')
            })
        },
        {
            path     : '/apps/e-commerce/warrantylist',
            component: FuseLoadable({
                loader: () => import('./warrantylist/Warrantylist')
            })
        },

        {
            path     : '/apps/e-commerce/warrantylist-status/labels/all',
            component: FuseLoadable({
                loader: () => import('./warrantylist-status/WarrantylistStatusEdit')
            })
        },
        {
            path     : '/apps/e-commerce/warrantylist-status/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./warrantylist-status/WarrantylistStatusEdit')
            })
        },  
        {
            path     : '/apps/e-commerce/warrantylist-status',
            component: () => <Redirect to="/apps/e-commerce/warrantylist-status/labels/all"/>
        },   
 






        {
            path     : '/apps/e-commerce/orders/order/:orderId',
            component: FuseLoadable({
                loader: () => import('./order/NewOrder')
            })
        },      
        {
            path     : '/apps/e-commerce/orders/:orderId',
            component: FuseLoadable({
                loader: () => import('./order/Order')
            })
        },
        {
            path     : '/apps/e-commerce/orders',
            component: FuseLoadable({
                loader: () => import('./orders/Orders')
            })
        },
        {
            path     : '/apps/e-commerce/orders-map',
            component: FuseLoadable({
                loader: () => import('./orders-map/OrdersMap')
            })
        },
        {
            path     : '/apps/e-commerce/orders-status/labels/all',
            component: FuseLoadable({
                loader: () => import('./orders-status/OrdersStatusEdit')
            })
        },
        {
            path     : '/apps/e-commerce/orders-status/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./orders-status/OrdersStatusEdit')
            })
        },  
        {
            path     : '/apps/e-commerce/orders-status',
            component: () => <Redirect to="/apps/e-commerce/orders-status/labels/all"/>
        },      
        {
            path     : '/apps/e-commerce',
            component: () => <Redirect to="/apps/e-commerce/products"/>
        }
    ]
};
