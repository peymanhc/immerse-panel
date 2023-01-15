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
     labelCustom :{
      transformOrigin: "top right",
      right: 22,
      left: "auto"
    },
    
   fuse: {
        direction: 'rtl',
    },
    arrow: {
        transform: 'scaleX(-1)'
    },
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

class Company extends Component {

    state = {
        tabValue: 0,
        form    : null,
    };

    componentDidMount()
    {
        this.updateCompanyState();
		this.props.getCities();
        this.props.getProvinces();
        
		this.props.getRoles();		
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.updateCompanyState();
        }

        if (
            (this.props.company.data && !this.state.form) ||
            (this.props.company.data && this.state.form && this.props.company.data.id !== this.state.form.id)
        )
        { 
            this.updateFormState();
        }
    }

    updateFormState = () => {
        this.setState({form: this.props.company.data})
    };

    updateCompanyState = () => {
        const params = this.props.match.params;
        const {companyId} = params;  

        if ( companyId === 'new' )
        {
            this.props.newCompany(); 
        }
        else
        {
            this.props.getCompany(this.props.match.params);
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
        const {companyName,companyPassword, companyRePassword, companyEmail, companyMobile ,  
             codeMelli   ,codePost , codeSh ,fatherName ,companyPhone } = this.state.form;
        return (
            companyName.length > 0 && companyPassword.length > 0 && companyRePassword.length > 0 && !this.props.company.loading &&
            !_.isEqual(this.props.company.data, this.state.form) && companyEmail.length && companyMobile.length && companyRePassword === companyPassword
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
		this.setState({form: {...this.state.form, [name]: value}});
	}	
	
	locationChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		const {companyLocation} = this.state.form;
		if(name === "companyLat")
			this.setState({form: {...this.state.form, companyLocation: [value, companyLocation.length >1 ? companyLocation[1]: null]}});
		else if(name === "companyLong")
			this.setState({form: {...this.state.form, companyLocation: [companyLocation.length >0 ? companyLocation[0]: null, value]}});
	};
	
    render()
    {
        const {classes, saveCompany, company, translate} = this.props; 
        const {tabValue, form} = this.state;
        let selectedProvince = {};
		let selectedCity = {};
		let selectedRole = {};
		
        const allProvinces = company.provinces.map(({id:value, title:label}) => ({value, label}));
		let allCities = [];
		
		
		const allRoles = company.roles.map(({id:value, name:label}) => ({value, label}));
		if(form !== null){			
            selectedProvince = allProvinces.find(({value:id}) => id === form.companyProvince);
			selectedRole = allRoles.find(({value:id}) => id === form.ownerRole);			
			if(selectedProvince){
				const selectedProvince2 = company.provinces.find(({id}) => id === form.companyProvince);
				allCities = company.cities.filter(({province, country}) => province === selectedProvince2.title && country === selectedProvince2.country);
				allCities = allCities.map(({id:value, title:label}) => ({value, label}));				
				selectedCity = allCities.find(({value:id}) => id === form.companyCity);
			}
		}
		
        return (
             <div className={classes.fuse}>
            <FusePageCarded
                classes={{
                    toolbar: "p-0",
                    header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    form && (
                        <div className="flex flex-1 w-full items-center justify-between">

                            <div className="flex flex-col items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/company/companies">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        {translate('Companies')} 
                                    </Typography>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/company/companies">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        excel
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
								
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {form.companyName ? form.companyName :  translate('campany_New_Company')} 
                                            </Typography>
                                        </FuseAnimate> 
                                    </div>
                                </div>
                            </div>
							<div>
								<CircularProgress 
									className={company.loading ? '': classes.hidden} 
									color="secondary"
								/>
							</div>							
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    disabled={!this.canBeSubmitted()}
                                    onClick={() => saveCompany(form)}
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


                               <div className="mt-8 mb-16">
                                        <span className={classes.label}>{translate('campany_profile_Image')}</span>
                                        <input accept="image/*" className={classes.hidden} name="companyImage"  
                                            id="companyImage" type="file" onChange={this.addFiles}
                                        />
                                        <label htmlFor="companyImage">
                                            <Button variant="outlined" component="span" className={classes.uploadBtn}>
                                                {translate('campany_Choose_Image')}
                                            </Button>
                                        </label>                                    
                                    </div>  
                                    <div className="mt-8 mb-16">
                                    {
                                        (form.companyImage && 
                                            <div
                                                className={
                                                    classNames(
                                                        classes.productImageItem,
                                                        "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
                                                }
                                            >                                   
                                                <img className="max-w-none w-auto h-full" 
                                                    src={typeof form.companyImage === "object" ? form.companyImage.url : form.companyImage} 
                                                    alt={translate('campany_Certificate')}
                                                />
                                            </div>
                                        )                                       
                                    }
                                    </div>





  </div>
  <div className="mt-8 mb-16 w-2/3">


                                    <TextField
                                        className="mt-8 mb-16  mr-8"
                                        error={form.companyName === ''}
                                        required
                                        label={translate('campany_Name')}
                                        autoFocus
                                        id="companyName"
                                        name="companyName"
                                        value={form.companyName}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />
									{
										this.props.match.params.companyId === "new" ?
											<FuseChipSelect
												onChange={(row) => {this.chipsOnChange(row.value, 'ownerRole')}}
												className="w-full  mr-8"
												value={selectedRole || null}
												placeholder={translate('campany_Search_a_Role')}
												textFieldProps={{
													label          : translate('campany_Role'),
													InputLabelProps: {
														shrink: true,
														required:true,
													},
													variant        : 'outlined',
													
												}}
												options={allRoles}
												required
											/>	
										:
										<TextField
											className="mt-8 mb-16  mr-8"
											label={translate('campany_Role')}
											value={form.ownerRole || ''}
											variant="outlined"
											fullWidth
											disabled={true}
										/>		 								
									}
                                </div>
  </div>

                            <div className="flex">        
                                    <TextField
                                        className="mt-8 mb-16  mr-8"
                                        id="codeMelli"
                                        name="codeMelli"                                     
                                        label={translate('codeMelli')}
                                        value={form.codeMelli}
                                        onChange={this.handleChange}                                      
                                        type="text"                                       
                                        variant="outlined"
                                        fullWidth  
                                    />    
                                    <TextField
                                        className="mt-8 mb-16  mr-8"
                                        id="companyMobile"
                                        name="companyMobile"                                     
                                        label={translate('campany_Mobile')}
                                        value={form.companyMobile}
                                        onChange={this.handleChange}                                      
                                        type="text"                                       
                                        variant="outlined"
                                        fullWidth   
                                    /> 

                                       
                                </div>

                               
                                <div className="flex">      
                                    <TextField 
                                        className="mt-8 mb-16  mr-8"
                                        id="companyPassword"
										required
                                        name="companyPassword"
                                        onChange={this.handleChange}
                                        label={translate('campany_Password')}
                                        value={form.companyPassword}
                                        type="password"                                       
                                        variant="outlined"
										fullWidth
										error={form.companyPassword === '' || (form.companyPassword !== form.companyRePassword)}	
										helperText={(form.companyPassword !== form.companyRePassword)? 
											"Password Doesn't match": ""
										}
										disabled={this.props.match.params.companyId === "new" ? false : true}
                                    />									
                                    <TextField
                                        className="mt-8 mb-16  mr-8"
                                        id="companyRePassword"
										required
                                        name="companyRePassword"
                                        onChange={this.handleChange}
                                        label={translate('campany_Re_Password')}
                                        value={form.companyRePassword}
                                        type="password"                                       
                                        variant="outlined"
										fullWidth
										error={form.companyRePassword === '' || (form.companyPassword !== form.companyRePassword)}
										helperText={(form.companyPassword !== form.companyRePassword)? 
											"Re Password Doesn't match": ""
										}
										disabled={this.props.match.params.companyId === "new" ? false : true}
                                    />	
                                </div>    							
                                  
                            <div className="flex">      
                                   <TextField
                                        className="mt-8 mb-16  mr-8"
                                        id="codePost"
                                        name="codePost"                                     
                                        label={translate('codePost')}
                                        value={form.codePost}
                                        onChange={this.handleChange}                                      
                                        type="text"                                       
                                        variant="outlined"
                                        fullWidth  
                                    /> 

									<TextField
                                        className="mt-8 mb-16  mr-8"
                                        id="companyLat"
                                        name="companyLat"                                     
                                        label={'Lat'}
										value={form.companyLocation.length > 0 ? form.companyLocation[0] : ''}
										onChange={this.locationChange}                                      
                                        type="number"                                       
                                        variant="outlined"
										fullWidth	
                                    />	
									<TextField
                                        className="mt-8 mb-16  mr-8"
                                        id="companyLong"
                                        name="companyLong"                                     
                                        label={'Long'}
										value={form.companyLocation.length > 1 ? form.companyLocation[1] : ''}
										onChange={this.locationChange}                                      
                                        type="number"                                       
                                        variant="outlined"
										fullWidth	
                                    />	
                            </div>  
                             <div className="flex">     
                                <FuseChipSelect
                                        onChange={(row) => {this.chipsOnChange(row.value, 'companyProvince')}}
                                        className="w-full  mr-8"
                                        value={selectedProvince || null}
                                        placeholder={translate('campany_Search_a_Province')}
                                        textFieldProps={{
                                            label          : translate('campany_Province'),
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant        : 'outlined',
                                            
                                        }}
                                        options={allProvinces}
                                    /> 

									<FuseChipSelect
										onChange={(row) => {this.chipsOnChange(row.value, 'companyCity')}}
										className="w-full  mr-8"
										value={selectedCity || null}
										placeholder={translate('campany_Search_a_City')}
										textFieldProps={{
											label          : translate('campany_City'),
											InputLabelProps: {
												shrink: true
											},
											variant        : 'outlined',
											
										}}
										options={allCities}
									/> 
                             </div>    

                                    <TextField
                                        className="mt-8 mb-16"
                                        id="companyAddress"
                                        name="companyAddress"                                     
                                        label={translate('campany_Address')}
                                        value={form.companyAddress}
                                        onChange={this.handleChange}                                      
                                        type="text"                                       
                                        variant="outlined"
                                        multiline
                                        rows={2}                                        
                                        fullWidth   
                                    /> 

									<TextField
                                        className="mt-8 mb-16  mr-8"
                                        id="companyDescription"
                                        name="companyDescription"                                     
                                        label={translate('campany_Description')}
										value={form.companyDescription}
										onChange={this.handleChange}                                      
                                        type="text"                                       
                                        variant="outlined"
                                        multiline
                                        rows={2}										
										fullWidth	
                                    />									
                                </div>
                            )}
                            {tabValue === 1 && (
                                <div>
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
							   <div className="flex">   
                               		<TextField
                                        className="mt-8 mb-16  mr-8"
                                        id="ownerMobile"
                                        name="ownerMobile"                                     
                                        label={translate('campany_Mobile')}
										value={form.ownerMobile}
										onChange={this.handleChange}                                      
                                        type="text"                                       
                                        variant="outlined"
										fullWidth	
                                    /> 
                                   <TextField
                                        className="mt-8 mb-16  mr-8"
                                        id="codeSh"
                                        name="codeSh"                                     
                                        label={translate('codeSh')}
                                        value={form.codeSh}
                                        onChange={this.handleChange}                                      
                                        type="text"                                       
                                        variant="outlined"
                                        fullWidth                                           
                                    />  
                                </div>

                                <div className="flex">        
                                    <TextField
                                        className="mt-8 mb-16  mr-8"
                                        id="companyPhone"
                                        name="companyPhone"                                     
                                        label={translate('companyPhone')}
                                        value={form.companyPhone}
                                        onChange={this.handleChange}                                      
                                        type="text"                                       
                                        variant="outlined"
                                        fullWidth  
                                    />                                      
                                    <TextField
                                        className="mt-8 mb-16  mr-8"
                                        id="fatherName"
                                        name="fatherName"                                     
                                        label={translate('fatherName')}
                                        value={form.fatherName}
                                        onChange={this.handleChange}                                      
                                        type="text"                                       
                                        variant="outlined"
                                        fullWidth   
                                         
                                    />  
                                </div>


                                <div className="flex">        
                                    <TextField
                                        className="mt-8 mb-16  mr-8"
                                        id="companyEmail"
                                        name="companyEmail"                                     
                                        label={translate('campany_Email')}
                                        value={form.companyEmail}
                                        onChange={this.handleChange}                                      
                                        type="text"                                       
                                        variant="outlined"
                                        fullWidth 
                                         
                                    />                                      
                               
                                </div>

   
                                    <FormControlLabel
                                        id="ownerIsFreelancer"
                                        label={translate('campany_Is_Freelancer')}                                  
                                        control={<Checkbox color="primary" onChange={this.handleChange} checked={form.ownerIsFreelancer} name="ownerIsFreelancer" />}
                                        labelPlacement="start"
                                        className={classes.controlLabel}
                                    />  

									<div className="mt-8 mb-16">
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
									<div className="mt-8 mb-16">
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
									<div className="mt-8 mb-16">
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
									<div className="mt-8 mb-16">
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
									<div className="mt-8 mb-16">
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
									<div className="mt-8 mb-16">
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
                            )}
                        </div>
                    )
                }
                innerScroll
            />
            </div> 
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getCompany 	: Actions.getCompany,
        getCities 	: Actions.getCities,
        getProvinces  : Actions.getProvinces,
        
        getRoles 	: Actions.getRoles,
        newCompany 	: Actions.newCompany,
        saveCompany	: Actions.saveCompany
    }, dispatch);
}

function mapStateToProps({companyApp})
{
    return {
        company: companyApp.company,
    }
}

export default withReducer('companyApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(Company)))));
//export default Company;
