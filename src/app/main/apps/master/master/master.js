import React, {Component} from 'react';
import {withStyles, Button, Tab, Tabs, TextField, Icon, Typography, Checkbox, FormControlLabel, CircularProgress} from '@material-ui/core';
import {FuseAnimate, FusePageCarded, FuseChipSelect} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import { withTranslate } from 'react-redux-multilingual';  //--maddahi-and addtranslate words--//


const styles = theme => ({
	select:{
		verticalAlign:'middle', 
		fontSize:15,
	},
	label:{
		marginRight:10,
	},
	hidden: {
		display: 'none',
	},
    productImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            boxShadow                    : theme.shadows[5],
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
        }
    },	
	uploadBtn:{
		fontSize:12,
	},
	controlLabel:{
		marginLeft:0,
	},	
});

class Master extends Component {

    state = {
        tabValue: 0,
        form    : null,
    };

    componentDidMount()
    {
        this.updateMasterState();
        this.props.getCompanies();
		this.props.getCities();
		this.props.getRoles();		
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.updateMasterState();
        }

        if (
            (this.props.master.data && !this.state.form) ||
            (this.props.master.data && this.state.form && this.props.master.data.id !== this.state.form.id)
        )
        { 
            this.updateFormState();
        }
    }

    updateFormState = () => {
        this.setState({form: this.props.master.data})
    };

    updateMasterState = () => {
        const params = this.props.match.params;
        const {masterId} = params;  

        if ( masterId === 'new' )
        {
            this.props.newMaster(); 
        }
        else
        {
            this.props.getMaster(this.props.match.params);
        }
    };

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChange = (event) => {	
		if(event.target.name === 'ownerIsFreelancer') // Freelancer doesnt have any company or city for choose .
			this.setState({form: {...this.state.form, 'ownerIsFreelancer': event.target.checked, 'masterCity': null, 'masterCompanyId': null}});	
		else	
			this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    canBeSubmitted()
    {
        const {masterName,masterCode, masterPassword, masterRePassword, masterMobile, masterEmail} = this.state.form;
        return (
            masterName.length > 0 &&  masterCode.length > 0 && masterPassword.length > 0 && masterRePassword.length > 0 && !this.props.master.loading &&
            !_.isEqual(this.props.master.data, this.state.form) && masterMobile.length > 0 && masterEmail.length > 0 && masterPassword === masterRePassword
        );
    }
	
	addFiles = (event) => {
		const file = event.target.files[0];
		this.setState({form: {...this.state.form, 
			[event.target.name] :{
				url: URL.createObjectURL(file),
				file				
			}
		}});
	};
	
	chipsOnChange = (value, name) => { 
		if(name === 'masterCity')	// bucuase current city  maybe did not have company 		
			this.setState({form: {...this.state.form, [name]: value, 'masterCompanyId': null}});
		else
			this.setState({form: {...this.state.form, [name]: value}});
	}	
	
	locationChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		const {masterLocation} = this.state.form;
		if(name === "masterLat")
			this.setState({form: {...this.state.form, masterLocation: [value, masterLocation.length >1 ? masterLocation[1]: null]}});
		else if(name === "masterLong")
			this.setState({form: {...this.state.form, masterLocation: [masterLocation.length >0 ? masterLocation[0]: null, value]}});
	};
	
		
    render()
    {
        const {classes, saveMaster, master, translate} = this.props;
        const {tabValue, form}	= this.state;
		let selectedCity 		= null;
		let selectedRole 		= null;		
		let selectedCompany 	= null;		
		const allCities 		= master.cities.map(({id:value, title:label}) => ({value, label}));
		const allRoles 			= master.roles.map(({id:value, name:label}) => ({value, label}));
		const freelancerObjct 	= {label:'Freelancer', value:'-1'};
		let allCompanies 		= [];
		
		if(form !== null){
			selectedCity = allCities.find(({value:id}) => id === form.masterCity);
			selectedRole = allRoles.find(({value:id}) => id === form.ownerRole);			
			if(selectedCity)
				allCompanies = [...master.companies.filter(({companyCity}) => companyCity ===  selectedCity.value).map(({id:value, companyName:label}) => 
				({value, label})), freelancerObjct];
			selectedCompany = allCompanies.find(({value:id}) => id === form.masterCompanyId);
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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/master/masters">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
											Teacher Detail
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
								
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {form.masterName ? form.masterName :  'New Teacher'} 
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Teacher Detail</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
							<div>
								<CircularProgress 
									className={master.loading ? '': classes.hidden} 
									color="secondary"
								/>
							</div>							
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    disabled={!this.canBeSubmitted()}
                                    onClick={() => saveMaster(form)}
                                >
                                    {translate('campany_Save')} 
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
                        <Tab className="h-64 normal-case" label={translate('campany_Company_Info')}/>
                        <Tab className="h-64 normal-case" label={translate('campany_Owner_Info')}/>
                          <Tab className="h-64 normal-case" label={translate('campany_device_Info')}/>
                    </Tabs>
                }
                content={
                    form && (
                        <div className="p-16 sm:p-24 max-w-2xl">
                            {tabValue === 0 &&
                            (
                                <div> 

                                 <div className="flex">
                                
                                    <div className="mt-8 mb-16 w-1/3">
                                        <span className={classes.label}>{translate('campany_profile_Image')}</span>
                                        <input accept="image/*" className={classes.hidden} name="masterImage"  
                                            id="masterImage" type="file" onChange={this.addFiles}
                                        />
                                        <label htmlFor="masterImage">
                                            <Button variant="outlined" component="span" className={classes.uploadBtn}>
                                                {translate('campany_Choose_Image')}
                                            </Button>
                                        </label>                                    
                                    </div>  
                                    <div className="mt-8 mb-16 w-1/3">
                                    {
                                        (form.masterImage && 
                                            <div
                                                className={
                                                    classNames(
                                                        classes.productImageItem,
                                                        "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
                                                }
                                            >                                   
                                                <img className="max-w-none w-auto h-full" 
                                                    src={typeof form.masterImage === "object" ? form.masterImage.url : form.masterImage} 
                                                    alt={translate('campany_Certificate')}
                                                />
                                            </div>
                                        )                                       
                                    }
                                    </div>



                                <div className="mt-8 mb-16 w-2/3">
                                   <div className="flex">
                                    <FormControlLabel
                                        id="status"
                                        label={translate('status')}                                  
                                        control={<Checkbox color="primary" onChange={this.handleChange} checked={form.status} name="status" />}
                                        labelPlacement="status"
                                        className={classes.controlLabel}
                                    />  
                                 </div> 
                                   <TextField
                                        className="mt-8 mb-16 mr-8"
                                        error={form.masterName === ''}
                                        required
                                        label={translate('campany_Name')}
                                        autoFocus
                                        id="masterName"
                                        name="masterName"
                                        value={form.masterName}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />
                                     <TextField
                                        className="mt-8 mb-16 mr-8"
                                        error={form.masterCode === ''}
                                        required
                                        label={translate('master_Code')}
                                        autoFocus
                                        id="masterCode"
                                        name="masterCode"
                                        value={form.masterCode}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                         
                                    />
                                 </div> 
                            </div>  
                            <div className="flex">
									<TextField
                                        className="mt-8 mb-16 mr-8"
                                        id="masterEmail"
                                        name="masterEmail"                                     
                                        label={translate('campany_Email')}
										value={form.masterEmail}
										onChange={this.handleChange}                                      
                                        type="text"                                       
                                        variant="outlined"
										fullWidth	
                                        error={form.masterEmail === ''}
                                        required
										disabled={this.props.match.params.masterId === "new" ? false : true}
                                    />	
									<TextField
                                        className="mt-8 mb-16 mr-8"
                                        id="masterMobile"
                                        name="masterMobile"                                     
                                        label={translate('campany_Mobile')}
										value={form.masterMobile}
										onChange={this.handleChange}                                      
                                        type="text"                                       
                                        variant="outlined"
										fullWidth
										required
										error={form.masterMobile === ''}
										disabled={this.props.match.params.masterId === "new" ? false : true}
                                    />		
                                </div>	
                               

                                <div className="flex">    
                                    <TextField
                                        className="mt-8 mb-16  mr-8"
                                        id="ownerFirstName"
                                        name="ownerFirstName"                                     
                                        label={translate('campany_First_Name')}
                                        value={form.ownerFirstName}
                                        onChange={this.handleChange}                                      
                                        type="text"                                       
                                        variant="outlined"
                                        fullWidth   
                                    />  
                                    <TextField
                                        className="mt-8 mb-16  mr-8"
                                        id="ownerLastName"
                                        name="ownerLastName"                                     
                                        label={translate('campany_Last_Name')}
                                        value={form.ownerLastName}
                                        onChange={this.handleChange}                                      
                                        type="text"                                       
                                        variant="outlined"
                                        fullWidth   
                                    />  
                                </div>   
                                 
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="ownerMobile"
                                        name="ownerMobile"                                     
                                        label={translate('owner_phone')}
                                        value={form.ownerMobile}
                                        onChange={this.handleChange}                                      
                                        type="text"                                       
                                        variant="outlined"
                                            
                                    />  


                                    <TextField
                                        className="mt-8 mb-16"
                                        id="masterAddress"
                                        name="masterAddress"                                     
                                        label={translate('campany_Address')}
										value={form.masterAddress}
										onChange={this.handleChange}                                      
                                        type="text"                                       
                                        variant="outlined"
                                        multiline
                                        rows={2}										
										fullWidth	
                                    />	 
                                 								                                   
									<TextField
                                        className="mt-8 mb-16"
                                        id="masterDescription"
                                        name="masterDescription"                                     
                                        label={translate('campany_Description')}
										value={form.masterDescription}
										onChange={this.handleChange}                                      
                                        type="text"                                       
                                        variant="outlined"
                                        multiline
                                        rows={5}										
										fullWidth	
                                    />									
                                </div>
                            )}
                            {tabValue === 1 && (
                                <div>

                                  <div className="flex">
                                    <FormControlLabel
                                        id="ownerIsFreelancer"
                                        label={translate('campany_Is_Freelancer')}                                  
                                        control={<Checkbox color="primary" onChange={this.handleChange} checked={form.ownerIsFreelancer} name="ownerIsFreelancer" />}
                                        labelPlacement="start"
                                        className={classes.controlLabel}
                                    />  
                                 </div> 
                                 <div className="flex">    
                                    {
                                        form.ownerIsFreelancer ? 
                                            <>
                                                <TextField
                                                    disabled={true}
                                                    className="mt-8 mb-16 mr-8"
                                                    label={translate('campany_City')}                                           
                                                    value={''}
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                                <TextField
                                                    disabled={true}
                                                    className="mt-8 mb-16"
                                                    label='Companies'                                           
                                                    value={''}
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </>
                                        :
                                            <>
                                                <FuseChipSelect
                                                    onChange={(row) => {this.chipsOnChange(row.value, 'masterCity')}}
                                                    className="w-full mt-8 mb-16 mr-8"
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
                                                />  
                                                <FuseChipSelect
                                                    onChange={(row) => {this.chipsOnChange(row.value, 'masterCompanyId')}}
                                                    className="w-full mt-8 mb-16 mr-8"
                                                    value={selectedCompany || null}
                                                    placeholder='search a company'
                                                    textFieldProps={{
                                                        label          : 'Companies',
                                                        InputLabelProps: {
                                                            shrink: true
                                                        },
                                                        variant        : 'outlined',
                                                    }}
                                                    options={allCompanies}
                                                /> 
                                            </>
                                    }                                       
                                   
                                    {
                                        this.props.match.params.masterId === "new" ? 
                                            <FuseChipSelect
                                                onChange={(row) => {this.chipsOnChange(row.value, 'ownerRole')}}
                                                className="w-full"
                                                value={selectedRole || null}
                                                placeholder={translate('campany_Search_a_Role')}
                                                textFieldProps={{
                                                    label          : translate('campany_Role'),
                                                    InputLabelProps: {
                                                        shrink: true
                                                    },
                                                    variant        : 'outlined',
                                                    
                                                }}
                                                options={allRoles}
                                            />  
                                        :
                                        <TextField
                                            className="mt-8 mb-16"
                                            label={translate('campany_Role')}
                                            value={form.ownerRole || ''}
                                            variant="outlined"
                                            fullWidth
                                            disabled={true}
                                        />                                      
                                    }

                                </div>

                                <div className="flex">                        
                                    <TextField
                                        className="mt-8 mb-16 mr-8"
                                        id="masterPassword"
                                        required
                                        name="masterPassword"
                                        onChange={this.handleChange}
                                        label={translate('campany_Password')}
                                        value={form.masterPassword}
                                        type="password"                                       
                                        variant="outlined"
                                        fullWidth
                                        error={form.masterPassword === '' || (form.masterPassword !== form.masterRePassword)}   
                                        helperText={(form.masterPassword !== form.masterRePassword)? 
                                            "Password Doesn't match": ""
                                        }
                                        disabled={this.props.match.params.masterId === "new" ? false : true}
                                    />                                  
                                    <TextField
                                        className="mt-8 mb-16 mr-8"
                                        id="masterRePassword"
                                        required
                                        name="masterRePassword"
                                        onChange={this.handleChange}
                                        label={translate('campany_Re_Password')}
                                        value={form.masterRePassword}
                                        type="password"                                       
                                        variant="outlined"
                                        fullWidth
                                        error={form.masterRePassword === '' || (form.masterPassword !== form.masterRePassword)}
                                        helperText={(form.masterPassword !== form.masterRePassword)? 
                                            "Re Password Doesn't match": ""
                                        }
                                        disabled={this.props.match.params.masterId === "new" ? false : true}
                                    />  
                              </div>




                                <div className="flex">      
                                    <TextField
                                        className="mt-8 mb-16 mr-8"
                                        id="masterLat"
                                        name="masterLat"                                     
                                        label={'Lat'}
                                        value={form.masterLocation.length > 0 ? form.masterLocation[0] : ''}
                                        onChange={this.locationChange}                                      
                                        type="number"                                       
                                        variant="outlined"
                                        fullWidth   
                                    />  
                                    <TextField
                                        className="mt-8 mb-16 mr-8"
                                        id="masterLong"
                                        name="masterLong"                                     
                                        label={'Long'}
                                        value={form.masterLocation.length > 1 ? form.masterLocation[1] : ''}
                                        onChange={this.locationChange}                                      
                                        type="number"                                       
                                        variant="outlined"
                                        fullWidth   
                                    />  
                            </div>

                            <div className="flex">        
									<div className="mt-8 mb-16 w-1/3">
										<span className={classes.label}>{translate('campany_Certificate_Image')}</span>
										<input accept="image/*" className={classes.hidden} name="ownerCertificateImg"  
											id="ownerCertificateImg" type="file" onChange={this.addFiles}
										/>
										<label htmlFor="ownerCertificateImg">
											<Button variant="outlined" component="span" className={classes.uploadBtn}>
												{translate('campany_Choose_Image')}
											</Button>
										</label>									
									</div>	
									<div className="mt-8 mb-16 w-1/3">
									{
										(form.ownerCertificateImg && 
											<div
												className={
													classNames(
														classes.productImageItem,
														"flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
												}
											>									
												<img className="max-w-none w-auto h-full" 
													src={typeof form.ownerCertificateImg === "object" ? form.ownerCertificateImg.url : form.ownerCertificateImg} 
													alt={translate('campany_Certificate')}
												/>
											</div>
										)										
									}
									</div>


									<div className="mt-8 mb-16 w-1/3">
										<span className={classes.label}>{translate('campany_National_Card_Image')}</span>
										<input accept="image/*" className={classes.hidden} name="ownerNationalCardImg"  
											id="ownerNationalCardImg" type="file" onChange={this.addFiles}
										/>
										<label htmlFor="ownerNationalCardImg">
											<Button variant="outlined" component="span" className={classes.uploadBtn}>
												{translate('campany_Choose_Image')}
											</Button>
										</label>									
									</div>	
									<div className="mt-8 mb-16 w-1/3">
									{
										(form.ownerNationalCardImg && 
											<div
												className={
													classNames(
														classes.productImageItem,
														"flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
												}
											>									
												<img className="max-w-none w-auto h-full" 
													src={typeof form.ownerNationalCardImg === "object" ? form.ownerNationalCardImg.url : form.ownerNationalCardImg} 
													alt={translate('campany_National_Card')}
												/>
											</div>
										)										
									}
									</div>		


									<div className="mt-8 mb-16 w-1/3">
										<span className={classes.label}>{translate('campany_Commercial_License_Image')}</span>
										<input accept="image/*" className={classes.hidden} name="ownerCommercialLicenseImg"  
											id="ownerCommercialLicenseImg" type="file" onChange={this.addFiles}
										/>
										<label htmlFor="ownerCommercialLicenseImg">
											<Button variant="outlined" component="span" className={classes.uploadBtn}>
												{translate('campany_Choose_Image')}
											</Button>
										</label>									
									</div>	
									<div className="mt-8 mb-16 w-1/3">
									{
										(form.ownerCommercialLicenseImg && 
											<div
												className={
													classNames(
														classes.productImageItem,
														"flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
												}
											>									
												<img className="max-w-none w-auto h-full" 
													src={typeof form.ownerCommercialLicenseImg === "object" ? 
														form.ownerCommercialLicenseImg.url : form.ownerCommercialLicenseImg} 
													alt={translate('campany_Commercial_License')} 
												/>
											</div>
										)										
									}
									</div>		
                            </div>

                            <div className="flex">   
									<TextField
                                        className="mt-16 mb-16"
                                        id="ownerBankAcountInformation"
                                        name="ownerBankAcountInformation"                                     
                                        label='IR-'
										value={form.ownerBankAcountInformation}
										onChange={this.handleChange}                                      
                                        type="text"                                       
                                        variant="outlined"
										 	
                                    />	
                            </div>

                                </div>
                            )} {tabValue === 2 &&
                            (
                                <div> 

                                 <div className="flex">
                                   <TextField
                                        className="mt-8 mb-16 mr-8"
                                        error={form.vehicle_brand === ''}
                                        required
                                        label={translate('vehicle_brand')}
                                        autoFocus
                                        id="vehicle_brand"
                                        name="vehicle_brand"
                                        value={form.vehicle_brand}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    /> <TextField
                                        className="mt-8 mb-16 mr-8"
                                        error={form.vehicle_model === ''}
                                        required
                                        label={translate('vehicle_model')}                                       
                                        id="vehicle_model"
                                        name="vehicle_model"
                                        value={form.vehicle_model}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    /> 
                                  </div>
                                    <div className="flex">
                                   <TextField
                                        className="mt-8 mb-16 mr-8"
                                        error={form.vehicle_brand === ''}
                                        required
                                        label={translate('vehicle_bime')}                                        
                                        id="vehicle_bime"
                                        name="vehicle_bime"
                                        value={form.vehicle_bime}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    /> <TextField
                                        className="mt-8 mb-16 mr-8"
                                        error={form.vehicle_pelak === ''}
                                        required
                                        label={translate('vehicle_pelak')}                                       
                                        id="vehicle_pelak"
                                        name="vehicle_pelak"
                                        value={form.vehicle_pelak}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />
                                  </div>
                                      <TextField
                                        className="mt-8 mb-16 mr-8"                                        
                                        label={translate('masterRate')}                                       
                                        id="masterRate"
                                        name="masterRate"
                                        value={form.masterRate}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                         
                                    />
                                     <TextField
                                        className="mt-8 mb-16 mr-8"                                        
                                        label={translate('masterCnt')}                                       
                                        id="masterCnt"
                                        name="masterCnt"
                                        value={form.masterCnt}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                         
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
        getMaster 	: Actions.getMaster,
        getCities 	: Actions.getCities,
        getRoles 	: Actions.getRoles,
        newMaster 	: Actions.newMaster,
        saveMaster	: Actions.saveMaster,
        getCompanies: Actions.getCompanies
    }, dispatch);
}

function mapStateToProps({masterApp})
{
    return {
        master: masterApp.master,
    }
}

export default withReducer('masterApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(Master)))));
//export default Master;
