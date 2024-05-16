import { useState, useEffect } from "react"; // Import useState and useEffect hooks from React
import Link from "next/link"; // Import Link component from Next.js
import BookmarkIcon from '@mui/icons-material/Bookmark'; // Import BookmarkIcon component from Material-UI
import IconButton from '@mui/material/IconButton'; // Import IconButton component from Material-UI
import { Navbar } from "./api/Navbar"; // Import Navbar component
import Image from "next/image"; // Import Image component from Next.js

export default function Trending() {
    const [trendingList, setTrendingList] = useState([]); // State for storing trending movies and TV series

    // Function to fetch trending data
    const getTrending = () => {
        fetch("https://api.themoviedb.org/3/trending/all/day?api_key=2940b231da9ae329bd26aca2aefa5f2f")
            .then(res => res.json())
            .then(json => setTrendingList(json.results)); // Set trending data to state
    }

    // Fetch trending data on component mount
    useEffect(() => {
        getTrending();
    }, [])

    return (
        <div className="main-div">
            <Navbar /> {/* Navbar component */}
            <h1 style={{ textAlign: 'center', paddingTop: '10px' }}>Trending</h1> {/* Heading */}
            <div className="movie-section-div"> {/* Container for trending movies and TV series */}
                {/* Map through trendingList to render each trending item */}
                {trendingList.map((trending, index) => (
                    <div key={index} className="movie-content-div"> {/* Container for each trending item */}
                        {/* Link to details page */}
                        <Link href={`/${trending.id}`}><Image src={`https://image.tmdb.org/t/p/w500/${trending.poster_path}`} alt="" height={400} width={400} /></Link>
                        {/* Bookmark button */}
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
                        <div className="movie-content-div-text" >
                            {/* Title */}
                            <p> {trending.original_title}
                                {trending.original_name}</p>
                            {/* Release date, media type, and language */}
                            <div style={{ display: 'flex' }}> {trending.release_date}  {trending.first_air_date} <span style={{ marginLeft: '70px' }}></span> {trending.media_type.toUpperCase() == "TV" ? <div><span style={{ marginLeft: '15px' }}></span>TV<span style={{ marginLeft: '15px' }}></span></div> : trending.media_type.toUpperCase()} <span style={{ marginLeft: '70px' }}></span> {trending.original_language.toUpperCase()}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div >
    )
}
