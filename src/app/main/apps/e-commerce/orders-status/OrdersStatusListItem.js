import React from 'react';
import {withStyles, IconButton, Icon, Typography, ListItem} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import _ from '@lodash';
import * as Actions from '../store/actions';
import {connect} from 'react-redux';
import OrdersStatusChip from './OrdersStatusChip';

const styles = theme => ({
    ordersStatusItem: {
        '&.completed': {
            background                    : 'rgba(0,0,0,0.03)',
            '& .ordersStatus-title, & .ordersStatus-notes': {
                textDecoration: 'line-through'
            }
        }
    }
});

const OrdersStatusListItem = ({ordersStatus, labels, classes, openEditOrdersStatusDialog, toggleImportant, toggleStarred}) => {
    return (
        <ListItem
            onClick={(ev) => {
                ev.preventDefault();
                openEditOrdersStatusDialog(ordersStatus);
            }}
            dense
            button
            className={classNames(classes.ordersStatusItem, "border-solid border-b-1 py-16  px-0 sm:px-8")}
        >
             <div className="px-8">  
              <img className="w-52  block rounded" src={ordersStatus.imgSrc} alt={ordersStatus.stcode}/>
              </div>    

            <div className="flex flex-1 flex-col relative overflow-hidden pl-8">


                     
                            


                <Typography
                    variant="subtitle1"
                    className="ordersStatus-title truncate"
                    color={"default"}
                >
                     {"#"+ordersStatus.stcode}  {ordersStatus.name}
                </Typography>

                <Typography
                    color="textSecondary"
                    className="ordersStatus-notes truncate"
                >
                    {_.truncate(ordersStatus.description.replace(/<(?:.|\n)*?>/gm, ''), {'length': 180})}
                </Typography>
                <div className={classNames(classes.labels, "flex mt-8")}>
                    {					
						(ordersStatus.disable && 
							<OrdersStatusChip
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
                    toggleImportant(ordersStatus)
                }}>
                    {ordersStatus.important ? (
                        <Icon style={{color: red[500]}}>error</Icon>
                    ) : (
                        <Icon>error_outline</Icon>
                    )}
                </IconButton>
                <IconButton onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    toggleStarred(ordersStatus)
                }}>
                    {ordersStatus.starred ? (
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
		toggleImportant   : Actions.toggleOrdersStatusImportant,
		toggleStarred     : Actions.toggleOrdersStatusStarred,
		openEditOrdersStatusDialog: Actions.openEditOrdersStatusDialog
    }, dispatch);
}

function mapStateToProps({OrdersStatusApp})
{
    return {
        labels: null
    }
}

export default withStyles(styles, {withTheme: true})((connect(mapStateToProps, mapDispatchToProps))(OrdersStatusListItem));
