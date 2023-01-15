import React from 'react';
import {withStyles, Icon, List, ListItem, ListItemText, ListSubheader, Button} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
//import ClusterProductCompose from './ClusterProductCompose';
import { withTranslate } from 'react-redux-multilingual';
import {Link} from 'react-router-dom';

const styles = theme => ({
    listItem: {
        color              : 'inherit!important',
        textDecoration     : 'right!important',
        height             : 35,
        width              : 'calc(100% - 16px)',
        borderRadius       : '20px 0 0  20px ',
        paddingLeft        : 0,
        paddingRight       : 12, 
          textAlign   : 'right',
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

function ClusterProductAppSidebarContent({classes, translate, categories, categoryLabels, clusterSelected})
{
	let filteredCategoryLabels = [];
	
	if(clusterSelected !== "")
		filteredCategoryLabels =  categoryLabels.filter(item => item.clusterId === clusterSelected);
	else
		filteredCategoryLabels = categoryLabels;
	
    return (
        <FuseAnimate animation="transition.slideUpIn" delay={400}>
            <div className="flex-auto border-l-1">
				<div className="p-24">
					<Button
						variant="contained"
						color="primary"
						className="w-full"
						component={Link} 
						to="/apps/e-commerce/products/new"
					>
						{translate('New_Product')}
					</Button>
				</div>
                <div>
				<List>
					<ListItem
						button
						component={NavLink}
						to={'/apps/e-commerce/clusterProduct'} 
						activeClassName="active"
						className={classes.listItem}
						exact={true}
					>
						<Icon className="list-item-icon" color="action">label</Icon>
						<ListItemText primary={'All'} disableTypography={true}/>
					</ListItem>					
				</List>
				{
					filteredCategoryLabels.map((categoryLabel, index) =>
						<List key={index}>
							<ListSubheader className={classes.listSubheader} 
								disableSticky 
								 
								component={NavLink} 
								to={'/apps/e-commerce/clusterProduct/' + categoryLabel.id}
							>{categoryLabel.title}</ListSubheader>
							{
								categories.filter(category => category.labels.includes(categoryLabel.id)).map((category, index) =>
									<ListItem
										button
										component={NavLink}
										to={'/apps/e-commerce/clusterProduct/' + categoryLabel.id + '/' + category.id} 
										key={index}
										activeClassName="active"
										className={classes.listItem}
									>
										<Icon className="list-item-icon" color="action">label</Icon>
										<ListItemText primary={category.title} disableTypography={true}/>
									</ListItem>								
								)
							}
						</List>					
					)
				}
                </div>
            </div>
        </FuseAnimate>
    );
}

function mapStateToProps({clusterProductApp})
{
    return {
        categories			: clusterProductApp.clusterProducts.categories,
        categoryLabels		: clusterProductApp.clusterProducts.categoryLabels,
		clusterSelected			: clusterProductApp.clusterProducts.clusterSelected,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(withTranslate(ClusterProductAppSidebarContent))));
