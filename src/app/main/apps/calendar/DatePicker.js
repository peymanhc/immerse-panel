import React, {Component, useState} from 'react';
import { MuiPickersUtilsProvider, DateTimePicker,  } from "material-ui-pickers";
import { createMuiTheme } from "@material-ui/core";
import moment from "moment";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import blueGrey from "@material-ui/core/colors/blueGrey";

jMoment.loadPersian({ dialect: "persian", usePersianDigits: true });

// const materialTheme = createMuiTheme({
//   overrides: {
//     MuipickersToolbar: {
//       toolbar: {
//         backgroundColor: blueGrey.A200,
//       }
//     },
//     MuiPickersDay: {
//       day: {
//         color: blueGrey.A700
//       },
//       isSelected: {
//         backgroundColor: blueGrey["400"]
//       },
//       current: {
//         color: blueGrey["900"]
//       }
//     },
//     MuiPickersModal: {
//       dialogAction: {
//         color: blueGrey["400"]
//       }
//     }
//   }
// });

 const persianCal = () => {
  const start = moment(this.state.start).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
  const end = moment(this.state.end).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
  const [selectedDate, handleDateChange] = useState(moment());
  return (
    <MuiPickersUtilsProvider /*theme={materialTheme} */ utils={JalaliUtils} locale="fa">
      <div className="picker">
        <DateTimePicker
          okLabel="تأیید"
          cancelLabel="لغو"
          labelFunc={date => (date ? date.format("jYYYY/jMM/jDD hh:mm A") : "")}
          minDate={start}
          id="start"
          name="start"
          label="آغاز"
          className="mt-8 mb-16"
          value={selectedDate}
          onChange={handleDateChange}
          variant="outlined"
          fullWidth
        />
      </div>
      <div className="picker">
          <DateTimePicker
            okLabel="تأیید"
            cancelLabel="لغو"
            labelFunc={date => (date ? date.format("jYYYY/jMM/jDD hh:mm A") : "")}
            minDate={end}
            id="end"
            name="end"
            label="پایان"
            className="mt-8 mb-16"
            value={selectedDate}
            onChange={handleDateChange}
            variant="outlined"
            fullWidth
          />
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default persianCal;
