import React, {Component} from 'react';
import {Icon, Table, TableBody,Typography, TableCell, TablePagination, TableRow, Checkbox} from '@material-ui/core';
import {FuseScrollbars , FuseUtils} from '@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import _ from '@lodash';
import ProductsTableHead from './ProductsTableHead';
import * as Actions from '../store/actions';
import {removeProducts} from '../store/actions';

class ProductsTable extends Component {

    state = {
        order      : 'asc',
        orderBy    : null,
        selected   : [],
        data       : this.props.products,
        page       : 0,
        rowsPerPage: 10
    };

    componentDidMount()
    {	
		const {rowsPerPage, page} = this.state;
        this.props.getProducts(rowsPerPage, page);
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.products, prevProps.products) || !_.isEqual(this.props.searchText, prevProps.searchText) )
        {
            const data = this.getFilteredArray(this.props.products, this.props.searchText);
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
        this.props.history.push('/apps/e-immerse/english-skill/products/' + item.id + '/' + item.handle);
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
        this.props.getProducts(rowsPerPage, page);
    };

    handleChangeRowsPerPage = event => {      		
        this.setState({rowsPerPage: event.target.value});
		const {page} = this.state;
		this.props.getProducts(event.target.value, page);
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render()
    {
        const {order, orderBy, selected, rowsPerPage, page, data} = this.state;
        return (
            <div className="w-full flex flex-col">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <ProductsTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
							onRemoveClick={() => this.props.removeProducts(this.state.selected, rowsPerPage, page)}
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
                                            <TableCell className="w-18 pr-4 sm:pr-12" padding="checkbox" align="right">
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
                                                    <img className="w-full block rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={n.name}/>
                                                )}
                                            </TableCell> 

                                            <TableCell component="th" scope="row" align="right">
                                               <div className="flex flex-col px-16 py-0"> 
                                                 <Typography className="truncate">{n.name}</Typography>
                                                 <Typography color="textSecondary" className="truncate">  {n.Code} </Typography>
                                                </div>

                                                
                                                 
                                            </TableCell>

                                            <TableCell className="truncate" component="th" scope="row" align="right">
                                                {n.categories.join(', ')}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                <span>$</span>
                                                {n.priceTaxIncl}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.quantity}
                                                <i className={classNames("inline-block w-8 h-8 rounded ml-8", n.quantity <= 5 && "bg-red", n.quantity > 5 && n.quantity <= 25 && "bg-orange", n.quantity > 25 && "bg-green")}/>
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.active ?
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
                    count={this.props.productsCount? this.props.productsCount: 0}
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
        getProducts: Actions.getProducts,
		removeProducts: removeProducts
    }, dispatch);
}

function mapStateToProps({eCommerceApp})
{
    return {
        products  : eCommerceApp.products.data,
        searchText: eCommerceApp.products.searchText,
		productsCount: eCommerceApp.products.count,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductsTable));
