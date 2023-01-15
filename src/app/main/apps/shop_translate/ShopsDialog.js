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

const newShopsState = {

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

class ShopsDialog extends Component {

	constructor(props) {
		super(props);
		this.backgroundInputRef = React.createRef();
		this.iconInputRef = React.createRef();
	}
  
    state = {
        form       : {...newShopsState},
    };

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.shopsDialog.props.open && this.props.shopsDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.shopsDialog.type === 'edit' &&
                this.props.shopsDialog.data &&
                !_.isEqual(this.props.shopsDialog.data, prevState) )
            {
                this.setState({form: {...this.props.shopsDialog.data}});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.shopsDialog.type === 'new' &&
                !_.isEqual(newShopsState, prevState) )
            {
                this.setState({
                    form: {
                        ...newShopsState,
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

    closeShopsDialog = () => {
        this.props.shopsDialog.type === 'edit' ? this.props.closeEditShopsDialog() : this.props.closeNewShopsDialog();
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
        const {shopsDialog, updateShops, classes} = this.props;
        const {form} = this.state;

        return (
            <Dialog {...shopsDialog.props} onClose={this.closeShopsDialog} fullWidth maxWidth="sm">

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {shopsDialog.type === 'new' ? 'New Shop' : 'Edit Shop'}
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

                {shopsDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                //addShops(this.state.form);
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
                                updateShops(this.state.form);
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
        closeEditShopsDialog: Actions.closeEditShopsDialog,
        closeNewShopsDialog : Actions.closeNewShopsDialog,
       // addShops            : Actions.addShops,
        updateShops         : Actions.updateShops,
        //removeShops         : Actions.removeShops
    }, dispatch);
}

function mapStateToProps({shopsApp})
{
    return { 
        shopsDialog		: shopsApp.shops.shopsDialog,
		loading				: shopsApp.shops.loading,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(ShopsDialog));
