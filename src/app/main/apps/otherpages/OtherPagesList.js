import React, { Component } from "react";
import { List, Typography } from "@material-ui/core";
import { FuseUtils, FuseAnimate, FuseAnimateGroup } from "@fuse";
import { connect } from "react-redux";
import OtherPagesListItem from "./OtherPagesListItem";
import _ from "@lodash";
import { withRouter } from "react-router-dom";

class OtherPagesList extends Component {
  componentDidMount() {}

  getFilteredArray = (entities, searchText) => {
    const arr = Object.keys(entities).map(id => entities[id]);
    if (searchText.length === 0) {
      return arr;
    }
    return FuseUtils.filterArrayByString(arr, searchText);
  };

  render() {
    const { otherPages, searchText, orderBy, orderDescending } = this.props;
    let arr = _.orderBy(
      this.getFilteredArray(otherPages, searchText),
      [orderBy],
      [orderDescending ? "desc" : "asc"]
    );
    let filter = this.props.match.params.filterHandle;
    if (filter) arr = arr.filter(item => item[filter]);

    if (arr.length === 0) {
      return (
        <FuseAnimate delay={100}>
          <div className="flex flex-1 items-center justify-center h-full">
            <Typography color="textSecondary" variant="h5">
              There are no OtherPages!
            </Typography>
          </div>
        </FuseAnimate>
      );
    }

    return (
      <List className="p-0">
        <FuseAnimateGroup
          enter={{
            animation: "transition.slideUpBigIn"
          }}
        >
          {arr.map(otherPage => (
            <OtherPagesListItem otherPage={otherPage} key={otherPage.id} />
          ))}
        </FuseAnimateGroup>
      </List>
    );
  }
}

function mapStateToProps({ otherPagesApp }) {
  return {
    otherPages: otherPagesApp.otherPages.entities,
    searchText: otherPagesApp.otherPages.searchText,
    orderBy: otherPagesApp.otherPages.orderBy,
    orderDescending: otherPagesApp.otherPages.orderDescending
  };
}

export default withRouter(connect(mapStateToProps)(OtherPagesList));
