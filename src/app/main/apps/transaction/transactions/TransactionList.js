import React, {Component} from 'react';
import {Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from "react-table";
import * as Actions from '../store/actions';
import withReducer from 'app/store/withReducer';
import reducer  from '../store/reducers';

class TransactionList extends Component {

    state = {
        selectedTransactionsMenu: null
    };
		
    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if ( searchText.length === 0 )
        {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedTransactionMenu = (event) => {
        this.setState({selectedTransactionsMenu: event.currentTarget});
    };

    closeSelectedTransactionsMenu = () => {
        this.setState({selectedTransactionsMenu: null});
    };

    render()
    {
        const { transactions, searchText, selectedTransactionIds, selectAllTransactions, deSelectAllTransactions, toggleInSelectedTransactions, 
			openEditTransactionDialog, removeTransactions, removeTransaction} = this.props;
        const data = this.getFilteredArray(transactions, searchText);
        const {selectedTransactionsMenu} = this.state;

        if ( !data && data.length === 0 )
        {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no transactions!
                    </Typography>
                </div>
            );
        }

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <ReactTable
                    className="-striped -highlight border-0"
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            className: "cursor-pointer",
                            onClick  : (e, handleOriginal) => {
                                if ( rowInfo )
                                {
                                    openEditTransactionDialog(rowInfo.original);
                                }
                            }
                        }
                    }}
                    data={data}
                    columns={[
                        {
                            Header   : () => (
                                <Checkbox
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                    onChange={(event) => {
                                        event.target.checked ? selectAllTransactions() : deSelectAllTransactions();
                                    }}
                                    checked={selectedTransactionIds.length === Object.keys(transactions).length && selectedTransactionIds.length > 0}
                                    indeterminate={selectedTransactionIds.length !== Object.keys(transactions).length && selectedTransactionIds.length > 0}
                                />
                            ),
                            accessor : "",
                            Cell     : row => {
                                return (<Checkbox
                                        onClick={(event) => {
                                            event.stopPropagation();
                                        }}
                                        checked={selectedTransactionIds.includes(row.value.id)}
                                        onChange={() => toggleInSelectedTransactions(row.value.id)}
                                    />
                                )
                            },
                            className: "justify-center",
                            sortable : false,
                            width    : 64
                        },
                        {
                            Header   : () => (
                                selectedTransactionIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={selectedTransactionsMenu ? 'selectedTransactionsMenu' : null}
                                            aria-haspopup="true"
                                            onClick={this.openSelectedTransactionMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedTransactionsMenu"
                                            anchorEl={selectedTransactionsMenu}
                                            open={Boolean(selectedTransactionsMenu)}
                                            onClose={this.closeSelectedTransactionsMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeTransactions(selectedTransactionIds);
                                                        this.closeSelectedTransactionsMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </React.Fragment>
                                )
                            ),
                            accessor : "id",
                            className: "justify-center",
                            width    : 74,
                            sortable : false
                        },
                        {
                            Header    : "Amount",
                            accessor  : "amount",
                            filterable: true,
                            className : "justify-center",
							// width    : 74,
                        },
                        {
                            Header    : "Gateway",
                            accessor  : "gatewayTitle",
                            filterable: true,
                            className : "justify-center",
							//width    : 74,
                        },
                        {
                            Header    : "Date",
                            accessor  : "date",
                            filterable: true,
							className : "justify-center",
                        },
                        {
                            Header    : "Status",
                            accessor  : "status",
                            filterable: true,
							className : "font-bold  justify-center",
                        },						
                        {
                            Header: "",
                            width : 64,
                            Cell  : row => (
                                <div className="flex items-center">
                                    <IconButton
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            removeTransaction(row.original.id);
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={10}
                    noDataText="No transactions found"
                />
            </FuseAnimate>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({				      
        toggleInSelectedTransactions: Actions.toggleInSelectedTransactions,
        selectAllTransactions       : Actions.selectAllTransactions,
        deSelectAllTransactions     : Actions.deSelectAllTransactions,
        openEditTransactionDialog   : Actions.openEditTransactionDialog,
        removeTransactions          : Actions.removeTransactions,
        removeTransaction           : Actions.removeTransaction,
    }, dispatch);
}

function mapStateToProps({transactionApp})
{
    return {
		transactions		   	: transactionApp.transactions.entities,	
        selectedTransactionIds	: transactionApp.transactions.selectedTransactionIds,
        searchText				: transactionApp.transactions.searchText,
    }
}

export default withRouter(withReducer('transactionApp', reducer)((connect(mapStateToProps, mapDispatchToProps)(TransactionList))));