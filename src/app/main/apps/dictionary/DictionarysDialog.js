import React, {Component} from 'react';
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    FormControlLabel,
    Checkbox,
    Icon,
    IconButton,
    Typography,
    Toolbar,
    AppBar,
    Divider,
    withStyles,
    CircularProgress,
} from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';
import {FuseUtils} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import moment from 'moment/moment';
import _ from '@lodash';
import * as Actions from './store/actions';
import classNames from 'classnames';

const newDictionarysState = {
    'id'            : '',
    'title'         : '',
    'text'   : '',
    'starred'       : false,
    'important'     : false,
    'disable'       : false,
    'order'         : 0,    
    'delay'         : 0,    
    'image_classic' : '',
    'image_full'    : '',
    'image_mobile'  : '',
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

class DictionarysDialog extends Component {

    constructor(props) {
        super(props);
        this.backgroundInputRef = React.createRef();
        this.iconInputRef = React.createRef();
    }
  
    state = {
        form       : {...newDictionarysState},
        background: null,
        icon: null
    };

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.dictionarysDialog.props.open && this.props.dictionarysDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.dictionarysDialog.type === 'edit' &&
                this.props.dictionarysDialog.data &&
                !_.isEqual(this.props.dictionarysDialog.data, prevState) )
            {
                this.setState({form: {...this.props.dictionarysDialog.data}});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.dictionarysDialog.type === 'new' &&
                !_.isEqual(newDictionarysState, prevState) )
            {
                this.setState({
                    form: {
                        ...newDictionarysState,
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

    closeDictionarysDialog = () => {
        this.props.dictionarysDialog.type === 'edit' ? this.props.closeEditDictionarysDialog() : this.props.closeNewDictionarysDialog();
    };

    handleToggleImportant = () => {
        this.setState({
            form: {
                ...this.state.form,
                important: !this.state.form.important
            }
        });
    };

    handleToggleStarred = () => {
        this.setState({
            form: {
                ...this.state.form,
                starred: !this.state.form.starred
            }
        });
    };

    canBeSubmitted()
    {
        const {title} = this.state.form;
        return (
            title.length > 0
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
    
    render()
    {  
        const {dictionarysDialog, addDictionarys, updateDictionarys, removeDictionarys, classes} = this.props;
        const {form} = this.state;

        return (
            <Dialog {...dictionarysDialog.props} onClose={this.closeDictionarysDialog} fullWidth maxWidth="sm">

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {dictionarysDialog.type === 'new' ? 'New Slider' : 'Edit Slider'}
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
                                <IconButton onClick={this.handleToggleImportant}>
                                    {form.important ? (
                                        <Icon style={{color: red[500]}}>error</Icon>
                                    ) : (
                                        <Icon>error_outline</Icon>
                                    )}
                                </IconButton>

                                <IconButton onClick={this.handleToggleStarred}>
                                    {form.starred ? (
                                        <Icon style={{color: amber[500]}}>star</Icon>
                                    ) : (
                                        <Icon>star_outline</Icon>
                                    )}
                                </IconButton>
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
                            />
                        </FormControl>  
    
                        <div className="flex">                       
                            <TextField
                                label="Order"
                                id="order"
                                name="order"
                                value={form.order}
                                onChange={this.handleChange}
                                type="number"
                                variant="outlined"
                                className="w-1/2 mt-8 mb-16 mr-8"
                            />                                  
                            <TextField
                                label="Delay"
                                id="delay"
                                name="delay"
                                value={form.delay}
                                onChange={this.handleChange}
                                type="number"
                                variant="outlined"
                                className="w-1/2 mt-8 mb-16 ml-8"
                            />                      
                        </div>
                        
                        <FormControl className="mt-8 mb-16" fullWidth>
                            <TextField
                                label="Description"
                                name="text"
                                multiline
                                rows="6"
                                value={form.text}
                                onChange={this.handleChange}
                                variant="outlined"
                            />
                        </FormControl>
                        <div className="flex">  
                            <div className="w-1/3 mt-8 mb-16">
                                <input accept="image/*" className={classes.hidden} name="image_full"  
                                    id="image_full" type="file" onChange={this.addFiles}
                                />
                                <label htmlFor="image_full">
                                    <Button variant="outlined" component="span" className={classes.uploadBtn}>
                                        Full Image
                                    </Button>
                                </label>                                    
                            </div>  
                            <div className="w-1/3 mt-8 mb-16">
                                <input accept="image/*" className={classes.hidden} name="image_mobile"  
                                    id="image_mobile" type="file" onChange={this.addFiles}
                                />
                                <label htmlFor="image_mobile">
                                    <Button variant="outlined" component="span" className={classes.uploadBtn}>
                                        Mobile Image
                                    </Button>
                                </label>                                    
                            </div>  
                            <div className="w-1/3 mt-8 mb-16">
                                <input accept="image/*" className={classes.hidden} name="image_classic"  
                                    id="image_classic" type="file" onChange={this.addFiles}
                                />
                                <label htmlFor="image_classic">
                                    <Button variant="outlined" component="span" className={classes.uploadBtn}>
                                        Classic Image
                                    </Button>
                                </label>                                    
                            </div>                          
                        </div>

                        <div className="flex">  
                            <div className="w-1/3 mt-8 mb-16">
                            {
                                (form.image_full && 
                                    <div
                                        className={
                                            classNames(
                                                classes.productImageItem,
                                                "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
                                        }
                                    >                                   
                                        <img className="max-w-none w-auto h-full" 
                                            src={typeof form.image_full === "object" ? form.image_full.url : form.image_full} 
                                            alt="" 
                                        />
                                    </div>
                                )                                       
                            }
                            </div>  
                            <div className="w-1/3 mt-8 mb-16">
                            {
                                (form.image_mobile && 
                                    <div
                                        className={
                                            classNames(
                                                classes.productImageItem,
                                                "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
                                        }
                                    >                                   
                                        <img className="max-w-none w-auto h-full" 
                                            src={typeof form.image_mobile === "object" ? form.image_mobile.url : form.image_mobile} 
                                            alt="" 
                                        />
                                    </div>
                                )                                       
                            }
                            </div>  
                            <div className="w-1/3 mt-8 mb-16">
                            {
                                (form.image_classic && 
                                    <div
                                        className={
                                            classNames(
                                                classes.productImageItem,
                                                "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
                                        }
                                    >                                   
                                        <img className="max-w-none w-auto h-full" 
                                            src={typeof form.image_classic === "object" ? form.image_classic.url : form.image_classic} 
                                            alt="" 
                                        />
                                    </div>
                                )                                       
                            }
                            </div>                          
                        </div>

                        <FormControl className="mt-8 mb-16" fullWidth>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={form.disable} name="disable" onChange={this.handleChange} />
                                }
                                label="Disable"
                            />
                        </FormControl>                          
                    </div>

                </DialogContent>

                {dictionarysDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addDictionarys(this.state.form);
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
                                updateDictionarys(this.state.form);
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            className="min-w-auto"
                            onClick={() => {
                                removeDictionarys(this.state.form.id);
                                this.closeDictionarysDialog();
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
        closeEditDictionarysDialog: Actions.closeEditDictionarysDialog,
        closeNewDictionarysDialog : Actions.closeNewDictionarysDialog,
        addDictionarys            : Actions.addDictionarys,
        updateDictionarys         : Actions.updateDictionarys,
        removeDictionarys         : Actions.removeDictionarys
    }, dispatch);
}

function mapStateToProps({dictionarysApp})
{
    return { 
        dictionarysDialog       : dictionarysApp.dictionarys.dictionarysDialog,
        loading             : dictionarysApp.dictionarys.loading,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(DictionarysDialog));
