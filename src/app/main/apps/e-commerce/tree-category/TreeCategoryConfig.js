import {FuseLoadable} from '@fuse';

export const TreeCategoryConfig = [
    {
        path     : '/apps/e-commerce/tree-category',
        component: FuseLoadable({
            loader: () => import('./TreeCategoryForm')
        })
    },
];
