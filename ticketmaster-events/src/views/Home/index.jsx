import { useRef, useState } from 'react';
import Navbar from '../../components/Navbar';
import Events from '../../components/Events';
import SignupForm from '../../components/SignupForm';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef();

  const handleNavbarSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Navbar onSearch={handleNavbarSearch} ref={containerRef} />
      <Events searchTerm={searchTerm} />
      <SignupForm />
    </>
  )
};

export default Home;