import React, { useState, useEffect } from "react";
import moment from "moment";
import Header from "./header";
import "./styles.css";
import buildCalendar from "./build";
import dayStyles, { beforeToday } from "./styles";

export default function Calendar({ events }) {
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());
  let [showDay, setShowDay] = useState(false);

  useEffect(() => {
    setCalendar(buildCalendar(value), selectDay(value));
  }, [value]);

  const selectDay = () => setShowDay(true);

  let dayInfo = [];
  let eventText;
  let day;
  const Day = () => {
    let dayDets = value.format("dddd" + " " + "DD-MM-YYYY");
    let i;
    for (i = 0; i < events.length; i++) {
      if (dayDets === events[i].date) {
        dayInfo.push({ day: events[i].date, creator: events[i].creator });
        // console.log(dayInfo);
        day = dayInfo[0].day;
        eventText = dayInfo[0].creator;
      }
    }
    return (
      <div id="selected-day" className="body">
        <div id="selected-day-header" className="header">
          {day}
        </div>
        <p>Creator:</p>
        {eventText}
      </div>
    );
  };

  return (
    <div className="calendar">
      <Header value={value} setValue={setValue} />
      <div className="body">
        <div className="day-names">
          {["s", "m", "t", "w", "t", "f", "s"].map((d) => (
            <div className="week">{d}</div>
          ))}
        </div>
        {calendar.map((week, wi) => (
          <div key={wi}>
            {week.map((day, di) => (
              <div
                key={di}
                className="day"
                onClick={() => {
                  !beforeToday(day) && setValue(day);
                }}
              >
                <div className={dayStyles(day, value)}>
                  <button
                    onClick={() => {
                      selectDay();
                    }}
                  >
                    {day.format("D").toString()}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {showDay ? <Day /> : null}
    </div>
  );
}
