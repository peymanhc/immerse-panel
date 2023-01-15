import React from 'react';
import {Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Tooltip, Icon} from '@material-ui/core';
import { withTranslate } from 'react-redux-multilingual';  //--maddahi-and addtranslate words--//
import GoogleMap from 'google-map-react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Marker = ({text}) =>
	<Tooltip title={text} placement="top">
		<Icon className="text-red">place</Icon>
	</Tooltip>

const Address = ({translate, warranty}) => {
	return (	
		<>
			<ExpansionPanel
				elevation={1}
				defaultExpanded
			>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
					<Typography className="font-600">{translate('warranty_Invoice_Address')}</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className="flex flex-col md:flex-row">
				{
					warranty.invoiceAddress.length !== 0 &&
						<>
							<Typography className="w-full md:max-w-256 mb-16 md:mb-0">
								{warranty.invoiceAddress[0].address}
							</Typography>
							<div className="w-full h-320">
								<GoogleMap
									bootstrapURLKeys={{
										key: process.env.REACT_APP_MAP_KEY
									}}
									defaultZoom={15}
									defaultCenter={[warranty.invoiceAddress[0].lat, warranty.invoiceAddress[0].long]}
								>
									<Marker
										text={warranty.invoiceAddress[0].address}
										lat={warranty.invoiceAddress[0].lat}
										lng={warranty.invoiceAddress[0].long}
									/>
								</GoogleMap>
							</div>	
						</>
				}
				</ExpansionPanelDetails>
			</ExpansionPanel>																				
		</>	
	)
	
};

export default withTranslate(Address);