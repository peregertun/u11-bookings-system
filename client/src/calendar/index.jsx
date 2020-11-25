import React, { useState, useEffect } from "react";
import moment from "moment";
import Header from "./header";
import Events from "../events";
import "./styles.css";
import buildCalendar from "./build";
import dayStyles, { beforeToday } from "./styles";
import AddEvent from "../events/addEvent";

export default function Calendar() {
  const [calendar, setCalendar] = useState([]);
  const [events, setEvents] = useState([]);
  const [value, setValue] = useState(moment());
  let [showDay, setShowDay] = useState(false);

  useEffect(() => {
    setCalendar(buildCalendar(value), selectDay(value));
  }, [value]);

  const selectDay = () => {
    setShowDay(true);
  };

  let dayInfo = [];
  let creator;
  let day;
  let postDate;
  let selectedDay = value.format("dddd" + " " + "DD-MM-YYYY");

  const Day = () => {
    let dayDetails = value.format("dddd" + " " + "DD-MM-YYYY");
    let i;
    for (i = 0; i < events.length; i++) {
      if (dayDetails === events[i].date) {
        dayInfo.push({
          day: events[i].date,
          creator: events[i].creator,
          postDate: events[i].postDate,
        });

        day = dayInfo[0].day;
        creator = dayInfo[0].creator;
        postDate = dayInfo[0].postDate;
      }
    }

    return (
      <div id="selected-day" className="body">
        <div id="selected-day-header" className="header">
          {day && (
            <>
              <p>Event details:</p>
              <p>Day: {day}</p>
              <p>Creator: {creator}</p>
              <p>Post date: {postDate}</p>
            </>
          )}
        </div>
        <AddEvent selectedDay={selectedDay} />
      </div>
    );
  };

  const Test = (events) => setEvents(events);

  return (
    <>
      <div className="calendar">
        <Header value={value} setValue={setValue} />
        <div className="body">
          <div className="day-names">
            {["s", "m", "t", "w", "t", "f", "s"].map((d, weekIndex) => (
              <div className="week" key={weekIndex}>
                {d}
              </div>
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
      </div>
      {showDay ? <Day /> : null}
      <Events Test={Test} />
    </>
  );
}
