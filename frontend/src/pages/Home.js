import { useEffect } from 'react'
import { useBooksContext } from '../hooks/useBooks'
import { useAuthContext } from "../hooks/useAuthContext"

// components
import BookDetails from '../Components/BookDetails'
import BookForm from '../Components/BookForm'


export default function Home() {
    const { books, dispatch } = useBooksContext()
    const { user } = useAuthContext()


    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch("/api/books", {
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: "SET_BOOKS", payload: json })
            }
        }
        if (user) {
            fetchBooks()
        }

    }, [dispatch, user])
    return (

        <div className="home">

            <div className="books">
                {books && books.map((book) => (
                    <BookDetails key={book._id} book={book} />
                ))}
            </div>


            {user && <BookForm />}

        </div>
    )
}
