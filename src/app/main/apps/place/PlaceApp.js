import React, {Component} from 'react';
import {withStyles, Fab, Icon} from '@material-ui/core';
import {FusePageSimple, FuseAnimate} from '@fuse';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Tab, Tabs} from '@material-ui/core';
import CountryList from './countries/CountryList';
import CountryDialog from './countries/CountryDialog';
import CityList from './cities/CityList';
import CityDialog from './cities/CityDialog';
import ProvinceList from './provinces/ProvinceList';
import ProvinceDialog from './provinces/ProvinceDialog';

//import SidebarContent from './SidebarContent';
import PlaceHeader from './PlaceHeader';
import { withTranslate } from 'react-redux-multilingual';  //--maddahi-and addtranslate words--//


const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});

class countryManagmentApp extends Component {
	
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };
	
    componentDidMount()
    {
		this.props.getCities(); 
		this.props.getProvinces(); 
		this.props.getCountries();
    }	
    render()
    {	
		const {classes, openNewCountryDialog, openNewProvinceDialog, openNewCityDialog, translate} = this.props;
		const {value} = this.state;
        return (
			<div>
				<FusePageSimple
					classes={{
						contentCardWrapper: "p-16 sm:p-24 pb-80",
						leftSidebar       : "w-256 border-0",
						header            : "min-h-72 h-72 sm:h-136 sm:min-h-136"
					}}
					header={
						<PlaceHeader/>
					}
					contentToolbar={
						<Tabs
							value={value}
							onChange={this.handleChange}
							indicatorColor="primary"
							textColor="primary"
							variant="scrollable"
							scrollButtons="off"
							className="w-full h-64 border-b-1"
						>
							<Tab className="h-64" label={translate('Countries')}/>
							<Tab className="h-64" label={translate('Provinces')}/>
							<Tab className="h-64" label={translate('Cities')}/>
						</Tabs>
					}					
					content={
						<div className="p-24">
							{value === 0 &&
							(
								<div>
									<CountryList />
								</div>
							)}
							{value === 1 && (
								<div>
									<ProvinceList />
								</div>
							)}	
							{value === 2 && (
								<div>
									<CityList />
								</div>
							)}	
						</div>						
					}				
					leftSidebarContent={null}				
					sidebarInner	
				/>
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Fab
                        color="primary"
                        aria-label="add"
                        className={classes.addButton}
						onClick={() => {
							            if (value === 0)  openNewCountryDialog() ;	
							            if (value === 1) openNewProvinceDialog();  
							            if (value === 2)  openNewCityDialog() ;
							           
							           }
					            }
                    >
						<Icon>add_location</Icon>
                    </Fab>
                </FuseAnimate>
				<CountryDialog />
				<ProvinceDialog />
				<CityDialog />
			</div>
        )
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
		openNewCountryDialog	: Actions.openNewCountryDialog,
		openNewCityDialog		: Actions.openNewCityDialog,
		
		openNewProvinceDialog	: Actions.openNewProvinceDialog,		 
		getProvinces 		 	: Actions.getProvinces,

		getCities 		 		: Actions.getCities,
		getCountries			: Actions.getCountries,
    }, dispatch);
}

function mapStateToProps({CountriesApp})
{ 
    return {
		//cities   : CountriesApp.cities.cities,
		//countries  : CountriesApp.countries.countries,
    }
}

export default 
	withReducer('CountriesApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(countryManagmentApp)))));
