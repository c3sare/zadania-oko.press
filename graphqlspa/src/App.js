import './App.css';
import { useRef, useState } from 'react';
import Search from './Search';
import { useEffect } from 'react';
import { FaGithub, FaSearch } from "react-icons/fa";
import {
  BrowserRouter as Router,
  useHistory,
  useLocation
} from "react-router-dom";

function useQueryRouter() {
  return new URLSearchParams(useLocation().search);
}

const Appx = () => (
  <Router>
    <App/>
  </Router>
  )

let timeout = null;

function App() {
  let queri = useQueryRouter();
  let history = useHistory();
  const [searchInput, setSearchInput] = useState('');
  const input = useRef(null);

  const handleInputChange = (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => setSearchInput(e.target.value), 500)
  }

  useEffect(() => {
    input.current.addEventListener('input', handleInputChange)
    queri.get("search") && setSearchInput(queri.get("search"));
    input.current.value = queri.get("search");
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    history.push({
      pathname: '/',
      search: searchInput ? `?search=${searchInput}` : ''
    });
    // eslint-disable-next-line
  }, [searchInput]);

  return (
    <div className="App">
      <h1>
        <FaGithub/> Search
      </h1>
      <div className="searchInputClass">
        <FaSearch/>
        <input ref={input} type="text"/>
        {
          (searchInput.length < 3) &&
          <span className="msg">
            Wyszukiwanie działa od min. 3 znaków.
          </span>
        }
      </div>
      {(searchInput.length > 2) && <Search input={searchInput}/>}
    </div>
  );
}

export default Appx;
