import { createContext, useReducer } from "react";

export const recomendationsContext = createContext()

export const recomendaitonsReducer = (state, action) => {
    switch (action.type) {
        case "SET_RECOMENDATIONS":
            return {
                recomendations: action.payload
            }
        case "CREATE_RECOMENDATION":
            return {
                recomendations: [action.payload, ...state.recomendations]
            }
        default:
            return state

    }
}

export const RecomendationsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(recomendaitonsReducer, {
        recomendations: null
    })

    return (
        <recomendationsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </recomendationsContext.Provider>

    )
}