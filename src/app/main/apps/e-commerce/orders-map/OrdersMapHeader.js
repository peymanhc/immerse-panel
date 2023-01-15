import React, {Component} from 'react';
import {MuiThemeProvider, Icon, Typography, Tab, AppBar, Tabs, withStyles} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../store/actions';
import classNames from 'classnames';
import { withTranslate } from 'react-redux-multilingual';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  img:{
	  height:25,
  },
  label:{
	fontSize:11,
  },
  tabButton:{
	  minWidth:80,
  },
});

class OrdersMapHeader extends Component {
	
    render()
    {
        const {mainTheme, statusRadio, setStatusRadio, ordersStatus, classes, translate} = this.props;
			
        return (
			<div className={classNames(classes.root, 'p-8 sm:p-24')}>
				<div className="flex flex-shrink items-center sm:w-224">
					<div className="flex items-center">
						<FuseAnimate animation="transition.expandIn" delay={300}>
							<Icon className="text-32 mr-12">place</Icon>
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography variant="h6" className="hidden sm:flex">{translate('Oders_Map')}</Typography>
						</FuseAnimate>
					</div>
				</div>
				<div className="flex flex-1 items-center justify-center pr-8 sm:px-12 mt-4">
					<MuiThemeProvider theme={mainTheme}>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>					
							<AppBar position="static" color="default">
								<Tabs
									value={statusRadio || false}
									onChange={(event, newValue) => {setStatusRadio(newValue)}}			
									indicatorColor="primary"
									textColor="primary"
									variant="scrollable"
									scrollButtons="auto"
								>
								{
									[{id:null, name:translate('All')}, ...ordersStatus].map(({id, name, imgSrc}, index) => imgSrc ?
										<Tab key={index} classes={{wrapper:classes.label, root: classes.tabButton}}
											label={name} value={id} icon={<img src={'/admin/'+imgSrc} className={classes.img} alt="" />} 
										/>
									:
										<Tab key={index} classes={{wrapper:classes.label, root: classes.tabButton}}
											label={name} value={id} icon={<img className={classes.img} alt="" />}
										/>
									)
								}													
								</Tabs>
							</AppBar>
						</FuseAnimate>
					</MuiThemeProvider>	
				</div>					
			</div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
		setStatusRadio: Actions.setOrdersStatusRadio
    }, dispatch);
}

function mapStateToProps({eCommerceApp, fuse})
{
    return {
		statusRadio: eCommerceApp.orders.statusRadio,
		ordersStatus: eCommerceApp.orders.ordersStatus,
        mainTheme : fuse.settings.mainTheme,		
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(withTranslate(OrdersMapHeader)));
