import { useEffect, useState } from "react"; // Import useEffect and useState hooks from React
import BookmarkIcon from '@mui/icons-material/Bookmark'; // Import BookmarkIcon component from Material-UI
import IconButton from '@mui/material/IconButton'; // Import IconButton component from Material-UI
import { Navbar } from "./api/Navbar"; // Import Navbar component
import Link from "next/link"; // Import Link component from Next.js
import Image from "next/image"; // Import Image component from Next.js

export default function TV() {
    const [tvList, setTvList] = useState([]); // State for storing TV series data

    // Function to fetch TV series data
    const getTv = () => {
        fetch("https://api.themoviedb.org/3/discover/tv?api_key=2940b231da9ae329bd26aca2aefa5f2f")
            .then(res => res.json())
            .then(json => setTvList(json.results)); // Set TV series data to state
    }

    // Fetch TV series data on component mount
    useEffect(() => {
        getTv();
    }, [])

    return (
        <div className="main-div">
            <Navbar /> {/* Navbar component */}
            <h1 style={{ textAlign: 'center', paddingTop: '10px' }}>TV</h1> {/* Heading */}
            <div className="movie-section-div"> {/* Container for TV series */}
                {/* Map through tvList to render each TV series */}
                {tvList.map((tv, index) => (
                    <div key={index} className="movie-content-div"> {/* Container for each TV series */}
                        {/* Link to details page */}
                        <Link href={`/${tv.id}`}><Image src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`} alt="" height={400} width={400} /></Link>
                        {/* Bookmark button */}
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
                            {/* Title */}
                            <p>{tv.original_name} </p>
                            {/* First air date and language */}
                            {tv.first_air_date}<span style={{ marginLeft: '85px' }}></span> TV<span style={{ marginLeft: '85px' }}></span> {tv.original_language.toUpperCase()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
