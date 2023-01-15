import React, {Component} from 'react';
import GoogleMap from 'google-map-react';
import {withStyles, Grid} from '@material-ui/core';	
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {withRouter} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	formControl: {
		margin: theme.spacing.unit,
		marginTop: 0,
		minWidth: 120,
	},
	statusForm:{
		marginTop: theme.spacing.unit * 2,
	},
	textField:{
		marginLeft: theme.spacing.unit * 2,
	}
});

class Heatmap extends Component {
	
    componentDidMount()
    {
        this.props.getHeatmap();
    }	
	
	componentDidUpdate(prevProps, prevState, snapshot){
		if(this.props.locations !== prevProps.locations){
			this.setStatusLocation(this.state.status);
		}
	}
	
	state = {
		status: "1",
		locations: [],
		date1: "",
		date2: "",
	};
	
	dateHandleChange = event => {
		var time = event.target.value;
		if(time)
			time = new Date(time).getTime();
		this.setState({ [event.target.name]: time});
		if(event.target.name === "date1")
			this.setStatusLocation(this.state.status, time, this.state.date2);
		else
			this.setStatusLocation(this.state.status, this.state.date1, time);
	};
	
	statusHandleChange = event => {
		this.setState({ [event.target.stcode]: event.target.value });
		this.setStatusLocation(event.target.value, this.state.date1, this.state.date2);
	};
	
	setStatusLocation = (status, date1, date2) => {
		var locations = this.heatmapfilter(status, date1, date2);
		if(locations.length)			
			this.props.setHeatmap([locations[0].lat, locations[0].lng]);
		if(this._googleMap.heatmap && this._googleMap.heatmap.data){ 
			this._googleMap.heatmap.data.clear(); 
			locations.forEach(item => {
				var point = new this._googleMap.maps_.LatLng(item.lat, item.lng);
				this._googleMap.heatmap.data.push(point);
			});
		}
	};
	
	heatmapfilter = (status, date1, date2) => {
		let locations = this.props.locations.filter(item => item.status === status);
		if(date1)
			locations = locations.filter(item => item.date >= date1);
		if(date2)
			locations = locations.filter(item => item.date <= date2);
		return locations;
	}
	
	_onChangeGoogleMap = ({center}) => { 
		this.props.setHeatmap([center.lat, center.lng]);
	};		
		
	render(){
		
		const {classes, center} = this.props;
		var defaultCenter = center;
		var defaultLocations = 
			this.heatmapfilter(this.state.status, this.state.date1, this.state.date2);	
		if(defaultLocations.length && defaultCenter.length === 0)
			defaultCenter = [defaultLocations[0].lat, defaultLocations[0].lng];
		
		return(
			<div className={classes.root}>	
				<Grid container justify="center" className={classes.statusForm}>
					<Grid item xs={5}>
						<FormGroup row>	
							<TextField
								id="date1"
								type="date"
								className={classes.textField}
								InputLabelProps={{shrink: true}}
								label="From"
								onChange={this.dateHandleChange}
								name="date1"
							/>	
							<TextField
								id="date2"
								type="date"										
								className={classes.textField}
								InputLabelProps={{shrink: true}}
								label="To"
								onChange={this.dateHandleChange}
								name="date2"
							/>									
						</FormGroup>
					</Grid>
					<Grid item xs={5}>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="status-select">Status</InputLabel>
							<Select
								value={this.state.status}
								onChange={this.statusHandleChange}
								inputProps={{stcode: 'status', id: 'status-select'}}	
							>
								<MenuItem value={"1"}>درخواست اولیه سفر ...</MenuItem>
								<MenuItem value={"2"}>رسیدن سفیر به مبدا</MenuItem>
								<MenuItem value={"3"}>  سوار شدن مسافر </MenuItem>
							 	 <MenuItem value={"4"}>تایید درخواست توسط سفیر</MenuItem>
								<MenuItem value={"5"}>لغو سفر</MenuItem> 
							 
							</Select>
						</FormControl>					
					</Grid>
					<Grid item xs={11}>  
						<div className="h-640">
							<GoogleMap
									ref={(el) => this._googleMap = el}
									bootstrapURLKeys={{
										key: process.env.REACT_APP_MAP_KEY
									}}
									defaultZoom={6}
									center={defaultCenter.length ? 
										defaultCenter: [32.6882945, 52.478286]}
									heatmapLibrary={true}
									heatmap={{positions: defaultLocations}}
									onChange={this._onChangeGoogleMap}
								>
							</GoogleMap>
	
						</div>
					</Grid>			
				</Grid>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
		getHeatmap: Actions.getHeatmap,
		setHeatmap: Actions.setHeatmap, //center location
    }, dispatch);
}

function mapStateToProps({heatmapApp})
{	
    return {
		locations: heatmapApp.heatmap.data,
		center: heatmapApp.heatmap.center,
    }
}
export default withReducer('heatmapApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Heatmap))));