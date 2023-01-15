import React, {Component} from 'react';
import {Button, Dialog, DialogActions, DialogContent, Toolbar, AppBar, Paper, Icon, Divider  } from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';
import {FuseChipSelect} from '@fuse';
import { withTranslate } from 'react-redux-multilingual';

const newOrdersMapState = {
	newStatus	: null,
	master		: undefined,
	error		: '',
};

 
	
class OrdersMapDialog extends Component {

    state = {
		...newOrdersMapState,
	};

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.ordersMapDialog.props.open && this.props.ordersMapDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (this.props.ordersMapDialog.data && !_.isEqual(this.props.ordersMapDialog.data, prevState) )
                
            { 
                this.setState({...this.props.ordersMapDialog.data});
            }
        }
    }
	
    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
		this.setState({master:null, newStatus:null});
        this.props.closeOrdersMapDialog();
    };

    canBeSubmitted(master, newStatus)
    {
		return master !== undefined && newStatus ? true : false;
    }
	
	selectOnChange = (name, row) => {
		
		this.setState({[name]: row.value, status:[{stcode:row.value}]});
	};	
	
	masterOnChange = (row) => {		
		this.setState({ master: row.value, shippingDetails:[{id: row.value}]});
	};	
		
	setMaster = (masterId, latestStatusId) => {
		const {id} = this.state; 
		this.setState({master:undefined, newStatus:null});
		this.props.saveMasterOrder(id, latestStatusId, masterId);
	};
	
    render()
    {
        const {ordersMapDialog, masters, ordersStatus, orders, translate} = this.props;

		const {RefID, customer:{firstName} = {}, invoiceAddress = [], error, shippingDetails, status, total, totalCount } = this.state;
		
		let masterId = undefined;  
		try{
			masterId = shippingDetails[shippingDetails.length -1 ].id;
		}
		catch(err){}
		
		let latestStatusId = null;
		try{
			latestStatusId = _.orderBy(status, ['date'], ['desc'])[0].stcode;
		}
		catch(err){}

		let phone = "";
		
		if(invoiceAddress.length)
			phone = invoiceAddress[0].phone || '';
		
		const allMasters = [{label:"None", value:null}, ...masters.map(({masterName: label, id: value}) => ({value, label}))];
		const selectedMaster = allMasters.find(({value:id}) => id === masterId);
		
		const allStatus = ordersStatus.map(({name: label, id: value}) => ({value, label}));
		const selectedStatus = allStatus.find(({value:id}) => id === latestStatusId);
		
	 
		let ordersCount = 0;
		let ordersTotal = 0;
		orders.forEach(({shippingDetails, status, total}) => {
			const compyanyFound = shippingDetails.find(({id}) => id === masterId);
			const statusFound = status.find(({stcode}) => stcode.toString() === "4");
			if(compyanyFound && statusFound === undefined){
				ordersCount ++;
				ordersTotal += total;
			}
		});
		
        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...ordersMapDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="sm"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="block w-full p-24">
						<span>{translate('Set_Master')}</span>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{root: "p-24"}} style={{minHeight:550}}>
					<Paper classes={{root: "p-8 mb-16"}}>
						<div className="flex justify-between">
							<div className="mt-8 mb-16 mr-8">
								<Icon className="text-20 mr-8">account_circle</Icon>
								{firstName}							
							</div>
							<div className="min-w-auto mt-16 mb-16 mr-8">
								{RefID}
							</div>
						</div>
						<div className="w-full mt-8 mb-16 mr-8">
							<Icon className="text-20 mr-8">location_on</Icon>
							{invoiceAddress.length? invoiceAddress[0].address : ''}
						</div>	

						<div className="flex justify-between">
							<div className="mt-8 mb-16 mr-8">
								<Icon className="text-20 mr-8">description</Icon>
								desctiption
							</div>
							{
								phone && 
								<div className="min-w-auto mt-16 mb-16 mr-8">
									<Icon className="text-20 mr-8">phone</Icon>
									{phone}
								</div>									
							}							
						</div>
						<Divider />
						<div className="flex justify-between pl-16">
							<div className="mt-16 mb-16">
								<span>Price : {total}</span>
							</div>						
							<div className="min-w-auto mr-16 mt-16 mb-16">
								<span>Count : {totalCount}</span>
							</div>
						</div>
					</Paper>
					<FuseChipSelect
						onChange={(row) => {this.masterOnChange(row)}}
						className="w-full mb-24"
						value={selectedMaster || null}
						placeholder="Search a master"
						textFieldProps={{
							label          : 'Master',
							InputLabelProps: {
								shrink: true
							},
							variant        : 'outlined',							
						}}
						options={allMasters}						
					/>
					<FuseChipSelect
						onChange={(row) => {this.selectOnChange('newStatus', row)}}
						className="w-full mb-24"
						value={selectedStatus || null}
						placeholder="Search a status"
						textFieldProps={{
							label          : 'Status',
							InputLabelProps: {
								shrink: true
							},
							variant        : 'outlined',							
						}}
						options={allStatus}						
					/>	
					<Paper classes={{root: "p-8 mb-16"}}>
						<div className="flex justify-between">
							<div className="mt-8 mt-16 mb-16 mr-8">
								total orders allocated : {ordersCount}							
							</div>
							<div className="min-w-auto mt-16 mb-16 mr-8">
								total orders allocated : {ordersTotal}
							</div>
						</div>
					</Paper>
                </DialogContent>
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
								this.setMaster(masterId, latestStatusId)
                            }}
                            disabled={!this.canBeSubmitted(masterId, latestStatusId)}
                        >
                            Save
                        </Button>
						<div className="min-w-auto mr-16">
							<span>{error}</span>
						</div>
                    </DialogActions>
            </Dialog>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeOrdersMapDialog: Actions.closeOrdersMapDialog,
		saveMasterOrder	: Actions.saveMasterOrder,
    }, dispatch);
}

function mapStateToProps({eCommerceApp})
{
    return {
        ordersMapDialog	: eCommerceApp.orders.ordersMapDialog,
		orders    		: eCommerceApp.orders.data,
		masters  		: eCommerceApp.orders.masters,
		ordersStatus	: eCommerceApp.orders.ordersStatus,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(OrdersMapDialog)) ;
