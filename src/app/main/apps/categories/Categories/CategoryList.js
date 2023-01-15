import React from 'react';
import {List, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import _ from '@lodash';
import CategoryListItem from './CategoryListItem';
import { withTranslate } from 'react-redux-multilingual';

function getFilteredArray(entities, searchText)
{
    const arr = Object.keys(entities).map((id) => entities[id]);
    if ( searchText.length === 0 )
    {
        return arr;
    }
    return FuseUtils.filterArrayByString(arr, searchText);
}

const CategoryList = ({categorys, searchText, orderBy, orderDescending, translate}) => {

    const arr = _.orderBy(getFilteredArray(categorys, searchText), [orderBy], [orderDescending ? 'desc' : 'asc']);

    if ( arr.length === 0 )
    {
        return (
            <FuseAnimate delay={100}>
                <div className="flex flex-1 items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
						{translate('There_are_no_categories')}
                    </Typography>
                </div>
            </FuseAnimate>
        );
    }

    return (
        <List className="p-0">
            <FuseAnimateGroup
                enter={{
                    animation: "transition.slideUpBigIn"
                }}
            >
                {
                    arr.map((category) => (
                            <CategoryListItem category={category} key={category.id}/>
                        )
                    )
                }
            </FuseAnimateGroup>
        </List>
    );
};

function mapStateToProps({CategoryApp})
{
    return {
        categorys          : CategoryApp.categorys.entities,
        searchText     : CategoryApp.categorys.searchText,
        orderBy        : CategoryApp.categorys.orderBy,
        orderDescending: CategoryApp.categorys.orderDescending
    }
}

export default withRouter(connect(mapStateToProps)(withTranslate(CategoryList)));
