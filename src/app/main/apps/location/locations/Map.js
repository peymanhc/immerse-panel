import React from 'react';
import GoogleMap from 'google-map-react';
import {Icon} from '@material-ui/core';

const Marker = ({selected, text, color, setUser, id}) => (selected?
	<span className='tooltip'> 				
		<div className='tooltip-bubble tooltip-top'>			
			<div className='tooltip-message'>
				<Icon className="text-white icon-close" 
					fontSize="small"
					onClick={() => setUser(null)}
				>close</Icon>
				{text}
			</div>
		</div>
		<span className='tooltip-trigger'>
			<Icon className={`text-${color}`}  style={{cursor: 'pointer', fontSize:'38px'}} 
				onClick={() => setUser(id)}>
				place
			</Icon>
		</span>					
	</span>
	:
	<Icon className={`text-${color}`} style={{cursor: 'pointer', fontSize:'38px'}}  
		onClick={() => setUser(id)}>			
		place
	</Icon>
);

const colors = {
	0: "green",
	1: "blue",
	2: "red",
	3: "yellow",
};

const googleMap = (locations, center, onChange, zoom, userId, setUser) => ( locations.length ? 
	<GoogleMap
		bootstrapURLKeys={{
			key: process.env.REACT_APP_MAP_KEY
		}}
		defaultZoom={6}
		zoom={zoom}
		center={  //if props.center is empty so use first index of location array.
			center.length? center : [locations[0].lat, locations[0].long]
		}
		onChange={onChange}		
	>
		{
			locations.map(marker =>  
				<Marker
					key={marker.name}
					text={marker.name+' '+marker.status} 
					lat={marker.lat}
					lng={marker.long}
					selected={ userId === marker.id ? true: false} //detects position selected	
					color={colors[marker.statusId]}
					id={marker.id}
					setUser={setUser}
				/>
			)
		}							
	</GoogleMap>
	: 
	null
);

export default googleMap;