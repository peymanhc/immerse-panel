import React, {Component} from 'react';
 // eslint-disable-next-line
import {withStyles, Button, Tab, Tabs, TextField, Icon, Typography, Checkbox, FormControlLabel, CircularProgress, InputAdornment, Radio} from '@material-ui/core';
import {FuseAnimate, FusePageCarded, FuseChipSelect} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
//import classNames from 'classnames';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import { withTranslate } from 'react-redux-multilingual';  //--maddahi-and addtranslate words--//


const styles = theme => ({
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

class Discount extends Component {

    state = {
        tabValue: 0,
        form    : null,
    };

    componentDidMount()
    {
        this.updateDiscountState();	
        this.props.getCities();	
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.updateDiscountState();
        }

        if (
            (this.props.discount.data && !this.state.form) ||
            (this.props.discount.data && this.state.form && this.props.discount.data.id !== this.state.form.id)
        )
        { 
            this.updateFormState();
        }
    }

    updateFormState = () => {
        this.setState({form: this.props.discount.data})
    };

    updateDiscountState = () => {
        const params = this.props.match.params;
        const {discountId} = params;  

        if ( discountId === 'new' )
        {
            this.props.newDiscount(); 
        }
        else
        {
            this.props.getDiscount(this.props.match.params);
        }
    };

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChange = (event) => {	
		this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    canBeSubmitted()
    {
		const {discountName, discountCode} = this.state.form;
		return discountName.length && discountCode.length && !_.isEqual(this.props.discount.data, this.state.form)
			? true : false;
    }
	
	chipsOnChange = (value, name) => { 
		this.setState({form: {...this.state.form, [name]: value}});
	}
	
    render()
    {
        const {classes, saveDiscount, discount, translate, } = this.props;
        const {tabValue, form}	= this.state;
		let selectedCity 		= null;	
		const allCities 		= discount.cities.map(({id:value, title:label}) => ({value, label}));
		
		if(form !== null){
			selectedCity = allCities.find(({value:id}) => id === form.discountCity);
		}
		 
        return (
            <FusePageCarded
                classes={{
                    toolbar: "p-0",
                    header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    form !== null && (
                        <div className="flex flex-1 w-full items-center justify-between">

                            <div className="flex flex-col items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/discount/discounts">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
											Discount Detail
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
								
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {form.discountName ? form.discountName :  'New Discount'} 
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Discount Detail</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
							<div>
								<CircularProgress 
									className={discount.loading ? '': classes.hidden} 
									color="secondary"
								/>
							</div>							
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    disabled={!this.canBeSubmitted()}
                                    onClick={() => saveDiscount(form)}
                                >
                                    Save
                                </Button>
                            </FuseAnimate>
                        </div>
                    )
                }
                contentToolbar={
                    <Tabs
                        value={tabValue}
                        onChange={this.handleChangeTab}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{root: "w-full h-64"}}
                    >
                        <Tab className="h-64 normal-case" label='General Setting' />
                        <Tab className="h-64 normal-case" label='Conditions' />
                        <Tab className="h-64 normal-case" label='Discount Type' />
                    </Tabs>
                }
                content={
                    form && (
                        <div className="p-16 sm:p-24 max-w-2xl">
                            {tabValue === 0 &&
                            (
                                <div>
                                    <TextField
                                        className="mt-8 mb-16"
                                        error={form.discountName === ''}
                                        required
                                        label='Name'
                                        autoFocus
                                        id="discountName"
                                        name="discountName"
                                        value={form.discountName}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />	
                                    <TextField
                                        className="mt-8 mb-16"
                                        error={form.discountCode === ''}
                                        required
                                        label='Code'                                       
                                        id="discountCode"
                                        name="discountCode"
                                        value={form.discountCode}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />	
									<div className="flex mt-8 mb-16 mr-8">	
										<FormControlLabel1
											control={
												<WhiteRadio
													checked={form.discountType === 'Percentage'}
													value='Percentage'
													name='discountType'
													id='Percentage'
													inputProps={{ 'aria-label': {title:'Percentage'} }}	
													onChange={this.handleChange}
												/>									
											}
											label='Percentage'
											labelPlacement="end"
										/>	
										<FormControlLabel1
											control={
												<WhiteRadio
													checked={form.discountType === "Price"}
													value='Price'
													name='discountType'
													id='Price'
													inputProps={{ 'aria-label': {title:'Price'} }}	
													onChange={this.handleChange}
												/>									
											}
											label='Price'
											labelPlacement="end"
										/>											
									</div>	
                                    <TextField
                                        className="mt-8 mb-16"
                                        error={form.discountPercentage === ''}
                                        required
                                        label='Percentage'                                       
                                        id="discountPercentage"
                                        name="discountPercentage"
                                        value={form.discountPercentage}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
										InputProps={{
											startAdornment: <InputAdornment position="start">%</InputAdornment>
										}}
										type="number"										
                                    />
                                    <TextField
                                        className="mt-8 mb-16"
                                        error={form.discountPrice === ''}
                                        required
                                        label='Price'                                       
                                        id="discountPrice"
                                        name="discountPrice"
                                        value={form.discountPrice}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
										InputProps={{
											startAdornment: <InputAdornment position="start">$</InputAdornment>
										}}										
										type="number"	
                                    />									
									<FuseChipSelect
										onChange={(row) => {this.chipsOnChange(row.value, 'discountCity')}}
										className="w-full mt-8 mb-16"
										value={selectedCity || null}
										placeholder={translate('campany_Search_a_City')}
										textFieldProps={{
											label          : translate('campany_City'),
											InputLabelProps: {
												shrink: true,
											},
											variant        : 'outlined',
										}}										
										options={allCities}
										variant='fixed'
										required
									/>									
                                </div>
                            )}
                            {tabValue === 1 &&
                            (
                                <div>
                                    <TextField
                                        className="mt-8 mb-16"
                                        error={form.discountMaximumGlobalUsageLimit === ''}
                                        required
                                        label='Maximum Global Usage Limit'                                      
                                        id="discountMaximumGlobalUsageLimit"
                                        name="discountMaximumGlobalUsageLimit"
                                        value={form.discountMaximumGlobalUsageLimit}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
										type="number"
                                    />	
                                    <TextField
                                        className="mt-8 mb-16"
                                        error={form.discountPerUserUsageLimit === ''}
                                        required
                                        label='Per User Usage Limit'                                      
                                        id="discountPerUserUsageLimit"
                                        name="discountPerUserUsageLimit"
                                        value={form.discountPerUserUsageLimit}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
										type="number"
                                    />	
									<TextField
										name="discountStartDate"
										label="Start Date"
										type="datetime-local"
										className="mt-8 mb-16"
										InputLabelProps={{
											shrink: true
										}}
										inputProps={{
											max: form.discountEndDate
										}}
										value={form.discountStartDate}
										onChange={this.handleChange}
										variant="outlined"
										fullWidth
										required
									/>
									<TextField
										name="discountEndDate"
										label="Due Date"
										type="datetime-local"
										className="mt-8 mb-16"
										InputLabelProps={{
											shrink: true
										}}
										inputProps={{
											min: form.discountStartDate
										}}
										value={form.discountEndDate}
										onChange={this.handleChange}
										variant="outlined"
										fullWidth
										required
									/>										
								</div>
							)}
                            {tabValue === 2 &&
                            (
								<div>
                                    <TextField
                                        className="mt-8 mb-16"
                                        error={form.discountMinimumRidePrice === ''}
                                        required
                                        label='Minimum Ride Price'                                      
                                        id="discountMinimumRidePrice"
                                        name="discountMinimumRidePrice"
                                        value={form.discountMinimumRidePrice}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
										type="number"
                                    />	
                                    <TextField
                                        className="mt-8 mb-16"
                                        error={form.discountMaxDiscount === ''}
                                        required
                                        label='Max Discount'                                      
                                        id="discountMaxDiscount"
                                        name="discountMaxDiscount"
                                        value={form.discountMaxDiscount}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
										type="number"
                                    />										
								</div>
							)}
                        </div>
                    )
                }
                innerScroll
            />
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getDiscount 	: Actions.getDiscount,
        newDiscount 	: Actions.newDiscount,
        saveDiscount	: Actions.saveDiscount,
        getCities		: Actions.getCities,
    }, dispatch);
}

function mapStateToProps({discountApp})
{
    return {
        discount: discountApp.discount,
    }
}

export default withReducer('discountApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(Discount)))));

