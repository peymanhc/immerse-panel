import React,{Component} from 'react';
import { Typography, Toolbar, AppBar, Dialog, DialogContent, DialogActions, Button} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../store/actions/post';
import {FuseChipSelect} from '@fuse';
import { withTranslate } from 'react-redux-multilingual';
 

 
class CityStateDialog extends Component{
	
	state = {
		cityStateLabelSelected : null,
		cityStateSelected : null,
	};
	dialogHandleClose = () => {
		this.props.closeNewCityStateDialog();
	};	
	
    componentDidMount()
    {
        this.props.getCityStates();
		this.props.getCityStateLabels();
    }	
	
	selectOnchangeCityStateLabel = (row) => {
		this.setState({cityStateLabelSelected : row, cityStateSelected: null});
	}
	
	selectOnchangeCityState = (row) => {
		this.setState({cityStateSelected : row});
	}	

	canSubmit = () => {
		const {cityStateLabelSelected} = this.state;
		if(cityStateLabelSelected)
			return true;
		return false;
	}
	
	render(){
		const {cityStates, cityStateLabels, translate } = this.props; 
		const {cityStateLabelSelected, cityStateSelected} = this.state;
		
		let cityStatesFiltered = [];

		if(cityStateLabelSelected != null)
			cityStatesFiltered = cityStates.filter(({province}) => province === cityStateLabelSelected.label).map(({title, id}) => ({label:title, value:id}));
		
		//	 cityStates.filter(({labels}) => labels.includes(cityStateLabelSelected.value)).forEach(({title, id}) => 
		//	 	cityStatesFiltered.push({label:title, value:id}));
		return ( 
			this.props.open &&
			<div>
				<Dialog
					open={this.props.open}
					onClose={this.dialogHandleClose}
					aria-labelledby="draggable-dialog-title"
					fullWidth
				>
					<AppBar position="static" elevation={1}>
						<Toolbar className="flex w-full">
							<Typography variant="subtitle1" color="inherit">
								{translate('ADD_CityState')}
							</Typography>
						</Toolbar>
					</AppBar>
					<DialogContent classes={{root: "p-0"}} style={{paddingTop:'10px', minHeight:'300px'}}>
						<div className="px-16 sm:px-24">
							<div className="flex">
								<FuseChipSelect
									onChange={this.selectOnchangeCityStateLabel}
									className="w-full"
									value={cityStateLabelSelected}
									placeholder={translate('Search_a_cityState1')}
									textFieldProps={{
										label          : translate('Label'),
										InputLabelProps: {
											shrink: true
										},
										variant        : 'outlined',
										style:{marginTop:'20px'}
									}}
									options={cityStateLabels.map(({title, id}) => ({label:title, value:id}))}
									
								/>								
							</div>	
						</div>
						<div className="px-16 sm:px-24">
							<div className="flex">	
								<FuseChipSelect
									onChange={this.selectOnchangeCityState}
									value={cityStateSelected}
									className="w-full"
									placeholder={translate('Search_a_cityState1')}
									textFieldProps={{
										label          : translate('Label'),
										InputLabelProps: {
											shrink: true
										},
										variant        : 'outlined',
										style:{marginTop:'40px', marginBottom:'10px',}
									}}
									options={cityStatesFiltered}
									
								/>	
							</div>	
						</div>		
					</DialogContent>
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
							disabled={!this.canSubmit()}
							onClick={()=> {
								let level = cityStateLabelSelected.label;
								let object = null;
								if(cityStateSelected){
									level += '/' + cityStateSelected.label;
									object = {title:cityStateSelected.label, id:cityStateSelected.value};
								}
								this.props.onCityStateSelect(level, object);
								this.props.closeNewCityStateDialog();
								this.setState({cityStateLabelSelected: null, cityStateSelected: null});
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
        closeNewCityStateDialog : Actions.closeNewCityStateDialog,
		getCityStates: Actions.getCityStates,
		getCityStateLabels: Actions.getCityStateLabels
    }, dispatch);
}

function mapStateToProps({kandidaApp})
{  
    return {
		open : kandidaApp.post.cityStateDialog.open,
		cityStates : kandidaApp.post.cityStates,
		cityStateLabels : kandidaApp.post.cityStateLabels
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(CityStateDialog));
