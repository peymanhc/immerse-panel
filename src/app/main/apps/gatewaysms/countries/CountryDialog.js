import React, {Component} from 'react';
import {withStyles, TextField, Button, Dialog,Radio, FormControlLabel ,Checkbox,
 DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, CircularProgress} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';
import classNames from 'classnames';
import { withTranslate } from 'react-redux-multilingual';

const newCountryState = {
    id 		: '',
    title	: '',
    gatewayname: '', 
    gatewaylink : '',
    apikey  : '',
    defaults : '',
    pass	: '',
    user		: '',
	image	: '',
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

class CountryDialog extends Component {

    state = {...newCountryState};

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.countryDialog.props.open && this.props.countryDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.countryDialog.type === 'edit' &&
                this.props.countryDialog.data &&
                !_.isEqual(this.props.countryDialog.data, prevState) )
            {
                this.setState({...this.props.countryDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.countryDialog.type === 'new' &&
                !_.isEqual(newCountryState, prevState) )
            {
                this.setState({...newCountryState});
            }
        }
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
        this.props.countryDialog.type === 'edit' ? this.props.closeEditCountryDialog() : this.props.closeNewCountryDialog();
    };

    canBeSubmitted()
    {
        const {title} = this.state;
        return (
            title.length > 0
        );
    }
	
	addFiles = (event) => {
		const file = event.target.files[0];
		this.setState({image:{url: URL.createObjectURL(file), file}});
	};
	
    render()
    {
        const {countryDialog, addCountry, updateCountry, removeCountry, classes ,translate} = this.props;
         const adstypes = [
            {
                id:"1", title:"kavehnegar",
            }, 
            {
                id:"2", title:"amoot",
            } , 
            {
                id:"3", title:"pishgaman",
            } 
        ];
        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...countryDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="sm"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {countryDialog.type === 'new' ? 'New gatewaySms' : 'Edit gatewaySms'}
                        </Typography>
						<div>
							<CircularProgress 
								className={this.props.loading? classes.loading:classes.hidden} 
								color="secondary"
							/>
						</div>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">                       
                        {countryDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {this.state.title}
                            </Typography>
                        )}
                    </div>
                </AppBar>

                <DialogContent classes={{root: "p-24"}}>
                    <div className="flex">
                        <TextField
                            className="mb-16"
                            label="عنوان وب سرویس"
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


                     <div className={classes.typesRow}>
                            {
                                adstypes.map(({id, title}) => 
                                    <FormControlLabel1
                                        key={id}
                                        control={
                                            <WhiteRadio
                                                checked={this.state.gatewayname === title}
                                                onChange={this.handleChange}
                                                value={title}
                                                name="gatewayname"
                                                inputProps={{ 'aria-label': {title} }}                                      
                                            />                                  
                                        }
                                        label={title}
                                        labelPlacement="end"
                                    />                                              
                                )
                            }                           
                        </div> 
                  <TextField
                            className="mb-24 mr-8"
                            label="آدرس وب سرویس"                             
                            id="apikey"
                            name="apikey"
                            value={this.state.apikey}
                            onChange={this.handleChange}
                            variant="outlined"                             
                            fullWidth
                            required
                        />

                      <TextField
                            className="mb-24 mr-8"
                            label="آدرس وب سرویس"                             
                            id="gatewaylink"
                            name="gatewaylink"
                            value={this.state.gatewaylink}
                            onChange={this.handleChange}
                            variant="outlined"                             
                            fullWidth
                            required
                        />
					<div className="flex">
                        <TextField
                            className="mb-24 mr-8"
                            label="user  "                           
                            id="user"
                            name="user"
                            value={this.state.user}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />					 				
                        <TextField
                            className="mb-24 mr-8"
                            label="password"
                            id="pass"
                            name="pass"
                              type="password"
                            value={this.state.pass}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />		 				
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

                {countryDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addCountry(this.state);
                                //this.closeComposeDialog();
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
                                updateCountry(this.state);
                                //this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                removeCountry(this.state.id);
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
        closeEditCountryDialog: Actions.closeEditCountryDialog,
        closeNewCountryDialog : Actions.closeNewCountryDialog,
        addCountry            : Actions.addCountry,
        updateCountry         : Actions.updateCountry,
        removeCountry         : Actions.removeCountry
    }, dispatch);
}

function mapStateToProps({CountriesApp})
{
    return {
        countryDialog	: CountriesApp.countries.countryDialog,
		loading			: CountriesApp.countries.loading,
    }
}


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(withTranslate(CountryDialog)));