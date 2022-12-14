import { booksContext } from "../context/bookContext";
import { useContext } from "react";

export const useBooksContext = () => {
    const context = useContext(booksContext)

    if (!context) {
        throw Error("useBooksContext must be used inside an BooksContextProvider")
    }

    return context
}