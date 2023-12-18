import React, { useState, useEffect } from "react";
import Header from "./Header";
import TimedEvent from "./TimedEvent";
import CreateArea from "./CreateArea";
import axios from "axios";
function App() {
  const [events, setEvents] = useState([]);
  const url ="https://ganu-timer.onrender.com"
  useEffect(()=>{
    axios.get("https://ganu-timer.onrender.com/timers")
    .then(res=>{
      console.log(res.data);
      setEvents(res.data);
    })
  },[]);
  function addEvent(event) {
    setEvents((prevEvents) => [...prevEvents, event]);
    axios.post("https://ganu-timer.onrender.com/timers",event)
    .catch((err)=>console.log(err))
    console.log(event);
  }
  function removeEvent(event) {
    setEvents((prevEvents) => prevEvents.filter((e, i) => i !== event.id));
    axios.delete("https://ganu-timer.onrender.com/timer",{data:{eventName:event.eventName,eventDate:event.eventDate,eventTime:event.eventTime,color:event.color}})
    .catch(err=>console.log(err));
  }
  return (
    <div>
      <Header />
      <CreateArea addEvent={addEvent} />
      <div className="mob">
      {events.map((event, index) => (
        <TimedEvent
          name={event.eventName}
          id={index}
          key={
            event.eventName + event.color + event.eventDate + event.eventTime
          }
          removeEvent={removeEvent}
          date={event.eventDate}
          color={event.color}
          time={event.eventTime}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
