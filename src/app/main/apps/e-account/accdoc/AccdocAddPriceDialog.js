import React, {Component} from 'react';
import {Button, Dialog, DialogActions, DialogContent, Toolbar, AppBar, TextField, InputAdornment, FormControlLabel, Checkbox} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
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
        if ( !prevProps.accdocAddPriceDialog.open && this.props.accdocAddPriceDialog.open )
        {

            if (this.props.order && !_.isEqual(this.props.order, prevState) )
            {
                this.setState({form: {...this.props.order}});
            }
        }
    }
	
    canBeSubmitted()
    {
		const form = this.state.form;
		if(form != null){
			const currentPrice = this.state.form.setPrice.find(item => item.companyId === this.props.userId);
			if(currentPrice){
				return currentPrice.OrderPriceOffer ? false : true;
				//return currentPrice.OrderPriceOffer && !_.isEqual(this.props.order, this.state.form) ? false : true;	
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
				orderConfirmRequire	: false,
				OrderPriceOffer		: "",
			};
			
		}
		
		if(event.target.type === 'checkbox'){
			currentPrice.orderConfirmRequire = event.target.checked;		
			currentPrice.datetime = new Date();	
		}
		else{
			currentPrice.OrderPriceOffer = event.target.value;
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
        const {accdocAddPriceDialog, saveOrder, closeAddPriceDialog, translate, userId} = this.props; 
		const { form } = this.state;


		let priceField = undefined;
		if(form !== null)
			priceField = form.setPrice.find(item => item.companyId === userId);
		
        return (
            <Dialog
				{...accdocAddPriceDialog}
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
						label={translate('Order_Price_Offer')}
						id="OrderPriceOffer"
						name="OrderPriceOffer"
						value={priceField? priceField.OrderPriceOffer : ''}
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
						value="orderConfirmRequire"
						control={<Checkbox color="primary" onChange={(event) => this.handleChange(event)} 
							checked={priceField ? priceField.orderConfirmRequire : false} name="orderConfirmRequire" 
						/>}
						label={translate('Order_confirm_require')}
						labelPlacement="start"
						
					/>					
                </DialogContent>
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {saveOrder(form).then(() => closeAddPriceDialog())}}
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
		saveOrder			: Actions.saveOrder,
    }, dispatch);
}

function mapStateToProps({eAccountApp, auth})
{ 
    return {
		accdocAddPriceDialog	: eAccountApp.order.accdocAddPriceDialog,
		userId				: auth.user.uuid,
		displayName			: auth.user.data.displayName,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(AddPriceDialog));
