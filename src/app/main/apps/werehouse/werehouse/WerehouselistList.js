import React,{Component} from 'react';
import {List, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '@fuse';
import {connect} from 'react-redux';
import WerehouselistListItem from './WerehouselistListItem';
import _ from '@lodash';
import {withRouter} from 'react-router-dom'

class WerehouselistList extends Component{
	
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
		const {werehouselistCASE, searchText, orderBy, orderDescending} = this.props; 
		let arr = _.orderBy(this.getFilteredArray(werehouselistCASE, searchText), [orderBy], [orderDescending ? 'desc' : 'asc']);
		let filter = this.props.match.params.filterHandle;
		if(filter)
			arr = arr.filter(item => item[filter]);
		
		if ( arr.length === 0 )
		{
			return (
				<FuseAnimate delay={100}>
					<div className="flex flex-1 items-center justify-center h-full">
						<Typography color="textSecondary" variant="h5">
							There are no werehouselistCASE!
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
						arr.map((werehouse) => (
								<WerehouselistListItem werehouse={werehouse} key={werehouse.id}/>
							)
						)
					}
				</FuseAnimateGroup>
			</List>
		);		
	}
};

function mapStateToProps({werehouselistCASEApp})
{
    return {
        werehouselistCASE	: werehouselistCASEApp.werehouselistCASE.entities,
        searchText     	: werehouselistCASEApp.werehouselistCASE.searchText,
        orderBy        	: werehouselistCASEApp.werehouselistCASE.orderBy,
        orderDescending	: werehouselistCASEApp.werehouselistCASE.orderDescending
    }
}

export default withRouter(connect(mapStateToProps)(WerehouselistList));
