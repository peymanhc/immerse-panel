import React,{Component} from 'react';
import {List, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '@fuse';
import {connect} from 'react-redux';
import PropertyLabelsListItem from './PropertyLabelsListItem';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
import _ from '@lodash';
import {withRouter} from 'react-router-dom'

class PropertyLabelsList extends Component{
	
    componentDidMount()
    {
        this.props.getPropertyLabels();
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
		const {propertylabels, searchText, orderBy, orderDescending} = this.props;
		let arr = _.orderBy(this.getFilteredArray(propertylabels, searchText), [orderBy], [orderDescending ? 'desc' : 'asc']);
		let filter = this.props.match.params.filterHandle;
		if(filter)
			arr = arr.filter(item => item[filter]);
		
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
								<PropertyLabelsListItem property={property} key={property.id}/>
							)
						)
					}
				</FuseAnimateGroup>
			</List>
		);		
	}
};

function mapStateToProps({englishSkillPropertyApp})
{
    return {
        propertylabels : englishSkillPropertyApp.propertylabels.entities,
        searchText     : englishSkillPropertyApp.propertylabels.searchText,
        orderBy        : englishSkillPropertyApp.propertylabels.orderBy,
        orderDescending: englishSkillPropertyApp.propertylabels.orderDescending
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
		getPropertyLabels: Actions.getPropertyLabels,
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PropertyLabelsList));