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
  


const newWarrantycodesState = {
    'id'       		 : '',
    'title'    		 : '',
    'text'           : '',
    'starred'  		 : false,
    'important'		 : false,
    'disable'  		 : false,	 
	'Productcode' 	 : 0,	
    'warrantycode'   : '',
    'warrantyDOT'    : '',
    'warrantyYear'   : '5',
	'image_classic'	 : '',
	'image_full'	 : '',
	'image_mobile'	 : '',
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

class WarrantycodesDialog extends Component {

	constructor(props) {
		super(props);
		this.backgroundInputRef = React.createRef();
        this.iconInputRef = React.createRef();
        this.editorRef = React.createRef();
	}
  
    state = {
        form       : {...newWarrantycodesState},
		background: null,
        icon: null,
        editorText: '',
        imageURL: 'select your image',
        imageCrop: { x: 0, y: 0 },
        imageZoom: 1,
        imageAspect: 4 / 3
    };

    // Text Editor's modules config
    modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, true] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'code-block'],
            ['clean']
        ]
    }

    // Text Editor's formats conf
    formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ];

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.warrantycodesDialog.props.open && this.props.warrantycodesDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.warrantycodesDialog.type === 'edit' &&
                this.props.warrantycodesDialog.data &&
                !_.isEqual(this.props.warrantycodesDialog.data, prevState) )
            {
                this.setState({form: {...this.props.warrantycodesDialog.data}});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.warrantycodesDialog.type === 'new' &&
                !_.isEqual(newWarrantycodesState, prevState) )
            {
                this.setState({
                    form: {
                        ...newWarrantycodesState,
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

    closeWarrantycodesDialog = () => {
        this.props.warrantycodesDialog.type === 'edit' ? this.props.closeEditWarrantycodesDialog() : this.props.closeNewWarrantycodesDialog();
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


    handleEditorChange = (value) => {
        console.log(this.editorRef)
        
        this.setState({
            editorText: value
        })
    }

    canBeSubmitted()
    {
        const {warrantycode} = this.state.form;
        return (
            warrantycode.length > 0
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
        const {warrantycodesDialog, addWarrantycodes, updateWarrantycodes, removeWarrantycodes, classes} = this.props;
        const {form} = this.state;

        return (
            <Dialog {...warrantycodesDialog.props} onClose={this.closeWarrantycodesDialog} fullWidth maxWidth="sm">

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {warrantycodesDialog.type === 'new' ? 'New Warrantycode' : 'Edit Warrantycode'}
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
                                label="Productcode"
                                id="Productcode"
                                autoFocus
                                name="Productcode"
                                value={form.Productcode}
                                onChange={this.handleChange}
                                type="text"
                                variant="outlined"
                                className="w-1/2 mt-8 mb-16 ml-8"
                                required
                            />  
                        </FormControl>	
	
				        <div className="flex">                       
                            <TextField
                                label="warrantycode"
                                id="warrantycode"
                                name="warrantycode"
                                value={form.warrantycode}
                                onChange={this.handleChange}
                                type="text"
                                variant="outlined"
                                className="w-1/3 mt-8 mb-16 mr-8"
                                required
                            />                                  
                            <TextField
                                label="warrantyDOT"
                                id="warrantyDOT"
                                name="warrantyDOT"
                                value={form.warrantyDOT}
                                onChange={this.handleChange}
                                type="text"
                                variant="outlined"
                                className="w-1/4 mt-8 mb-16 ml-8"
                            />     
                             <TextField
                                label="warrantyYear"
                                id="warrantyYear"
                                name="warrantyYear"
                                value={form.warrantyYear}
                                onChange={this.handleChange}
                                type="number"
                                variant="outlined"
                                className="w-1/4 mt-8 mb-16 ml-8"
                            />                  
                        </div>


						
                        
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
                                hidden="true"
                            />  
                              <TextField
                                label="Title"
                                
                                name="title"
                                value={form.title}
                                onChange={this.handleChange}
                                hidden="true"
                                variant="outlined"
                            />                  
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

                {warrantycodesDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addWarrantycodes(this.state.form);
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
                                updateWarrantycodes(this.state.form);
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            className="min-w-auto"
                            onClick={() => {
                                removeWarrantycodes(this.state.form.id);
                                this.closeWarrantycodesDialog();
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
        closeEditWarrantycodesDialog: Actions.closeEditWarrantycodesDialog,
        closeNewWarrantycodesDialog : Actions.closeNewWarrantycodesDialog,
        addWarrantycodes            : Actions.addWarrantycodes,
        updateWarrantycodes         : Actions.updateWarrantycodes,
        removeWarrantycodes         : Actions.removeWarrantycodes
    }, dispatch);
}

function mapStateToProps({warrantycodesApp})
{
    return { 
        warrantycodesDialog		: warrantycodesApp.warrantycodes.warrantycodesDialog,
		loading				: warrantycodesApp.warrantycodes.loading,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(WarrantycodesDialog));
