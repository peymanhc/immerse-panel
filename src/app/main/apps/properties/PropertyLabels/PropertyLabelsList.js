import React,{Component} from 'react';
import {List, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '@fuse';
import {connect} from 'react-redux';
import PropertyLabelsListItem from './PropertyLabelsListItem';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
import _ from '@lodash';
import {withRouter} from 'react-router-dom'
import { withTranslate } from 'react-redux-multilingual';

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
		const {propertylabels, searchText, orderBy, orderDescending, translate} = this.props;
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
							{translate('There_are_no_properties')}
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

function mapStateToProps({PropertyApp})
{
    return {
        propertylabels : PropertyApp.propertylabels.entities,
        searchText     : PropertyApp.propertylabels.searchText,
        orderBy        : PropertyApp.propertylabels.orderBy,
        orderDescending: PropertyApp.propertylabels.orderDescending
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
		getPropertyLabels: Actions.getPropertyLabels,
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(PropertyLabelsList)));