import React, {Component} from 'react';
import {withStyles, List, ListItem, ListItemText, ListItemAvatar, Avatar, 
	Grid, Tabs, Tab, Radio, FormControlLabel, RadioGroup} from '@material-ui/core';	
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {withRouter} from 'react-router-dom';
import googleMap from './Map';
import styles from './Styles';
import './style.css';
import Paper from '@material-ui/core/Paper';

import CedarMaps from '@cedarstudios/react-cedarmaps'
import socketIOClient from 'socket.io-client';
 
class Location extends Component {
	
    componentDidMount()
    {
        this.props.getLocations();

        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on('FromAPI', data => this.setState({ response: data }));
       
      
    }
	
 
	userClick = (id) => {
		var user = this.props.locations.find(item => item.id === id); 
		this.props.setLocations([user.lat, user.long]);
		this.props.zoomLocations(12);
		this.props.idLocations(id);
	};
	
	_onChangeGoogleMap = ({center, zoom}) => { 
		this.props.zoomLocations(zoom);
		this.props.setLocations([center.lat, center.lng]);
	};
	
	state = {
		tabValue: 0,
		radioSelectedValue: '-1', 
		response: false,
        location: false,
        typing:false,
        endpoint: 'http://5.63.13.165:4001',
	};
	
	tabsHandleChange = (event, value) => {
		this.setState({ tabValue: value });
	};	
	radioHandleChange = event => {
		this.setState({ radioSelectedValue: event.target.value });
	};	
	
	filterLocation = value => value < 0 ? (value === -1 ? 
		this.props.locations : this.props.locations.filter(item => item.statusId !== 0)):
		this.props.locations.filter(item => item.statusId === value);		
		
	render(){

		//const googleApiKey = "AIzaSyAdCJe8h3-FGhtSsWwP-VjJHvGeO7CVOmA";
		const { classes, center, zoom, userId } = this.props;
		const {tabValue, radioSelectedValue , response ,location , typing} = this.state;
		const filteredLocations = this.filterLocation(parseInt(radioSelectedValue));
		const tabStyle = {
			minWidth: 50,
			paddingLeft: 0,
			paddingRight: 0,
			letterSpacing: "-.04em"
		};
		const tabValueConvert = {
			0: -1, //all
			1: 0, //free
			2: -2 //busy
		};
		const filteredUsers = this.filterLocation(tabValueConvert[tabValue]);
		return (
			<div className={classes.root}>	
				<Grid container spacing={0}>
					<Grid item xs={12}>  
						<Grid container justify="center">							
							<RadioGroup
								aria-label=" درخواست اولیه سفر"
								name="Satus"
								value={radioSelectedValue}
								onChange={this.radioHandleChange}
								row
							>
								<FormControlLabel value="0" 
									control={
										<Radio 
											classes={{
												root: classes.greenRadio,
												checked: classes.checked,												
											}}				
										/>
									} 
									label="تایید درخواست توسط سفیر" 
								/>
								<FormControlLabel value="1" 
									control={
										<Radio 
											classes={{
												root: classes.primaryRadio,
												checked: classes.checked,												
											}}				
										/>
									} 
									label="رسیدن سفیر به مبدا" 
								/>
								<FormControlLabel value="2" 
									control={
										<Radio 
											classes={{
												root: classes.redRadio,
												checked: classes.checked,												
											}}				
										/>
									} 
									label="سوار شدن مسافر" 
								/>
								<FormControlLabel value="3" 
									control={
										<Radio 
											classes={{
												root: classes.yellowRadio,
												checked: classes.checked,												
											}}			
										/>
									} 
									label="اتمام سفر" 
								/>	
								<FormControlLabel value="-1" 
									control={
										<Radio 
											classes={{
												root: classes.greyRadio,
												checked: classes.checked,												
											}}				
										/>
									} 
									label=" همه " 
								/>								
							</RadioGroup>																
						</Grid>						
					</Grid>	
					<Grid item xs={3}>  
						<Paper square className="h-640">
							<Tabs
								value={tabValue}
								indicatorColor="secondary"
								textColor="secondary"
								onChange={this.tabsHandleChange}
								variant="fullWidth"							
							>
								<Tab style={tabStyle} label=" همه" />
								<Tab style={tabStyle} label="آزاد" />
								<Tab style={tabStyle} label="مشغول" />
							</Tabs>	
							
							<List dense style={{overflowY:'scroll', maxHeight:'90%'}}>
								{  
									filteredUsers.map(item => (
										<ListItem key={item.id} button 
											onClick={() => this.userClick(item.id)} 
										>
											<ListItemAvatar>
											<Avatar
												alt={item.name}
												src={item.avatar}
											/>
											</ListItemAvatar>
											<ListItemText primary={item.name} />
			{item.statusId}
										</ListItem>
									))
								}
							</List>	
						</Paper>
		    </Grid>	
				<Grid item xs={9}>   
				 
				 
					<Paper className="h-full min-h-640">
							{  
								googleMap(filteredLocations, center,
								 this._onChangeGoogleMap, 
									zoom, userId, this.props.idLocations)
							}
					</Paper>
					    <CedarMaps
       					    containerStyle={{
    					      height: '10vh',
    					      width: '100%'
    					    }}
    					    token='2c2f35a3d7ea59a4eabb48753768e288c5f4d2eb'
    					    center={[ 36.3055247 , 59.583529 ]}          
    					>
      					<filteredLocations/>        
       					<zoom/>
        				<userId/> 
   					</CedarMaps>

				
				</Grid>


			</Grid>			
		</div>
	);		
  }
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getLocations : Actions.getLocations,
		setLocations : Actions.setLocations,
		zoomLocations : Actions.zoomLocations,
		idLocations : Actions.idLocations
    }, dispatch);
}

function mapStateToProps({locationApp})
{
    return {
        locations: locationApp.locations.data,
		center: locationApp.locations.center,
		zoom: locationApp.locations.zoom,
		userId: locationApp.locations.id
    }
}
export default withReducer('locationApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Location))));