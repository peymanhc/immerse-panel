import React, {Component} from 'react';
import {FusePageSimple} from '@fuse';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TransactionList from './TransactionList';
//import SidebarContent from './SidebarContent';
import TransactionsHeader from './TransactionsHeader';



class TransactionsApp extends Component {
	

    componentDidMount()
    {
		this.props.getTransactions();
    }	
    render()
    {	
        return (
			<div>
				<FusePageSimple
					classes={{
						contentCardWrapper: "p-16 sm:p-24 pb-80",
						leftSidebar       : "w-256 border-0",
						header            : "min-h-72 h-72 sm:h-136 sm:min-h-136"
					}}
					header={
						<TransactionsHeader/>
					}				
					content={
						<div className="p-24">
							<TransactionList />
						</div>						
					}				
								
					sidebarInner	
				/>							
			</div>
        )
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
		getTransactions		: Actions.getTransactions,
    }, dispatch);
}

export default withReducer('transactionApp', reducer)(connect(null, mapDispatchToProps)(TransactionsApp));
