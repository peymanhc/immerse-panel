import React, {Component} from 'react';
import {Button, Dialog, DialogActions, DialogContent, Toolbar, AppBar, TextField, FormControlLabel, Checkbox} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';

const newCurrencyState = {
    'id'       		: '',
    'name'    		: '',
    'value'   		: '',	
	'symbol'		: '',
	'code'			: '',
	'default'		: false,
	'status'		: true,
};

class CurrencyDialog extends Component {

    state = {
		form	: {...newCurrencyState},
	};

    closeComposeDialog = () => {
		this.props.currencyDialog.type === 'edit' ? this.props.closeEditPriceDialog() : this.props.closeAddPriceDialog();
    };
	
    componentDidUpdate(prevProps, prevState, snapshot)
    {

        if ( !prevProps.currencyDialog.props.open && this.props.currencyDialog.props.open )
        {
            if ( this.props.currencyDialog.type === 'edit' &&
                this.props.currencyDialog.data &&
                !_.isEqual(this.props.currencyDialog.data, prevState.form) )
            {
                this.setState({form: {...this.props.currencyDialog.data}});
            }

            if ( this.props.currencyDialog.type === 'new' &&
                !_.isEqual(newCurrencyState, prevState.form) )
            {
                this.setState({
                    form: {
                        ...newCurrencyState,
                    }
                });
            }
        }
    } 	
	
    handleChange = (event) => {
        const form = _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
        this.setState({form});
    };
	
    render()
    {
        const {currencyDialog, updateCurrency, addCurrency} = this.props; 
		const { form} = this.state;
	
        return (
            <Dialog
				{...currencyDialog.props}
                classes={{
                    paper: "m-24"
                }}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="block w-full p-24">
						<span>{this.props.currencyDialog.type === 'edit' ? 'Edit' : 'Add'} Currency</span>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{root: "p-24"}} style={{minHeight:350}}>
					<TextField
						className="mt-8 mb-16"
						label='Name'
						id="name"
						value={form.name}
						name="name"
						variant="outlined"
						autoFocus
						fullWidth
						onChange={this.handleChange}
					/>
					<div className="flex">
						<TextField
							className="w-1/2 mt-8 mb-16 mr-8"
							label='Symbol'
							id="symbol"
							value={form.symbol}
							name="symbol"
							variant="outlined"	
							onChange={this.handleChange}
						/>						
						<TextField
							className="w-1/2 mt-8 mb-16"
							label='Code'
							id="code"
							value={form.code}
							name="code"
							variant="outlined"
							onChange={this.handleChange}
						/>						
					</div>
					<TextField
						className="mt-8 mb-16"
						label='Value'
						id="value"
						name="value"
						value={form.value}
						variant="outlined"
						type="number"
						fullWidth
						onChange={this.handleChange}
					/>	
					<div className="justify-between pl-8 sm:pl-16">
						<FormControlLabel
							control={<Checkbox color="primary" name="default" checked={form.default} onChange={this.handleChange} />}
							label='Default'
							labelPlacement="start"
							className="ml-0"
							onChange={this.handleChange}
						/>	
						<FormControlLabel
							control={<Checkbox color="primary" name="status" checked={form.status} onChange={this.handleChange} />}
							label='Enable'
							labelPlacement="start"
							className="w-2/3"							
						/>						
					</div>
                </DialogContent>
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
							onClick={() => this.props.currencyDialog.type === 'edit' ? updateCurrency(form) : addCurrency(form)}
                        >
							{this.props.currencyDialog.type === 'edit' ? 'Save' : 'Add'}
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
       closeEditPriceDialog	: Actions.closeEditPriceDialog,
       addCurrency			: Actions.addCurrency,
       updateCurrency		: Actions.updateCurrency,
    }, dispatch);
}

function mapStateToProps({settingsApp})
{ 
    return {
		currencyDialog: settingsApp.setting.currencyDialog,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyDialog);
