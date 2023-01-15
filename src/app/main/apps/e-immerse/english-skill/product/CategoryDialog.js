import React,{Component} from 'react';
import { Typography, Toolbar, AppBar, Dialog, DialogContent, DialogActions, Button} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../store/actions';
import {FuseChipSelect} from '@fuse';
import { withTranslate } from 'react-redux-multilingual';

class CategoryDialog extends Component{
	
	state = {
		categoryLabelSelected : null,
		categorySelected : null,
		  appcode : 'immerse',
	};
	dialogHandleClose = () => {
		this.props.closeNewCategoryDialog();
	};	
	
    componentDidMount()
    {
        this.props.getCategories();
		this.props.getCategoryLabels();
    }	
	
	selectOnchangeCategoryLabel = (row) => {
		this.setState({categoryLabelSelected : row, categorySelected: null});
	}
	
	selectOnchangeCategory = (row) => {
		this.setState({categorySelected : row});
	}	

	canSubmit = () => {
		const {categoryLabelSelected} = this.state;
		if(categoryLabelSelected)
			return true;
		return false;
	}
	
	render(){
		const {categories, categoryLabels, translate, form} = this.props;
		const {categoryLabelSelected, categorySelected  , appcode } = this.state;	
		let s="A";
		let filteredCategoryLabels = categoryLabels;
 		if(form !== null){
			const {clusterId} = form;	s="A00";		  
			if(clusterId === -1 ){
				filteredCategoryLabels = categoryLabels; s="A1"; 
			}
			
			else if(clusterId) {
				filteredCategoryLabels = categoryLabels.filter(item => item.clusterId === clusterId);
				s="A2";
			}
		}
		else {
			filteredCategoryLabels = categoryLabels;
			s="A3";
		}
		
		const categoriesFiltered = [];
		if(categoryLabelSelected != null)
			 categories.filter(({labels}) => labels.includes(categoryLabelSelected.value)).forEach(({title, id}) => categoriesFiltered.push({label:title, value:id}));		
		
		return ( 
			this.props.open &&
			<div>
				<Dialog
					open={this.props.open}
					onClose={() => {
						this.setState({categoryLabelSelected: null, categorySelected: null});
						this.dialogHandleClose();
					}}
					aria-labelledby="draggable-dialog-title"
					fullWidth
				>  	 
					<AppBar position="static" elevation={1}>
						<Toolbar className="flex w-full">
							<Typography variant="subtitle1" color="inherit">
								{translate('Add_Category')} {s}
							</Typography>
						</Toolbar>
					</AppBar>
					<DialogContent classes={{root: "p-0"}} style={{paddingTop:'10px', minHeight:'320px'}}>
						<div className="px-16 sm:px-24">
							<div className="flex">
								<FuseChipSelect
									onChange={this.selectOnchangeCategoryLabel}
									className="w-full"
									value={categoryLabelSelected}
									placeholder={translate('Search_a_category1')}
									textFieldProps={{
										label          : translate('Label'),
										InputLabelProps: {
											shrink: true
										},
										variant        : 'outlined',
										style:{marginTop:'20px'}
									}}
									options={filteredCategoryLabels.map(({title, id}) => ({label:title, value:id}))}
									
								/>								
							</div>	
						</div>

				 {    appcode==='global' && ( 
						<div className="px-16 sm:px-24">
							<div className="flex">	
								<FuseChipSelect
									onChange={this.selectOnchangeCategory}
									value={categorySelected}
									className="w-full"
									placeholder={translate('Search_a_category1')}
									textFieldProps={{
										label          : translate('Label'),
										InputLabelProps: {
											shrink: true
										},
										variant        : 'outlined',
										style:{marginTop:'40px', marginBottom:'10px',}
									}}
									options={categoriesFiltered}
									
								/>	
							</div>	
						</div>		
                     )}

					</DialogContent>
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
							disabled={!this.canSubmit()}
							onClick={()=> {   
								let level = categoryLabelSelected.label;
								let object = null;
								if(categorySelected){
									level += '/' + categorySelected.label;
									object = {title:categorySelected.label, id:categorySelected.value, categoryLabelId:categoryLabelSelected.value};
								}
								else
									object = {categoryLabelId:categoryLabelSelected.value};
								this.props.onCategorySelect(level, object);
								this.props.closeNewCategoryDialog();
								this.setState({categoryLabelSelected: null, categorySelected: null});
							}}
							
                        >
							{translate('Add')}
                        </Button>
                    </DialogActions>					
				</Dialog>			
			</div>
		);
	}
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeNewCategoryDialog : Actions.closeNewCategoryDialog,
		getCategories: Actions.getCategories,
		getCategoryLabels: Actions.getCategoryLabels
    }, dispatch);
}

function mapStateToProps({eCommerceApp})
{  
    return {
		open : eCommerceApp.product.categoryDialog.open,
		form : eCommerceApp.product.categoryDialog.form,
		categories : eCommerceApp.product.categories,
		categoryLabels : eCommerceApp.product.categoryLabels
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(CategoryDialog));