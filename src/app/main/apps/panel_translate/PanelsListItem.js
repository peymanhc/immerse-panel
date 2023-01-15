import React from 'react';
import {withStyles, Typography, ListItem} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import _ from '@lodash';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import PanelsChip from './PanelsChip';

const styles = theme => ({
    panelItem: {
        '&.completed': {
            background                    : 'rgba(0,0,0,0.03)',
            '& .panel-title, & .panel-notes': {
                textDecoration: 'line-through'
            }
        }
    }
});

const PanelsListItem = ({panel, labels, classes, openEditPanelsDialog}) => {
    return (
        <ListItem
            onClick={(ev) => {
                ev.preventDefault();
                openEditPanelsDialog(panel);
            }}
            dense
            button
            className={classNames(classes.panelItem, "border-solid border-b-1 py-16  px-0 sm:px-8")}
        >

            <div className="flex flex-1 flex-col relative overflow-hidden pl-8">

                <Typography
                    variant="subtitle1"
                    className="panel-title truncate"
                    color={"default"}
                >
                    {panel.title && panel.title}
                </Typography>

                <Typography
                    color="textSecondary"
                    className="panel-notes truncate"
                >
                    {_.truncate(panel.text.replace(/<(?:.|\n)*?>/gm, ''), {'length': 180})}
                </Typography>
                <div className={classNames(classes.labels, "flex mt-8")}>
                    {					
						(panel.disable && 
							<PanelsChip
								className="mr-4"
								title={'disabled'}
								color={'#F44336'}
							/>						
						)
					}
                </div>
            </div>

            <div className="px-8">
            </div>
        </ListItem>
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
		openEditPanelsDialog: Actions.openEditPanelsDialog
    }, dispatch);
}

function mapStateToProps({panelsApp})
{
    return {
        labels: null
    }
}

export default withStyles(styles, {withTheme: true})((connect(mapStateToProps, mapDispatchToProps))(PanelsListItem));
