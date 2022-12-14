import { useState } from "react";
import { useParams } from "react-router-dom";
// import { useAuthContext } from "./useAuthContext"

export const useForgotPassword = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    // const { dispatch } = useAuthContext()

    const { id, token } = useParams()

    const forgotPass = async () => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`/api/reset/forgotpassword/${id}/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            // // save the user to local storage
            // localStorage.setItem("user", JSON.stringify(json))

            // // update the auth context
            // dispatch({ type: "LOGIN", payload: json })

            // update loading state
            setIsLoading(false)
        }
    }

    return { forgotPass, error, isLoading }
}