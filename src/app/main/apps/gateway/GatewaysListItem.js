import React from 'react';
import {withStyles, IconButton, Icon, Typography, ListItem} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import _ from '@lodash';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import GatewaysChip from './GatewaysChip';

const styles = theme => ({
    gatewayItem: {
        '&.completed': {
            background                    : 'rgba(0,0,0,0.03)',
            '& .gateway-title, & .gateway-notes': {
                textDecoration: 'line-through'
            }
        }
    }
});

const GatewaysListItem = ({gateway, labels, classes, openEditGatewaysDialog, toggleImportant, toggleStarred}) => {
    return (
        <ListItem
            onClick={(ev) => {
                ev.preventDefault();
                openEditGatewaysDialog(gateway);
            }}
            dense
            button
            className={classNames(classes.gatewayItem, "border-solid border-b-1 py-16  px-0 sm:px-8")}
        >

            <div className="flex flex-1 flex-col relative overflow-hidden pl-8">

                <Typography
                    variant="subtitle1"
                    className="gateway-title truncate"
                    color={"default"}
                >
                    {gateway.title}
                </Typography>

                <Typography
                    color="textSecondary"
                    className="gateway-notes truncate"
                >
                    {_.truncate(gateway.description.replace(/<(?:.|\n)*?>/gm, ''), {'length': 180})}
                </Typography>
                <div className={classNames(classes.labels, "flex mt-8")}>
                    {					
						(gateway.disable && 
							<GatewaysChip
								className="mr-4"
								title={'disabled'}
								color={'#F44336'}
							/>						
						)
					}
                </div>
            </div>

            <div className="px-8">
                <IconButton onClick={(ev) => { 
                    ev.preventDefault();
                    ev.stopPropagation();
                    toggleImportant(gateway)
                }}>
                    {gateway.important ? (
                        <Icon style={{color: red[500]}}>error</Icon>
                    ) : (
                        <Icon>error_outline</Icon>
                    )}
                </IconButton>
                <IconButton onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    toggleStarred(gateway)
                }}>
                    {gateway.starred ? (
                        <Icon style={{color: amber[500]}}>star</Icon>
                    ) : (
                        <Icon>star_outline</Icon>
                    )}
                </IconButton>
            </div>
        </ListItem>
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
		toggleImportant   : Actions.toggleGatewaysImportant,
		toggleStarred     : Actions.toggleGatewaysStarred,
		openEditGatewaysDialog: Actions.openEditGatewaysDialog
    }, dispatch);
}

function mapStateToProps({gatewaysApp})
{
    return {
        labels: null
    }
}

export default withStyles(styles, {withTheme: true})((connect(mapStateToProps, mapDispatchToProps))(GatewaysListItem));
