import { useState } from 'react'
import { useBooksContext } from '../hooks/useBooks'
import { useAuthContext } from '../hooks/useAuthContext'


export default function BookForm() {
    const { dispatch } = useBooksContext()
    const { user } = useAuthContext()


    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState(null)

    console.log(title, author, description)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }
        const book = { title, author, description }

        const response = await fetch("/api/books", {
            method: "POST",
            body: JSON.stringify(book),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setTitle("")
            setAuthor("")
            setDescription("")
            setError(null)
            dispatch({ type: "CREATE_BOOK", payload: json })
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h2>Add a new Book</h2>

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

            <label>Description:</label>

            <textarea
                placeholder="Comments"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />

            <button >Add a new book</button>
            {error && <div className='error'>{error}</div>}

        </form>
    )
}
