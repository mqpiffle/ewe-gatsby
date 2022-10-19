import React from 'react'

const EventCard = (props) => {
  console.log(props.description)
  return (
    <h1>{props.description}</h1>
  )
}

export default EventCard