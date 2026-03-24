import { useState, useEffect } from 'react';
import eventsJSON from '../data/events.json'

const useEventsData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const fetchEvents = (params) => {
    setTimeout(() => {
      try {
        setData(eventsJSON);
        setIsLoading(false);
      } catch (e) {
        setError(e);
      }
    }, 2000);
  };


  // Load API Call
  // const fetchEvents = async (params) => {
  //   try {
  //     const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events,json?apikey=...&countryCode=MX${params?.length ? params : ''}`);
  //     const data = await response.json();
  //     setData(data);
  //     setIsLoading(false);
  //   } catch (e) {
  //     setError(e);
  //   }
  // };

  return {
    events: data?._embedded?.events || [],
    page: data?.page || {},
    isLoading,
    error,
    fetchEvents
  };
};

export default useEventsData;