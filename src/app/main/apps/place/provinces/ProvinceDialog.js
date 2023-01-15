import React, {Component} from 'react';
import {withStyles, TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, CircularProgress} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';
import {FuseChipSelect} from '@fuse';
import classNames from 'classnames';

const newProvinceState = {
    id        	: '',
    title     	: '',
    long      	: '',
    lat       	: '',
	country		: null,
	image		: '',
};

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
	loading:{
		marginLeft: theme.spacing.unit * 10
	},	
});
	
class ProvinceDialog extends Component {

    state = {
		...newProvinceState,
		checkboxs: {},
	};

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.provinceDialog.props.open && this.props.provinceDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.provinceDialog.type === 'edit' &&
                this.props.provinceDialog.data &&
                !_.isEqual(this.props.provinceDialog.data, prevState) )
            {
                this.setState({...this.props.provinceDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.provinceDialog.type === 'new' &&
                !_.isEqual(newProvinceState, prevState) )
            {
                this.setState({...newProvinceState});
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
        this.props.provinceDialog.type === 'edit' ? this.props.closeEditProvinceDialog() : this.props.closeNewProvinceDialog();
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
        const {provinceDialog, updateProvince, addProvince, removeProvince, countries, classes} = this.props;
		const allCountries = countries.map(({title:label}) => ({value: label, label}));
		const innerCountryOnChange = (row) => {
			this.CountryOnChange('country', row.value);
		};
		const selectedCountry = allCountries.find(({value:id}) => id === this.state.country);
		
        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...provinceDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="sm"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {provinceDialog.type === 'new' ? 'New Province' : 'Edit Province'}
                        </Typography>
						<div>
							<CircularProgress 
								className={this.props.loading? classes.loading:classes.hidden} 
								color="secondary"
							/>
						</div>						
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        {provinceDialog.type === 'edit' && (
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
                            label="Province Name"
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
						placeholder="Search a country"
						textFieldProps={{
							label          : 'Country',
							InputLabelProps: {
								shrink: true
							},
							variant        : 'outlined',
							
						}}
						options={allCountries}						
					/>			
					<div className="flex">
                        <TextField
                            className="mb-24 mr-8"
                            label="Lat"                           
                            id="lat"
                            name="lat"
                            value={this.state.lat}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
										
                        <TextField
                            className="mb-24 mr-8"
                            label="Long"
                            id="long"
                            name="long"
                            value={this.state.long}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />						
                    </div>
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

                {provinceDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addProvince(this.state);
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
                                updateProvince(this.state);
                                //this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                removeProvince(this.state.id);
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
        closeEditProvinceDialog: Actions.closeEditProvinceDialog,
        closeNewProvinceDialog : Actions.closeNewProvinceDialog,
        addProvince            : Actions.addProvince,
        updateProvince         : Actions.updateProvince,
        removeProvince         : Actions.removeProvince
    }, dispatch);
}

function mapStateToProps({CountriesApp})
{
    return {
        provinceDialog	: CountriesApp.provinces.provinceDialog,
        countries	: CountriesApp.countries.countries,
		loading		: CountriesApp.provinces.loading,
    }
}


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(ProvinceDialog));