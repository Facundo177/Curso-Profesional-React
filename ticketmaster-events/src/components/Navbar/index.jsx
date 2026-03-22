import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

const Navbar = forwardRef(({onSearch}, ref) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log('onSearch cambio');
  }, [onSearch]);

  useEffect(() => {
    console.log('Componente listo');
  }, []);

  useEffect(() => {
    console.log('search cambio');
  }, [search]);

  useImperativeHandle(ref, () => ({
    search,
    setSearch
  }));

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearch(search);
    }
  };

  return (
    <div ref={ref}>
      <p>Mi boletera</p>
      <input
      placeholder="Busca tu evento favorito"
      onChange={handleInputChange}
      onKeyDown={handleInputKeyDown}
      value={search}
      />
    </div>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;