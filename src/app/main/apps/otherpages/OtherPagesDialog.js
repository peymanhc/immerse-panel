import React, { Component } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  Checkbox,
  Icon,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  Divider,
  withStyles,
  CircularProgress
} from "@material-ui/core";
import amber from "@material-ui/core/colors/amber";
import red from "@material-ui/core/colors/red";
import { FuseUtils } from "@fuse";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//import moment from 'moment/moment';
import _ from "@lodash";
import * as Actions from "./store/actions";
import classNames from "classnames";

const newOtherPagesState = {
  id: "",
  title: "",
  text: "",
  starred: false,
  important: false,
  disable: false,
  image_full: "",
  tags: []
};

const styles = theme => ({
  hidden: {
    display: "none"
  },
  productImageItem: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    "&:hover": {
      boxShadow: theme.shadows[5]
    },
    "&.featured": {
      pointerEvents: "none",
      boxShadow: theme.shadows[3]
    }
  },
  uploadBtn: {
    fontSize: 12
  },
  loading: {
    marginLeft: theme.spacing.unit * 10
  }
});

class OtherPagesDialog extends Component {
  constructor(props) {
    super(props);
    this.backgroundInputRef = React.createRef();
    this.iconInputRef = React.createRef();
  }

  state = {
    form: { ...newOtherPagesState },
    background: null,
    icon: null
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    /**
     * After Dialog Open
     */
    if (
      !prevProps.otherPagesDialog.props.open &&
      this.props.otherPagesDialog.props.open
    ) {
      /**
       * Dialog type: 'edit'
       * Update State
       */
      if (
        this.props.otherPagesDialog.type === "edit" &&
        this.props.otherPagesDialog.data &&
        !_.isEqual(this.props.otherPagesDialog.data, prevState)
      ) {
        this.setState({ form: { ...this.props.otherPagesDialog.data } });
      }

      /**
       * Dialog type: 'new'
       * Update State
       */
      if (
        this.props.otherPagesDialog.type === "new" &&
        !_.isEqual(newOtherPagesState, prevState)
      ) {
        this.setState({
          form: {
            ...newOtherPagesState,
            id: FuseUtils.generateGUID()
          }
        });
      }
    }
  }

  handleChange = event => {
    const form = _.set(
      { ...this.state.form },
      event.target.name,
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    );
    this.setState({ form });
  };

  closeOtherPagesDialog = () => {
    this.props.otherPagesDialog.type === "edit"
      ? this.props.closeEditOtherPagesDialog()
      : this.props.closeNewOtherPagesDialog();
  };

  handleToggleImportant = () => {
    this.setState({
      form: {
        ...this.state.form,
        important: !this.state.form.important
      }
    });
  };

  handleToggleStarred = () => {
    this.setState({
      form: {
        ...this.state.form,
        starred: !this.state.form.starred
      }
    });
  };

  canBeSubmitted() {
    const { title } = this.state.form;
    return title.length > 0;
  }

  addFiles = event => {
    const file = event.target.files[0];
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: {
          url: URL.createObjectURL(file),
          file
        }
      }
    });
  };

  render() {
    const {
      otherPagesDialog,
      addOtherPages,
      updateOtherPages,
      removeOtherPages,
      classes
    } = this.props;
    const { form } = this.state;

    return (
      <Dialog
        {...otherPagesDialog.props}
        onClose={this.closeOtherPagesDialog}
        fullWidth
        maxWidth="sm"
      >
        <AppBar position="static" elevation={1}>
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              {otherPagesDialog.type === "new" ? "New Type" : "Edit Type"}
            </Typography>
            <div>
              <CircularProgress
                className={
                  this.props.loading ? classes.loading : classes.hidden
                }
                color="secondary"
              />
            </div>
          </Toolbar>
        </AppBar>
        <DialogContent classes={{ root: "p-0" }}>
          <div className="mb-16">
            <div className="flex items-center justify-between p-12">
              <div
                className="flex items-center justify-start"
                aria-label="Toggle star"
              >
                <IconButton onClick={this.handleToggleImportant}>
                  {form.important ? (
                    <Icon style={{ color: red[500] }}>error</Icon>
                  ) : (
                    <Icon>error_outline</Icon>
                  )}
                </IconButton>

                <IconButton onClick={this.handleToggleStarred}>
                  {form.starred ? (
                    <Icon style={{ color: amber[500] }}>star</Icon>
                  ) : (
                    <Icon>star_outline</Icon>
                  )}
                </IconButton>
              </div>
            </div>
            <Divider className="mx-24" />
          </div>

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
            <FormControl className="mt-8 mb-16" fullWidth>
              <TextField
                label="Description"
                name="text"
                multiline
                rows="6"
                value={form.text}
                onChange={this.handleChange}
                variant="outlined"
              />
            </FormControl>
            <div className="flex">
              <div className="w-1/3 mt-8 mb-16">
                <input
                  accept="image/*"
                  className={classes.hidden}
                  name="image_full"
                  id="image_full"
                  type="file"
                  onChange={this.addFiles}
                />
                <label htmlFor="image_full">
                  <Button
                    variant="outlined"
                    component="span"
                    className={classes.uploadBtn}
                  >
                    Image
                  </Button>
                </label>
              </div>
            </div>

            <div className="flex">
              <div className="w-1/3 mt-8 mb-16">
                {form.image_full && (
                  <div
                    className={classNames(
                      classes.productImageItem,
                      "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer"
                    )}
                  >
                    <img
                      className="max-w-none w-auto h-full"
                      src={
                        typeof form.image_full === "object"
                          ? form.image_full.url
                          : form.image_full
                      }
                      alt=""
                    />
                  </div>
                )}
              </div>
            </div>

            <FormControl className="mt-8 mb-16" fullWidth>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.disable}
                    name="disable"
                    onChange={this.handleChange}
                  />
                }
                label="Disable"
              />
            </FormControl>
          </div>
        </DialogContent>

        {otherPagesDialog.type === "new" ? (
          <DialogActions className="justify-between pl-8 sm:pl-16">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                addOtherPages(this.state.form);
              }}
              disabled={!this.canBeSubmitted()}
            >
              Add
            </Button>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between pl-8 sm:pl-16">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                updateOtherPages(this.state.form);
              }}
              disabled={!this.canBeSubmitted()}
            >
              Save
            </Button>
            <IconButton
              className="min-w-auto"
              onClick={() => {
                removeOtherPages(this.state.form.id);
                this.closeOtherPagesDialog();
              }}
            >
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
      </Dialog>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      closeEditOtherPagesDialog: Actions.closeEditOtherPagesDialog,
      closeNewOtherPagesDialog: Actions.closeNewOtherPagesDialog,
      addOtherPages: Actions.addOtherPages,
      updateOtherPages: Actions.updateOtherPages,
      removeOtherPages: Actions.removeOtherPages
    },
    dispatch
  );
}

function mapStateToProps({ otherPagesApp }) {
  return {
    otherPagesDialog: otherPagesApp.otherPages.otherPagesDialog,
    loading: otherPagesApp.otherPages.loading
  };
}

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(OtherPagesDialog)
);
