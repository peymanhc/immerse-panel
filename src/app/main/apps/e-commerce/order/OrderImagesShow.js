import React from 'react';
import {Dialog, DialogContent, Toolbar, AppBar, withStyles} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {closeOrderShowImageDialog} from '../store/actions';
import {connect} from 'react-redux';

import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { withTranslate } from 'react-redux-multilingual';

const styles = theme => ({
	root: {
			
			flexGrow: 1,
	},
	header: {
			display: 'flex',
			alignItems: 'center',
			height: 50,
			paddingLeft: 4,
			backgroundColor: theme.palette.background.default,
	},
	img: {
			height: 255,
			maxWidth: 400,
			overflow: 'hidden',
			display: 'block',
			width: '100%',
	},
});

const OrderImagesShow  = ({orderShowImageDialog, closeOrderShowImageDialog, images, classes, translate }) => {
	
	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	}
	
	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	}
	

	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = images.length;	
	
        return (
            <Dialog
				{...orderShowImageDialog}
                classes={{
                    paper: "m-24"
                }}
                onClose={closeOrderShowImageDialog}
                fullWidth
                maxWidth="xs"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="block w-full p-24">
						<span>{translate('Order_Images')}</span>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{root: "p-24"}} style={{minHeight:250}}>
					{
						images && images.length !== 0 &&
						<div className={classes.root}>
							<img
								className={classes.img}
								src={images[activeStep]}
								alt=''
							/>
							<MobileStepper
								steps={maxSteps}
								position="static"
								variant="text"
								activeStep={activeStep}
								nextButton={
									<Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
										{translate('Next')}
										<KeyboardArrowRight />
									</Button>
								}
								backButton={
									<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
										<KeyboardArrowLeft />
										{translate('Back')}
									</Button>
								}
							/>
						</div>					
					}
                </DialogContent>
            </Dialog>
        );	
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeOrderShowImageDialog,
    }, dispatch);
}

function mapStateToProps({eCommerceApp})
{ 
    return {
		orderShowImageDialog: eCommerceApp.order.orderShowImageDialog,
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withTranslate(OrderImagesShow)));