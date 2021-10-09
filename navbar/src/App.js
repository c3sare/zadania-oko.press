import './App.css';
import Navbar from './Navbar';
import { useState } from 'react';

function App() {
  const [logged, setLogged] = useState(false);
  const menuItems = [
    {
      id: 1,
      title: 'Wydarzenia',
      link: 'https://localhost:3000/'
    },
    {
      id: 2,
      title: 'Kontakt',
      link: 'https://localhost:3000/'
    },
    {
      id: 3,
      title: 'Wesprzyj Nas',
      link: 'https://localhost:3000/'
    },
  ]
  return (
    <div className="App">
      <Navbar
        logged={logged}
        setLogged={setLogged}
        menuItems={menuItems}
      />
    </div>
  );
}

export default App;
