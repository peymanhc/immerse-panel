import React from 'react';
import {withStyles, IconButton, Icon, Typography, ListItem} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import _ from '@lodash';
import * as Actions from '../store/actions';
import {connect} from 'react-redux';
import CategoryLabelsChip from './CategoryLabelsChip';

const styles = theme => ({
    categoryItem: {
        '&.completed': {
            background                    : 'rgba(0,0,0,0.03)',
            '& .category-title, & .category-notes': {
                textDecoration: 'line-through'
            }
        }
    }
});

const CategoryLabelsListItem = ({category, labels, classes, openEditCategoryDialog, toggleImportant, toggleStarred}) => {
    return (
        <ListItem
            onClick={(ev) => {
                ev.preventDefault();
                openEditCategoryDialog(category);
            }}
            dense
            button
            className={classNames(classes.categoryItem, "border-solid border-b-1 py-16  px-0 sm:px-8")}
        >

            <div className="flex flex-1 flex-col relative overflow-hidden pl-8">

                <Typography
                    variant="subtitle1"
                    className="category-title truncate"
                    color={"default"}
                >
                    {category.title}
                </Typography>

                <Typography
                    color="textSecondary"
                    className="category-notes truncate"
                >
                    {_.truncate(category.description.replace(/<(?:.|\n)*?>/gm, ''), {'length': 180})}
                </Typography>
                <div className={classNames(classes.labels, "flex mt-8")}>
                    {					
						(category.disable && 
							<CategoryLabelsChip
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
                    toggleImportant(category)
                }}>
                    {category.important ? (
                        <Icon style={{color: red[500]}}>error</Icon>
                    ) : (
                        <Icon>error_outline</Icon>
                    )}
                </IconButton>
                <IconButton onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    toggleStarred(category)
                }}>
                    {category.starred ? (
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
		toggleImportant   : Actions.toggleCategoryLabelsImportant,
		toggleStarred     : Actions.toggleCategoryLabelsStarred,
		openEditCategoryDialog: Actions.openEditCategoryLabelsDialog
    }, dispatch);
}

function mapStateToProps({CategoryApp})
{
    return {
        labels: null
    }
}

export default withStyles(styles, {withTheme: true})((connect(mapStateToProps, mapDispatchToProps))(CategoryLabelsListItem));
