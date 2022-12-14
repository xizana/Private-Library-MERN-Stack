// import { useRecomendationsContext } from "../hooks/useRecomendations"
import { useAuthContext } from "../hooks/useAuthContext"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function RecomendationDetails({ recomendation }) {

    // const { dispatch } = useRecomendationsContext()
    const { user } = useAuthContext()

    return (
        <div className="book-details">
            {!user && (
                <div className="overflowHiden">
                    <p>Title: <strong>{recomendation.title}</strong></p>
                    <p>Author: <strong>{recomendation.author}</strong></p>
                    <p>Why I Recomend: <strong>{recomendation.recomendation}</strong></p>
                    <p>User: <strong>{recomendation.user}</strong></p>
                    <p>{formatDistanceToNow(new Date(recomendation.createdAt), { addSuffix: true })}</p>

                </div>
            )}


        </div>
    )
}
