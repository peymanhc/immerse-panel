import React from 'react';
import {withStyles, IconButton, Icon, Typography, ListItem} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import _ from '@lodash';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import PagesChip from './PagesChip';

const styles = theme => ({
    typeItem: {
        '&.completed': {
            background                    : 'rgba(0,0,0,0.03)',
            '& .type-title, & .type-notes': {
                textDecoration: 'line-through'
            }
        }
    }
});

const PagesListItem = ({type, labels, classes, openEditPagesDialog, toggleImportant, toggleStarred}) => {
    return (
        <ListItem
            onClick={(ev) => {
                ev.preventDefault();
                openEditPagesDialog(type);
            }}
            dense
            button
            className={classNames(classes.typeItem, "border-solid border-b-1 py-16  px-0 sm:px-8")}
        >

            <div className="flex flex-1 flex-col relative overflow-hidden pl-8">

                <Typography
                    variant="subtitle1"
                    className="type-title truncate"
                    color={"default"}
                >
                    {type.title}
                </Typography>

                <Typography
                    color="textSecondary"
                    className="type-notes truncate"
                >
                    {_.truncate(type.text.replace(/<(?:.|\n)*?>/gm, ''), {'length': 180})}
                </Typography>
                <div className={classNames(classes.labels, "flex mt-8")}>
                    {					
						(type.disable && 
							<PagesChip
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
                    toggleImportant(type)
                }}>
                    {type.important ? (
                        <Icon style={{color: red[500]}}>error</Icon>
                    ) : (
                        <Icon>error_outline</Icon>
                    )}
                </IconButton>
                <IconButton onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    toggleStarred(type)
                }}>
                    {type.starred ? (
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
		toggleImportant   : Actions.togglePagesImportant,
		toggleStarred     : Actions.togglePagesStarred,
		openEditPagesDialog: Actions.openEditPagesDialog
    }, dispatch);
}

function mapStateToProps({pagesApp})
{
    return {
        labels: null
    }
}

export default withStyles(styles, {withTheme: true})((connect(mapStateToProps, mapDispatchToProps))(PagesListItem));
