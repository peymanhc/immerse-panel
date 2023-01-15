import React, {Component} from 'react';
import {Table, TableBody, TableCell, TablePagination, TableRow, Checkbox} from '@material-ui/core';
import {FuseScrollbars, FuseUtils} from '@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import AccdocsTableHead from './AccdocsTableHead';
import AccdocsStatus from '../accdoc/AccdocsStatus';
import * as Actions from '../store/actions';
import {removeAccdocs} from '../store/actions';

class AccdocsTable extends Component {

    state = {
        order      : 'desc',
        orderBy    : 'date',
        selected   : [],
        data       : this.props.accdocs,
        page       : 0,
        rowsPerPage: 10
    };

    componentDidMount()
    {
		const {rowsPerPage, page} = this.state;
        this.props.getAccdocs(rowsPerPage, page);
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.accdocs, prevProps.accdocs) || !_.isEqual(this.props.searchText, prevProps.searchText) )
        {
            const data = this.getFilteredArray(this.props.accdocs, this.props.searchText);
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
        this.props.history.push('/apps/e-account/accdocs/' + item.id);
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
        this.props.getAccdocs(rowsPerPage, page);		
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
		const {page} = this.state;
        this.props.getAccdocs(event.target.value, page);		
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;
	
	formatDate = (date) => date.replace('T', ' ').split('Z')[0];
	
    render()
    {
        const {order, orderBy, selected, rowsPerPage, page, data} = this.state;

        return (
            <div className="w-full flex flex-col">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <AccdocsTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
							onRemoveClick={() => this.props.removeAccdocs(this.state.selected, rowsPerPage, page)}
                        />

                        <TableBody>
                            {
                                _.orderBy(data, [
                                    (o) => {
                                        switch ( orderBy )
                                        {
                                            case 'id':
                                            {
                                                return parseInt(o.id, 10);
                                            }
                                            case 'customer':
                                            {
                                                return o.customer.firstName;
                                            }
                                            case 'payment':
                                            {
                                                return o.payment.method;
                                            }
                                            case 'status':
                                            {
                                                return o.status[0].name;
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
										const status = _.orderBy(n.status, ['date'], ['desc']);
										const id = n.id.split('-');
										// const reference = n.reference.split('-');
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
                                                <TableCell className="w-48 pl-4 sm:pl-12" padding="checkbox">
                                                    <Checkbox
                                                        checked={isSelected}
                                                        onClick={event => event.stopPropagation()}
                                                        onChange={event => this.handleCheck(event, n.id)}
                                                    />
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    {id[0] || ''}
                                                </TableCell>                                            

                                                <TableCell className="truncate" component="th" scope="row">
                                                    {n.customer.firstName + ' ' + n.customer.lastName}
                                                </TableCell>

                                                <TableCell component="th" scope="row" align="right">
                                                    <span>$</span>
                                                    {n.total}
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    {n.payment.method}
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    <AccdocsStatus name={status.length ? status[0].name: ''} color={status.length? status[0].color : null}/>
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    {this.formatDate(n.date)}
                                                </TableCell>

                                            </TableRow>
                                        );
                                    })}
                        </TableBody>
                    </Table>
                </FuseScrollbars>

                <TablePagination
                    component="div"
                    count={this.props.accdocsCount}
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
        getAccdocs: Actions.getAccdocs,
		removeAccdocs: removeAccdocs
    }, dispatch);
}

function mapStateToProps({eAccountApp})
{
    return {
        accdocs    : eAccountApp.accdocs.data,
        searchText: eAccountApp.accdocs.searchText,
		accdocsCount: eAccountApp.accdocs.count,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccdocsTable));
