import { Link } from "react-router-dom"
import Card from "../components/shared/Card"


function AboutPage() {
  return (
    <Card>
        <div className="about">
            <h1>About this project</h1>
            <p>This is a React app with routers</p>
        </div>
        <p>
            <Link exact to={"/"}>Back to home</Link>
        </p>
    </Card>
  )
}

export default AboutPage
