import React, {Component} from 'react';
import {Button, Tab, Tabs, Typography, CircularProgress, withStyles} from '@material-ui/core';
import {FuseAnimate, FusePageCarded,} from '@fuse';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import General from './general/General';
import Currency from './currency/Currency';
import CurrencyDialog from './currency/CurrencyDialog';
import Application from './application/Application';
import Panel from './panel/Panel';
import '../RTL.css';

const styles = {
	hidden: {
		display: 'none',
	},	
};

class Settings extends Component {

    state = {
        tabValue: 0,
        form    : null
    };

    componentDidMount()
    {
        this.updateSettingstate();
		this.props.getLanguages();
		this.props.getCurrencies();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if (
            (this.props.settings.data && !this.state.form) ||
            (this.props.settings.data && this.state.form && this.props.settings.data.id !== this.state.form.id)
        )
        {
            this.updateFormState();
        }
    }

    updateFormState = () => {
        this.setState({form: this.props.settings.data})
    };

    updateSettingstate = () => {
		this.props.getSettings();
		this.updateFormState();
    };

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChange = (event) => { 
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    canBeSubmitted()
    {
        return ( !_.isEqual(this.props.settings.data, this.state.form)); 
    }
	
	languageOnChange = (name, value) => {
		this.setState({form: {...this.state.form, [name]: value}});
	}
	
    handleChipChange = (value, name) => {
        this.setState({form: _.set({...this.state.form}, name, value.map(item => item.value))});
    };
	
	addFiles = (event) => {
		const file = event.target.files[0];
		this.setState({form: {...this.state.form, 
			[event.target.name] :{
				url: URL.createObjectURL(file),
				file				
			}
		}});
	};	
	
    render()
    {
        const {saveSettings, settings, classes} = this.props;
        const {tabValue, form} = this.state;

        return (
			<>
			  <div className="fuse">
				<FusePageCarded
					classes={{
						toolbar: "p-0",
						header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
					}}
					header={
						form && (
							<div className="flex flex-1 w-full items-center justify-between">
	
								<div className="flex flex-col items-start max-w-full">
									<div className="flex items-center max-w-full">
										<FuseAnimate animation="transition.expandIn" delay={300}>
											<img 
												className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" 
												src="assets/images/ecommerce/product-image-placeholder.png" 
												alt="Setting"
											/>
										</FuseAnimate>
										<div className="flex flex-col min-w-0">
											<FuseAnimate animation="transition.slideLeftIn" delay={300}>
												<Typography className="text-16 sm:text-20 truncate">
													Settings
												</Typography>
											</FuseAnimate>
										</div>
									</div>
								</div>
								<div>
									<CircularProgress 
										className={settings.loading ? '': classes.hidden} 
										color="secondary"
									/>
								</div>								
								<FuseAnimate animation="transition.slideRightIn" delay={300}>
									<Button
										className="whitespace-no-wrap"
										variant="contained"
										disabled={!this.canBeSubmitted()}
										onClick={() => saveSettings(form)}
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
							<Tab className="h-64 normal-case" label="General Setting"/>
							<Tab className="h-64 normal-case" label="Application"/>
							<Tab className="h-64 normal-case" label="Curency"/>
							<Tab className="h-64 normal-case" label="Panel"/>
						</Tabs>
					}
					content={
						form && (
							<div className="p-16 sm:p-24 max-w-2xl">
								{tabValue === 0 &&
								(
									<General form={form} 
										languages={settings.languages} 
										handleChipChange={this.handleChipChange}
										languageOnChange={this.languageOnChange}
										handleChange={this.handleChange}
										addFiles={this.addFiles}
									/>
								)}
								{tabValue === 1 && (
									<Application form={form} 
										languages={settings.languages} 
										languageOnChange={this.languageOnChange} 
										handleChange={this.handleChange}
									/>
								)}
								{tabValue === 2 && (
									<Currency 
										form={form} 
										currencies={settings.currencies}
										openAddPriceDialog={this.props.openAddPriceDialog}
										openEditPriceDialog={this.props.openEditPriceDialog}
										removeSliders={this.props.removeSliders}
									/>
								)}
								 					
								{tabValue === 3 && (
									<Panel 
									    form={form} 
									     handleChange={this.handleChange}
										languageOnChange={this.languageOnChange}
									/>
								)}							
							</div>
						)
					}
					innerScroll
				/>
				<CurrencyDialog />
				</div>
			</>

        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getSettings 		: Actions.getSettings,
        saveSettings		: Actions.saveSettings,
        getLanguages		: Actions.getLanguages,		
        getCurrencies		: Actions.getCurrencies,		
        openAddPriceDialog	: Actions.openAddPriceDialog,		
        openEditPriceDialog	: Actions.openEditPriceDialog,		
        removeSliders		: Actions.removeSliders,		
    }, dispatch);
}

function mapStateToProps({settingsApp})
{  
    return {
        settings: settingsApp.setting,
    }
}

export default withReducer('settingsApp', reducer)(withStyles(styles, {withTheme: false})(connect(mapStateToProps, mapDispatchToProps)(Settings)));