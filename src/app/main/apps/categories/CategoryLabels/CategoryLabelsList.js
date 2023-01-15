import React,{Component} from 'react';
import {List, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '@fuse';
import {connect} from 'react-redux';
import CategoryLabelsListItem from './CategoryLabelsListItem';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
import _ from '@lodash';
import {withRouter} from 'react-router-dom'
import { withTranslate } from 'react-redux-multilingual';

class CategoryLabelsList extends Component{
	
    componentDidMount()
    {
        this.props.getCategoryLabels();
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
		const {categorylabels, searchText, orderBy, orderDescending, translate} = this.props;
		let arr = _.orderBy(this.getFilteredArray(categorylabels, searchText), [orderBy], [orderDescending ? 'desc' : 'asc']);
		let filter = this.props.match.params.filterHandle;
		if(filter)
			arr = arr.filter(item => item[filter]);
		
		if ( arr.length === 0 )
		{
			return (
				<FuseAnimate delay={100}>
					<div className="flex flex-1 items-center justify-center h-full">
						<Typography color="textSecondary" variant="h5">
							{translate('There_are_no_categories')}
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
						arr.map((category) => (
								<CategoryLabelsListItem category={category} key={category.id}/>
							)
						)
					}
				</FuseAnimateGroup>
			</List>
		);		
	}
};

function mapStateToProps({CategoryApp})
{
    return {
        categorylabels : CategoryApp.categorylabels.entities,
        searchText     : CategoryApp.categorylabels.searchText,
        orderBy        : CategoryApp.categorylabels.orderBy,
        orderDescending: CategoryApp.categorylabels.orderDescending
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
		getCategoryLabels: Actions.getCategoryLabels,
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(CategoryLabelsList)));