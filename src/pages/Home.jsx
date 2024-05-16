import { useEffect, useState } from "react";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import IconButton from '@mui/material/IconButton';
import { Navbar } from "./api/Navbar";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
    const [movieList, setMovieList] = useState([]); // State for storing movie list
    const [trendingList, setTrendingList] = useState([]); // State for storing trending list
    const [tvList, setTvList] = useState([]); // State for storing TV series list

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

    return (
        <div className="main-div">
            <Navbar /> {/* Render Navbar component */}
            <Link style={{textDecoration:'none'}} href='/Trending'> <h1 style={{  marginLeft:'20px' }}>Trending </h1>  </Link>
            <div className="section-div">
                {trendingList.map((trending, index) => (
                    <div key={index} className="content-div">
                        <Link href={`/${trending.id}`}><Image src={`https://image.tmdb.org/t/p/w500/${trending.poster_path}`} alt="" height={400} width={400} /></Link>
                        <IconButton onClick={() => {
                            // Local storage handling
                            let bookmarked;
                            const storedData = localStorage.getItem("bookmark");
                            if (!storedData || storedData === "undefined" || storedData == null) {
                                bookmarked = [];
                            } else {
                                bookmarked = JSON.parse(localStorage.getItem("bookmark"));
                            }

                            if (!bookmarked.includes(trending.id)) {
                                const updated = [...bookmarked, trending.id];
                                localStorage.setItem("bookmark", JSON.stringify(updated));
                            } else {
                                window.alert("Trending ID is already bookmarked.");
                            }

                            // localStorage.removeItem('bookmark');
                        }} style={{ position: 'absolute', top: '0', right: '0' }} color="primary" aria-label="bookmark" size="large">
                            <BookmarkIcon />
                        </IconButton>
                        <div className="content-div-text">
                            {/* Display item details */}
                            <p> {trending.original_title}
                                {trending.original_name}</p>
                           <div style={{display:'flex'}}> {trending.release_date}  {trending.first_air_date} <span style={{ marginLeft: '70px' }}></span> {trending.media_type.toUpperCase()=="TV"?<div><span style={{ marginLeft: '15px' }}></span>TV<span style={{ marginLeft: '15px' }}></span></div>:trending.media_type.toUpperCase()} <span style={{ marginLeft: '70px' }}></span> {trending.original_language.toUpperCase()}
                           </div> </div>
                    </div>
                ))}
            </div>

           <Link style={{textDecoration:'none'}} href='/Movies'> <h1 style={{marginLeft:'20px'}}>Movies</h1></Link>
            <div className="section-div">
                {movieList.map((movie, index) => (
                    <div key={index} className="content-div">
                        <Link href={`/${movie.id}`}><Image src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" height={400} width={400} /></Link>
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
                            <BookmarkIcon />
                        </IconButton>
                        <div className="content-div-text">
                            <p>{movie.original_title} </p>
                            {movie.release_date}<span style={{ marginLeft: '70px' }}></span> MOVIE<span style={{ marginLeft: '70px' }}></span> {movie.original_language.toUpperCase()}
                        </div>
                    </div>
                ))}
            </div>

           <Link style={{textDecoration:'none'}} href='/TV'> <h1 style={{marginLeft:'20px'}}>TV</h1></Link>
            <div className="section-div">
                {tvList.map((tv, index) => (
                    <div key={index} className="content-div">
                        <Link href={`/${tv.id}`}><Image src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`} alt="" height={400} width={400} /></Link>
                        <IconButton style={{ position: 'absolute', top: '0', right: '0' }} color="primary" aria-label="bookmark" size="large" onClick={() => {
                            // Local storage handling
                            let bookmarked;
                            const storedData = localStorage.getItem("bookmark");
                            if (!storedData || storedData === "undefined" || storedData == null) {
                                bookmarked = [];
                            } else {
                                bookmarked = JSON.parse(localStorage.getItem("bookmark"));
                            }

                            if (!bookmarked.includes(tv.id)) {
                                const updated = [...bookmarked, tv.id];
                                localStorage.setItem("bookmark", JSON.stringify(updated));
                            } else {
                                window.alert("TV ID is already bookmarked.");
                            }

                            // localStorage.removeItem('bookmark');
                        }}>
                            <BookmarkIcon />
                        </IconButton>
                        <div className="content-div-text">
                            <p>{tv.original_name} </p>
                            {tv.first_air_date}<span style={{ marginLeft: '85px' }}></span> TV<span style={{ marginLeft: '85px' }}></span> {tv.original_language.toUpperCase()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
