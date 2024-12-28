import { createContext, useState } from "react";

const FeedbackContext = createContext()

export const FeedbackContextProvider = ({children}) => {

    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: "This item is from context item 1",
            rating: 10
        },
        {
            id: 2,
            text: "This item is from context item 2",
            rating: 8
        },
        {
            id: 3,
            text: "This item is from context item 3",
            rating: 7
        }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    const addFeedback = (feedbackObj) => {
        let feedbackArr = [feedbackObj, ...feedback]
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
                deleteFeedback,
                addFeedback,
                editFeedback,
                feedbackEdit,
                updateFeedbackItem
            }}
        >
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext