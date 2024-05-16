import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import TextField from '@mui/material/TextField'; // Import TextField component from Material-UI
import Button from '@mui/material/Button'; // Import Button component from Material-UI
import Link from "next/link"; // Import Link component from Next.js
import { useState } from 'react'; // Import useState hook from React
import { useRouter } from 'next/router'; // Import useRouter hook from Next.js
import axios from "axios"; // Import axios for making HTTP requests

export default function Login() {
  const [email, setEmail] = useState(''); // State for storing email input
  const [password, setPassword] = useState(''); // State for storing password input
  const router = useRouter(); // useRouter hook for navigation

  // Function to handle login
  async function login(e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if email and password are provided
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      // Send POST request to login endpoint
      await axios.post("https://entertainmentapp-1.onrender.com/", {
        email, password
      })
        .then(res => {
          // Handle response
          if (res.data == "exist") {
            router.push("/Home"); // Redirect to Home page if user exists
          }
          else if (res.data == "notexist") {
            alert("User have not signed up"); // Alert if user does not exist
          }
          else if (res.data == "incorrectpassword") {
            alert("Password is not correct"); // Alert if password is incorrect
          }
          else if (res.data == "fail") {
            alert("Something went wrong"); // Alert for general failure
          }

        })
        .catch(e => {
          alert(e); // Catch any errors
        })

    }
    catch (e) {
      alert(e); // Catch any errors
    }

  }

  return (
    <div className="main-div" style={{ display: 'flex', flexDirection: 'column' }}>
      
      {/* Login form */}
      <form method='post' className="login-main-div">
        <h1>Login</h1>
        {/* Email input field */}
        <TextField value={email} id="standard-basic" label="Email" variant="standard" margin="normal" onChange={(event) => { setEmail(event.target.value) }} />
        {/* Password input field */}
        <TextField value={password} id="standard-password-input" label="Password" type="password" autoComplete="current-password" variant="standard" margin="normal" onChange={(event) => { setPassword(event.target.value) }} />

        {/* Login button */}
        <Button onClick={login} variant="contained" style={{ marginTop: '30px' }}>LogIn</Button>
        {/* Link to sign up page */}
        <div className="link-div">
          Does not Have An Account? <Link href='/SignUp'>SignUp</Link>
        </div>
      </form>
    </div>
  )
}
