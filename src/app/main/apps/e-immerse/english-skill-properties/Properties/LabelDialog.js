import React,{Component} from 'react';
import { Typography, Toolbar, AppBar, TextField, FormControl, Dialog, DialogActions, DialogContent, Button} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../store/actions';
import _ from '@lodash';

const newPropertyState = {
    'id'       : '',
    'title'    : '',
    'price'    : '',
	'addPrice' : '',
    'description'    : '',
    'starred'  : false,
    'important': false,	
};

class LabelDialog extends Component{
	
    state = {
        form: {...newPropertyState},
    };
	
	dialogHandleClose = () => {
		this.props.closeNewLabelDialog();
	};	
	
    handleChange = (event) => {
        const form = _.set({...this.state.form}, event.target.name, event.target.value);
        this.setState({form});
    };
	
    canBeSubmitted()
    {
        const {title} = this.state.form;
        return (
            title.length > 0
        );
    }	
	
	render(){
		const {form} = this.state;
		return ( 
			this.props.open &&
			<div>
				<Dialog
					open={this.props.open}
					onClose={this.dialogHandleClose}
					aria-labelledby="draggable-dialog-title"
				>
					<AppBar position="static" elevation={1}>
						<Toolbar className="flex w-full">
							<Typography variant="subtitle1" color="inherit">
								New Label
							</Typography>
						</Toolbar>
					</AppBar>				
					<DialogContent classes={{root: "p-0"}} style={{paddingTop:'10px'}}>
						<div className="px-16 sm:px-24">
							<FormControl className="mt-8 mb-16" required fullWidth>
								<TextField
									label="Title"
									autoFocus
									name="title"
									value={form.title}
									onChange={this.handleChange}
									required
									variant="outlined"
								/>
							</FormControl>
						</div>															
					</DialogContent>
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                this.props.addLabel(this.state.form);
                                this.dialogHandleClose();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Add
                        </Button>
                    </DialogActions>
				</Dialog>			
			</div>
		);
	}
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeNewLabelDialog : Actions.closeNewLabelDialog,
		addLabel : Actions.addLabel,
    }, dispatch);
}

function mapStateToProps({englishSkillPropertyApp})
{
    return {
        labelDialog: englishSkillPropertyApp.propertys.labelDialog,
		open: englishSkillPropertyApp.propertys.labelDialog.open
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelDialog);