import React,{Component} from 'react';
import { Typography, Toolbar, AppBar, Dialog, DialogContent, DialogActions, Button} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../store/actions';
import { withTranslate } from 'react-redux-multilingual';
import Cropper from 'react-easy-crop';
import getCroppedImg from './CropImages';
import {FuseUtils} from '@fuse';

class CropDialog extends Component{
	
	state = {
		crop: { x: 0, y: 0 },
		zoom: 1,
		aspect: 4 / 3,
		croppedAreaPixels:null,
	}
	
	onCropChange = crop => {
		this.setState({ crop })
	}
	
	onCropComplete = (croppedArea, croppedAreaPixels) => {
		this.setState({ croppedAreaPixels })
	}
		
	dialogHandleClose = () => {
		this.props.closeCropDialog();
	};	
	
	onZoomChange = zoom => {
		this.setState({ zoom })
	}
	
    componentDidMount()
    {

    }	
	
	canSubmit = () => {
		const {croppedAreaPixels} = this.state;
		if(croppedAreaPixels)
			return true;
		return false;
	}
	
	saveButton = () => {
		const {croppedAreaPixels} = this.state;
		const {cropDialog:{imageSrc:{url:imageUrl, id:imageId}}} = this.props;
		getCroppedImg(this.correctUrl(imageUrl), croppedAreaPixels).then(file => {	
			const image = {
				id: FuseUtils.generateGUID(),
				url: URL.createObjectURL(file),
				type: 'image',
				file:file				
			};			
			this.props.removeImage(null, imageId);			
			this.props.addImageProduct(image);
			this.props.closeCropDialog();
		});			
	}
	
	correctUrl = url => url.startsWith('blob') ? url : '/' + url;
	
	render(){
		const {translate, cropDialog:{open, imageSrc:{url:imageUrl}}} = this.props;
		return ( 
			open &&
			<div>
				<Dialog
					open={open}
					onClose={this.dialogHandleClose}
					aria-labelledby="draggable-dialog-title"
					fullWidth
				>
					<AppBar position="static" elevation={1}>
						<Toolbar className="flex w-full">
							<Typography variant="subtitle1" color="inherit">
								Crop
							</Typography>
						</Toolbar>
					</AppBar>
					<DialogContent classes={{root: "p-0"}} style={{paddingTop:'10px', minHeight:'300px', position:'relative'}}>
						<div className="crop-container">
							<Cropper
								image={ imageUrl }
								crop={this.state.crop}
								zoom={this.state.zoom}
								aspect={this.state.aspect}
								onCropChange={this.onCropChange}
								onCropComplete={this.onCropComplete}
								onZoomChange={this.onZoomChange}
							/>
						</div>	
					</DialogContent>
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
							disabled={!this.canSubmit()}
							onClick={this.saveButton}							
                        >
							{translate('Add')}
                        </Button>
                    </DialogActions>					
				</Dialog>			
			</div>
		);
	}
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeCropDialog : Actions.closeCropDialog,
		addImageProduct:  Actions.addImageProduct,
    }, dispatch);
}

function mapStateToProps({eCommerceApp})
{  
    return {
		cropDialog 	: eCommerceApp.product.cropDialog,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(CropDialog));