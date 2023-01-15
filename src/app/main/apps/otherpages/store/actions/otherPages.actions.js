import axios from "axios";
import { FuseUtils } from "@fuse";
import { showMessage } from "app/store/actions/fuse";

export const GET_OTHER_PAGES = "[OTHER PAGE APP] GET OTHER PAGES";
export const UPDATE_OTHER_PAGES = "[OTHER PAGE APP] UPDATE OTHER PAGES";
export const OPEN_NEW_OTHER_PAGES_DIALOG =
  "[OTHER PAGE APP] OPEN NEW OTHER PAGES DIALOG";
export const CLOSE_NEW_OTHER_PAGES_DIALOG =
  "[OTHER PAGE APP] CLOSE NEW OTHER PAGES DIALOG";
export const OPEN_EDIT_OTHER_PAGES_DIALOG =
  "[OTHER PAGE APP] OPEN EDIT OTHER PAGES DIALOG";
export const CLOSE_EDIT_OTHER_PAGES_DIALOG =
  "[OTHER PAGE APP] CLOSE EDIT OTHER PAGES DIALOG";
export const SET_OTHER_PAGES_SEARCH_TEXT =
  "[OTHER PAGE APP] SET OTHER PAGES SEARCH TEXT";
export const TOGGLE_OTHER_PAGES_ORDER_DESCENDING =
  "[OTHER PAGE APP] TOGGLE OTHER PAGES ORDER DESCENDING";
export const CHANGE_OTHER_PAGES_ORDER =
  "[OTHER PAGE APP] CHANGE OTHER PAGES ORDER";
export const TOGGLE_STARRED = "[OTHER PAGE APP] TOGGLE OTHER PAGES STARRED";
export const TOGGLE_IMPORTANT = "[OTHER PAGE APP] TOGGLE OTHER PAGES IMPORTANT";
export const TOGGLE_ENABLE = "[OTHER PAGE APP] TOGGLE OTHER PAGES ENABLE";
export const TOGGLE_DISABLE = "[OTHER PAGE APP] TOGGLE OTHER PAGES DISABLE";
export const ADD_OTHER_PAGES = "[OTHER PAGE APP] ADD OTHER PAGES";
export const REMOVE_OTHER_PAGES = "[OTHER PAGE APP] REMOVE OTHER PAGES";
export const WAIT_OTHER_PAGES = "[OTHER PAGE APP] ADD LOADING OTHER PAGES";
export const GET_TYPES = "[OTHER PAGE APP] GET TYPES";

export function getOtherPages() {
  const request = axios.get("/api/otherpages-app/getOtherPages");

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_OTHER_PAGES,
        payload: response.data
      })
    );
}

export function setOtherPagesSearchText(event) {
  return {
    type: SET_OTHER_PAGES_SEARCH_TEXT,
    searchText: event.target.value.toLowerCase()
  };
}

export function changeOtherPagesOrder(orderBy) {
  return {
    type: CHANGE_OTHER_PAGES_ORDER,
    orderBy
  };
}

export function toggleOtherPagesOrderDescending() {
  return {
    type: TOGGLE_OTHER_PAGES_ORDER_DESCENDING
  };
}

export function toggleOtherPagesStarred(otherPage) {
  const newOtherPages = {
    ...otherPage,
    starred: !otherPage.starred
  };
  return dispatch =>
    Promise.all([dispatch({ type: TOGGLE_STARRED })]).then(() =>
      dispatch(updateOtherotherPages(newOtherotherPages))
    );
}

export function toggleOtherPagesImportant(otherPage) {
  const newOtherPages = {
    ...otherPage,
    important: !otherPage.important
  };

  return dispatch =>
    Promise.all([dispatch({ type: TOGGLE_IMPORTANT })]).then(() =>
      dispatch(updateOtherPages(newOtherPages))
    );
}

const uploadImage = (file, id, type) => {
  return new Promise((resolve, reject) => {
    var formData = new FormData();
    var fileName = "otherPage_" + FuseUtils.generateGUID() + "_" + id + "_";
    formData.append(fileName, file);
    if (type === "post")
      axios
        .post("/api/otherpages-app/upload", formData)
        .then(({ data }) => resolve(data))
        .catch(e => reject(e));
    else
      axios
        .put("/api/otherpages-app/upload", formData)
        .then(({ data }) => resolve(data))
        .catch(e => reject(e));
  });
};

