import React from 'react';
import {List, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import _ from '@lodash';
import AddressListItem from './AddressListItem';
import { withTranslate } from 'react-redux-multilingual';  //--maddahi-and addtranslate words--//


function getFilteredArray(entities, searchText)
{
    const arr = Object.keys(entities).map((id) => entities[id]);
    if ( searchText.length === 0 )
    {
        return arr;
    }
    return FuseUtils.filterArrayByString(arr, searchText);
}

const AddressList = ({addresses, searchText, orderBy, orderDescending, translate}) => {

    const arr = _.orderBy(getFilteredArray(addresses, searchText), [orderBy], [orderDescending ? 'desc' : 'asc']);

    if ( arr.length === 0 )
    {
        return (
            <FuseAnimate delay={100}>
                <div className="flex flex-1 items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                            {translate('address_no_list')} 
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
                    arr.map((address) => (
                            <AddressListItem address={address} key={address.id}/>
                        )
                    )
                }
            </FuseAnimateGroup>
        </List>
    );
};

function mapStateToProps({addressApp})
{
    return {
        addresses      : addressApp.addresses.entities,
        searchText     : addressApp.addresses.searchText,
        orderBy        : addressApp.addresses.orderBy,
        orderDescending: addressApp.addresses.orderDescending
    }
}

export default withRouter(connect(mapStateToProps)(withTranslate(AddressList)));
