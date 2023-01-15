import React, {Component} from 'react';
import {Table, TableBody, TableCell, TablePagination, TableRow, Checkbox} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
//import classNames from 'classnames';
import _ from '@lodash';
import CompaniesTableHead from './CompaniesTableHead';
import * as Actions from '../store/actions';
 import jMoment from "moment-jalaali";
jMoment.loadPersian({ dialect: "persian", usePersianDigits: true });

class CompaniesTable extends Component {

    state = {
        order      : 'asc',
        orderBy    : null,
        selected   : [],
        data       : this.props.companies,
        page       : 0,
        rowsPerPage: 10
    };

    componentDidMount()
    {
        this.props.getCompanies();
		this.props.getCities();
        this.props.getProvinces(); 
        
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.companies, prevProps.companies) || !_.isEqual(this.props.searchText, prevProps.searchText) )
        {
            const data = this.getFilteredArray(this.props.companies, this.props.searchText);
            this.setState({data})
        }
    }

    getFilteredArray = (data, searchText) => {
        if ( searchText.length === 0 )
        {
            return data;
        }
        return _.filter(data, item => item.name.toLowerCase().includes(searchText.toLowerCase()));
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
        this.props.history.push('/apps/company/' + item.id + '/' + item.companyName.split(' ').join('-'));
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
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render()
    {
        const {order, orderBy, selected, rowsPerPage, page, data} = this.state;
		const {cities} = this.props;
        const {provinces} = this.props;
		
        return (
            <div className="w-full flex flex-col">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <CompaniesTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
							onRemoveClick={() => this.props.removeCompanies(this.state.selected)}
                        />

                        <TableBody>
                            {_.orderBy(data, [
                                (o) => {
                                    switch ( orderBy )
                                    {
                                        case 'companyName':
                                        {
                                            return o.companyName[0];
                                        }
                                        default:
                                        {
                                            return o[orderBy];
                                        }
                                    }
                                }
                            ], [order])
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => { 
                                    const isSelected = this.isSelected(n.id);
									let city = "";    let province = "";
									if(n.companyCity)
										city = cities.find(({id}) => id === n.companyCity);	
                                    if(n.companyProvince)
                                        province = provinces.find(({id}) => id === n.companyProvince); 
                                        								
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

                                            <TableCell className="w-52" component="th" scope="row" padding="none">
                                                <img className="w-full block rounded" src="assets/images/ecommerce/product-image-placeholder.png" 
													alt={n.companyName}
												/>
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                {n.companyName}
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                {n.companyMobile}
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                 {city ? city.title : ''}
                                            </TableCell>
                                          

                                             <TableCell component="th" scope="row">
											 {n.companyAddress}
                                            </TableCell>
                                           <TableCell component="th" scope="row">
                                               { jMoment(n.date).format("jYYYY/jMM/jDD hh:mm A")}
                                             </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </FuseScrollbars>

                <TablePagination
                    component="div"
                    count={data.length}
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
        getCompanies	: Actions.getCompanies,
        removeCompanies	: Actions.removeCompanies,
		getCities		: Actions.getCities,
        getProvinces       : Actions.getProvinces,
        
    }, dispatch);
}

function mapStateToProps({companyApp})
{
    return {
        companies	: companyApp.companies.data,
        searchText	: companyApp.companies.searchText,
        provinces      : companyApp.company.provinces,
		cities  	: companyApp.company.cities,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompaniesTable));
