import { useState } from "react";
import EventItem from "./components/EventItem";
import eventsJSON from "../../data/events.json";

const Events = () => {
  const [data] = useState(eventsJSON)
  const events = data._embedded.events;
  
  const eventsComponents = events.map((eventItem) => (
    <EventItem
      key={`event-item-${eventItem.id}`}
      info={eventItem.info}
      name={eventItem.name}
      image={eventItem.images[0].url}
    />
  ));

  return (
    <div>
      <p>Eventos</p>
      {eventsComponents}
    </div>
  );
}


export default Events;