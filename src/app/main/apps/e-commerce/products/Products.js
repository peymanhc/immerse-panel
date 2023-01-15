import React from 'react';
import {FusePageCarded, FuseAnimate} from '@fuse';
import withReducer from 'app/store/withReducer';
import ProductsTable from './ProductsTable';
import ProductsHeader from './ProductsHeader';
import reducer from '../store/reducers';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withStyles, Fab, Icon} from '@material-ui/core';
import * as Actions from '../store/actions';
import ProductsUploadDialog from './ProductsUploadDialog';
import '../RTL.css';


const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});

const Products = ({classes, openProductsUploadDialog}) => {
    return (
    	  <div className="fuse">
		 <div className={classes.fuse}>
			<FusePageCarded
				classes={{
					content: "flex",
					header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
				}}
				header={
					<ProductsHeader/>
				}
				content={
					<ProductsTable/>
				}
				innerScroll
			/>
			<FuseAnimate animation="transition.expandIn" delay={300}>
				<Fab
					color="primary"
					aria-label="add"
					className={classes.addButton}
					onClick={openProductsUploadDialog}
				>
					<Icon>cloud_upload</Icon>
				</Fab>
			</FuseAnimate>	
			<ProductsUploadDialog />
		</div>
		</div>
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        openProductsUploadDialog	: Actions.openProductsUploadDialog,
    }, dispatch);
}

export default withReducer('eCommerceApp', reducer)(withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(Products)));
