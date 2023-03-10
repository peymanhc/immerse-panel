import React, {Component} from 'react';
import {withStyles, Divider, Drawer, Icon, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, Switch, Typography} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import moment from 'moment-jalaali';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './store/actions/index'
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';

moment.loadPersian({
    usePersianDigits: true,
    dialect: 'persian'
})

const styles = theme => ({
    root: {
        width: 280
    }
});

class QuickPanel extends Component {

    state = {
        checked: ['notifications']
    };

    handleToggle = value => () => {
        const {checked} = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if ( currentIndex === -1 )
        {
            newChecked.push(value);
        }
        else
        {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked
        });
    };

    componentDidMount()
    {
        this.props.getQuickPanelData();
    }

    render()
    {
        const {classes, state, toggleQuickPanel, data} = this.props;
        return (
            <Drawer
                classes={{paper: classes.root}}
                open={state}
                anchor="left"
                onClose={toggleQuickPanel}
            >
                <FuseScrollbars>

                    <ListSubheader component="div">امروز</ListSubheader>

                    <div className="mb-0 py-16 px-24">
                        <Typography className="mb-12 text-32" color="textSecondary">
                            {moment().format('dddd')}
                        </Typography>
                        <div className="flex flex-row-reverse">
                            <Typography className="leading-none text-32" color="textSecondary">{moment().format('jD')}</Typography>
                            <Typography className="leading-none text-16" color="textSecondary">ام</Typography>
                            <Typography className="leading-none text-32" color="textSecondary">{moment().format('jMMMM')}</Typography>
                        </div>
                    </div>
                    <Divider/>
                    <List>
                        <ListSubheader component="div">رویدادها</ListSubheader>
                        {data && data.events.map(event => (
                            <ListItem key={event.id}>
                                <ListItemText
                                    primary={event.title}
                                    secondary={event.detail}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                    <List>
                        <ListSubheader component="div">یادداشت ها</ListSubheader>
                        {data && data.notes.map(note => (
                            <ListItem key={note.id}>
                                <ListItemText
                                    primary={note.title}
                                    secondary={note.detail}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                    <List>
                        <ListSubheader component="div">تنظیمات سریع</ListSubheader>
                        <ListItem>
                            <ListItemIcon>
                                <Icon>notifications</Icon>
                            </ListItemIcon>
                            <ListItemText primary="هشدارها"/>
                            <ListItemSecondaryAction>
                                <Switch
                                    color="primary"
                                    onChange={this.handleToggle('notifications')}
                                    checked={this.state.checked.indexOf('notifications') !== -1}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <Icon>cloud</Icon>
                            </ListItemIcon>
                            <ListItemText primary="همگام سازی ابری"/>
                            <ListItemSecondaryAction>
                                <Switch
                                    color="secondary"
                                    onChange={this.handleToggle('cloudSync')}
                                    checked={this.state.checked.indexOf('cloudSync') !== -1}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <Icon>brightness_high</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Retro Thrusters"/>
                            <ListItemSecondaryAction>
                                <Switch
                                    color="primary"
                                    onChange={this.handleToggle('retroThrusters')}
                                    checked={this.state.checked.indexOf('retroThrusters') !== -1}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </FuseScrollbars>
            </Drawer>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleQuickPanel : Actions.toggleQuickPanel,
        getQuickPanelData: Actions.getQuickPanelData
    }, dispatch);
}

function mapStateToProps({quickPanel})
{
    return {
        state: quickPanel.state,
        data : quickPanel.data
    }
}

export default withReducer('quickPanel', reducer)(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(QuickPanel)));
