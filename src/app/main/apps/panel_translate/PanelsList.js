import React,{Component} from 'react';
import {List, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '@fuse';
import {connect} from 'react-redux';
import PanelsListItem from './PanelsListItem';
import _ from '@lodash';
import {withRouter} from 'react-router-dom'

class PanelsList extends Component{
	
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
		const {panels, searchText, orderBy, orderDescending} = this.props; 
		let arr = _.orderBy(this.getFilteredArray(panels, searchText), [orderBy], [orderDescending ? 'desc' : 'asc']);

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
						arr.map((panel) => (
								<PanelsListItem panel={panel} key={panel.id}/>
							)
						)
					}
				</FuseAnimateGroup>
			</List>
		);		
	}
};

function mapStateToProps({panelsApp})
{
    return {
        panels			: panelsApp.panels.entities,
        searchText     	: panelsApp.panels.searchText,
        orderBy        	: panelsApp.panels.orderBy,
        orderDescending	: panelsApp.panels.orderDescending
    }
}

export default withRouter(connect(mapStateToProps)(PanelsList));