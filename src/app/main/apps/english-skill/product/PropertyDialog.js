import React,{Component} from 'react';
import { Typography, Toolbar, AppBar, Dialog, DialogContent, DialogActions, Button} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../store/actions';
import PropertyDialogForm from './PropertyDialogForm';
import {FuseUtils} from '@fuse';
import { withTranslate } from 'react-redux-multilingual';

class PropertyDialog extends Component{
	
	dialogHandleClose = () => {
		this.props.closeNewPropertyDialog();
	};	
	
    componentDidMount()
    {
        this.props.getProperties();
		this.props.getPropertyLabels();
    }	
	canSubmit = () => {
		const {PropertyId, PropertyName, PropertyPrice, PropertyLabelId} = this.props.propertySelected;
		if(PropertyId && PropertyName && PropertyPrice && PropertyLabelId)
			return true;
		return false;
	}
	render(){ 
		const {properties, propertyLabels, addNewProperty, closeNewPropertyDialog, propertyEdit, translate} = this.props;
		return ( 
			this.props.open &&
			<div>
				<Dialog
					open={this.props.open}
					onClose={this.dialogHandleClose}
					aria-labelledby="draggable-dialog-title"
					fullWidth maxWidth="md"
				>							
					<AppBar position="static" elevation={1}>
						<Toolbar className="flex w-full">
							<Typography variant="subtitle1" color="inherit">
								{translate('Add_Property')}
							</Typography>
						</Toolbar>
					</AppBar>
					<DialogContent classes={{root: "p-0"}} style={{paddingTop:'10px'}}>
						<div className="px-16 sm:px-24">
							<PropertyDialogForm 
								propertyLabels={propertyLabels.map(({title, id, isColor}) => ({label:title, value:id, isColor}))}
								properties={properties.map((item) => ({
									label:item.title, 
									value:item.id, 
									PropertyName: item.title,
									PropertyId: item.id,
									PropertyPrice: item.price,
									PropertyPercent: item.addPrice,
									PropertyDescription: item.description,
									PropertyIcon: item.iconSrc,
									labels: item.labels,
									codeColor: item.codeColor,
									isColor: item.isColor,
								}))}
							/>						
						</div>															
					</DialogContent>
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
							disabled={!this.canSubmit()}
							onClick={()=> {
								let id = FuseUtils.generateGUID();
								if(propertyEdit)
									id = this.props.propertySelected.id;
								const {PropertyId, PropertyName, PropertyPrice, PropertyPercent, PropertyDescription, 
									PropertyIcon, PropertyLabelId, PropertyLabelName, codeColor, isColor} = this.props.propertySelected;
								const row = {id, PropertyId, PropertyName, PropertyPrice, PropertyPercent, PropertyDescription, 
									PropertyIcon, PropertyLabelId, PropertyLabelName, codeColor, isColor}; 
								addNewProperty(row);
								closeNewPropertyDialog();
							}}
                        >
						{
                            (propertyEdit ? translate('Save') : translate('Add'))
						}
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
        closeNewPropertyDialog : Actions.closeNewPropertyDialog,
		getProperties: Actions.getProperties,
		getPropertyLabels: Actions.getPropertyLabels,	
		addNewProperty : Actions.addNewProperty,
    }, dispatch);
}

function mapStateToProps({englishSkillApp})
{  
    return {
		open : englishSkillApp.product.propertyDialog.open,
		properties : englishSkillApp.product.properties,
		propertyLabels : englishSkillApp.product.propertyLabels,
		propertyLabelSelected : englishSkillApp.product.propertyLabelSelected,
		propertySelected : englishSkillApp.product.propertySelected,
		propertyEdit: englishSkillApp.product.propertyEdit,	
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(PropertyDialog));