import React from "react"
import Header from "../components/header"
import EventCalendar from "../components/event-calendar"

import "../styles/index.css"
import "../styles/event-calendar.css"

const IndexPage = () => {
  return (
    <div>
      <Header />
      <div className="main">
        <div className="welcome">
          <h2>Under Construction &#128296;</h2>
          <h3>Check back soon! &#128064; Updated regularly.</h3>
        </div>
        <EventCalendar />
      </div>
    </div>
  )
}
export default IndexPage
