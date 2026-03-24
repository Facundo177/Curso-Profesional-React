import { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/Navbar';
import Events from '../../components/Events';
import SignupForm from '../../components/SignupForm';
import useEventsData from '../../hooks/useEventsData';
import ReactPaginate from 'react-paginate';

const Paginate = ReactPaginate.default || ReactPaginate;


const Home = () => {
  const { events, isLoading, error, fetchEvents, page } = useEventsData();

  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef();

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleNavbarSearch = (term) => {
    setSearchTerm(term);
    fetchEvents(`&keyword=${term}`);
  };

  const handlePageClick = ({ selected }) => {

  };

  const renderEvents = () => {
    if (isLoading) {
      return <div>Cargando resultados...</div>;
    }
    if (error) {
      return <div>Ha ocurrido un error</div>
    }

    console.log('Tipo de ReactPaginate:', typeof ReactPaginate);

    return (
      <div>
        <Events searchTerm={searchTerm} events={events} />
        <Paginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={12}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    );
  };



  return (
    <>
      <Navbar onSearch={handleNavbarSearch} ref={containerRef} />
      {renderEvents()}
      <SignupForm />
    </>
  )
};

export default Home;