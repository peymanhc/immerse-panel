import React, {Component} from 'react';
import {Button, Dialog, DialogActions, DialogContent, Toolbar, AppBar, Typography, Icon, withStyles, CircularProgress, ExpansionPanel,
	ExpansionPanelSummary, ExpansionPanelDetails, TextField, InputAdornment,} from '@material-ui/core';
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


const styles = theme => ({
	hidden:{
		display: 'none'
	},
	loading:{
		marginLeft: theme.spacing.unit * 10
	},
});

const newData = {
	id				: null,
	taxName			: '',
	taxPercentage	: 0,
	taxId			: null,
};


	
class AddTaxDialog extends Component {

    state = {...newData};

    canBeSubmitted()
    {
		const { taxName, taxPercentage } = this.state;
		return taxName && taxPercentage ? true : false;		
    }
		
	componentDidUpdate(prevProps, prevState, snapshot){
        if (prevProps.orderAddTaxDialog.open === false && this.props.orderAddTaxDialog.open )
        {
			const tax = this.props.orderAddTaxDialog.data;
            if(tax !== null && !_.isEqual(tax, prevState))
                this.setState({...tax});
            
            else if( tax === null && !_.isEqual(newData, prevState))
                this.setState({...newData});
        }		
	}
	
	taxChange = (taxId) => { 
		const tax = this.props.tax.find(({id}) => id === taxId);
		this.setState({...tax, taxId, id:FuseUtils.generateGUID()});
	}

	stateChange = (name, value) => this.setState({[name]: value});

	addTax = () => {
		const {id, taxName, taxPercentage, taxId} = this.state;
		this.props.addTax({id, taxName, taxPercentage, taxId});		
	}

    render()
    {  
        const {classes, orderAddTaxDialog, closeAddTaxDialog, tax} = this.props;
        const {taxName, taxPercentage, taxId} = this.state; 
		
		const allTax = tax.map(item => ({...item, value:item.id, label:item.taxName}));

		let selectedTax = null;
		
		if(taxId)
			selectedTax = allTax.find(({value:id}) => id === taxId);

        return (
            <Dialog
				open={orderAddTaxDialog.open}
                classes={{
                    paper: "m-24"
                }}
                onClose={closeAddTaxDialog}
                fullWidth
                maxWidth="sm"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="block w-full p-24">
						<span>Add Tax</span>
						<div>
							<CircularProgress 
								className={orderAddTaxDialog.loading? classes.loading:classes.hidden} 
								color="secondary"
							/>
						</div>						
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{root: "p-24"}} style={{minHeight:250}}>
					<div>
						<FuseChipSelect
							onChange={(row) => {this.taxChange(row.value)}}
							className="w-full mb-8"
							value={selectedTax || null}
							placeholder='Search a tax'
							textFieldProps={{
								label          : 'Tax',
								InputLabelProps: {
									shrink: true,
								},
								variant        : 'outlined',
							}}										
							options={allTax}
							variant='fixed'
						/> 
						{
							taxId &&	
								<>
									<ExpansionPanel defaultExpanded>
										<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
											<div className="flex items-center">
												<NewIcon>monetization_on</NewIcon>		
												<Typography className="truncate">
													Tax
												</Typography>											
											</div>										
										</ExpansionPanelSummary>
										<ExpansionPanelDetails className="block">																	
											<div className="flex mt-8 mb-16 mr-8">																							
												<TextField
													label='Title'
													className='w-1/2 mr-16'
													id="taxName"
													name="taxName"
													value={taxName}
													onChange={(event)=> this.stateChange('taxName', event.target.value)}
													variant="outlined"
												/>	
												<TextField
													label='Percentage'
													className='w-1/2 mr-16'
													id="taxPercentage"
													name="taxPercentage"
													value={taxPercentage}
													onChange={(event)=> this.stateChange('taxPercentage', event.target.value)}
													InputProps={{
														startAdornment: <InputAdornment position="start">%</InputAdornment>
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
								this.addTax();
								closeAddTaxDialog();
							}}
                            disabled={!this.canBeSubmitted()}
                        >
						{orderAddTaxDialog.data === null ? 'Add' : 'Save'}
                        </Button>
                    </DialogActions>
            </Dialog>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeAddTaxDialog	: Actions.closeAddTaxDialog,
        addTax				: Actions.addTax,
    }, dispatch);
}

function mapStateToProps({eCommerceApp})
{ 
    return {
		orderAddTaxDialog	: eCommerceApp.newOrder.orderAddTaxDialog,
		tax					: eCommerceApp.newOrder.tax,
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AddTaxDialog));
