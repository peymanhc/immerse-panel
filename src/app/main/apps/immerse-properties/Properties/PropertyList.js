import React from 'react';
import {List, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import _ from '@lodash';
import PropertyListItem from './PropertyListItem';

function getFilteredArray(entities, searchText)
{
    const arr = Object.keys(entities).map((id) => entities[id]);
    if ( searchText.length === 0 )
    {
        return arr;
    }
    return FuseUtils.filterArrayByString(arr, searchText);
}

const PropertyList = ({propertys, searchText, orderBy, orderDescending}) => {

    const arr = _.orderBy(getFilteredArray(propertys, searchText), [orderBy], [orderDescending ? 'desc' : 'asc']);

    if ( arr.length === 0 )
    {
        return (
            <FuseAnimate delay={100}>
                <div className="flex flex-1 items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no properties!
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
                    arr.map((property) => (
                            <PropertyListItem property={property} key={property.id}/>
                        )
                    )
                }
            </FuseAnimateGroup>
        </List>
    );
};

function mapStateToProps({immersePropertyApp})
{
    return {
        propertys          : immersePropertyApp.propertys.entities,
        searchText     : immersePropertyApp.propertys.searchText,
        orderBy        : immersePropertyApp.propertys.orderBy,
        orderDescending: immersePropertyApp.propertys.orderDescending
    }
}

export default withRouter(connect(mapStateToProps)(PropertyList));
