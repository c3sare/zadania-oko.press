import { useQuery, gql } from "@apollo/client";
import { MdOutlineStar } from "react-icons/md";
import { useEffect, useState, useCallback } from 'react';

function retDate(date) {
    const month = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
    const str = new Date(date);

    return `Zaktualizowane ${str.getDate()} ${month[str.getMonth()]} ${str.getFullYear()}`
}

let curs = '';
let isLoading = false;

const Search = ({input}) => {
    const [cursor, setCursor] = useState('');
    const [elements, setElements] = useState([])
    const query = gql`
    query MyQuery {
      search(query: "${input}", type: REPOSITORY, first: 10${cursor !== '' ? `, after: "${cursor}"` : ''}) {
        edges {
            node {
              ... on Repository {
                name
                updatedAt
                description
                languages(first: 1) {
                  nodes {
                    name
                    color
                  }
                }
                stargazerCount
              }
            }
            cursor
        }
      }
    }
  `;

    const { loading, error, data } = useQuery(query);

    useEffect(() => {
      setElements([]);
      curs = ''
      isLoading = true;
    }, [input])

    useEffect(() => {
      if(!loading && !error) {
        setElements(state => state.concat(data.search.edges));
        curs = data.search.edges[data.search.edges.length-1]?.cursor;
        isLoading = false;
      }
    }, [data, loading, error])

    const infiniteScroll = useCallback(() => {
        if(window.scrollY+window.innerHeight+200 >= document.body.scrollHeight && !loading && !isLoading) {
            setCursor(curs);
            isLoading = true;
        }
    }, [loading])

    useEffect(() => {
        window.addEventListener('scroll', infiniteScroll);

        return () => {
            window.removeEventListener('scroll', infiniteScroll, true);
        }
    },[infiniteScroll])

    return (
        <div>
            {error && <h2>Wystąpił błąd!</h2>}
            {elements.length > 0 &&
            <ul>
                {elements.map((searchItem, index) => (
                    <li key={index}>
                        <h4>{searchItem.node.name}</h4>
                        <p>{searchItem.node.description}</p>
                        <p>
                            <span>
                                <MdOutlineStar/> {searchItem.node.stargazerCount}
                            </span>
                            {
                                searchItem.node.languages.nodes.map((lang, i) => (
                                    <span key={i}>
                                        <span className="color" style={{backgroundColor: lang.color}}></span>
                                        {lang.name}
                                    </span>
                                ))
                            }
                            <span>{retDate(searchItem.node.updatedAt)}</span>
                        </p>
                    </li>
                ))}
            </ul>
            }
            {loading && <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}
            {(!loading && !data && !error) && <h2>Brak wyników</h2> }
        </div>
    );
}
 
export default Search;