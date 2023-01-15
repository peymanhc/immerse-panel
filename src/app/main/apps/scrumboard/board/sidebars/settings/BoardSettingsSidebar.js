import React from 'react';
import {AppBar, Toolbar, List, ListItem, ListItemIcon, Icon, ListItemText, ListItemSecondaryAction, Switch} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from 'app/main/apps/scrumboard/store/actions';
import connect from 'react-redux/es/connect/connect';
import {withRouter} from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual';

const BoardSettingsSidebar = ({board, changeBoardSettings, deleteBoard, copyBoard, translate}) => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar className="flex w-full justify-center">
                    {translate("Settings")}
                </Toolbar>
            </AppBar>

            <List className="py-16" dense>

                <ListItem
                    button
                    onClick={() => changeBoardSettings({cardCoverImages: !board.settings.cardCoverImages})}
                >
                    <ListItemIcon>
                        <Icon>photo</Icon>
                    </ListItemIcon>
						<ListItemText primary={translate("Card_Cover_Images")}/>
                    <ListItemSecondaryAction>
                        <Switch
                            onChange={() => changeBoardSettings({cardCoverImages: !board.settings.cardCoverImages})}
                            checked={board.settings.cardCoverImages}
                        />
                    </ListItemSecondaryAction>
                </ListItem>

                <ListItem
                    button
                    onClick={() => changeBoardSettings({subscribed: !board.settings.subscribed})}
                >
                    <ListItemIcon>
                        <Icon>remove_red_eye</Icon>
                    </ListItemIcon>
                    <ListItemText primary={translate("Subscribe")}/>
                    <ListItemSecondaryAction>
                        <Switch
                            onChange={() => changeBoardSettings({subscribed: !board.settings.subscribed})}
                            checked={board.settings.subscribed}
                        />
                    </ListItemSecondaryAction>
                </ListItem>

                <ListItem button onClick={() => copyBoard(board)}>
                    <ListItemIcon>
                        <Icon>file_copy</Icon>
                    </ListItemIcon>
                    <ListItemText primary={translate("Copy_Board")}/>
                </ListItem>

                <ListItem button onClick={() => deleteBoard(board.id)}>
                    <ListItemIcon>
                        <Icon>delete</Icon>
                    </ListItemIcon>
                    <ListItemText primary={translate("Delete_Board")}/>
                </ListItem>
            </List>
        </div>
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        changeBoardSettings: Actions.changeBoardSettings,
        deleteBoard        : Actions.deleteBoard,
        copyBoard          : Actions.copyBoard
    }, dispatch);
}

function mapStateToProps({scrumboardApp})
{
    return {
        board: scrumboardApp.board
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(BoardSettingsSidebar)));
