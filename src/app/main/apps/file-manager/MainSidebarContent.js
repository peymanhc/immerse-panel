import React from 'react';
import {Icon, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import { withTranslate } from 'react-redux-multilingual';

const MainSidebarContent = ({translate}) => {
    return (
        <List component="nav">
            <ListItem button dense>
                <ListItemIcon>
                    <Icon className="text-20 mr-0">folder</Icon>
                </ListItemIcon>
                <ListItemText primary={translate("My_Files")}/>
            </ListItem>
            <ListItem button dense>
                <ListItemIcon>
                    <Icon className="text-20 mr-0">star</Icon>
                </ListItemIcon>
                <ListItemText primary={translate("Starred")}/>
            </ListItem>
            <ListItem button dense>
                <ListItemIcon>
                    <Icon className="text-20 mr-0">folder_shared</Icon>
                </ListItemIcon>
                <ListItemText primary={translate("Sharred_with_me")}/>
            </ListItem>
            <ListItem button dense>
                <ListItemIcon>
                    <Icon className="text-20 mr-0">access_time</Icon>
                </ListItemIcon>
                <ListItemText primary={translate("Recent")}/>
            </ListItem>
            <ListItem button dense>
                <ListItemIcon>
                    <Icon className="text-20 mr-0">not_interested</Icon>
                </ListItemIcon>
                <ListItemText primary={translate("Offline")}/>
            </ListItem>
        </List>
    );
};

export default withTranslate(MainSidebarContent);

