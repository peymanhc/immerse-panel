import React from 'react';
import {withStyles, IconButton, Icon, Typography, ListItem} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import _ from '@lodash';
import * as Actions from '../store/actions';
import {connect} from 'react-redux';
import WarrantylistStatusChip from './WarrantylistStatusChip';

const styles = theme => ({
    warrantylistStatusItem: {
        '&.completed': {
            background                    : 'rgba(0,0,0,0.03)',
            '& .warrantylistStatus-title, & .warrantylistStatus-notes': {
                textDecoration: 'line-through'
            }
        }
    }
});

const WarrantylistStatusListItem = ({warrantylistStatus, labels, classes, openEditWarrantylistStatusDialog, toggleImportant, toggleStarred}) => {
    return (
        <ListItem
            onClick={(ev) => {
                ev.preventDefault();
                openEditWarrantylistStatusDialog(warrantylistStatus);
            }}
            dense
            button
            className={classNames(classes.warrantylistStatusItem, "border-solid border-b-1 py-16  px-0 sm:px-8")}
        >
             <div className="px-8">  
              <img className="w-52  block rounded" src={warrantylistStatus.imgSrc} alt={warrantylistStatus.stcode}/>
              </div>    

            <div className="flex flex-1 flex-col relative overflow-hidden pl-8">


                     
                            


                <Typography
                    variant="subtitle1"
                    className="warrantylistStatus-title truncate"
                    color={"default"}
                >
                     {"#"+warrantylistStatus.stcode}  {warrantylistStatus.name}
                </Typography>

                <Typography
                    color="textSecondary"
                    className="warrantylistStatus-notes truncate"
                >
                    {_.truncate(warrantylistStatus.description.replace(/<(?:.|\n)*?>/gm, ''), {'length': 180})}
                </Typography>
                <div className={classNames(classes.labels, "flex mt-8")}>
                    {					
						(warrantylistStatus.disable && 
							<WarrantylistStatusChip
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
                    toggleImportant(warrantylistStatus)
                }}>
                    {warrantylistStatus.important ? (
                        <Icon style={{color: red[500]}}>error</Icon>
                    ) : (
                        <Icon>error_outline</Icon>
                    )}
                </IconButton>
                <IconButton onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    toggleStarred(warrantylistStatus)
                }}>
                    {warrantylistStatus.starred ? (
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
		toggleImportant   : Actions.toggleWarrantylistStatusImportant,
		toggleStarred     : Actions.toggleWarrantylistStatusStarred,
		openEditWarrantylistStatusDialog: Actions.openEditWarrantylistStatusDialog
    }, dispatch);
}

function mapStateToProps({WarrantylistStatusApp})
{
    return {
        labels: null
    }
}

export default withStyles(styles, {withTheme: true})((connect(mapStateToProps, mapDispatchToProps))(WarrantylistStatusListItem));
