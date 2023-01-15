import React, {Component} from 'react';
import {withStyles, Hidden, Icon, IconButton, TextField, Radio, FormControlLabel, Button} from '@material-ui/core';
import {FusePageSimple, FuseAnimate, FuseChipSelect} from '@fuse';
//import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import reducer  from '../store/reducers';
import * as Actions  from '../store/actions';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import queryString  from 'query-string';


const styles = theme => ({
    layoutRoot: {}
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
		'&$checked': {
			color: 'red',
		},		
	},
	label:{
		marginRight:10,
	},
})(props => <FormControlLabel {...props} />);

class Transaction extends Component {
	
    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.type === 'checkbox' ? event.target.checked : event.target.value});
    };
	
	chipsOnChange = (value, name) => { 
		this.setState({[name]: value});
	}	

    canBeSubmitted()
    {
        const {amount, gatewayId} = this.state;
		const newAmount = parseFloat(amount);
        return (
            newAmount >= 100 && gatewayId !== null
        );
    }
	
    canBeSubmitted2()
    {
        const {amount} = this.state;
		const newAmount = parseFloat(amount);
        return (
            newAmount >= 100
        );
    }	
	
	state={
		amount		: '',
		description	: '',
		userId		: null,
		gatewayId	: null,
	};
	
    componentDidMount(){
		this.props.getUsers();
		this.props.getGateways();
		this.props.getCredit(); 
		const path = this.props.location.pathname.replace('?','&')
		const parsed = queryString.parse(path);
		const {Authority, Status} = parsed;
		if(Authority !== undefined && Status === "OK"){
			this.props.verification(Authority).then(() => this.props.history.push('/apps/transaction/'));
		}
		else if(Status === "NOK"){
			this.props.paymentFaild().then(() => this.props.history.push('/apps/transaction/'));
		}		
    }	
	
	componentDidUpdate(){
		if(this.props.url !== null){
			this.props.removeUrl();
			window.location = this.props.url;
		}
		
	}
	
	addAmount = () => {
		const {amount, gatewayId, userId, description} = this.state;
		this.props.addTransaction(amount, description, gatewayId, userId);
	};
	
	payment = () => {
		const {amount, gatewayId, userId, description} = this.state;
		this.props.createPaymentLink(amount, description, gatewayId, userId);
	};	
	
    render()
    {
        const {classes, users, gateways, credit} = this.props; 
        const {amount, description, userId, gatewayId} = this.state;
		const allUsers = users.map(({id:value, name:label}) => ({value, label}));
		const selectedUser = allUsers.find(({value:id}) => id === userId);

        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="flex flex-col flex-1">
                        <div className="flex items-center pl-12 lg:pl-24 p-24">
                            <Hidden lgUp>
                                <IconButton
                                    onClick={(ev) => this.pageLayout.toggleLeftSidebar()}
                                    aria-label="open left sidebar"
                                >
                                    <Icon>menu</Icon>
                                </IconButton>
                            </Hidden>
							<div className="flex items-center flex-1">
								<FuseAnimate animation="transition.expandIn" delay={300}>
									<Icon className="text-32 mr-16">attach_money</Icon>
								</FuseAnimate>
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<span className="text-24">Transaction</span>
								</FuseAnimate>
							</div>
							{
								users.length !== 0 && 
									<FuseAnimate animation="transition.slideRightIn" delay={300}>
										<Button
											className="whitespace-no-wrap"
											variant="contained"
											disabled={!this.canBeSubmitted2()}
											onClick={() => {this.addAmount()}}
										>
											Admin Transaction
										</Button>
									</FuseAnimate>				
							}					
                        </div>
                    </div>
                }
                content={
                    <div className="p-24">
						<div>
							<TextField
								className="mt-8 mb-16 w-1/2"										
								label='Amount'
								id='amount'
								name='amount'
								value={amount}
								variant="outlined"
								onChange={this.handleChange}
								type="number"
                                inputProps={{
                                    min: 100
                                }}
								helperText="Min Amount is 100"
							/>
						</div>
						{
							users.length !== 0 && 
								<div>
									<FuseChipSelect
										onChange={(row) => {this.chipsOnChange(row.value, 'userId')}}
										className="w-1/2 mt-8 mb-16"
										value={selectedUser || null}
										placeholder='Search a user'
										textFieldProps={{
											label          : 'Users',
											InputLabelProps: {
												shrink: true,
											},
											variant        : 'outlined',
										}}										
										options={allUsers}
										variant='fixed'
									/> 						
								</div>							
						}						
						<div>
							<TextField
								className="mt-8 mb-16 w-1/2"
								id="description"
								name="description"
								onChange={this.handleChange}
								label="Description"
								type="text"
								value={description}
								multiline
								rows={5}
								variant="outlined"							
							/>	
						</div>
						<div className="mt-8 mb-16 w-1/2">
							{
								gateways.map(({id, title}) => 
									<FormControlLabel1
										key={id}
										control={
											<WhiteRadio
												checked={gatewayId === id}
												onChange={this.handleChange}
												value={id}
												name="gatewayId"
												inputProps={{ 'aria-label': {id} }}										
											/>									
										}
										label={title}
										labelPlacement="end"
									/>												
								)
							}							
						</div>
						<div>
						        <Button
                                    variant="outlined"
									disabled={!this.canBeSubmitted()}
									onClick={() => {this.payment()}}
                                >
                                    Pay
                                </Button>
						</div>
                    </div>
                }

                leftSidebarContent={
                    <div className="p-24">
						<h4>Increase Credit</h4>
						<br />
						<TextField
							className="mt-8 mb-16"										
							label='Your account balance'
							value={credit || 0}
							variant="outlined"
							disabled={true}
							fullWidth
						/>
                    </div>
                }
                sidebarInner
                onRef={instance => {
                    this.pageLayout = instance;
                }}
            />
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getUsers			: Actions.getUsers,
        getGateways 		: Actions.getGateways,
        addTransaction		: Actions.addTransaction,
		getCredit			: Actions.getCredit,
		createPaymentLink	: Actions.createPaymentLink,
		removeUrl			: Actions.removeUrl,
		verification		: Actions.verification,
		paymentFaild		: Actions.paymentFaild,
    }, dispatch);
}

function mapStateToProps({transactionApp})
{ 
    return {
        users	: transactionApp.transaction.users,
        gateways: transactionApp.transaction.gateways,
        credit	: transactionApp.transaction.credit,
		url		: transactionApp.transaction.url,
    }
}

export default withReducer('transactionApp', reducer)(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Transaction)));