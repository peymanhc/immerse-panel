import React,{Component} from 'react';
import {List, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '@fuse';
import {connect} from 'react-redux';
import StoresListItem from './StoresListItem';
import _ from '@lodash';
import {withRouter} from 'react-router-dom'

class StoresList extends Component{
	
    componentDidMount()
    {

    }
	
	getFilteredArray = (entities, searchText) =>
	{
		const arr = Object.keys(entities).map((id) => entities[id]);
		if ( searchText.length === 0 )
		{
			return arr;
		}
		return FuseUtils.filterArrayByString(arr, searchText);
	}	

	render(){ 
		const {stores, searchText, orderBy, orderDescending} = this.props; 
		let arr = _.orderBy(this.getFilteredArray(stores, searchText), [orderBy], [orderDescending ? 'desc' : 'asc']);

		if ( arr.length === 0 )
		{
			return (
				<FuseAnimate delay={100}>
					<div className="flex flex-1 items-center justify-center h-full">
						<Typography color="textSecondary" variant="h5">
							There are no vocabulary!
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
						arr.map((store) => (
								<StoresListItem store={store} key={store.id}/>
							)
						)
					}
				</FuseAnimateGroup>
			</List>
		);		
	}
};

function mapStateToProps({storesApp})
{
    return {
        stores			: storesApp.stores.entities,
        searchText     	: storesApp.stores.searchText,
        orderBy        	: storesApp.stores.orderBy,
        orderDescending	: storesApp.stores.orderDescending
    }
}

export default withRouter(connect(mapStateToProps)(StoresList));