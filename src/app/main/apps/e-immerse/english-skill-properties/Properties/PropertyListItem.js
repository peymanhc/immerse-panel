import React from 'react';
import {withStyles, IconButton, Icon, Typography, ListItem} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import _ from '@lodash';
import * as Actions from '../store/actions';
import PropertyChip from './PropertyChip';

const styles = theme => ({
    propertyItem: {
        '&.completed': {
            background                    : 'rgba(0,0,0,0.03)',
            '& .property-title, & .property-notes': {
                textDecoration: 'line-through'
            }
        }
    }
});

const PropertyListItem = ({property, labels, classes, openEditPropertyDialog, toggleImportant, toggleStarred, toggleCompleted}) => {
    return (
        <ListItem
            onClick={(ev) => {
                ev.preventDefault();
                openEditPropertyDialog(property);
            }}
            dense
            button
            className={classNames(classes.propertyItem, {"completed": property.completed}, "border-solid border-b-1 py-16  px-0 sm:px-8")}
        >



            <div className="flex flex-1 flex-col relative overflow-hidden pl-8">

                <Typography
                    variant="subtitle1"
                    className="property-title truncate"
                    color={property.completed ? "textSecondary" : "default"}
                >
                    {property.title}
                </Typography>

                <Typography
                    color="textSecondary"
                    className="property-notes truncate"
                >
                    {_.truncate(property.description.replace(/<(?:.|\n)*?>/gm, ''), {'length': 180})}
                </Typography>

                <div className={classNames(classes.labels, "flex mt-8")}>
                    {property.labels.map(label => (
                        <PropertyChip
                            className="mr-4"
                            title={_.find(labels, {id: label}).title}
                            color={_.find(labels, {id: label}).color}
                            key={label}
                        />
                    ))}
                </div>
            </div>

            <div className="px-8">
                <IconButton onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    toggleImportant(property)
                }}>
                    {property.important ? (
                        <Icon style={{color: red[500]}}>error</Icon>
                    ) : (
                        <Icon>error_outline</Icon>
                    )}
                </IconButton>
                <IconButton onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    toggleStarred(property)
                }}>
                    {property.starred ? (
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
        toggleCompleted   : Actions.toggleCompleted,
        toggleImportant   : Actions.toggleImportant,
        toggleStarred     : Actions.toggleStarred,
        openEditPropertyDialog: Actions.openEditPropertyDialog
    }, dispatch);
}

function mapStateToProps({englishSkillPropertyApp})
{
    return {
        labels: englishSkillPropertyApp.labels
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(PropertyListItem)));
