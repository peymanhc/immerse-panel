import React, {Component} from 'react';
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    Typography,
    Toolbar,
    AppBar,
    Divider,
	withStyles,
	CircularProgress,
} from '@material-ui/core';
import {FuseUtils} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import moment from 'moment/moment';
import _ from '@lodash';
import * as Actions from './store/actions';

const newStoresState = {

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

class StoresDialog extends Component {

	constructor(props) {
		super(props);
		this.backgroundInputRef = React.createRef();
		this.iconInputRef = React.createRef();
	}
  
    state = {
        form       : {...newStoresState},
    };

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.storesDialog.props.open && this.props.storesDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.storesDialog.type === 'edit' &&
                this.props.storesDialog.data &&
                !_.isEqual(this.props.storesDialog.data, prevState) )
            {
                this.setState({form: {...this.props.storesDialog.data}});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.storesDialog.type === 'new' &&
                !_.isEqual(newStoresState, prevState) )
            {
                this.setState({
                    form: {
                        ...newStoresState,
                        id: FuseUtils.generateGUID()
                    }
                });
            }
        }
    }

    handleChange = (event) => {
        const form = _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
        this.setState({form});
    };

    closeStoresDialog = () => {
        this.props.storesDialog.type === 'edit' ? this.props.closeEditStoresDialog() : this.props.closeNewStoresDialog();
    };



    canBeSubmitted()
    {
        const {text} = this.state.form;
        return (
            text && text.length > 0
        );
    }
		
 
	
    render()
    {  
        const {storesDialog, updateStores, classes} = this.props;
        const {form} = this.state;

        return (
            <Dialog {...storesDialog.props} onClose={this.closeStoresDialog} fullWidth maxWidth="sm">

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {storesDialog.type === 'new' ? 'New Store' : 'Edit Store'}
                        </Typography>
						<div>
							<CircularProgress 
								className={this.props.loading? classes.loading:classes.hidden} 
								color="secondary"
							/>
						</div>							
                    </Toolbar>
                </AppBar>
                <DialogContent classes={{root: "p-0"}}>

                    <div className="mb-16">
                        <div className="flex items-center justify-between p-12">
                            <div className="flex items-center justify-start" aria-label="Toggle star">
                            </div>
                        </div>
                        <Divider className="mx-24"/>
                    </div>

                    <div className="px-16 sm:px-24">
                        <FormControl className="mt-8 mb-16" required fullWidth>
                            <TextField
                                label="Title"
                                autoFocus
                                name="title"
                                value={form.title}
                                onChange={this.handleChange}
                                required
                                variant="outlined"
								disabled={true}
                            />
                        </FormControl>	
                        <FormControl className="mt-8 mb-16" required fullWidth>
                            <TextField
                                label="Text"                               
                                name="text"
                                value={form.text}
                                onChange={this.handleChange}
                                required
                                variant="outlined"
                            />
                        </FormControl>							
                    </div>

                </DialogContent>

                {storesDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                //addStores(this.state.form);
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Add
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {  
                                updateStores(this.state.form);
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeEditStoresDialog: Actions.closeEditStoresDialog,
        closeNewStoresDialog : Actions.closeNewStoresDialog,
       // addStores            : Actions.addStores,
        updateStores         : Actions.updateStores,
        //removeStores         : Actions.removeStores
    }, dispatch);
}

function mapStateToProps({storesApp})
{
    return { 
        storesDialog		: storesApp.stores.storesDialog,
		loading				: storesApp.stores.loading,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(StoresDialog));
