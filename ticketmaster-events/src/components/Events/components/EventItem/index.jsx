import styles from './EventItem.module.css';

const EventItem = ({ info, id, name, image, onEventClick }) => {

  const handleSeeMoreClick = (event) => {
    event.stopPropagation();
    onEventClick(id);
  }

  return (
    <div className={styles.eventItemContainer}>
      <img src={image} alt={name} className={styles.eventItemImage} />
      <div className={styles.eventInfoContainer}>
        <h4 className={styles.eventName}>{name}</h4>
        <p className={styles.eventInfo}>{info}</p>
        <button onClick={handleSeeMoreClick} className={styles.seeMoreBtn}>Ver Más</button>
      </div>
    </div>
  );
};

export default EventItem;