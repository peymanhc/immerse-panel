import React, {Component} from 'react';
import { withStyles, FormControl, TextField, Icon} from '@material-ui/core';
import {connect} from 'react-redux';
import * as Actions from '../store/actions';
import {bindActionCreators} from 'redux';
import {FuseChipSelect} from '@fuse';
import { withTranslate } from 'react-redux-multilingual';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    height: 350,
	paddingTop: '20px'
  },
	hidden:{
		display:'none',
	},
});

class PropertyDialogForm extends Component{

	state = {
		form: null,
	}
	
	componentDidUpdate(prevProps, prevState, snapshot){
		if((this.props.propertySelected !== this.state.form))
			this.setState({form: this.props.propertySelected});		
	}

	selectOnchangePropertyLabel = (row) => {
		if(row.length === 1)
			this.props.setPropertyLabelSelect(row[0].value);
		else if(row.length === 2)
			this.props.setPropertyLabelSelect(row[1].value);
		else
			this.props.setPropertyLabelSelect(null);
	}
	
	selectOnchangeProperty = (row) => {		
		if(row.length === 1){
			const propertyId = row[0].value
			let propertySelectValue = this.props.properties.find(item => item.PropertyId === propertyId);
			propertySelectValue["PropertyLabelId"] = this.props.propertyLabelSelected;
			const propertyLabelFound = this.props.propertyLabels.find(({value}) => value === this.props.propertyLabelSelected);
			propertySelectValue["PropertyLabelName"] = propertyLabelFound.label; 
			propertySelectValue["isColor"] = propertyLabelFound.isColor;
			propertySelectValue["codeColor"] = '';
			this.props.setPropertySelect(propertySelectValue);
		}
		else if(row.length === 2){
			const propertyId = row[1].value
			let propertySelectValue = this.props.properties.find(item => item.PropertyId === propertyId);
			propertySelectValue["PropertyLabelId"] = this.props.propertyLabelSelected;
			const propertyLabelFound = this.props.propertyLabels.find(({value}) => value === this.props.propertyLabelSelected);
			propertySelectValue["PropertyLabelName"] = propertyLabelFound.label;
			propertySelectValue["isColor"] = propertyLabelFound.isColor;
			propertySelectValue["codeColor"] = '';  
			this.props.setPropertySelect(propertySelectValue);
		}
		else
			this.props.setPropertySelect({
				propertyId: null,
				PropertyName: '',
				PropertyPrice: '',
				PropertyPercent: '',
				PropertyDescription: '',
				PropertyIcon: '',
				isColor: false,
				codeColor: '',	
			});		
	}	
	
	inputOnChange = (event) => { 
		const property = this.props.propertySelected;
		if(property.PropertyName){
			property[event.target.name] = event.target.value; 
			this.props.setPropertySelect(property);
			const form = this.state.form;
			form[event.target.name] = event.target.value; 
			this.setState({form});
		}
	};
	
	render(){
		const {classes, propertyLabels, properties, propertyLabelSelected, translate} = this.props;	
		const propertySelected = this.state.form !== null ? this.state.form: this.props.propertySelected;
		return (
			<div className={classes.root}>
				<div className="flex">
					<FuseChipSelect
						className="w-3/5"
						value={propertyLabels.find(item => item.value === propertyLabelSelected)}
						onChange={(value) => {this.selectOnchangePropertyLabel(value)}}
						placeholder={translate("Search_property_label1")}
						textFieldProps={{
							label          : translate('Label'),
							InputLabelProps: {
								shrink: true
							},
							variant        : 'outlined'
						}}
						options={propertyLabels}
						isMulti
					/>					
					<FuseChipSelect						
						className="w-3/5"
						value={(propertySelected.propertyId !== null ? properties.find(item => item.PropertyId === propertySelected.PropertyId): null)}
						onChange={(value) => {this.selectOnchangeProperty(value)}}
						placeholder={translate("Search_property_label2")}
						textFieldProps={{
							label          : translate('Label'),
							InputLabelProps: {
								shrink: true
							},
							variant        : 'outlined',
							style:{marginLeft:'10px'}
						}}
						options={properties.filter(({labels}) => labels.includes(propertyLabelSelected))}
						isMulti
					/>					
				</div>
				<div className="flex">
					<div className="w-3/5 pt-20">	
						<div className="flex">
							<div className="min-w-48 pt-20">     
								<Icon color="action">money</Icon>
							</div>
							<FormControl style={{width:'85%'}}>
								<TextField
									label={translate('Price')}
									name="PropertyPrice"
									value={propertySelected.PropertyPrice}
									variant="outlined"
									type= 'number'
									onChange={(event) => {this.inputOnChange(event)}}
								/>	
							</FormControl>	
						</div>
					</div>
					<div className="w-3/5 pt-20">	
						<div className="flex">
							<div className="min-w-48 pt-20" style={{marginLeft:'10px'}}>     
								<Icon color="action">attach_money</Icon>
							</div>
							<FormControl style={{width:'85%'}}>
								<TextField
									label={translate('Percent')}
									name="PropertyPercent"
									value={propertySelected.PropertyPercent}
									variant="outlined"
									InputProps={{
										readOnly: true,
									}}
								/>	
							</FormControl>	
						</div>
					</div>				
				</div>
				<div className={propertySelected.isColor === true ? '': classes.hidden}>
					<div className="flex">
						<div className="w-3/5 pt-20">	
							<div className="flex">
								<div className="min-w-48 pt-20">     
									<Icon color="action">color_lens</Icon>
								</div>
								<FormControl style={{width:'85%'}}>
									<TextField
										label={translate('Code_Color')}
										name="codeColor"
										value={propertySelected.codeColor || ''}
										variant="outlined"
										onChange={(event) => {this.inputOnChange(event)}}
									/>	
								</FormControl>	
							</div>
						</div>				
					</div>
				</div>
				<FormControl className="mt-8 mb-16 pt-20" fullWidth>
					<TextField
						label={translate('Description')}
						name="PropertyDescription"
						value={propertySelected.PropertyDescription}
						onChange={(event) => {this.inputOnChange(event)}}
						variant="outlined"
						rows="6"
						multiline
					/>	
				</FormControl>					
			</div>
		);		
	}
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        setPropertyLabelSelect : Actions.setPropertyLabelSelect,
        setPropertySelect : Actions.setPropertySelect,
    }, dispatch);
}

function mapStateToProps({imTvApp})
{  
    return {
		propertyLabelSelected : imTvApp.product.propertyLabelSelected,
		propertySelected : imTvApp.product.propertySelected,
    }
}

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(withTranslate(PropertyDialogForm)));