import React,{Component} from 'react';
import {List, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '@fuse';
import {connect} from 'react-redux';
import AccdocsStatusListItem from './AccdocsStatusListItem';
import _ from '@lodash';
import {withRouter} from 'react-router-dom'
import { withTranslate } from 'react-redux-multilingual';

class AccdocsStatusList extends Component{
	
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
		const {accdocsStatus, searchText, orderBy, orderDescending, translate} = this.props; 
		let arr = _.orderBy(this.getFilteredArray(accdocsStatus, searchText), [orderBy], [orderDescending ? 'desc' : 'asc']);
		let filter = this.props.match.params.filterHandle;
		if(filter)
			arr = arr.filter(item => item[filter]);
		
		if ( arr.length === 0 )
		{
			return (
				<FuseAnimate delay={100}>
					<div className="flex flex-1 items-center justify-center h-full">
						<Typography color="textSecondary" variant="h5">
							{translate('There_are_no_accdocs_status')}
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
						arr.map((accdocsStatus) => (
								<AccdocsStatusListItem accdocsStatus={accdocsStatus} key={accdocsStatus.id}/>
							)
						)
					}
				</FuseAnimateGroup>
			</List>
		);		
	}
};

function mapStateToProps({AccdocsStatusApp})
{
    return {
        accdocsStatus	: AccdocsStatusApp.accdocsStatus.entities,
        searchText     	: AccdocsStatusApp.accdocsStatus.searchText,
        orderBy        	: AccdocsStatusApp.accdocsStatus.orderBy,
        orderDescending	: AccdocsStatusApp.accdocsStatus.orderDescending
    }
}

export default withRouter(connect(mapStateToProps)(withTranslate(AccdocsStatusList)));