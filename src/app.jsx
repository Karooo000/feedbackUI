import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Header from "./components/Header"
import FeedbackList from "./components/FeedbackList"

import FeedbackStats from "./components/FeedbackStats"
import FeedbackForm from "./components/FeedbackForm"
import AboutPage from "./pages/AboutPage"
import AboutIconLink from "./AboutIconLink"
import {FeedbackContextProvider} from "./context/FeedbackContext"




export default function App(){
   
    const router = createBrowserRouter([{
        path: "/",
        element: (
            <>
                <Header/>
                <div className="container">
                    
                        <FeedbackForm />
                        <FeedbackStats />
                        <FeedbackList />
                    
                </div>
                <AboutIconLink/>
                
            </>
        ),
        errorElement: <div>404 page not found</div>
    },
    {
        path: "/about",
        element: <AboutPage/>
    }
])

    return(
        <FeedbackContextProvider>
            <RouterProvider router={router}/>
        </FeedbackContextProvider>
    )
}