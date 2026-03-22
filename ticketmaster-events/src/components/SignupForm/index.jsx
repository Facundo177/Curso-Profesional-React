import { useState } from "react";

const SignupForm = ({}) => {

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [phone, setPhone] = useState('');


  const handleSubmitForm = (event) => {
    event.preventDefault();

    // lo que querramos hacer con los datos de name, age, etc.
  }

  const handleClearClick = () => {
    setName('');
    setAge('');
    setAddress('');
    setZipcode('');
    setPhone('');
  }


  return (
    <form onSubmit={handleSubmitForm}>
      <label >
        Name
        <input value={name} onChange={(event) => setName(event.target.value)} required/>
      </label>
      <label >
        Age
        <input value={age} onChange={(event) => setAge(event.target.value)} required/>
      </label>
      <label >
        Address
        <input value={address} onChange={(event) => setAddress(event.target.value)} required/>
      </label>
      <label >
        Zipcode
        <input value={zipcode} onChange={(event) => setZipcode(event.target.value)} required/>
      </label>
      <label >
        Phone
        <input value={phone} onChange={(event) => setPhone(event.target.value)} required/>
      </label>

      <div>
        <button type="button" onClick={handleClearClick}>Clear</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );

};

export default SignupForm;