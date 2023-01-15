import React, {Component} from 'react';
import {withStyles, IconButton, Icon, CircularProgress, Button, Typography, } from '@material-ui/core';
import {FusePageSimple, FuseAnimate} from '@fuse';
import _ from '@lodash';

import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; 

import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions/treeCategory.actions';
import reducer from '../store/reducers';

import TreeCategoryDialog from './TreeCategoryDialog';

const styles = theme => ({
    layoutRoot: {}
});

class TreeCategoryForm extends Component {
	
	state = {
		treeData: this.props.categories,
	};
	
    componentDidMount()
    {
        this.props.getData();
    }	
	
    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( !_.isEqual(this.props.categories, prevProps.categories) )
        {
			this.setState({treeData:this.props.categories});
        }
    }
	
	customOnChangeCategory = treeData => {
        if ( !_.isEqual(this.state.treeData, treeData) )
        {
			this.props.onChangeCategory(treeData);
        }		
	}
	
    render()
    { 
        const {openNewCategoryDialog, openEditCategoryDialog, indexLoading, } = this.props;
		const {treeData,} = this.state;
		
		//console.log(treeData);
		
        return (
			<React.Fragment>
				<FusePageSimple  className="p-8"
					classes={{
						toolbar: "p-0",
						header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
					}}
					header={
						<div className="flex flex-1 w-full items-center justify-between p-24">	
							<div className="flex items-center">
								<FuseAnimate animation="transition.expandIn" delay={300}>
									<Icon className="text-32 mr-0 sm:mr-12">category</Icon>
								</FuseAnimate>
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Typography className="hidden sm:flex" variant="h6">Tree Category</Typography>
								</FuseAnimate>
							</div>							
							<div className="text-center">
								<CircularProgress className={indexLoading ? "text-white" : "hidden"}/>
							</div>
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<Button
									className="whitespace-no-wrap"
									variant="contained"
									onClick={()=> openNewCategoryDialog({path : null, treeIndex : null})}
									disabled={indexLoading}
								>
									new category
								</Button>
							</FuseAnimate>
						</div>
					}
					 
					content={
						<div style={{ height: 640 }} className="p-8">
							<SortableTree
								generateNodeProps={rowInfo => ({
									buttons: [
										<IconButton
											onClick={() => openNewCategoryDialog({path:rowInfo.path, treeIndex:rowInfo.treeIndex})}
										>
											<Icon>add</Icon>
										</IconButton>										
										,
										<IconButton										
											onClick={() => openEditCategoryDialog(rowInfo.node, {path:rowInfo.path, treeIndex:rowInfo.treeIndex})}
										>
											<Icon>edit</Icon>
										</IconButton>												
									],
								})}
								//onMoveNode={({treeData}) => onChangeCategory(treeData)}
								treeData={treeData}
								onChange={treeData =>  this.customOnChangeCategory(treeData)}					
							/>
						</div>
					}
				/>
				<TreeCategoryDialog />
			</React.Fragment>
        )
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getData					: Actions.getData,
		openNewCategoryDialog	: Actions.openNewCategoryDialog,
		openEditCategoryDialog	: Actions.openEditCategoryDialog,
		onChangeCategory		: Actions.onChangeCategory,
    }, dispatch);
}

function mapStateToProps({eCommerceApp:{treeCategory}})
{
    return {
        categories		: treeCategory.categories,
        indexLoading	: treeCategory.indexLoading,
    }
}
export default withReducer('eCommerceApp', reducer)(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(TreeCategoryForm)));