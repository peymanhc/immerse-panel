import React, {Component} from 'react';
import {withStyles, TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, CircularProgress} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';
import classNames from 'classnames';

const newCountryState = {
    id 		: '',
    title	: '',
    long	: '',
    lat		: '',
	image	: '',
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
        const {countryDialog, addCountry, updateCountry, removeCountry, classes} = this.props;
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
                            {countryDialog.type === 'new' ? 'New Country' : 'Edit Country'}
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
                            className="mb-24"
                            label="Country Name"
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

                        <TextField
                            className="mb-24 mr-8"
                            label="des"
                            id="des"
                            name="des"
                            value={this.state.des}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
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


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(CountryDialog));