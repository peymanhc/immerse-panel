import React from "react";
import socketIOClient from 'socket.io-client';
import _ from '@lodash';

function withSocket(config) {
	return function(Component) {
		class Transparent extends React.Component {
			
			constructor(props){
				super(props)
				const auth_token = window.localStorage.getItem('jwt_access_token');
				if(config && auth_token && config.endpoint)				
					this.socket = socketIOClient(config.endpoint, {query: `auth_token=${auth_token}`});
				
			}
			
			state = {
				currentData : {},
			}
			
			componentDidMount(){ 		
				if(this.socket)
					this.socket.on(config.apiAddress, data => {  
						const auth_token = window.localStorage.getItem('jwt_access_token');
						if(!auth_token){ //If user logoute
							this.socket.disconnect();
							return;
						}
						this.setState(prevState => {
							if ( !_.isEqual(data, prevState.currentData) )		
								return {...prevState, currentData : data};				
						});							
					});		
			}
						
			componentWillUnmount(){
				if(this.socket)
					this.socket.disconnect();
			}
			
			render() {
				
				const {currentData} = this.state;
				return <Component {...this.props} currentData={currentData}/>;
				
			}
		}		
		return Transparent;		
	}	
}



export default withSocket;