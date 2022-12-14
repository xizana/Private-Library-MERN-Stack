import { useState } from "react";
// import { useAuthContext } from "./useAuthContext"

export const useResetPassword = () => {
    const [error, setError] = useState(null)
    const [linkSent, setLinkSent] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    // const { dispatch } = useAuthContext()

    const reset = async (email) => {
        setIsLoading(true)
        setError(null)
        // setLinkSent(null)

        const response = await fetch("/api/reset/sendpasswordlink", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        })

        const json = await response.json()

        console.log(json)

        if (!response.ok) {
            setIsLoading(false)
            setLinkSent(false)
            setError(json.error)
        }

        if (response.ok) {
            // // save the user to local storage
            // localStorage.setItem("user", JSON.stringify(json))

            // // update the auth context
            // dispatch({ type: "LOGIN", payload: json })

            // update loading state
            setIsLoading(false)
            setLinkSent(true)

        }
    }
    return { reset, error, isLoading, linkSent }
}