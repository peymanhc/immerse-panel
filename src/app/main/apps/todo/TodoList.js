import React from 'react';
import {List, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import _ from '@lodash';
import TodoListItem from './TodoListItem';
import { withTranslate } from 'react-redux-multilingual';
import '../RTL.css';

function getFilteredArray(entities, searchText)
{
    const arr = Object.keys(entities).map((id) => entities[id]);
    if ( searchText.length === 0 )
    {
        return arr;
    }
    return FuseUtils.filterArrayByString(arr, searchText);
}

const TodoList = ({todos, searchText, orderBy, orderDescending, translate}) => {

    const arr = _.orderBy(getFilteredArray(todos, searchText), [orderBy], [orderDescending ? 'desc' : 'asc']);

    if ( arr.length === 0 )
    {
        return (
            <FuseAnimate delay={100}>
                <div className="flex flex-1 items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        {translate('There_are_no_todos')}
                    </Typography>
                </div>
            </FuseAnimate>
        );
    }
	//console.log(arr);
    return (
        <List className="fuse p-0">
            <FuseAnimateGroup
                enter={{
                    animation: "transition.slideUpBigIn"
                }}
            >
                {
					
                    arr.map((todo) => (
                            <TodoListItem todo={todo} key={todo.id}/>
                        )
                    )
                }
            </FuseAnimateGroup>
        </List>
    );
};

function mapStateToProps({todoApp})
{
    return {
        todos          : todoApp.todos.entities,
        searchText     : todoApp.todos.searchText,
        orderBy        : todoApp.todos.orderBy,
        orderDescending: todoApp.todos.orderDescending
    }
}

export default withRouter(connect(mapStateToProps)(withTranslate(TodoList)));
