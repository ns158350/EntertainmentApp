import { Navbar } from "./api/Navbar"; // Import Navbar component
import { useEffect, useState } from "react";
import Link from "next/link";
import IconButton from '@mui/material/IconButton';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import Image from "next/image";

export default function Bookmarks() {
    const [movieList, setMovieList] = useState([]); // State for storing movie list
    const [trendingList, setTrendingList] = useState([]); // State for storing trending list
    const [tvList, setTvList] = useState([]); // State for storing TV series list
    const [filteredData, setFilteredData] = useState([]); // State for storing filtered bookmarked data

    // Function to fetch movie list
    const getMovie = () => {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=2940b231da9ae329bd26aca2aefa5f2f")
            .then(res => res.json())
            .then(json => setMovieList(json.results));
    }

    // Function to fetch trending list
    const getTrending = () => {
        fetch("https://api.themoviedb.org/3/trending/all/day?api_key=2940b231da9ae329bd26aca2aefa5f2f")
            .then(res => res.json())
            .then(json => setTrendingList(json.results));
    }

    // Function to fetch TV series list
    const getTv = () => {
        fetch("https://api.themoviedb.org/3/discover/tv?api_key=2940b231da9ae329bd26aca2aefa5f2f")
            .then(res => res.json())
            .then(json => setTvList(json.results));
    }

    // Fetch data when component mounts
    useEffect(() => {
        getMovie();
        getTv();
        getTrending();
    }, [])

    // Filter bookmarked data and update state
    useEffect(() => {
        const mergedArray = trendingList.concat(movieList, tvList);
        const uniqueIds = new Set(mergedArray.map(item => item.id));
        const uniqueObjectsArray = Array.from(uniqueIds).map(id => mergedArray.find(item => item.id === id));

        if (typeof window !== 'undefined') {
            var bookmarked = JSON.parse(localStorage.getItem('bookmark'));
            if (bookmarked) {
                const filteredData = bookmarked.map(id => uniqueObjectsArray.find(item => item.id === id));
                setFilteredData(filteredData);
            }
        }
    }, [movieList, trendingList, tvList]);

    let conditionSatisfied = false;

    return (
        <div className="main-div">
            <Navbar /> {/* Render Navbar component */}
            <h1 style={{ textAlign: 'center', paddingTop: '10px' }}>Bookmarked</h1>

            <div className="movie-section-div">

                {filteredData.map((data, index) => (
                    <div className="movie-content-div" key={index}>
                        {data && (
                            <>
                                <Link href={`/${data.id}`}><Image src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt="" height={400} width={400} /></Link>
                                <a href=''>
                                    <IconButton style={{ position: 'absolute', top: '0', right: '0' }} color="primary" aria-label="bookmark" size="large" onClick={() => {
                                        const bookmarked = JSON.parse(localStorage.getItem('bookmark'));
                                        bookmarked.splice(index, 1);
                                        localStorage.setItem("bookmark", JSON.stringify(bookmarked));
                                    }}>
                                        <BookmarkRemoveIcon />
                                    </IconButton></a>
                                <div className="content-div-text" >
                                    {/* Display item details */}
                                    <p>{data.original_title} {data.original_name} </p>
                                    <div style={{ display: 'flex' }}>
                                        {data.release_date}{data.first_air_date}
                                        <span style={{ marginLeft: '70px' }}></span>

                                        {trendingList.map((trending, index) => {
                                            if (data.id === trending.id) {
                                                conditionSatisfied = true;
                                                return <div key={index}>{trending.media_type.toUpperCase() == "TV" ? <div><span style={{ marginLeft: '15px' }}></span>TV<span style={{ marginLeft: '15px' }}></span></div> : trending.media_type.toUpperCase()}</div>;
                                            }
                                            return null;
                                        })}

                                        {!conditionSatisfied && (
                                            <div>
                                                {movieList.map((movie, index) => (
                                                    <div key={index}>
                                                        {data.id === movie.id ? <div>Movie</div> : null}
                                                    </div>
                                                ))}
                                                {tvList.map((tv, index) => (
                                                    <div key={index}>
                                                        {data.id === tv.id ? <div><span style={{ marginLeft: '15px' }}></span>TV<span style={{ marginLeft: '15px' }}></span></div> : null}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <span style={{ marginLeft: '70px' }}></span> {data.original_language.toUpperCase()}</div>
                                    {conditionSatisfied = false}
                                </div>
                            </>
                        )}

                    </div>
                ))}
            </div>
        </div>
    )
}
