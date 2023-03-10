import React, {Component} from 'react';
import {withStyles, Divider, Icon, List, ListItem, ListItemText, Paper, ListSubheader} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {NavLink, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from 'app/main/apps/notes/store/actions';
import classNames from 'classnames';
import { withTranslate } from 'react-redux-multilingual';

const styles = theme => ({
    paper   : {
        [theme.breakpoints.down('md')]: {
            boxShadow: 'none'
        }
    },
    listItem: {
        color         : 'inherit!important',
        textDecoration: 'none!important',
        height        : 40,
        width         : 'calc(100% - 16px)',
        borderRadius  : '0 20px 20px 0',
        paddingLeft   : 24,
        paddingRight  : 12,
        '&.active'    : {
            backgroundColor    : theme.palette.secondary.main,
            color              : theme.palette.secondary.contrastText + '!important',
            pointerEvents      : 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        }
    }
});

class NotesSidebarContent extends Component {

    render()
    {
        const {classes, labels, openLabelsDialog, translate} = this.props;

        return (
            <div className="py-24 lg:p-24 lg:pr-4">
                <FuseAnimate animation="transition.slideLeftIn" delay={200}>
                    <Paper elevation={1} className={classNames(classes.paper, "rounded-8")}>
                        <List>
                            <ListItem
                                button
                                component={NavLink}
                                to={'/apps/notes'}
                                exact={true}
                                activeClassName="active"
                                className={classes.listItem}
                            >
                                <Icon className="list-item-icon text-16" color="action">label</Icon>
                                <ListItemText className="truncate pr-0" primary={translate("Notes")} disableTypography={true}/>
                            </ListItem>
                            <ListItem
                                button
                                component={NavLink}
                                to={'/apps/notes/reminders'}
                                exact={true}
                                activeClassName="active"
                                className={classes.listItem}
                            >
                                <Icon className="list-item-icon text-16" color="action">notifications</Icon>
                                <ListItemText className="truncate pr-0" primary={translate("Reminders")} disableTypography={true}/>
                            </ListItem>
                        </List>
                        <Divider/>
                        <List>
                            <ListSubheader>
                                Labels
                            </ListSubheader>
                            {Object.entries(labels).map(([key, label]) => (

                                <ListItem
                                    key={label.id}
                                    button
                                    component={NavLink}
                                    to={`/apps/notes/labels/${label.handle}/${label.id}`}
                                    exact={true}
                                    activeClassName="active"
                                    className={classes.listItem}
                                >
                                    <Icon className="list-item-icon text-16" color="action">label</Icon>
                                    <ListItemText className="truncate pr-0" primary={label.name} disableTypography={true}/>
                                </ListItem>
                            ))}
                            <ListItem
                                button
                                className={classes.listItem}
                                onClick={openLabelsDialog}
                            >
                                <Icon className="list-item-icon text-16" color="action">edit</Icon>
                                <ListItemText className="truncate pr-0" primary={translate("Edit_Labels")} disableTypography={true}/>
                            </ListItem>
                        </List>
                        <Divider/>
                        <List>
                            <ListItem
                                button
                                component={NavLink}
                                to={'/apps/notes/archive'}
                                activeClassName="active"
                                className={classes.listItem}
                            >
                                <Icon className="list-item-icon text-16" color="action">archive</Icon>
                                <ListItemText className="truncate pr-0" primary={translate("Archive")} disableTypography={true}/>
                            </ListItem>
                        </List>
                    </Paper>
                </FuseAnimate>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        openLabelsDialog: Actions.openLabelsDialog
    }, dispatch);
}

function mapStateToProps({notesApp})
{
    return {
        labels: notesApp.labels.entities
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(NotesSidebarContent))));
