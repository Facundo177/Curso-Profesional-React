
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