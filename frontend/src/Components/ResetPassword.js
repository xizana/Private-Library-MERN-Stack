import { useState } from "react";
import { useResetPassword } from "../hooks/useResetPassword"
// import { useAuthContext } from "../hooks/useAuthContext"
// import { Link } from "react-router-dom";


export default function Login() {
    const [email, setEmail] = useState("")
    const { reset, error, isLoading, linkSent } = useResetPassword()
    // const { user } = useAuthContext()


    // after submiting this function will send reset link 

    const handleSubmit = async (e) => {
        e.preventDefault()
        await reset(email)
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Reset Password</h3>

            {/* messages */}

            {linkSent && <div className="linkSent">Password Reset Link Sent Successfuly!</div>}
            {linkSent === false && <div className="notEmail">This Email Does Not Exist..</div>}

            <label>Email:</label>

            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <button disabled={isLoading}>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}