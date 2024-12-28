import { useState, useContext, useEffect } from "react"
import FeedbackContext from "../context/FeedbackContext"

function RatingSelect({select}) {
    const [selected, setSelected] = useState(10)
    const {feedbackEdit} = useContext(FeedbackContext)

    useEffect(() => {
      setSelected(feedbackEdit.item.rating)
    }, [feedbackEdit])

    function handleChange(e){
       setSelected(+e.currentTarget.value)
       select(+e.currentTarget.value)
    }

    let emptyArr = Array.from({length: 10})
    

  return (
    <ul className='rating'>
        {emptyArr.map((item, idx) => {
            return(

                <li key={`rating-${idx + 1}`}>
                <input
                type='radio'
                id={`${idx + 1}`}
                name='rating'
                value={`${idx + 1}`}
                onChange={handleChange}
                checked={selected === idx + 1}
                />
                <label htmlFor={`${idx + 1}`}>{`${idx + 1}`}</label>
            </li>
            )
        })
        }
    
  </ul>
  )
}

export default RatingSelect
