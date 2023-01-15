 import React, {Component} from 'react';
import { withStyles, FormControl, TextField, Icon, Radio, FormControlLabel} from '@material-ui/core';
import {connect} from 'react-redux';
import * as Actions from '../store/actions';
import {bindActionCreators} from 'redux';
import {FuseChipSelect} from '@fuse';
 
import { withTranslate } from 'react-redux-multilingual';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    height: 550,
	paddingTop: '20px'
  },
	hidden:{
		display:'none',
	},
});

const WhiteRadio = withStyles({
  root: {
    color: '#c4c4c4',
    '&$checked': {
		color: '#4dbcf9',
    },
    '&:hover': {
		color: '#4dbcf9',
    },	
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

const FormControlLabel1 = withStyles({
	root: {
		background:'white',
		borderRadius:22,
		height:33,
		border: '1px solid #c4c4c4',
		marginRight:25,
		marginLeft:0,		
	},
	label:{
		marginRight:10,
	},
})(props => <FormControlLabel {...props} />);

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
			this.props.setPropertySelect(propertySelectValue);
		}
		else if(row.length === 2){
			const propertyId = row[1].value
			let propertySelectValue = this.props.properties.find(item => item.PropertyId === propertyId);
			propertySelectValue["PropertyLabelId"] = this.props.propertyLabelSelected;
			const propertyLabelFound = this.props.propertyLabels.find(({value}) => value === this.props.propertyLabelSelected);
			propertySelectValue["PropertyLabelName"] = propertyLabelFound.label;
			propertySelectValue["isColor"] = propertyLabelFound.isColor;
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
				voicelink:'',
				showType: 'Both',	
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

	ckEditorHandleChange  = (event, editor ) => { 
		const data = editor.getData();
		const property = this.props.propertySelected;
		if(property.PropertyName){
			property["PropertyDescription"] = data; 
			this.props.setPropertySelect(property);
			const form = this.state.form;
			form["PropertyDescription"] = data; 
			this.setState({form});
		}
	};
	render(){
		const {classes, propertyLabels, properties, propertyLabelSelected, translate} = this.props;	
		const propertySelected = this.state.form !== null ? this.state.form: this.props.propertySelected; 
		
		const types = [
			{
				id:"1", title:"Both",
			}, 
			{
				id:"2", title:"Top",
			}, 
			{
				id:"3", title:"Bottom",
			}
		];		
		
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
					
							<div className="min-w-28 pt-20">     
								<Icon color="action">money</Icon>
							</div>
							<FormControl  className="w-1/4 pt-8 pb-8">
								<TextField
									label={translate('Price')}
									name="PropertyPrice"
									value={propertySelected.PropertyPrice}
									variant="outlined"
									type= 'number'
									onChange={(event) => {this.inputOnChange(event)}}
								/>	
							</FormControl>	
						 
							<div className="min-w-28 pt-20" style={{marginLeft:'10px'}}>     
								<Icon color="action">attach_money</Icon>
							</div>
							<FormControl className="w-1/5 pt-8 pb-8">
								<TextField
									label={translate('Percent')}
									name="PropertyPercent"
									value={propertySelected.PropertyPercent}
									variant="outlined"
									InputProps={{readOnly: false,}}
									onChange={(event) => {this.inputOnChange(event)}}
								/>	
							</FormControl>	 

							<div className="w-1/2 pt-12 pl-20 pb-20">	
							<div className="flex">
								{
									types.map(({id, title}) => 
										<FormControlLabel1
											key={id}
											control={
												<WhiteRadio
													checked={propertySelected.showType === title}
													onChange={this.inputOnChange}
													value={title}
													name="showType"
													inputProps={{ 'aria-label': {title} }}										
												/>									
											}
											label={title}
											labelPlacement="end"
										/>												
									)
								}	
							</div>
						</div>	
				
				</div>
				 



				<div className={propertySelected.isColor === true ? '': classes.hidden}>
					<div className="flex">
						<div className="w-3/5 pt-20">	
							<div className="flex">
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
			 		
                <CKEditor
                    editor={ ClassicEditor }
                    id="PropertyDescription"
                    name="PropertyDescription"
                    data={propertySelected.PropertyDescription}
                     
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        //console.log( 'Editor is ready to use!', editor );
                    } }
                     onChange={this.ckEditorHandleChange} 
                    onBlur={ ( event, editor ) => {
                        //console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        //console.log( 'Focus.', editor );
                    } }
                />


                 	<div className="flex">
						<div className="w-3/5 pt-20">	
							<div className="flex">
								<FormControl style={{width:'85%'}}>
									<TextField
										label={translate('voicelink')}
										name="voicelink"
										value={propertySelected.voicelink || ''}
										variant="outlined"
										onChange={(event) => {this.inputOnChange(event)}}
									/>	
								</FormControl>	
							</div>
						</div>				
					</div>
				 
	             
                        



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

function mapStateToProps({eCommerceApp})
{  
    return {
		propertyLabelSelected : eCommerceApp.product.propertyLabelSelected,
		propertySelected : eCommerceApp.product.propertySelected,
    }
}

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(withTranslate(PropertyDialogForm)));