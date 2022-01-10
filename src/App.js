import { useEffect } from 'react'
import store from './store'
import { movies$ } from './movies';
import { Container } from '@mui/material';

import Filter from './components/Filter/Filter'
import Cards from './components/Cards/Cards'
import Paging from './components/Paging/Paging'

import './App.css';

function App() {
  useEffect(() => {
    movies$.then(movies => store.dispatch({type: 'ADD_MOVIES', payload: movies})).catch(error => console.log(error))
  }, []);

  return (
    <div className="app">
      <Container className="app__container">
        <img className="app__logo" alt='logo' src='https://www.particeep.com/public/ecc8540e-79a2-49fe-81de-43af604fc825/images/header/logo.svg'/>
        <Filter/>
        <Cards/>
        <Paging/>
      </Container>
    </div>
  );
}

export default App;
