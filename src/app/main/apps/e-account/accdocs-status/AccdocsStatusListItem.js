import React from 'react';
import {withStyles, IconButton, Icon, Typography, ListItem} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import _ from '@lodash';
import * as Actions from '../store/actions';
import {connect} from 'react-redux';
import AccdocsStatusChip from './AccdocsStatusChip';

const styles = theme => ({
    accdocsStatusItem: {
        '&.completed': {
            background                    : 'rgba(0,0,0,0.03)',
            '& .accdocsStatus-title, & .accdocsStatus-notes': {
                textDecoration: 'line-through'
            }
        }
    }
});

const AccdocsStatusListItem = ({accdocsStatus, labels, classes, openEditAccdocsStatusDialog, toggleImportant, toggleStarred}) => {
    return (
        <ListItem
            onClick={(ev) => {
                ev.preventDefault();
                openEditAccdocsStatusDialog(accdocsStatus);
            }}
            dense
            button
            className={classNames(classes.accdocsStatusItem, "border-solid border-b-1 py-16  px-0 sm:px-8")}
        >
             <div className="px-8">  
              <img className="w-52  block rounded" src={accdocsStatus.imgSrc} alt={accdocsStatus.stcode}/>
              </div>    

            <div className="flex flex-1 flex-col relative overflow-hidden pl-8">


                     
                            


                <Typography
                    variant="subtitle1"
                    className="accdocsStatus-title truncate"
                    color={"default"}
                >
                     {"#"+accdocsStatus.stcode}  {accdocsStatus.name}
                </Typography>

                <Typography
                    color="textSecondary"
                    className="accdocsStatus-notes truncate"
                >
                    {_.truncate(accdocsStatus.description.replace(/<(?:.|\n)*?>/gm, ''), {'length': 180})}
                </Typography>
                <div className={classNames(classes.labels, "flex mt-8")}>
                    {					
						(accdocsStatus.disable && 
							<AccdocsStatusChip
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
                    toggleImportant(accdocsStatus)
                }}>
                    {accdocsStatus.important ? (
                        <Icon style={{color: red[500]}}>error</Icon>
                    ) : (
                        <Icon>error_outline</Icon>
                    )}
                </IconButton>
                <IconButton onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    toggleStarred(accdocsStatus)
                }}>
                    {accdocsStatus.starred ? (
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
		toggleImportant   : Actions.toggleAccdocsStatusImportant,
		toggleStarred     : Actions.toggleAccdocsStatusStarred,
		openEditAccdocsStatusDialog: Actions.openEditAccdocsStatusDialog
    }, dispatch);
}

function mapStateToProps({AccdocsStatusApp})
{
    return {
        labels: null
    }
}

export default withStyles(styles, {withTheme: true})((connect(mapStateToProps, mapDispatchToProps))(AccdocsStatusListItem));
