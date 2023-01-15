import React from 'react';
import {withStyles, IconButton, Icon, Typography, ListItem} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
 
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import WarrantycodesChip from './WarrantycodesChip';

const styles = theme => ({
    warrantycodeItem: {
        '&.completed': {
            background                    : 'rgba(0,0,0,0.03)',
            '& .warrantycode-title, & .warrantycode-notes': {
                textDecoration: 'line-through'
            }
        }
    }
});

const WarrantycodesListItem = ({warrantycode, labels, classes, openEditWarrantycodesDialog, toggleImportant, toggleStarred}) => {
    return (
        <ListItem
            onClick={(ev) => {
                ev.preventDefault();
                openEditWarrantycodesDialog(warrantycode);
            }}
            dense
            button
            className={classNames(classes.warrantycodeItem, "border-solid border-b-1 py-16  px-0 sm:px-8")}
        >

            <div className="flex flex-1 flex-col relative overflow-hidden pl-8">

                <Typography
                    variant="subtitle1"
                    className="warrantycode-title truncate"
                    color={"default"}
                >
                    {warrantycode.warrantycode}
                </Typography>

                <Typography
                    color="textSecondary"
                    className="warrantycode-notes truncate"
                >
                    {warrantycode.Productcode} : {warrantycode.text} -  {warrantycode.warrantyYear} years
                </Typography>
                <div className={classNames(classes.labels, "flex mt-8")}>
                    {					
						(warrantycode.disable && 
							<WarrantycodesChip
								className="mr-4"
								title={'غیر فعال'}
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
                    toggleImportant(warrantycode)
                }}>
                    {warrantycode.important ? (
                        <Icon style={{color: red[500]}}>error</Icon>
                    ) : (
                        <Icon>error_outline</Icon>
                    )}
                </IconButton>
                <IconButton onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    toggleStarred(warrantycode)
                }}>
                    {warrantycode.starred ? (
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
		toggleImportant   : Actions.toggleWarrantycodesImportant,
		toggleStarred     : Actions.toggleWarrantycodesStarred,
		openEditWarrantycodesDialog: Actions.openEditWarrantycodesDialog
    }, dispatch);
}

function mapStateToProps({warrantycodesApp})
{
    return {
        labels: null
    }
}

export default withStyles(styles, {withTheme: true})((connect(mapStateToProps, mapDispatchToProps))(WarrantycodesListItem));
