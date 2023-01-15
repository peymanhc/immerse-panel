import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { FusePageCarded } from "@fuse";
import OtherPagesSidebarHeader from "./OtherPagesSidebarHeader";
import OtherPagesHeader from "./OtherPagesHeader";
import OtherPagesToolbar from "./OtherPagesToolbar";
import OtherPagesList from "./OtherPagesList";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducers";
import OtherPagesDialog from "./OtherPagesDialog";
import OtherPagesSidebarContent from "./OtherPagesSidebarContent";
import { bindActionCreators } from "redux";
import * as Actions from "./store/actions";
import { connect } from "react-redux";

const styles = theme => ({
  layoutRoot: {}
});

class OtherPagesEdit extends Component {
  componentDidMount() {
    this.props.getOtherPages();
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <FusePageCarded
          classes={{
            root: classes.layoutRoot,
            header: "items-center min-h-72 h-72 sm:h-136 sm:min-h-136"
          }}
          header={<OtherPagesHeader />}
          contentToolbar={<OtherPagesToolbar />}
          content={<OtherPagesList />}
          leftSidebarHeader={<OtherPagesSidebarHeader />}
          leftSidebarContent={<OtherPagesSidebarContent />}
          innerScroll
          onRef={instance => {
            this.pageLayout = instance;
          }}
        />
        <OtherPagesDialog />
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getOtherPages: Actions.getOtherPages
    },
    dispatch
  );
}

export default withReducer(
  "otherPagesApp",
  reducer
)(
  withStyles(styles, { withTheme: true })(
    connect(null, mapDispatchToProps)(OtherPagesEdit)
  )
);
