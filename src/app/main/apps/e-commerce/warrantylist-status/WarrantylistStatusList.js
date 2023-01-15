import React,{Component} from 'react';
import {List, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '@fuse';
import {connect} from 'react-redux';
import WarrantylistStatusListItem from './WarrantylistStatusListItem';
import _ from '@lodash';
import {withRouter} from 'react-router-dom'
import { withTranslate } from 'react-redux-multilingual';

class WarrantylistStatusList extends Component{
	
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
		const {warrantylistStatus, searchText, orderBy, orderDescending, translate} = this.props; 
		let arr = _.orderBy(this.getFilteredArray(warrantylistStatus, searchText), [orderBy], [orderDescending ? 'desc' : 'asc']);
		let filter = this.props.match.params.filterHandle;
		if(filter)
			arr = arr.filter(item => item[filter]);
		
		if ( arr.length === 0 )
		{
			return (
				<FuseAnimate delay={100}>
					<div className="flex flex-1 items-center justify-center h-full">
						<Typography color="textSecondary" variant="h5">
							{translate('There_are_no_warrantylist_status')}
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
						arr.map((warrantylistStatus) => (
								<WarrantylistStatusListItem warrantylistStatus={warrantylistStatus} key={warrantylistStatus.id}/>
							)
						)
					}
				</FuseAnimateGroup>
			</List>
		);		
	}
};

function mapStateToProps({WarrantylistStatusApp})
{
    return {
        warrantylistStatus	: WarrantylistStatusApp.warrantylistStatus.entities,
        searchText     	: WarrantylistStatusApp.warrantylistStatus.searchText,
        orderBy        	: WarrantylistStatusApp.warrantylistStatus.orderBy,
        orderDescending	: WarrantylistStatusApp.warrantylistStatus.orderDescending
    }
}

export default withRouter(connect(mapStateToProps)(withTranslate(WarrantylistStatusList)));