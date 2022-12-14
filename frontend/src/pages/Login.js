import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";


export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }
    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>

            <label>Email:</label>

            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Password:</label>

            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />


            <button disabled={isLoading}>Log in</button>
            {error && <div className="error">{error}</div>}

            <div className="resetRegister">
                <h4 className="register">Don't Have an acount?
                    <span>
                        <Link to="/signup">
                            Register
                        </Link>
                    </span>

                </h4>

                <h4 className="reset"> Forgot password?
                    <span>
                        <Link to="/sendpasswordlink">
                            Reset
                        </Link>
                    </span>
                </h4>
            </div>

        </form>
    )
}