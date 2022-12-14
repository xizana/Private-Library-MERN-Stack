import { useBooksContext } from "../hooks/useBooks"
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function BookDetails({ book }) {

    const { dispatch } = useBooksContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch("/api/books/" + book._id, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }

        })

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_BOOK', payload: json })
        }
    }

    return (
        <div className="book-details">
            <p>Title: <strong>{book.title}</strong></p>
            <p>Author: <strong>{book.author}</strong></p>
            <p>Description: <strong>{book.description}</strong></p>
            <p>{formatDistanceToNow(new Date(book.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>

        </div>
    )
}
