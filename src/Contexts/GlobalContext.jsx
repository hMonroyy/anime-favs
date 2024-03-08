import React, {createContext, useContext, useEffect, useReducer, useState} from "react";
import Swal from "sweetalert2"

const GlobalContext = createContext();
const baseUrl = "https://api.jikan.moe/v4";

// Actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";

// Reducer
const reducer = (state, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true,
            }
        case GET_POPULAR_ANIME:
            return {
                ...state,
                popularAnime: action.payload,
                loading: false,
            }
        case GET_UPCOMING_ANIME:
            return {
                ...state,
                upcomingAnime: action.payload,
                loading: false,
            }
        case GET_AIRING_ANIME:
            return {
                ...state,
                airingAnime: action.payload,
                loading: false,
            }
        case SEARCH:
            return {
                ...state,
                searchResults: action.payload,
                loading: false,
            }
        default:
            return state;
    }
}

export const GlobalContextProvider = ({children}) => {
    const initialState = {
        popularAnime: [],
        upcomingAnime: [],
        airingAnime: [],
        pictures: [],
        isSearch: false,
        searchResults: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const [search, setSearch] = useState("");

    const handleChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value === "") {
            state.isSearch = false;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search) {
            searchAnime(search);
            state.isSearch = true;
        } else {
            state.isSearch = false;
            Swal.fire ({
                theme: 'dark',
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter an anime',
                confirmButtonColor: '#9932CC',
            })
        }
    }

    // Fetch popular anime
    const getPopularAnime = async () => {
        dispatch({type: LOADING});
        const res = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
        const data = await res.json();
        dispatch({type: GET_POPULAR_ANIME, payload: data.data})
    }

    // Fetch upcoming anime
    const getUpcomingAnime = async () => {
        dispatch({type: LOADING});
        const res = await fetch(`${baseUrl}/top/anime?filter=upcoming`);
        const data = await res.json();
        dispatch({type: GET_UPCOMING_ANIME, payload: data.data})
    }

    // Fetch airing anime
    const getAiringAnime = async () => {
        dispatch({type: LOADING});
        const res = await fetch(`${baseUrl}/top/anime?filter=airing`);
        const data = await res.json();
        dispatch({type: GET_AIRING_ANIME, payload: data.data})
    }

    // Search anime
    const searchAnime = async (anime) => {
        dispatch({type: LOADING});
        const res = await fetch(`${baseUrl}/anime?q=${anime}&order_by=popularity&sort=asc&sfw`);
        const data = await res.json();
        dispatch({type: SEARCH, payload: data.data})
    }

    // initial render
    useEffect(() => {
        getPopularAnime();
    }, []);

    return (
        <GlobalContext.Provider value={{
            ...state,
            handleChange,
            handleSubmit,
            getPopularAnime,
            getUpcomingAnime,
            getAiringAnime,
            searchAnime,
            search,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}