import React, { useState } from "react";
import moment from "moment";
import Calendar from "./index.jsx";
import "./calendar/styles";

export default function App() {
  const [value, setValue] = useState(moment());
  return <Calendar value={value} onChange={setValue} />;
}
