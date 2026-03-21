const EventItem = ({ info, id, name, image, onEventClick }) => {

  const handleSeeMoreClick = (event) => {
    event.stopPropagation();
    onEventClick(id);
  }

  return (
    <div>
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>{info}</p>
      <button onClick={handleSeeMoreClick}>Ver Más</button>
    </div>
  );
};

export default EventItem;