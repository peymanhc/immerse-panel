import React from 'react';
import {withStyles} from '@material-ui/core';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Chat from './Chat'; 

const styles = theme => ({
    contentWrapper    : {
        display      : 'flex',
        flexDirection: 'column',
        flex         : '1 1 100%',
        zIndex       : 10,
        background   : `linear-gradient(to bottom, ${fade(theme.palette.background.paper, 0.8)} 0,${fade(theme.palette.background.paper, 0.6)} 20%,${fade(theme.palette.background.paper, 0.8)})`
    },	
    content           : {
        display  : 'flex',
        flex     : '1 1 100%',
        minHeight: 400,
    }
});

const WarrantyChat = ({warranty, user, classes}) => {
	const {customer, chat} = warranty;	
    return customer ? (
		<main className={classNames(classes.contentWrapper, "z-10")}>
			<div className={classes.content}>
				<Chat customer={customer} user={user} chat={{dialog:chat}} selectedContactId={customer.id} warrantyId={warranty.id} className="flex flex-1 z-10" />
			</div>
		</main>	
    ):(<></>);
	
	
};

function mapStateToProps({chatPanel})
{
    return {
        user             : chatPanel.user
    }
}

export default withStyles(styles)(connect(mapStateToProps)(WarrantyChat));
