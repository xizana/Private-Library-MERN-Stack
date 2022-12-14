import { recomendationsContext } from "../context/recomendationContext";
import { useContext } from "react";

export const useRecomendationsContext = () => {
    const context = useContext(recomendationsContext)

    if (!context) {
        throw Error("useRecomendationsContext must be used inside an RecomendationsContextProvider")
    }

    return context
}