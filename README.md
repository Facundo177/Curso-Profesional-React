
# Curso profesional de React

Apuntes personales y proyecto, basados en un curso dado por [Código Facilito](https://codigofacilito.com/cursos/react-profesional).


## Tech Stack

**Ecosistema de React**
- Vite,
- Redux Toolkit,
- Zustand,
- React Router,
- SWR,
- React Hook Form,
- Tailwind CSS,
- Styled Components,
- React Spring,
- React Testing Library,
- NEXT.JS


## Installation

Para un proyecto nuevo:
```
npm create vite@latest
```

Para iniciar el proyecto:
```
npm run dev
```


## Conceptos

### JSX

Extensión de sintaxis que permite escribir HTML dentro de código Javascript.

[HTML a JSX](https://transform.tools/html-to-jsx)

### Reactividad

Es la capacidad de los componenentes de llamarse a si mismo. (Actualizarse)

### State

#### useState

```jsx
  import {useState} from 'react';

  const MyFirstComponent = () => {
    const [value, setValue] = useState(0);

    setTimeout(() => {
        setValue(value + 1);
    }, 3000);

    return (
        <div>
            {value}
        </div>
    );
  }
```


### Inmutabilidad

React crea un nuevo objeto, no modifica el original.


### Props

Los componentes pueden recibir propiedades, ya sean reactivas o constantes. En el primer caso, al cambiar la propiedad también se actualiza el componente.

```
<MyFirstComponent propOne={value} propTwo={2}>
```


### Bundler

Todos los archivos usados en nuestro proyecto son transpilados y unificados.

Puede ser Webpack o Vite.


### LIstas

#### mapping

Cada elemento debe tener una key, y ésta debe ser única.

```
const arrayOfNumbers = [1,2,3,4,5,6,7,8];
const items = arrayOfNumbers.map((item) => <li key={`array-number-item-${item}`}>{item}</li>);
...
...
<ul>{items}</ul>
```

```
const arrayOfPeople = [
    {
    "id": 1,
    "name": "Uriel",
    "age": 20
    },{
    "id": 2,
    "name": "Juan",
    "age": 24
    },{
    "id": 3,
    "name": "Jose",
    "age": 21
    }
];

const peopleItems = arrayOfPeople.map((person) => <li key={`array-person-item-${person.id}`}>{person.name}</li>)
...
...
<ul>{peopleItems}</ul>
```


### Eventos en React

Los Event Handlers capturan los eventos.

Los eventos se propagan de hijos a padres. Esto se puede evitar con el método stopPropagation


```
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button >
  );
}
```


### Compartir información de hijos a padres

Dentro del padre se declara el state con la información y se pasa al hijo la función que permite modificarlo. A su vez, se comparte el valor de dicho estado a los otros hijos para que al cambiar el estado se actualicen ellos también con el nuevo valor.

```
function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleNavbarSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Navbar onSearch={handleNavbarSearch}/>
      <Events searchTerm={searchTerm}/>
    </>
  )
}
```


### Filtrado básico por nombre

```
const renderEvents = () => {
    let eventsFiltered = events;

    if (searchTerm.length > 0) {
      eventsFiltered = eventsFiltered.filter((item) => item.name.toLowerCase().includes(searchTerm));
    }
...
```


### Formularios

Normalmente se usan librerías para el manejo de forms. Las más populares son React Hook Form y Formik.

#### Básico

Sin dependencias podríamos hacer lo siguiente:

```
  // Creamos un estado para cada input del form
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

  ...

    <form onSubmit={handleSubmitForm}>
        <label >
            Name
            <input value={name} onChange={(event) => setName(event.target.value)} required/>
        </label>
        <label >
            Age
            <input value={age} onChange={(event) => setAge(event.target.value)} required/>
        </label>
        ...
        <div>
            <button type="button" onClick={handleClearClick}>Clear</button>
            <button type="submit">Submit</button>
        </div>
```





#### React Hook Form

Hace mucho más simple el código de arriba:

```
  const {register, handleSubmit, reset, formState: {errors}} = useForm();

  const handleSubmitForm = (data) => {
    // el prevent default ya lo hace handleSubmit
    console.log(data);
  }

  const handleClearClick = () => {
    reset();
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <label >
        Name
        <input {...register('name'), {required: true}}/>
      </label>
      <label >
        Age
        <input {...register('age'), {required: true}}/>
      </label>
      ...
      <div>
        <button type="button" onClick={handleClearClick}>Clear</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
```


### Hooks

Funciones que permiten reutilizar o compartir lógica o estado (el useState que venimos usando es un hook).

#### Reglas de los Hooks
- se deben llamar en el nivel superior, fuera de cualquier ciclo, condicional o funciones anidadas. Lo recomendado es en la parte superior dentro de un componente.
    ```
    const Navbar = ({onSearch}) => {
        const [search, setSearch] = useState('');
        ...
    ```
- llama hooks solo en funciones de React (componentes), no en funciones normales de Javascript.


#### useEffect

Recibe dos argumentos: una arrow function (sería un callback) y un arreglo de dependencias.
Ejecuta cambios cuando un argumento cambia.

#### useRef

Hook que se usa para referenciar valores. Permite actualizar el valor sin la necesidad de que sea reactivo.
Son valores de referencia para cuando queremos guardar algo de forma global, pero no en un estado reactivo.


#### Referencia a un contenido HTML

```
const containerRef = useRef();
...
    <div ref={containerRef}>
    ...
```
Cada elemento HTML en React tieme la propiedad ref.
Permite guardar directamente elementos del DOM, para poder leer sus propiedades por ejemplo.


#### forwardRef

Si quiero usar una referencia recibida del padre, tengo que poner todo el componente hijo dentro de un forwardRef, tomando la referencia como un segundo argumento.

Entonces queda como primer argumento las props y como segundo argumento la ref.

Al envolver el componenete es necesario declarar su displayName.

```
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef();
  ...
    <Navbar onSearch={handleNavbarSearch} ref={containerRef}/>


const Navbar = forwardRef(({onSearch}, ref) => {
    ...
    return (
        <div ref={ref}>
        ...
        </div>
  );
});
Navbar.displayName = 'Navbar';
```


#### useImperativeHandle

Un hook que nos permite exponer valores. El primer argumento es la referencia que viene del padre y el segundo es un callback que retorna un objeto (todo lo que esté dentro del objeto se expone al padre).

```
const Navbar = forwardRef(({onSearch}, ref) => {
...
    useImperativeHandle(ref, () => ({
        search,
        setSearch
    }));
```


### Estilos

#### Módulos css

React nos permite crear archivos de css modularizados, que van a tener un hash único para cada clase de css, evitando problemas de clases con el mismo nombre en diferentes componentes.
```
import styles from './EventItem.module.css';
```
Dentro de la carpeta del componente, creamos un nuevo archivo de la siguiente manera: [Nombre del componente].module.css

Es recomendado usar Camel Case para los nombres de clases:
```
.eventItemContainer{
  display: flex;
  margin: 24px 0;
  align-items: start;
}
```

Se aplica de la siguiente manera:

```
<div className={styles.eventItemContainer}> ...
```

Más de una clase:
```
<div className={`${styles.eventItemContainer} ${styles.anotherClass}`}> ...
```