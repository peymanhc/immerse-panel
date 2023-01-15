import React, {Component} from 'react';
import {withStyles, Button, DialogActions, DialogContent,  TextField, Toolbar, AppBar, FormControl, } from '@material-ui/core';
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



class WarrantyShowStatusDialog extends Component {


    render()
    {
        const {warrantyStatus, translate, classes, status} = this.props; 
		const { statusId, description, imgSrc1, imgSrc2} = status;
		
		const allStatus = warrantyStatus.map(({name: label, id: value}) => ({value, label}));
		const selectedStatus = allStatus.find(({value:id}) => id === statusId);
	
        return (
            <div>
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
						<div className="flex-grow">
							<span>{translate('Add_WarrantyStatus')}</span>
						</div>							
                    </Toolbar>					
                </AppBar>

                <DialogContent classes={{root: "p-24"}} style={{minHeight:450}}>
					<FuseChipSelect
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
                                variant="outlined"
                            />
                        </FormControl>

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
											src={'' + imgSrc1} 
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
											src={'' + imgSrc2} 
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
                            onClick={this.props.onClose}
                        >
						{translate("Close")}
                        </Button>
                    </DialogActions>
            </div>
        );
    }
}



function mapStateToProps({eCommerceApp})
{ 
    return {
		warrantyStatus				: eCommerceApp.warranty.warrantyStatus,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(withTranslate(WarrantyShowStatusDialog)));
