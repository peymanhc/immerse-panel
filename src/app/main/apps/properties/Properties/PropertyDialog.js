import React, {Component} from 'react';
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    Chip,
    Icon,
    IconButton,
    Typography,
    Toolbar,
    AppBar,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider,
	withStyles,
	CircularProgress,
	Radio,	
	FormControlLabel,	 
} from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';
import {FuseUtils} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from '@lodash';
import * as Actions from '../store/actions';
import classNames from 'classnames';
import { withTranslate } from 'react-redux-multilingual';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const newPropertyState = {
    'id'       		: '',
    'title'    		: '',
	'price'    		: '',
	'addPrice' 		: '',
    'description'	: '',
    'starred'  		: false,
    'important'		: false,
    'labels'   		: [],
	'iconSrc' 		: '',
	'images' 		: {},
	'codeColor'		: '',
    'voicelink'  :   '',
	'showType'		: 'Both',
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
    productImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            boxShadow                    : theme.shadows[5]
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
        }
    },
	hidden:{
		display: 'none'
	},
	loading:{
		marginLeft: theme.spacing.unit * 10
	}
});


const initialStatus = { 
    excel: null,
    name:null,
};

class PropertyDialog extends Component {
	
	constructor(props) {
		super(props);
		this.iconInputRef = React.createRef();
	}
    state = {
        form       : {...newPropertyState},
        labelMenuEl: null , 
       
        ...initialStatus,
  

    };

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.propertyDialog.props.open && this.props.propertyDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.propertyDialog.type === 'edit' &&
                this.props.propertyDialog.data &&
                !_.isEqual(this.props.propertyDialog.data, prevState) )
            {
                this.setState({form: {...this.props.propertyDialog.data}});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.propertyDialog.type === 'new' &&
                !_.isEqual(newPropertyState, prevState) )
            {
                this.setState({
                    form: {
                        ...newPropertyState,
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

    closePropertyDialog = () => {
        this.props.propertyDialog.type === 'edit' ? this.props.closeEditPropertyDialog() : this.props.closeNewPropertyDialog();
    };

    handleLabelMenuOpen = (event) => {
        this.setState({labelMenuEl: event.currentTarget});
    };

    handleLabelMenuClose = (event) => {
        this.setState({labelMenuEl: null});
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

    handleToggleLabel = (event, id) => {
        event.stopPropagation();
        this.setState({
            form: _.set({
                ...this.state.form,
                labels: this.state.form.labels.includes(id) ? this.state.form.labels.filter(labelId => labelId !== id) : [...this.state.form.labels, id]
            })
        });
    };

    toggleCompleted = () => {
        this.setState({
            form: {
                ...this.state.form,
                completed: !this.state.form.completed
            }
        })
    };

    canBeSubmitted()
    {
          
        const { excel } = this.state; 
        const {title, addPrice, price} = this.state.form;
        return (
            title.length > 0 && addPrice.length > 0 && price.length > 0           &&    excel ? true : false
        );
    }

	addFiles = (event) => {
		const files = [...event.target.files].map(file => ({
			url: URL.createObjectURL(file),
			file
		}));
		let form = this.state.form;
		if(!form["images"])
			form["images"] = {};
		form["images"][event.target.name] = files[0];
		this.setState({form});
	};
	 ckEditorHandleChange = ( event, editor ) => {
        const data = editor.getData();
        this.setState({form: _.set({...this.state.form}, "description", data)});
    };


        addFilesVoice = (event) => {
        const file = event.target.files[0]; 
        this.setState({[event.target.name] : file, name:null});         
    };  
         
    uploadFileVoice = excel => {
        this.props.uploadVoiceTO(excel).then(name => {
            if(name !== undefined)
                this.setState({'excel' : null, name});
            else
                this.setState({'excel' : null, name : this.state.excel.name});
        });
    };



    render()
    {
        const {propertyDialog, addProperty, updateProperty, removeProperty, labels, classes, translate , productsUploadLoading} = this.props;
        const {form, labelMenuEl , excel, name  } = this.state;
      
        

		let icon = form.iconSrc;
		if(form.images){
			if(form.images.icon)
				icon = form.images.icon.url || icon;
		} 
		
		const types = [
			{
				id:"1", title:"Both",
			}, 
			{
				id:"2", title:"Top",
			}, 
			{
				id:"3", title:"Bottom",
			}
		];
		
        return (
            <Dialog {...propertyDialog.props} onClose={this.closePropertyDialog} fullWidth maxWidth="sm">

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {propertyDialog.type === 'new' ? translate('New_Property') : translate('Edit_Property')}
                        </Typography>
						<div>
							<CircularProgress 
								className={this.props.productsUploadLoading? classes.loading:classes.hidden} 
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
                                <div>
                                    <IconButton
                                        aria-owns={labelMenuEl ? 'label-menu' : null}
                                        aria-haspopup="true"
                                        onClick={this.handleLabelMenuOpen}
                                    >
                                        <Icon>label</Icon>
                                    </IconButton>
                                    <Menu
                                        id="label-menu"
                                        anchorEl={labelMenuEl}
                                        open={Boolean(labelMenuEl)}
                                        onClose={this.handleLabelMenuClose}
                                    >
                                        {labels.length > 0 && labels.map((label) => (
                                            <MenuItem onClick={(ev) => this.handleToggleLabel(ev, label.id)} key={label.id}>
                                                <ListItemIcon>
                                                    <Icon className="mr-0" color="action">
                                                        {form.labels.includes(label.id) ? 'check_box' : 'check_box_outline_blank'}
                                                    </Icon>
                                                </ListItemIcon>
                                                <ListItemText primary={label.title} disableTypography={true}/>
                                                <ListItemIcon>
                                                    <Icon className="mr-0" style={{color: label.color}} color="action">
                                                        label
                                                    </Icon>
                                                </ListItemIcon>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </div>
                            </div>
                        </div>
                        <Divider className="mx-24"/>
                    </div>

                    {form.labels.length > 0 && (
                        <div className="flex flex-wrap  px-16 sm:px-24 mb-16">
                            {form.labels.map(label => (
                                <Chip
                                    avatar={(
                                        <Avatar
                                            classes={{colorDefault: "bg-transparent"}}>
                                            <Icon
                                                className="text-20"
                                                style={{color: _.find(labels, {id: label}).color}}
                                            >
                                                label
                                            </Icon>
                                        </Avatar>
                                    )}
                                    label={_.find(labels, {id: label}).title}
                                    onDelete={(ev) => this.handleToggleLabel(ev, label)}
                                    className="mr-8 my-8"
                                    classes={{label: "pl-4"}}
                                    key={label}
                                />
                            ))}
                        </div>
                    )}

                    <div className="px-16 sm:px-24">
                        <FormControl className="mt-8 mb-16" required fullWidth>
                            <TextField
                                label={translate('Title')}
                                autoFocus
                                name="title"
                                value={form.title}
                                onChange={this.handleChange}
                                required
                                variant="outlined"
                            />
                        </FormControl>
			
                     <div className="flex">    						
                        <FormControl className="mt-8 mb-16 mr-8" fullWidth>
                            <TextField
                                label={translate('Price')}                               
                                name="price"
                                value={form.price}
                                onChange={this.handleChange}
                                required
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl className="mt-8 mb-16 mr-8" fullWidth>
                            <TextField
                                label={translate('Percent')}                              
                                name="addPrice"
                                value={form.addPrice}
                                onChange={this.handleChange}
                                required
                                variant="outlined"
                            />
                        </FormControl>						
                      </div>  

              

                <CKEditor
                    editor={ ClassicEditor }
                    id="description"
                    name="description"
                    data={form.description}
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        //console.log( 'Editor is ready to use!', editor );
                    } }
                     onChange={this.ckEditorHandleChange} 
                    onBlur={ ( event, editor ) => {
                        //console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        //console.log( 'Focus.', editor );
                    } }
                /> 
           
        <div className="flex">
                        <div className="mt-8 mb-16">
                            <input accept="audio/mp3" 
                                className={classes.hidden} name="excel" id="excel" type="file" onChange={this.addFilesVoice}
                            />
                            <label htmlFor="excel">
                                <Button variant="outlined" component="span" className={classes.uploadBtn}>
                                    {translate("Choose_priceListExcel")}
                                </Button>
                            </label>                                    
                        </div>  
                            
                    </div>
                    <div className="flex">                      
                        <div className="mt-8 mb-16">
                        {
                            name !== null ? name : excel !== null ? <div> { excel.name } </div> : ''
                        }
                        </div>
       

        <TextField                            
                                name="voicelink"
                                value={ name !== null ? name : excel  }
                                onChange={this.handleChange}                               
                                variant="outlined"
                                hidden="true"
                            />

                    </div>




            <div className={classes.typesRow}>
                            {
                                types.map(({id, title}) => 
                                    <FormControlLabel1
                                        key={id}
                                        control={
                                            <WhiteRadio
                                                checked={form.showType === title}
                                                onChange={this.handleChange}
                                                value={title}
                                                name="showType"
                                                inputProps={{ 'aria-label': {title} }}                                      
                                            />                                  
                                        }
                                        label={title}
                                        labelPlacement="end"
                                    />                                              
                                )
                            }                           
                        </div>  



                    		
  


						<div className="flex">
							<div className="mt-8 mb-16 mr-8"> 
								<input ref={this.iconInputRef} name="icon" accept="image/png"  style={{display:'none'}}
									id="contained-button-file1"  type="file"
									onChange={this.addFiles}
								/>
								<label htmlFor="contained-button-file1">
										<Button variant="contained" component="span" className="whitespace-no-wrap">
											{translate('Choose_Icon')}
										</Button>
								</label>							
							</div>
							<div className="mt-8 mb-16 mr-8"> 
							{
								(icon && 
									<div
										className={
											classNames(
												classes.productImageItem,
												"flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
										} 
									>									
										<img className="max-w-none w-auto h-full" src={icon} alt="" 
											onClick={() => {this.iconInputRef.current.click();}}/>
									</div>
								)
							}							
							</div>							
						</div>

                        <FormControl className="mt-8 mb-16 w-1/3"  >
                            <TextField
                                label={translate('Code_Color')}                               
                                name="codeColor"
                                value={form.codeColor}
                                onChange={this.handleChange}                               
                                variant="outlined"
                            />
                        </FormControl>  

                    </div>

                </DialogContent>

                {propertyDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                   this.uploadFileVoice(excel);
                                addProperty(this.state.form);
                               
                            }}

                            disabled={!this.canBeSubmitted()}
                        >
                            {translate('Add')}
                        </Button>
                    </DialogActions> 
                ) : (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                  this.uploadFileVoice(excel);
                                updateProperty(this.state.form);
                                
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                             {translate('Save')}
                        </Button>



                        <IconButton
                            className="min-w-auto"
                            onClick={() => {
                                removeProperty(this.state.form.id);
                                this.closePropertyDialog();
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
        closeEditPropertyDialog: Actions.closeEditPropertyDialog,
        closeNewPropertyDialog : Actions.closeNewPropertyDialog,
        addProperty            : Actions.addProperty,
        updateProperty         : Actions.updateProperty,
        removeProperty         : Actions.removeProperty,
            uploadVoiceTO   : Actions.uploadVoiceTO,
		//removeProperty         : null,
    }, dispatch);
}

function mapStateToProps({PropertyApp})
{
    return {
        propertyDialog: PropertyApp.propertys.propertyDialog,
        labels    : PropertyApp.labels,
		loading: PropertyApp.propertys.loading,
        productsUploadLoading   : PropertyApp.propertys.productsUploadLoading,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(withTranslate(PropertyDialog)));
