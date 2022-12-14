import { useState } from 'react'
import { useRecomendationsContext } from '../hooks/useRecomendations'
// import { useAuthContext } from '../hooks/useAuthContext'

export default function RecomendationForm() {
    const { dispatch } = useRecomendationsContext()
    // const { user } = useAuthContext()

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [recomendation, setRecomendation] = useState("")
    const [user, setUser] = useState("")
    const [error, setError] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const recomend = { title, author, recomendation, user }

        const response = await fetch("/api/recomendations", {
            method: "POST",
            body: JSON.stringify(recomend),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setTitle("")
            setAuthor("")
            setRecomendation("")
            setUser("")
            setError(null)
            dispatch({ type: "CREATE_RECOMENDATION", payload: json })
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <h2 className='AddRecomendation'> Add Recomendation</h2>

            <label>Title:</label>

            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Author:</label>

            <input
                type="text"
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
            />

            <label>Why I Recomend:</label>

            <textarea
                type="text"
                onChange={(e) => setRecomendation(e.target.value)}
                value={recomendation}
            />

            <label>User:</label>

            <input
                type="text"
                onChange={(e) => setUser(e.target.value)}
                value={user}
            />

            <button>Add Recomendation</button>
            {error && <div className='error'>{error}</div>}

        </form>
    )
}
