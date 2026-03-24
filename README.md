
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

```jsx
<MyFirstComponent propOne={value} propTwo={2}>
```


### Bundler

Todos los archivos usados en nuestro proyecto son transpilados y unificados.

Puede ser Webpack o Vite.


### LIstas

#### mapping

Cada elemento debe tener una key, y ésta debe ser única.

```jsx
const arrayOfNumbers = [1,2,3,4,5,6,7,8];
const items = arrayOfNumbers.map((item) => <li key={`array-number-item-${item}`}>{item}</li>);
...
...
<ul>{items}</ul>
```

```jsx
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


```jsx
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

```jsx
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

```jsx
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

```jsx
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

```jsx
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
    ```jsx
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

```jsx
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

```jsx
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

```jsx
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
```jsx
import styles from './EventItem.module.css';
```
Dentro de la carpeta del componente, creamos un nuevo archivo de la siguiente manera: [Nombre del componente].module.css

Es recomendado usar Camel Case para los nombres de clases:
```jsx
.eventItemContainer{
  display: flex;
  margin: 24px 0;
  align-items: start;
}
```

Se aplica de la siguiente manera:

```jsx
<div className={styles.eventItemContainer}> ...
```

Más de una clase:
```jsx
<div className={`${styles.eventItemContainer} ${styles.anotherClass}`}> ...
```


### Routing

#### Client Side Routing

El cambio de ruta no cambia completamente todo el html de la página, puede simplemente cambiar unos componentes por otros. No es necesario solicitar todo el Javascript, HTML y CSS por cada ruta a la que se accede.

Para esto usamos lo siguiente...

#### React Router

Nos permite definir las rutas de nuestra aplicación y usarlas para definir qué componenetes deben renderizarse en pantalla.

Primero se definen las rutas base:

```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home</div>
  },
  {
    path: '/detail',
    element: <div>Detail</div>
  },
]);

const MyRoutes = () => <RouterProvider router={router} />;

export default MyRoutes;
```

Luego hago que mi App solo retorne las rutas, sacando el código previamente escrito y delegándolo al nuevo componente de rutas:
```jsx
function App() {
  return <Routes />;
}
```


#### Views

Modularizo las rutas creando un componente dentro de la carpeta views para cada ruta:
```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../views/Home';
import Detail from '../views/Detail';
import Error404 from '../views/Error404';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error404 />
  },
  {
    path: '/detail',
    element: <Detail />
  },
]);

const MyRoutes = () => <RouterProvider router={router} />;

export default MyRoutes;
```


#### Manejo de errores (useRouterError)

En el ejemplo de código anterior aparece un errorElement dentro del path base. En caso de error se mostrará la vista de Error404.

Para leer el error tenemos otro hook, el useRouterError, que retorna un objeto con información sobre el error obtenido:
```jsx
import { useRouteError } from 'react-router-dom';
import styles from './Error404.module.css';

const Error404 = () => {
  const error = useRouteError();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{error.status} Oops!</h3>
      <p className={styles.description}>{error.data}</p>
    </div>
  );
};

export default Error404;
```


#### Navegación

Para navegar internamente tengo dos opciones:
- con Link
    ```jsx
    import { Link } from 'react-router-dom';
    const EventItem = ({ info, id, name, image, onEventClick }) => {
    ...
        <Link to={`/detail/${id}`}>
            Ver Más
        </Link>
    ...
    ```
- con useNavigate
    ```jsx
    import { useNavigate } from "react-router-dom";
    const Events = ({searchTerm}) => {
        const { events, isLoading, error } = useEventsData();
        const navigate = useNavigate();

        const handleEventItemClick = (id) => {
            navigate(`/detail/${id}`);
        };
    ...
    ```

#### Parámetros en rutas

Podemos definir rutas dinámicas, que obtengan un parámetro de la url.

Como en el apartado anterior, cuando pasaba la id como parte de la ruta.

