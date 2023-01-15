import React, {Component} from 'react';
import {withStyles, TextField, Button, Dialog, DialogActions, DialogContent, Icon,Radio ,Checkbox, FormControlLabel ,
  IconButton, Typography, Toolbar, AppBar, CircularProgress} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';
import {FuseChipSelect} from '@fuse';
import classNames from 'classnames'; 
import { withTranslate } from 'react-redux-multilingual';

const newCityState = {
    id        	: '',
    title     	: '',
     linetype: '', 
     defaults : '',
     
	country		: null,
	image		: '',
};



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
    typesRow:{
        marginBottom:10,
    },
	loading:{
		marginLeft: theme.spacing.unit * 10
	},	
});
	
class CityDialog extends Component {

    state = {
		...newCityState,
		checkboxs: {},
	};

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.cityDialog.props.open && this.props.cityDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.cityDialog.type === 'edit' &&
                this.props.cityDialog.data &&
                !_.isEqual(this.props.cityDialog.data, prevState) )
            {
                this.setState({...this.props.cityDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.cityDialog.type === 'new' &&
                !_.isEqual(newCityState, prevState) )
            {
                this.setState({...newCityState});
            }
        }
    }
	
	acceccToCheckBox = (access) => {
		const checkboxs = {};
		Object.keys(access).forEach(name => access[name].forEach(action => checkboxs[this.getCheckBoxName(name, action)] = true));
		this.setState({checkboxs, access: {}});
	};
	
    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
        this.props.cityDialog.type === 'edit' ? this.props.closeEditCityDialog() : this.props.closeNewCityDialog();
    };

    canBeSubmitted()
    {
        const {title} = this.state;
        return (
            title.length > 0
        );
    }
	
	CountryOnChange = (name, value) => {
		this.setState({[name]: value});
	}	
	
	addFiles = (event) => {
		const file = event.target.files[0];
		this.setState({image:{url: URL.createObjectURL(file), file}});
	};	
	
    render()
    { console.log(this.state);
        const {cityDialog, updateCity, addCity, removeCity, countries, classes,translate} = this.props;
		const allCountries = countries.map(({title:label}) => ({value: label, label}));
		const innerCountryOnChange = (row) => {
			this.CountryOnChange('country', row.value);
		};
		const selectedCountry = allCountries.find(({value:id}) => id === this.state.country);
		const gatewayLinetypes = [
            {
                id:"1", title:"عمومی",
            }, 
            {
                id:"2", title:"اختصاصی",
            } 
        ];
        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...cityDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="sm"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {cityDialog.type === 'new' ? 'New gatewaySms lines' : 'Edit gatewaySms lines'}
                        </Typography>
						<div>
							<CircularProgress 
								className={this.props.loading? classes.loading:classes.hidden} 
								color="secondary"
							/>
						</div>						
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        {cityDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {this.state.title}
                            </Typography>
                        )}
                    </div>
                </AppBar>

                <DialogContent classes={{root: "p-24"}}>
                    <div className="flex">
                        <TextField
                            className="mb-24"
                            label="gatewaySms lines Name"
                            autoFocus
                            id="title"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
					</div>
					<FuseChipSelect
						onChange={(row) => {innerCountryOnChange(row)}}
						className="w-full mb-24"
						value={selectedCountry || null}
						gatewaysmsholder="Search a country"
						textFieldProps={{
							label          : 'Country',
							InputLabelProps: {
								shrink: true
							},
							variant        : 'outlined',
							
						}}
						options={allCountries}						
					/>		


                    <div className={classes.typesRow}> 
                            {
                                gatewayLinetypes.map(({id, title}) => 
                                    <FormControlLabel1
                                        key={id}
                                        control={
                                            <WhiteRadio
                                                checked={this.state.linetype === title}
                                                onChange={this.handleChange}
                                                value={title}
                                                name="linetype"
                                                inputProps={{ 'aria-label': {title} }}                                      
                                            />                                  
                                        }
                                        label={title}
                                        labelPlacement="end"
                                    />                                              
                                )
                            }                           
                        </div>  


				   <FormControlLabel
                        value="default gatewaySms"
                        control={<Checkbox color="primary" onChange={this.handleChange} checked={this.state.defaults} name="defaults" />}
                        label={translate('default')}
                        labelPlacement="start"                                      
                    />

					<div className="flex">	
						<div className="mt-8 mb-16">
							<input accept="image/*" className={classes.hidden} name="image"  
								id="image" type="file" onChange={this.addFiles}
							/>
							<label htmlFor="image">
								<Button variant="outlined" component="span" className={classes.uploadBtn}>
									Image
								</Button>
							</label>									
						</div>							
					</div>	
					<div className="flex">	
						<div className="mt-8 mb-16">
						{
							(this.state.image && 
								<div
									className={
										classNames(
											classes.productImageItem,
											"flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
									}
								>									
									<img className="max-w-none w-auto h-full" 
										src={typeof this.state.image === "object" ? this.state.image.url : this.state.image} 
										alt="" 
									/>
								</div>
							)										
						}
						</div>							
					</div>					
                </DialogContent>

                {cityDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addCity(this.state);
                               // this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Add
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                updateCity(this.state);
                                //this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                removeCity(this.state.id);
                                this.closeComposeDialog();
                            }}
                        >
                            <Icon>delete</Icon>
                        </IconButton>
                    </DialogActions>
                )}
            </Dialog>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeEditCityDialog: Actions.closeEditCityDialog,
        closeNewCityDialog : Actions.closeNewCityDialog,
        addCity            : Actions.addCity,
        updateCity         : Actions.updateCity,
        removeCity         : Actions.removeCity
    }, dispatch);
}

function mapStateToProps({CountriesApp})
{
    return {
        cityDialog	: CountriesApp.cities.cityDialog,
        countries	: CountriesApp.countries.countries,
		loading		: CountriesApp.cities.loading,
    }
}


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(withTranslate(CityDialog)));
