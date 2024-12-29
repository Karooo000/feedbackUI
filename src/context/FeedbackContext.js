import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext()

export const FeedbackContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    useEffect(() => {
        fetchFeedback()
    }, [])

    const fetchFeedback = async () => {
        const response = await fetch("/feedback?_sort=id&_order=desc")
        const data = await response.json()
        setFeedback(data)
        setIsLoading(false)
    }

    const addFeedback = async (feedbackObj) => {
        const response = await fetch("/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(feedbackObj)
        })

        const data = await response.json() 

        let feedbackArr = [data, ...feedback]
        setFeedback(feedbackArr)
    }

    const deleteFeedback = (id) => {
        let newArr = feedback.filter((item) => id !== item.id)
        setFeedback(newArr)
    }

    const editFeedback = (item) => {
        setFeedbackEdit({item, edit: true})
    }

    const updateFeedbackItem = (id, updatedItem) => {
        setFeedback(
            feedback.map((item) => item.id === id ? {...item, ...updatedItem} : item)
        )
    }

    return(
        <FeedbackContext.Provider 
            value={{
                feedback,
                feedbackEdit,
                isLoading,
                deleteFeedback,
                addFeedback,
                editFeedback,
                updateFeedbackItem
            }}
        >
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext