import React, {Component} from 'react';
import {withStyles, Divider, Icon, List, ListItem, ListItemText, Paper, ListSubheader} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../store/actions';
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

class PropertySidebarContent extends Component {

    render()
    {
        const {classes, setPropertyLabelFilter, propertyLabelFilterSelected, properties, translate} = this.props;
		const labels = this.props.labels.filter(({id}) => properties.find(({PropertyLabelId}) => PropertyLabelId === id));
        return (
            <div className="py-24 lg:p-24 lg:pr-4">
                <FuseAnimate animation="transition.slideLeftIn" delay={200}>
                    <Paper elevation={1} className={classNames(classes.paper, "rounded-8")}>
                        <List>
                            <ListItem
                                button
                                className={classes.listItem}
								onClick={() => {setPropertyLabelFilter(null)}}
								selected={propertyLabelFilterSelected === null ? true: false}
                            >
                                <Icon className="list-item-icon text-16" color="action">label</Icon>
                                <ListItemText className="truncate pr-0" primary={translate('Properties')} disableTypography={true}/>
                            </ListItem>
                        </List>
                        <Divider/>
                        <List>
                            <ListSubheader>
								{translate('Labels')}
                            </ListSubheader>
                            {Object.entries(labels).map(([key, label]) => (

                                <ListItem
                                    key={label.id}
                                    button
                                    className={classes.listItem}
									onClick={() => {setPropertyLabelFilter(label.id)}}
                                >
                                    <Icon className="list-item-icon text-16" color="action">label</Icon>
                                    <ListItemText className="truncate pr-0" primary={label.title} disableTypography={true}/>
                                </ListItem>
                            ))}
                            <ListItem
                                
                                className={classes.listItem}
                                
                            >
                                <Icon className="list-item-icon text-16" color="action">edit</Icon>
                                <ListItemText className="truncate pr-0" primary={translate('Edit_Labels')} disableTypography={true}/>
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
        //openLabelsDialog: null,
        setPropertyLabelFilter: Actions.setPropertyLabelFilter,
    }, dispatch);
}

function mapStateToProps({englishSkillApp})
{
    return {
		labels : englishSkillApp.product.propertyLabels,
		propertyLabelFilterSelected : englishSkillApp.product.propertyLabelFilterSelected,
		properties : englishSkillApp.product.data.properties,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(withTranslate(PropertySidebarContent)));