En Routes:
```jsx
...
    {
      path: '/detail/:eventId',
      element: <Detail />
    },
```

#### useParams

Es el hook que nos permite leer los parámetros de la url. Devuelve un objeto con clave/valor.
```jsx

```


#### Rutas anidadas

Hay una propiedad cuando declaramos rutas en el createBrowserRouter, que es children. Las rutas anidadas no llevan una '/' al principio, React ya sabe que la url es padre/hijo.
```jsx
{
    path: '/profile',
    element: <Profile />,
    children: [
      {
        path: 'my-info',
        element: <div>info</div>
      },
      {
        path: 'liked-events',
        element: <div>liked</div>
      }
    ]
  }
```

Existe el componente Outlet para mostrar los elementos hijos dentro de la ruta padre. Simplemente hay que incluirlo dentro del componente padre y dentro de él se mostrará lo que pertenezca al componente hijo.
```jsx
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      Profile
      <Outlet />
    </div>
  );
};

export default Profile;
```

#### Fetch a una API

En el hook que creamos llamado useEventsData, podemos cambiar el JSON local por una llamada a la API para obtener la información.
```jsx
...
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://app.ticketmaster.com/discovery/v2/events,json?apikey=...&countryCode=MX");
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (e) {
        setError(e);
      }
    };
...
```

La llamada a la API se expone como función y se llama desde el padre, es decir, desde la vista Home. Esto evita reiteradas llamadas al recargar el componente, haciendo solo la llamada a la API cuando se monta el componente Home.


#### Operador ternario

Aprovechando que movimos parte de la lógica de Eventos a Home, podemos usar el operador ternario para mostrar cuando está cargando la consulta a la API y cuando ocurre un error.

```jsx
...
    <Navbar onSearch={handleNavbarSearch} ref={containerRef} />
    {isLoading ? <div>Cargando resultados...</div> : <Events searchTerm={searchTerm} events={events}/>}
    {!!error && <div>Ha ocurrido un error</div>}
    <SignupForm />
...
```


#### Consultas más específicas a la API

Modificamos un poco nuestro hook para poder sumar un nuevo parámetro a la consulta, que se va a obtener de la búsqueda en la Navbar.

```jsx
  const fetchEvents = async (params) => {
    try {
      const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events,json?apikey=...&countryCode=MX${params?.length ? params : ''}`);
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    } catch (e) {
      setError(e);
    }
  };
```
Desde Home la consulta es:
```jsx
  const handleNavbarSearch = (term) => {
    setSearchTerm(term);
    fetchEvents(`&keyword=${term}`);
  };
```


#### Paginación (react-paginate)

La consulta a la API nos trae os resultados de a 20 en 20. Los elementos totales son más de 2500, pero por obvias razones no vamos a recibir todo de una vez, por eso la propia API lo separa en grupos de a 20 resultados llamados páginas.

En el JSON recibido tenemos lo siguiente:
```json
    page: {
        number: 0
        size: 20
        totalElements: 2510
        totalPages: 126
    }
```

Para usar la paginación, podemos implementar en Home:
```jsx
import ReactPaginate from 'react-paginate';
const Paginate = ReactPaginate.default || ReactPaginate;
...
  const renderEvents = () => {
    if (isLoading) {
      return <div>Cargando resultados...</div>;
    }
    if (error) {
      return <div>Ha ocurrido un error</div>
    }
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
...
```


#### Fetch para consultar un evento por id


#### Variable de entorno para no exponer la API key


### State Management

#### Zustand

#### Like y Dislike con localStorage

#### Guardar eventos favoritos


### Memoization

#### memo

#### useMemo()



### React Concurrence

#### Strict Mode

#### ErrorBoundary

#### Suspense

#### useTransition





## React 19

### useActionState
Nuevo hook para formularios.

### useFormStatus

### useOptimistic

### React compiler

### Forward Ref

### use()

### metadata