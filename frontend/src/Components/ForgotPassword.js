import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForgotPassword } from "../hooks/useForgotPassword";


export default function ChangePassword() {
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [changed, setChanged] = useState(null)
    const [passMatch, setPassMatch] = useState(null)
    const [fields, setFields] = useState(null)
    const [expiredToken, setExpiredToken] = useState(null)
    const { forgotPass, error, isLoading } = useForgotPassword()
    const { id, token } = useParams()


    const sendpassword = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            setPassMatch(true)
            setChanged(null)
        }

        if (password === "" || password2 === "") {
            setFields(true)
        }

        if ((password === password2) && password !== "") {
            const response = await fetch(`/api/reset/${id}/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
            });

            const json = await response.json()

            if (response.ok) {
                setPassword("")
                setPassword2("")
                setChanged(true)
                setPassMatch(null)

            }

            if (!response.ok) {
                console.log(json.error)
                if (!token) {
                    setExpiredToken(true)
                }
            }
        }

    }

    useEffect(() => {
        forgotPass()
        setTimeout(() => {
            setChanged("")
            setFields(null)
        }, 3000)
    }, [fields])

    return (
        <form className="signup" onSubmit={sendpassword}>
            <h3>Change Password</h3>

            {changed === true && <div className="successfulyChanged">Password Successfuly Changed!</div>}
            {passMatch === true && <div className="passMatch">Passwords Do Not Match!</div>}
            {fields === true && <div className="fieldsError">All Fields Must Be Filled..</div>}
            {expiredToken === true && <div className="tokenExpired">This Link is no longer valid..</div>}

            <label>New password:</label>

            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <label>Confirm password:</label>

            <input
                type="password"
                onChange={(e) => setPassword2(e.target.value)}
                value={password2}
            />


            <button disabled={isLoading}>Change Password</button>
            {error && <div className="error">{error}</div>}

        </form >
    )
}
