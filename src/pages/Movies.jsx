import { useState, useEffect } from "react"; // Import useState and useEffect hooks from React
import Link from "next/link"; // Import Link component from Next.js
import BookmarkIcon from '@mui/icons-material/Bookmark'; // Import BookmarkIcon component from Material-UI
import IconButton from '@mui/material/IconButton'; // Import IconButton component from Material-UI
import { Navbar } from "./api/Navbar"; // Import Navbar component
import Image from "next/image"; // Import Image component from Next.js

export default function Movies() {
    const [movieList, setMovieList] = useState([]); // State for storing movie list

    // Function to fetch movie list
    const getMovie = () => {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=2940b231da9ae329bd26aca2aefa5f2f")
            .then(res => res.json())
            .then(json => setMovieList(json.results));
    }

    useEffect(() => {
        getMovie(); // Fetch movie list on component mount
    }, [])

    return (
        <div className="main-div">
            <Navbar /> {/* Navbar component */}
            <h1 style={{ textAlign: 'center', paddingTop: '10px' }}>Movies</h1> {/* Title */}
            <div className="movie-section-div"> {/* Container for movie list */}
                {movieList.map((movie, index) => ( /* Map through movie list */
                    <div key={index} className="movie-content-div"> {/* Individual movie item */}
                        <Link href={`/${movie.id}`}><Image src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" height={400} width={400} /></Link> {/* Link to movie details page */}
                        <IconButton style={{ position: 'absolute', top: '0', right: '0' }} color="primary" aria-label="bookmark" size="large" onClick={() => {
                            // Local storage handling
                            let bookmarked;
                            const storedData = localStorage.getItem("bookmark");
                            if (!storedData || storedData === "undefined" || storedData == null) {
                                bookmarked = [];
                            } else {
                                bookmarked = JSON.parse(localStorage.getItem("bookmark"));
                            }

                            if (!bookmarked.includes(movie.id)) {
                                const updated = [...bookmarked, movie.id];
                                localStorage.setItem("bookmark", JSON.stringify(updated));
                            } else {
                                window.alert("Movie ID is already bookmarked.");
                            }

                            // localStorage.removeItem('bookmark');
                        }}>
                            <BookmarkIcon /> {/* Bookmark icon */}
                        </IconButton>
                        <div className="content-div-text"> {/* Movie details */}
                            <p>{movie.original_title} </p> {/* Movie title */}
                            {movie.release_date}<span style={{ marginLeft: '70px' }}></span> MOVIE<span style={{ marginLeft: '70px' }}></span> {movie.original_language.toUpperCase()} {/* Release date and language */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
