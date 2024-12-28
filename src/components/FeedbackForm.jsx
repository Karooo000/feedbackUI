import { useState, useContext, useEffect } from "react"
import Card from "./shared/Card"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"
import { v4 as uuidv4 } from 'uuid';
import FeedbackContext from "../context/FeedbackContext";


function FeedbackForm() {
    const [text, setText] = useState("")
    const [rating, setRating] = useState(10)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState("")

    const {addFeedback, feedbackEdit, updateFeedbackItem} = useContext(FeedbackContext)

    function handleTextChange(e){
        if(text === ""){
            setBtnDisabled(true)
            setMessage(null)
        } else if (text !== "" && text.trim().length <= 10){
            setBtnDisabled(true)
            setMessage("Must be at least 10 charecters")
        } else {
            setBtnDisabled(false)
            setMessage(null)
        }


        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.trim().length > 10){
            const newFeedback = {text, rating, id: uuidv4()}
            if(feedbackEdit.edit === true){
                updateFeedbackItem(feedbackEdit.item.id, newFeedback)
            } else {
                addFeedback(newFeedback)
            }
            setText("")
           
            
        }
        
        
    }

    useEffect(() => {
        if(feedbackEdit.edit === true){
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])

  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate your service with us?</h2>
            <RatingSelect select={(rating) => setRating(rating)}/>
            <div className="input-group">

                <input onChange={handleTextChange} type="text"placeholder="Write a review" value={text}/>
                <Button type="submit" isDisabled={btnDisabled} >Send</Button>
            </div>
            {message && <div className="message" > {message}</div>}
        </form>
        
    </Card>
    
  )
}

export default FeedbackForm
