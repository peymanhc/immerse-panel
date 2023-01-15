import React,{Component} from 'react';
import {List, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '@fuse';
import {connect} from 'react-redux';
import VehicletypelistListItem from './VehicletypelistListItem';
import _ from '@lodash';
import {withRouter} from 'react-router-dom'

class VehicletypelistList extends Component{
	
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
		const {vehicletypelist, searchText, orderBy, orderDescending} = this.props; 
		let arr = _.orderBy(this.getFilteredArray(vehicletypelist, searchText), [orderBy], [orderDescending ? 'desc' : 'asc']);
		let filter = this.props.match.params.filterHandle;
		if(filter)
			arr = arr.filter(item => item[filter]);
		
		if ( arr.length === 0 )
		{
			return (
				<FuseAnimate delay={100}>
					<div className="flex flex-1 items-center justify-center h-full">
						<Typography color="textSecondary" variant="h5">
							There are no vehicletypelist!
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
						arr.map((vehicletype) => (
								<VehicletypelistListItem vehicletype={vehicletype} key={vehicletype.id}/>
							)
						)
					}
				</FuseAnimateGroup>
			</List>
		);		
	}
};

function mapStateToProps({vehicletypelistApp})
{
    return {
        vehicletypelist	: vehicletypelistApp.vehicletypelist.entities,
        searchText     	: vehicletypelistApp.vehicletypelist.searchText,
        orderBy        	: vehicletypelistApp.vehicletypelist.orderBy,
        orderDescending	: vehicletypelistApp.vehicletypelist.orderDescending
    }
}

export default withRouter(connect(mapStateToProps)(VehicletypelistList));
