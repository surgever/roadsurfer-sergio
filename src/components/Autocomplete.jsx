/*
* A component that fetches an API to display search results as the user types
* Dependencies: React Router
*/

import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from "react"

const Autocomplete = props => {
    const navigate = useNavigate()
    const { placeholder, param, defaultValue, pathBefore, pathAfter, callback } = props

    const [searchOpen, setSearchOpen] = useState(false)
    const [searchStarted, setSearchStarted] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [selectedSearchText, setSelectedSearchText] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const endpoint = new URL(props.endpoint)
	const autocomplateInputRef = useRef(null);
    let typingStarted = false

    const handleSearchText = newText => {
        setSearchText(newText)
        setSearchStarted(true)
        if(newText.length > 0) {
            // Connect to API
            endpoint.searchParams.append(param, newText);
            fetch(endpoint, {
                method: 'GET',
                headers: {'content-type':'application/json'},
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(stations => {
                setSearchResults(stations);
            }).catch(error => {
                // handle error
            })
        } else if(newText.length === 0) {
            setSearchResults([]);
        }
    }
    const handleNavigation = (e, id, name) => {
        e.preventDefault()
        navigate(pathBefore + id + pathAfter)
        setSelectedSearchText(name)
        setSearchText(name)
        callback && callback(id, name)
        handleCloseSearch(e)
    }
    const handleCloseSearch = e => {
        e.preventDefault()
        setSearchOpen( false )
        setSearchResults([])
    }
    const handleClearSearch = e => {
        e.preventDefault()
        setSearchStarted(true)
        setSearchText('')
        setSearchResults([])
        autocomplateInputRef.current.focus()
    }
    const handleBlurSearch = e => {
        //if(! e.relatedTarget) handleCloseSearch(e)
        if( selectedSearchText !== searchText ) setSearchText(selectedSearchText)
    }
    return (
        <div className={"autocomplete " + (searchOpen ? 'open' : 'closed')}>
            <input type='text' ref={autocomplateInputRef} name="autocomplete"
                className="autocomplete--input"
                placeholder={ placeholder ? placeholder : 'Search...'}
                onFocus={ () => setSearchOpen( true ) }
                onBlur={ handleBlurSearch }
                onChange={e => handleSearchText(e.target.value)}
                value={ ! searchStarted && defaultValue ? defaultValue : searchText}
                autoComplete="off"
            />
            { (searchText || ! searchStarted && defaultValue ) && 
                <button className='autocomplete--clear btn' onClick={handleClearSearch}></button>
            }
            { searchOpen && 
                <ul className="autocomplete--results">
                    {searchResults ? searchResults.map((loc) => {
                        // Security check: only allow alphanumeric and space
                        if(/^[\w- ]+$/.test(loc.name)) return (
                            <li key={loc.id}>
                                <Link onClick={e => handleNavigation(e, loc.id, loc.name)} >
                                    {loc.name}
                                </Link>
                            </li>
                        );
                    })
                    : 
                    ''
                }
                </ul>
            }
        </div>
    )
}

export default Autocomplete