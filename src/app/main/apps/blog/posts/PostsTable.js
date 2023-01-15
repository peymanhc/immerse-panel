import React, {Component} from 'react';
import {Icon, Table, TableBody, TableCell, TablePagination, TableRow, Checkbox , Typography} from '@material-ui/core';
import {FuseScrollbars , FuseUtils} from '@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import PostsTableHead from './PostsTableHead';
import * as Actions from '../store/actions/posts';
import {removePosts} from '../store/actions/posts';
import moment from 'moment/moment';
 import jMoment from "moment-jalaali";
jMoment.loadPersian({ dialect: "persian", usePersianDigits: true });

class PostsTable extends Component {

    state = {
        order      : 'asc',
        orderBy    : null,
        selected   : [],
        data       : this.props.posts,
        page       : 0,
        rowsPerPage: 10
    };

    componentDidMount()
    {	
		const {rowsPerPage, page} = this.state;
        this.props.getPosts(rowsPerPage, page);
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.posts, prevProps.posts) || !_.isEqual(this.props.searchText, prevProps.searchText) )
        {
            const data = this.getFilteredArray(this.props.posts, this.props.searchText);
            this.setState({data})
        }
    }

  getFilteredArray = (data, searchText) => {
        if ( searchText.length === 0 )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, searchText);
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if ( this.state.orderBy === property && this.state.order === 'desc' )
        {
            order = 'asc';
        }

        this.setState({
            order,
            orderBy
        });
    };

    handleSelectAllClick = event => { 
        if ( event.target.checked )
        {
            this.setState(state => ({selected: this.state.data.map(n => n.id)}));			
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (item) => {
        this.props.history.push('/apps/blog/posts/' + item.id + '/' + item.name);
    };

    handleCheck = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if ( selectedIndex === -1 )
        {
            newSelected = newSelected.concat(selected, id);
        }
        else if ( selectedIndex === 0 )
        {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if ( selectedIndex === selected.length - 1 )
        {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if ( selectedIndex > 0 )
        {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        this.setState({selected: newSelected});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
		const {rowsPerPage} = this.state;
        this.props.getPosts(rowsPerPage, page);
    };

    handleChangeRowsPerPage = event => {      		
        this.setState({rowsPerPage: event.target.value});
		const {page} = this.state;
		this.props.getPosts(event.target.value, page);
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render()
    {
        const {order, orderBy, selected, rowsPerPage, page, data} = this.state;
        return (
            <div className="w-full flex flex-col">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <PostsTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
							onRemoveClick={() => this.props.removePosts(this.state.selected, rowsPerPage, page)}
                        />

                        <TableBody>
                            {_.orderBy(data, [
                                (o) => {
                                    switch ( orderBy )
                                    {
                                        case 'categories':
                                        {
                                            return o.categories[0];
                                        }
                                        default:
                                        {
                                            return o[orderBy];
                                        }
                                    }
                                }
                            ], [order])
                                //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
									const img = _.find(n.images, {id: n.featuredImageId});
                                    return (
                                        <TableRow
                                            className="h-64 cursor-pointer"
                                            hover
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                            onClick={event => this.handleClick(n)}
                                        >
                                            <TableCell className="w-48 pl-4 sm:pl-12" padding="checkbox" align="right">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onClick={event => event.stopPropagation()}
                                                    onChange={event => this.handleCheck(event, n.id)}
                                                />
                                            </TableCell>

                                            <TableCell className="w-52" component="th" scope="row" padding="none" align="right">
                                                {img !== undefined && img.url !== undefined ? (
                                                    <img className="w-full block rounded" src={img.url} alt={n.name}/>
                                                ) : (
                                                    <img className="w-full block rounded" src="assets/images/ecommerce/post-image-placeholder.png" alt={n.name}/>
                                                )}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.name}
                                            </TableCell>

                                            <TableCell className="truncate" component="th" scope="row">
                                                {n.categories.join(', ')}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                <Typography
                    color="textSecondary"
                    className="catalog-notes truncate"
                >
                    {_.truncate(n.description.replace(/<(?:.|\n)*?>/gm, ''), {'length': 30})}
                </Typography>
                                           
 
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                 
                                                  {jMoment(n.date).format("jYYYY/jMM/jDD hh:mm A")}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.publish ?
                                                    (
                                                        <Icon className="text-green text-20">check_circle</Icon>
                                                    ) :
                                                    (
                                                        <Icon className="text-red text-20">remove_circle</Icon>
                                                    )
                                                }
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </FuseScrollbars>

                <TablePagination
                    component="div"
                    count={this.props.postsCount? this.props.postsCount: 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page'
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getPosts: Actions.getPosts,
		removePosts: removePosts
    }, dispatch);
}

function mapStateToProps({blogApp})
{
    return {
        posts  : blogApp.posts.data,
        searchText: blogApp.posts.searchText,
		postsCount: blogApp.posts.count,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsTable));
