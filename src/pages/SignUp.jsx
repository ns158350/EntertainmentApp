import TextField from '@mui/material/TextField'; // Import TextField component from Material-UI
import Button from '@mui/material/Button'; // Import Button component from Material-UI
import Link from "next/link"; // Import Link component from Next.js
import { useState } from "react"; // Import useState hook from React
import axios from "axios"; // Import axios for making HTTP requests
import { useRouter } from 'next/router'; // Import useRouter hook from Next.js

export default function SignUp() {
  const [name, setName] = useState(''); // State for storing name input
  const [email, setEmail] = useState(''); // State for storing email input
  const [password, setPassword] = useState(''); // State for storing password input
  const router = useRouter(); // useRouter hook for navigation

  // Function to handle sign up
  async function signUp(e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if name, email, and password are provided
    if (!name || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      // Send POST request to sign up endpoint
      await axios.post(`https://entertainmentapp-1.onrender.com/SignUp`, {
        name, email, password
      })
        .then(res => {
          // Handle response
          if (res.data == "exist") {
            alert("User already exists! Please Login"); // Alert if user already exists
            setName('');
            setEmail('');
            setPassword('');
          }
          else if (res.data == "notexist") {
            alert("User Created Successfully"); // Alert if user created successfully
            router.push("/"); // Redirect to login page
            setName('');
            setEmail('');
            setPassword('');
          }
        })
        .catch(e => {
          alert("wrong details"); // Alert for wrong details
          alert(e); // Catch any errors
        })

    }
    catch (e) {
      alert(e); // Catch any errors
    }
  }

  return (
    <div className="main-div" style={{ display: 'flex', flexDirection: 'column' }}>

      <form method="post" className="signup-main-div">
        <h1>SignUp</h1> {/* Title */}
        {/* Name input field */}
        <TextField required value={name} id="standard-basic" label="Name" autoComplete="name" variant="standard" margin="normal" onChange={(event) => { setName(event.target.value) }} />
        {/* Email input field */}
        <TextField required value={email} id="standard-basic" label="Email" variant="standard" margin="normal" onChange={(event) => { setEmail(event.target.value) }} />
        {/* Password input field */}
        <TextField required value={password} id="standard-password-input" label="Password" type="password" autoComplete="current-password" variant="standard" margin="normal" onChange={(event) => { setPassword(event.target.value) }} />

        {/* SignUp button */}
        <Button variant="contained" style={{ marginTop: '30px' }} onClick={signUp}>SignUp</Button>
        {/* Link to login page */}
        <div className="link-div">
          Already Have An Account? <Link href='/'>Login</Link>
        </div>
      </form>
    </div>
  )
}
