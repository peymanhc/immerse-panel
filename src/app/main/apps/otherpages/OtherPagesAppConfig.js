import React from "react";
import { FuseLoadable } from "@fuse";
import { Redirect } from "react-router-dom";

export const OtherPagesAppConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: "/apps/otherpages/labels/all",
      component: FuseLoadable({
        loader: () => import("./OtherPagesEdit")
      })
    },
    {
      path: "/apps/otherpages/labels/:filterHandle",
      component: FuseLoadable({
        loader: () => import("./OtherPagesEdit")
      })
    },
    {
      path: "/apps/otherpages",
      component: () => <Redirect to="/apps/otherpages/labels/all" />
    }
  ]
};
