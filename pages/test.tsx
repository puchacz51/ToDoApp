import { useEffect, useRef } from "react";

export default () => {
  const calendar = useRef(null);

  console.log(calendar.current, "calendar.current");
  useEffect(() => {
    console.log(calendar.current, "calendar.current");
    console.log(calendar.current?.events, "typeof calendar.current");
  }, [calendar.current?.value]);
  return (
    <div>
      <h1>Test</h1>
      <input type="date" ref={calendar} />
    </div>
  );
};
