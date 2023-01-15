import React, {Component} from 'react';
import {Button, Dialog, DialogActions, DialogContent, Toolbar, AppBar, Typography, Icon, withStyles, CircularProgress, ExpansionPanel,
	ExpansionPanelSummary, ExpansionPanelDetails, TextField, InputAdornment, Radio, FormControlLabel} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';	
import {bindActionCreators} from 'redux';
import * as Actions from '../../store/actions';
import {connect} from 'react-redux';
import {FuseChipSelect} from '@fuse';
import _ from '@lodash';
import {FuseUtils} from '@fuse';

const NewIcon = withStyles({
	root: {
		fontSize:'3rem',
	},
})(props => <Icon color="action" className="mr-8" {...props} />); 

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

const styles = theme => ({
	hidden:{
		display: 'none'
	},
	loading:{
		marginLeft: theme.spacing.unit * 10
	},
});

const newData = {
	id					: null,
	discountName		: '',
	discountPercentage	: 0,
	discountPrice		: 0,
	discountType		: 'Percentage',
	discountId			: null,
};


	
class AddDiscountDialog extends Component {

    state = {...newData};

    canBeSubmitted()
    {
		const { discountName, discountPercentage, discountPrice, discountType } = this.state;
		return discountName && ((discountType === "Percentage" && discountPercentage) || (discountType === "Price" && discountPrice)) ? true : false;		
    }
		
	componentDidUpdate(prevProps, prevState, snapshot){
        if (prevProps.orderAddDiscountDialog.open === false && this.props.orderAddDiscountDialog.open )
        {
			const discount = this.props.orderAddDiscountDialog.data;
            if(discount !== null && !_.isEqual(discount, prevState))
                this.setState({...discount});
            
            else if( discount === null && !_.isEqual(newData, prevState))
                this.setState({...newData});
        }		
	}
	
	discountChange = (discountId) => { 
		const discount = this.props.discounts.find(({id}) => id === discountId);
		this.setState({...discount, discountId, id:FuseUtils.generateGUID()});
	}

	stateChange = (name, value) => this.setState({[name]: value});

	addDiscount = () => {
		const {id, discountName, discountPercentage, discountId, discountType, discountPrice} = this.state;
		this.props.addDiscount({id, discountName, discountPercentage, discountId, discountType, discountPrice});		
	}

    render()
    {  
        const {classes, orderAddDiscountDialog, closeAddDiscountDialog, discounts} = this.props;
        const {discountId, discountName, discountPercentage, discountType, discountPrice} = this.state; 
		
		const allDiscounts = discounts.map(item => ({...item, value:item.id, label:item.discountName}));

		let selectedDiscount = null;
		
		if(discountId)
			selectedDiscount = allDiscounts.find(({value:id}) => id === discountId);

        return (
            <Dialog
				open={orderAddDiscountDialog.open}
                classes={{
                    paper: "m-24"
                }}
                onClose={closeAddDiscountDialog}
                fullWidth
                maxWidth="sm"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="block w-full p-24">
						<span>Add Discount</span>
						<div>
							<CircularProgress 
								className={orderAddDiscountDialog.loading? classes.loading:classes.hidden} 
								color="secondary"
							/>
						</div>						
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{root: "p-24"}} style={{minHeight:250}}>
					<div>
						<FuseChipSelect
							onChange={(row) => {this.discountChange(row.value)}}
							className="w-full mb-8"
							value={selectedDiscount || null}
							placeholder='Search a discount'
							textFieldProps={{
								label          : 'Discounts',
								InputLabelProps: {
									shrink: true,
								},
								variant        : 'outlined',
							}}										
							options={allDiscounts}
							variant='fixed'
						/> 
						{
							discountId &&	
								<>
									<ExpansionPanel defaultExpanded>
										<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
											<div className="flex items-center">
												<NewIcon>money_off</NewIcon>		
												<Typography className="truncate">
													Discount
												</Typography>											
											</div>										
										</ExpansionPanelSummary>
										<ExpansionPanelDetails className="block">
											<TextField
												label='Title'
												className='w-full mr-16'
												id="discountName"
												name="discountName"
												value={discountName}
												onChange={(event)=> this.stateChange('discountName', event.target.value)}
												variant="outlined"	
												autoFocus
											/>										
											<div className="flex mt-8 mb-16 mr-8">	
												<FormControlLabel1
													control={
														<WhiteRadio
															checked={discountType === 'Percentage'}
															value='Percentage'
															name='Percentage'
															id='Percentage'
															inputProps={{ 'aria-label': {title:'Percentage'} }}	
															onChange={(event)=> this.stateChange('discountType', 'Percentage')}
														/>									
													}
													label='Percentage'
													labelPlacement="end"
												/>	
												<FormControlLabel1
													control={
														<WhiteRadio
															checked={discountType === "Price"}
															value='Price'
															name='Price'
															id='Price'
															inputProps={{ 'aria-label': {title:'Price'} }}	
															onChange={(event)=> this.stateChange('discountType', 'Price')}
														/>									
													}
													label='Price'
													labelPlacement="end"
												/>											
											</div>									
											<div className="flex mt-8 mb-16 mr-8">																							
												<TextField
													label='Percentage'
													className='w-1/2 mr-16'
													id="discountPercentage"
													name="discountPercentage"
													value={discountPercentage}
													onChange={(event)=> this.stateChange('discountPercentage', event.target.value)}
													InputProps={{
														startAdornment: <InputAdornment position="start">%</InputAdornment>
													}}
													type="number"
													variant="outlined"
												/>	
												<TextField
													label='Price'
													className='w-1/2 mr-16'
													id="discountPrice"
													name="discountPrice"
													value={discountPrice}
													onChange={(event)=> this.stateChange('discountPrice', event.target.value)}
													InputProps={{
														startAdornment: <InputAdornment position="start">$</InputAdornment>
													}}
													type="number"
													variant="outlined"
												/>													
											</div>											
										</ExpansionPanelDetails>
									</ExpansionPanel>
								</>
						}						
					</div>
                </DialogContent>
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
								this.addDiscount();
								closeAddDiscountDialog();
							}}
                            disabled={!this.canBeSubmitted()}
                        >
						{orderAddDiscountDialog.data === null ? 'Add' : 'Save'}
                        </Button>
                    </DialogActions>
            </Dialog>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeAddDiscountDialog	: Actions.closeAddDiscountDialog,
        addDiscount				: Actions.addDiscount,
    }, dispatch);
}

function mapStateToProps({eCommerceApp})
{ 
    return {
		orderAddDiscountDialog	: eCommerceApp.newOrder.orderAddDiscountDialog,
		discounts				: eCommerceApp.newOrder.discounts,
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AddDiscountDialog));
