import { useEffect } from 'react'
import { useRecomendationsContext } from '../hooks/useRecomendations'
import { useAuthContext } from "../hooks/useAuthContext"

// components
import RecomendationDetails from '../Components/RecomendationDetails'
import RecomendationForm from '../Components/RecomendationForm'


export default function Home() {
    const { recomendations, dispatch } = useRecomendationsContext()
    const { user } = useAuthContext()


    useEffect(() => {
        const fetchRecomendations = async () => {
            const response = await fetch("/api/recomendations")
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: "SET_RECOMENDATIONS", payload: json })
            }
        }

        if (!user) {
            fetchRecomendations()
        }

    }, [dispatch, user])
    return (

        <div className="home">

            <div className="books">
                {recomendations && recomendations.map((fetchRecomendation) => (
                    <RecomendationDetails key={fetchRecomendation._id} recomendation={fetchRecomendation} />
                ))}
            </div>


            <RecomendationForm />

        </div>
    )
}