export function updateOtherPages(otherPage) {
  return async dispatch => {
    dispatch({ type: WAIT_OTHER_PAGES, payload: true });
    const { image_full, image_mobile, image_classic } = otherPage;
    if (typeof image_full === "object") {
      try {
        const img = await uploadImage(image_full.file, "otherPage", "put");
        otherPage["image_full"] = img.url;
      } catch (err) {
        //console.log(err);
        otherPage["image_full"] = "";
      }
    }
    if (typeof image_mobile === "object") {
      try {
        const img = await uploadImage(image_mobile.file, "otherPage", "put");
        otherPage["image_mobile"] = img.url;
      } catch (err) {
        //console.log(err);
        otherPage["image_mobile"] = "";
      }
    }
    if (typeof image_classic === "object") {
      try {
        const img = await uploadImage(image_classic.file, "otherPage", "put");
        otherPage["image_classic"] = img.url;
      } catch (err) {
        //console.log(err);
        otherPage["image_classic"] = "";
      }
    }
    const request = axios.put("/api/otherpages-app/update-otherPage", otherPage);
    return request
      .then(response => {
        dispatch({ type: CLOSE_EDIT_OTHER_PAGES_DIALOG });
        dispatch({ type: WAIT_OTHER_PAGES, payload: false });
        return dispatch(getOtherPages());
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: WAIT_OTHER_PAGES, payload: false });
        dispatch(showMessage({ message: "Access Denied" }));
      });
  };
}

export function closeEditOtherPagesDialog() {
  return {
    type: CLOSE_EDIT_OTHER_PAGES_DIALOG
  };
}

export function closeNewOtherPagesDialog() {
  return {
    type: CLOSE_NEW_OTHER_PAGES_DIALOG
  };
}

export function openEditOtherPagesDialog(data) {
  return {
    type: OPEN_EDIT_OTHER_PAGES_DIALOG,
    data
  };
}

export function openNewOtherPagesDialog() {
  return {
    type: OPEN_NEW_OTHER_PAGES_DIALOG
  };
}

export function addOtherPages(otherPage) {
  return async dispatch => {
    dispatch({ type: WAIT_OTHER_PAGES, payload: true });
    const { image_full, image_mobile, image_classic } = otherPage;
    if (typeof image_full === "object") {
      try {
        const img = await uploadImage(image_full.file, "otherPage", "post");
        otherPage["image_full"] = img.url;
      } catch (err) {
        otherPage["image_full"] = "";
      }
    }
    if (typeof image_mobile === "object") {
      try {
        const img = await uploadImage(image_mobile.file, "otherPage", "post");
        otherPage["image_mobile"] = img.url;
      } catch (err) {
        otherPage["image_mobile"] = "";
      }
    }
    if (typeof image_classic === "object") {
      try {
        const img = await uploadImage(image_classic.file, "otherPage", "post");
        otherPage["image_classic"] = img.url;
      } catch (err) {
        otherPage["image_classic"] = "";
      }
    }
    const request = axios.post("/api/otherpages-app/new-otherPage", otherPage);
    return request
      .then(response => {
        dispatch({ type: CLOSE_NEW_OTHER_PAGES_DIALOG });
        dispatch({ type: WAIT_OTHER_PAGES, payload: false });
        return dispatch(getOtherPages());
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: WAIT_OTHER_PAGES, payload: false });
        dispatch(showMessage({ message: "Access Denied" }));
      });
  };
}

export function removeOtherPages(otherPagesId) {
  const request = axios.delete("/api/otherpages-app/remove-otherPage", {
    data: { otherPageId: otherPagesId }
  });

  return dispatch =>
    request
      .then(response =>
        Promise.all([
          dispatch({
            type: REMOVE_OTHER_PAGES
          })
        ]).then(() => dispatch(getOtherPages()))
      )
      .catch(err => dispatch(showMessage({ message: "Access Denied" })));
}
