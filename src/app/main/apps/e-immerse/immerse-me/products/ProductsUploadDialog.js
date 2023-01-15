import React, {Component} from 'react';
import {withStyles, Button, Dialog, DialogActions, DialogContent, Toolbar, AppBar, CircularProgress} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
import {connect} from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';


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
	excel: null,
	name:null,
};

class ProductsUploadDialog extends Component {

    state = {
		...initialStatus,
	};


    canBeSubmitted()
    {
		const { excel } = this.state;
		return excel ? true : false;
    }
	
	
	addFiles = (event) => {
		const file = event.target.files[0]; 
		this.setState({[event.target.name] : file, name:null});			
	};	
		
	uploadFile = excel => {
		this.props.uploadExcelToProducts(excel).then(name => {
			if(name !== undefined)
				this.setState({'excel' : null, name});
			else
				this.setState({'excel' : null, name : this.state.excel.name});
		});
	};
	
    render()
    {
        const {translate, classes, productsUploadDialog, closeProductsUploadDialog, productsUploadLoading} = this.props; 
		const {excel, name} = this.state;
		
        return (
            <Dialog
				{...productsUploadDialog}
                classes={{
                    paper: "m-24"
                }}
                onClose={closeProductsUploadDialog}
                fullWidth
                maxWidth="sm"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
						<div className="flex-grow">
							<span> {translate("priceListExcel")}</span>
						</div>
						<div className="flex-grow">
							<CircularProgress 
								className={productsUploadLoading? classes.loading:classes.hidden} 
								color="secondary"
							/>
						</div>							
                    </Toolbar>					
                </AppBar>

                <DialogContent classes={{root: "p-24"}} style={{minHeight:128}}>
					<div className="flex">
						<div className="mt-8 mb-16">
							<input accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
								className={classes.hidden} name="excel" id="excel" type="file" onChange={this.addFiles}
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
							name !== null ? name : excel !== null ? <div>{excel.name}</div> : ''
						}
						</div>

					</div>
                </DialogContent>
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!this.canBeSubmitted()}
							onClick={() => this.uploadFile(excel)}
                        >
						{translate("send_file")}
                        </Button>
                    </DialogActions>
            </Dialog>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeProductsUploadDialog: Actions.closeProductsUploadDialog,
        uploadExcelToProducts	: Actions.uploadExcelToProducts,
    }, dispatch);
}

function mapStateToProps({eCommerceApp})
{ 
    return {
		productsUploadDialog	: eCommerceApp.products.productsUploadDialog,
		productsUploadLoading	: eCommerceApp.products.productsUploadLoading,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(withTranslate(ProductsUploadDialog)));
