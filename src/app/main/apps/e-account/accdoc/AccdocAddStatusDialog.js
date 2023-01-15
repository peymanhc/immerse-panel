import React, {Component} from 'react';
import {withStyles, Button, Dialog, DialogActions, DialogContent,  TextField, Toolbar, AppBar, FormControl, CircularProgress} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
import {connect} from 'react-redux';
import {FuseChipSelect} from '@fuse';
import { withTranslate } from 'react-redux-multilingual';
import classNames from 'classnames';

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
		//marginLeft: theme.spacing.unit * 10
	},	
});

const initialStatus = {
	statusId: null,
	description: '',
	imgSrc1	: '',
	imgSrc2	: '',	
};

class AccdocAddStatusDialog extends Component {

    state = {
		...initialStatus,
	};

    closeComposeDialog = () => {
		this.setState({statusId:null});
        this.props.closeAddStatusDialog();
    };

    canBeSubmitted()
    {
		const { statusId } = this.state;
		return statusId ? true : false;
    }
	
	selectOnChange = (name, row) => {		
		this.setState({[name]: row.value, status:[{id:row.value}]});
	};
	
    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value});
    };	
	
	addFiles = (event) => {
		const file = event.target.files[0];
		this.setState({			
			[event.target.name] :{
				url: URL.createObjectURL(file),
				file,
				id:event.target.name,
			}
		});					
	};	
	
	addStatus = () => {
        const {accdocId, addAccdocToStatus} = this.props; 
		const { statusId, description, imgSrc1, imgSrc2} = this.state;		
		addAccdocToStatus(accdocId, statusId, imgSrc1, imgSrc2, description).then(() => {
			this.setState({...initialStatus});
		});
	};
	
    render()
    {
        const {accdocStatus, accdocAddStatusDialog, translate, classes} = this.props; 
		const { statusId, description, imgSrc1, imgSrc2} = this.state;
		
		const allStatus = accdocStatus.map(({name: label, id: value}) => ({value, label}));
		const selectedStatus = allStatus.find(({value:id}) => id === statusId);
	
        return (
            <Dialog
				{...accdocAddStatusDialog}
                classes={{
                    paper: "m-24"
                }}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="sm"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
						<div className="flex-grow">
							<span>{translate('Add_OrderStatus')}</span>
						</div>
						<div className="flex-grow">
							<CircularProgress 
								className={this.props.statusAccdocImageLoading? classes.loading:classes.hidden} 
								color="secondary"
							/>
						</div>							
                    </Toolbar>					
                </AppBar>

                <DialogContent classes={{root: "p-24"}} style={{minHeight:450}}>
					<FuseChipSelect
						onChange={(row) => {this.selectOnChange('statusId', row)}}
						className="w-full mb-24"
						value={selectedStatus || null}
						placeholder={translate("Search_a_status")}
						textFieldProps={{
							label          : 'Status',
							InputLabelProps: {
								shrink: true
							},
							variant        : 'outlined',							
						}}
						options={allStatus}						
					/>	
                        <FormControl className="mt-8 mb-16" fullWidth>
                            <TextField
                                label={translate("Description")}   
                                name="description"
                                multiline
                                rows="2"
                                value={description}
                                onChange={this.handleChange}
                                variant="outlined"
                            />
                        </FormControl>

						<div className="flex">
							<div className="mt-8 mb-16">
								<input accept="image/*" className={classes.hidden} name="imgSrc1"  
									id="imgSrc1" type="file" onChange={this.addFiles}
								/>
								<label htmlFor="imgSrc1">
									<Button variant="outlined" component="span" className={classes.uploadBtn}>
										{translate("Choose_Image")}
									</Button>
								</label>									
							</div>	
							<div className="mt-8 mb-16 ml-12">
								<input accept="image/*" className={classes.hidden} name="imgSrc2"  
									id="imgSrc2" type="file" onChange={this.addFiles}
								/>
								<label htmlFor="imgSrc2">
									<Button variant="outlined" component="span" className={classes.uploadBtn}>
										{translate("Choose_Image")}
									</Button>
								</label>									
							</div>								
						</div>
						<div className="flex">						
							<div className="mt-8 mb-16">
							{
								(imgSrc1 && 
									<div
										className={
											classNames(
												classes.productImageItem,
												"flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
										}
									>									
										<img className="max-w-none w-auto h-full" 
											src={typeof imgSrc1 === "object" ? imgSrc1.url : imgSrc1} 
											alt="" 
										/>
									</div>
								)										
							}
							</div>

							<div className="mt-8 mb-16">
							{
								(imgSrc2 && 
									<div
										className={
											classNames(
												classes.productImageItem,
												"flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
										}
									>									
										<img className="max-w-none w-auto h-full" 
											src={typeof imgSrc2 === "object" ? imgSrc2.url : imgSrc2} 
											alt="" 
										/>
									</div>
								)										
							}
							</div>
						</div>


                </DialogContent>
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.addStatus}
                            disabled={!this.canBeSubmitted()}
                        >
						{translate("Add")}
                        </Button>
                    </DialogActions>
            </Dialog>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeAddStatusDialog: Actions.closeAddStatusDialog,
        addAccdocToStatus	: Actions.addAccdocToStatus,
    }, dispatch);
}

function mapStateToProps({eAccountApp})
{ 
    return {
		accdocStatus				: eAccountApp.order.accdocStatus,
		accdocAddStatusDialog	: eAccountApp.order.accdocAddStatusDialog,
		statusAccdocImageLoading	: eAccountApp.order.statusAccdocImageLoading,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(withTranslate(AccdocAddStatusDialog)));
