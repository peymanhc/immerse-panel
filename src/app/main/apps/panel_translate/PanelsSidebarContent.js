import React from 'react';
import {withStyles, List, ListItem, ListItemText, ListSubheader} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const styles = theme => ({
    listItem: {
        color              : 'inherit!important',
        textDecoration     : 'none!important',
        height             : 40,
        width              : 'calc(100% - 16px)',
        borderRadius       : '0 20px 20px 0',
        paddingLeft        : 24,
        paddingRight       : 12,
        '&.active'         : {
            backgroundColor    : theme.palette.secondary.main,
            color              : theme.palette.secondary.contrastText + '!important',
            pointerEvents      : 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        },
        '& .list-item-icon': {
            fontSize: 16,
            width   : 16,
            height  : 16
        }
    }
});

function PanelsSidebarContent({classes, labels})
{
    return (
        <FuseAnimate animation="transition.slideUpIn" delay={400}>
            <div className="flex-auto border-l-1 border-solid">
                <div className={classes.listWrapper}>
                    <List>
                        <ListSubheader className={classes.listSubheader} disableSticky>FILTERS</ListSubheader>
                        {labels.length > 0 && labels.map((filter) => (
                            <ListItem
                                button
                                component={NavLink}
                                to={'/apps/panels/labels/' + filter.title}
                                activeClassName="active"
                                className={classes.listItem}
                                key={filter.id}
                            >                               
                                <ListItemText primary={filter.title} disableTypography={true}/>
                            </ListItem>
                        ))}
                    </List>					
                </div>
            </div>			
        </FuseAnimate>
    );
}

function mapStateToProps({panelsApp})
{  
    return {
		labels : panelsApp.panels.labels,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(PanelsSidebarContent)));
