import React from 'react';
import {List, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import _ from '@lodash';
import CategoryListItem from './CategoryListItem';

function getFilteredArray(entities, searchText)
{
    const arr = Object.keys(entities).map((id) => entities[id]);
    if ( searchText.length === 0 )
    {
        return arr;
    }
    return FuseUtils.filterArrayByString(arr, searchText);
}

const CategoryList = ({categorys, searchText, orderBy, orderDescending}) => {

    const arr = _.orderBy(getFilteredArray(categorys, searchText), [orderBy], [orderDescending ? 'desc' : 'asc']);

    if ( arr.length === 0 )
    {
        return (
            <FuseAnimate delay={100}>
                <div className="flex flex-1 items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no categories!
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

function mapStateToProps({bookstoreCategoryApp})
{
    return {
        categorys          : bookstoreCategoryApp.categorys.entities,
        searchText     : bookstoreCategoryApp.categorys.searchText,
        orderBy        : bookstoreCategoryApp.categorys.orderBy,
        orderDescending: bookstoreCategoryApp.categorys.orderDescending
    }
}

export default withRouter(connect(mapStateToProps)(CategoryList));
