import React,{Component} from 'react';
import {List, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '@fuse';
import {connect} from 'react-redux';
import SlidersListItem from './SlidersListItem';
import _ from '@lodash';
import {withRouter} from 'react-router-dom'

class SlidersList extends Component{
	
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
		const {sliders, searchText, orderBy, orderDescending} = this.props; 
		let arr = _.orderBy(this.getFilteredArray(sliders, searchText), [orderBy], [orderDescending ? 'desc' : 'asc']);
		let filter = this.props.match.params.filterHandle;
		if(filter)
			arr = arr.filter(item => item[filter]);
		
		if ( arr.length === 0 )
		{
			return (
				<FuseAnimate delay={100}>
					<div className="flex flex-1 items-center justify-center h-full">
						<Typography color="textSecondary" variant="h5">
							There are no sliders!
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
						arr.map((slider) => (
								<SlidersListItem slider={slider} key={slider.id}/>
							)
						)
					}
				</FuseAnimateGroup>
			</List>
		);		
	}
};

function mapStateToProps({slidersApp})
{
    return {
        sliders	: slidersApp.sliders.entities,
        searchText     	: slidersApp.sliders.searchText,
        orderBy        	: slidersApp.sliders.orderBy,
        orderDescending	: slidersApp.sliders.orderDescending
    }
}

export default withRouter(connect(mapStateToProps)(SlidersList));