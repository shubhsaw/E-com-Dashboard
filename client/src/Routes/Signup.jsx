import React, { useState } from 'react'
import styles from './Signup.module.css'

const Signup = () => {
  const [email, setEmail] = useState("")
  const [firstN, setFirstN] = useState("")
  const [lastN, setLastN] = useState("")
  const [pass, setPass] = useState("")
  const [formData, setFormData] = useState(null)

async  function handleSubmit(e) {
    e.preventDefault()

    const newData = {
      email: email,
      firstname: firstN,
      lastname: lastN,
      password: pass,
    }

    setFormData(newData)
    console.log(newData)

      try {
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
        const result = await res.json();
    console.log(result);

    alert(result.message); // success message
  } catch (err) {
    console.error("Error:", err);
  }


    // reset fields
    setEmail("")
    setFirstN("")
    setLastN("")
    setPass("")
  }

  return (
    <div className={styles.signupContainer}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.title}>Signup</h1>

        <div className={styles.inputbox}>
          <label>Work Email</label>
          <input
            type="email"
            placeholder="name@work.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.namebox}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={firstN}
              onChange={(e) => setFirstN(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={lastN}
              onChange={(e) => setLastN(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.inputbox}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.submitBtn} >
          Continue with Email
        </button>

        <p className={styles.terms}>
          By signing up, you agree to our <a href="#">Terms of Use</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </p>

        <p className={styles.alt}>
          You can also continue with <a href="#">Enterprise SAML SSO</a>
        </p>

        <p className={styles.signin}>
          Already have an account? <a href="#">Sign In</a>
        </p>
      </form>
    </div>
  )
}

export default Signup
