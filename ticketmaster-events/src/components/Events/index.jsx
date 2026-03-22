import useEventsData from "../../hooks/useEventsData";
import EventItem from "./components/EventItem";

const Events = ({searchTerm}) => {

  const { events } = useEventsData();

  const handleEventItemClick = (id) => {
    console.log('evento clickeado: ', id);
  };

  const renderEvents = () => {
    let eventsFiltered = events;

    if (searchTerm.length > 0) {
      eventsFiltered = eventsFiltered.filter((item) => item.name.toLowerCase().includes(searchTerm));
    }

    return eventsFiltered.map((eventItem) => (
        <EventItem
          key={`event-item-${eventItem.id}`}
          info={eventItem.info}
          name={eventItem.name}
          image={eventItem.images[0].url}
          onEventClick={handleEventItemClick}
          id={eventItem.id}
        />
      ));
  };

  return (
    <div>
      <p>Eventos</p>
      {renderEvents()}
    </div>
  );
}


export default Events;