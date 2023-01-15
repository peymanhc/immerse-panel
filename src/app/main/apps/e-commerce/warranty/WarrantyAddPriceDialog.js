import React, {Component} from 'react';
import {   Button, Dialog, DialogActions, DialogContent, Toolbar, AppBar, TextField, InputAdornment, FormControlLabel, 
	       Checkbox} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions/warranty.actions';
import {connect} from 'react-redux';
import _ from '@lodash';
import { withTranslate } from 'react-redux-multilingual';
import {FuseUtils} from '@fuse';

class AddPriceDialog extends Component {

    state = {
		form : null,

	};
	
    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( !prevProps.warrantyAddPriceDialog.open && this.props.warrantyAddPriceDialog.open )
        {

            if (this.props.warranty && !_.isEqual(this.props.warranty, prevState) )
            {
                this.setState({form: {...this.props.warranty}});
            }
        }
    }
	
    canBeSubmitted()
    {
		const form = this.state.form;
		if(form != null){
			const currentPrice = this.state.form.setPrice.find(item => item.companyId === this.props.userId);
			if(currentPrice){
				return currentPrice.WarrantyPriceOffer ? false : true;
				//return currentPrice.WarrantyPriceOffer && !_.isEqual(this.props.warranty, this.state.form) ? false : true;	
			}
			else 
				return true;
		}
		return true;
    }

    handleChange = (event) => {
        //this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
		const form = this.state.form;
		let currentPrice = undefined;
		if(form && form.setPrice)
			currentPrice = form.setPrice.find(item => item.companyId === this.props.userId);	
		
		if(!currentPrice){
			
			currentPrice = {
				id					: FuseUtils.generateGUID(),
				companyId			: this.props.userId,
				displayName			: this.props.displayName,
				warrantyConfirmRequire	: false,
				WarrantyPriceOffer		: "",
			};
			
		}
		
		if(event.target.type === 'checkbox'){
			currentPrice.warrantyConfirmRequire = event.target.checked;		
			currentPrice.datetime = new Date();	
		}
		else{
			currentPrice.WarrantyPriceOffer = event.target.value;
			currentPrice.datetime = new Date();	
		}
		
		const setPrice = this.state.form.setPrice;
		if(typeof setPrice === "object" ){
			const filtered = setPrice.filter(item => item.companyId !== this.props.userId);
			const newSetPrice = [...filtered, currentPrice];
			this.setState({form:{...this.state.form, setPrice:newSetPrice}});
		}
		else
			this.setState({form:{...this.state.form, setPrice:[currentPrice]}});
		
		//if(form && form.setPrice)
		//this.setState({form:{...this.state.form, setPrice:[...this.state.form.setPrice.filter(item => item.companyId !== this.props.userId), currentPrice]}});
		//else
		//	this.setState({form:{...this.state.form, setPrice:[currentPrice]}});
    };
	
    render()
    {
        const {warrantyAddPriceDialog, saveWarranty, closeAddPriceDialog, translate, userId} = this.props; 
		const { form } = this.state;


		let priceField = undefined;
		if(form !== null)
			priceField = form.setPrice.find(item => item.companyId === userId);
		
        return (
            <Dialog
				{...warrantyAddPriceDialog}
                classes={{
                    paper: "m-24"
                }}
                onClose={closeAddPriceDialog}
                fullWidth
                maxWidth="sm"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="block w-full p-24">
						<span>{translate('Add_Price')}</span>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{root: "p-24"}} style={{minHeight:250}}>
					<TextField
						className="mt-8 mb-16"
						label={translate('Warranty_Price_Offer')}
						id="WarrantyPriceOffer"
						name="WarrantyPriceOffer"
						value={priceField? priceField.WarrantyPriceOffer : ''}
						onChange={(event)=> this.handleChange(event)}
						InputProps={{
							startAdornment: <InputAdornment position="start">$</InputAdornment>
						}}
						type="number"
						variant="outlined"
						autoFocus
						fullWidth
					/>


					
					<FormControlLabel
						value="warrantyConfirmRequire"
						control={<Checkbox color="primary" onChange={(event) => this.handleChange(event)} 
							checked={priceField ? priceField.warrantyConfirmRequire : false} name="warrantyConfirmRequire" 
						/>}
						label={translate('Warranty_confirm_require')}
						labelPlacement="start"
						
					/>					
                </DialogContent>
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {saveWarranty(form).then(() => closeAddPriceDialog())}}
                            disabled={this.canBeSubmitted()}
                        >
                            {translate('Add')}
                        </Button>
                    </DialogActions>
            </Dialog>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeAddPriceDialog	: Actions.closeAddPriceDialog,
		saveWarranty			: Actions.saveWarranty,
    }, dispatch);
}

function mapStateToProps({eCommerceApp, auth})
{ 
    return {
		warrantyAddPriceDialog	: eCommerceApp.warranty.warrantyAddPriceDialog,
		userId				: auth.user.uuid,
		displayName			: auth.user.data.displayName,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(AddPriceDialog));
