import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "next/image";

export function Navbar() {
  // This function renders the navigation bar for the application
  return (
    <div className="nav navbar navbar-expand-lg fixed-top">
      <Link href='/Home'> <Image src='/logo.png' alt="Logo Image" width={35} height={35} style={{marginBottom:'10px'}} /></Link>
      <h3 style={{marginLeft:'5px'}}>Entertainment App</h3>
      <div className="navlinks">
        <Link href="/Home" title="Home" className="navbar-brand">Home</Link>
        <Link href="/Movies" title="Movies" className="navbar-brand">Movies</Link>
        <Link href="/TV" title="TV" className="navbar-brand">TV</Link>
        <Link href="/Bookmarks" title="Bookmarks" className="navbar-brand">Bookmarks</Link>
        <Link href="/" title="Logout" className="navbar-brand">Logout</Link>
      </div>
    </div>
  );
}
