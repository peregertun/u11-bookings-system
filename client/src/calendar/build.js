export default function buildCalendar(value) {
  const startDay = value.clone().startOf("month").startOf("week");
  const endDay = value.clone().endOf("month").endOf("week");
  const day = startDay.clone().subtract(1, "day");
  const calendar = [];

  let event = [
    {
      date: "Sun Aug 30 2020 00:00:00 GMT+0200 (centraleuropeisk sommartid)",
      text: "text",
    },
  ];

  while (day.isBefore(endDay, "day")) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, "day").clone())
    );
  }

  // let i;
  // for (i = 0; i < calendar.length; i++) {
  //   // if (calendar[0][0]._d === "3") {
  //   //   console.log("finns");
  //   // }
  //   console.log("week " + i);
  //   let index;
  //   for (index = 0; index < calendar.length; index++) {
  //     // console.log("day " + index);
  //     console.log(calendar[i][index]._d);
  //     if (calendar[i][index]._d == event[0].date) {
  //       console.log("hittat!");
  //       // calendar[i][index].push("event[0].text");
  //     }
  //   }
  // }

  // console.log(calendar[0]);
  // console.log(calendar[0][0]._d == event[0].date);
  // console.log(calendar[0][0]._d);
  // console.log(event[0].date);
  //loopa igenom alla veckor i calendar
  //loopa igenom alla dagar i veckor
  //jämför dagen med eventet

  return calendar;
}
