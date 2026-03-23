import { useState, useEffect } from 'react';
import eventsJSON from '../data/events.json'

const useEventsData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setTimeout(() => {
      try {
        setData(eventsJSON);
        setIsLoading(false);
      } catch (e) {
        setError(e);
      }
    }, 2000);


    // Load API Call
    // const fetchEvents = async () => {
    //   try {
    //     const response = await fetch("https://app.ticketmaster.com/discovery/v2/events,json?apikey=...&countryCode=MX");
    //     const data = await response.json();
    //     setData(data);
    //     setIsLoading(false);
    //   } catch (e) {
    //     setError(e);
    //   }
    // };
    // fetchEvents();

  }, []);

  return {
    events: data?._embedded?.events || [],
    isLoading,
    error
  };
};

export default useEventsData;