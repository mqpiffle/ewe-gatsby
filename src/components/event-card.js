import React from 'react'
import Moment from "react-moment"

import "../styles/event-card.css"

const EventCard = (props) => {
  const {
    description1,
    description2,
    datestarttime,
    endtime,
    venuename,
    venueaddress,
    venuewebsite
   } = props


  return (
    <div className='ecard-wrapper'>
      <h4><Moment local format="MMMM Do, YYYY h:mmA">{datestarttime}</Moment> - <Moment local format="h:mmA">{endtime}</Moment></h4>
      <h3>{venuename}</h3>
      <h5>{description1}</h5>
      <p>{description2}</p>
      <h6>{venueaddress}</h6>
      <h6>{venuewebsite}</h6>
    </div>
  )
}

export default EventCard