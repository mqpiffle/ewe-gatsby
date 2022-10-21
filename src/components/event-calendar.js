import React, { useState, useEffect, useRef }from "react"
import { useStaticQuery, graphql } from "gatsby"
import moment from "moment"
import Icon from "@mdi/react"
import {mdiChevronDoubleLeft, mdiChevronDoubleRight, mdiHexagon, mdiStar, mdiCalendarMonth } from "@mdi/js"

import "../styles/event-calendar.css"
import EventCard from "./event-card"

/* TODO: include localization */
/* TODO: fill in days @ end of prev month and/or start of next month */
/* TODO: statefully show events view under calendar in collapsable div */
/* TODO: Challenge: show events in the next row of the grid without upsetting the flow of the calendar */

const EventCalendar = () => {
  const data = useStaticQuery (graphql`
    query {
      allStrapiEvent(sort: {fields: start_date_time, order: ASC}) {
        edges {
          node {
            description
            description_2
            start_date_time(formatString: "YYYY-MM-D H:mm UT")
            end_date_time(formatString: "YYYY-MM-D H:mm UT")
            location_name
            location_address
            location_website
          }
        }
      }
    }
  `)
    
  const events = data.allStrapiEvent.edges
  const eventDateArray = events.map(({node}) => node.start_date_time.split(" ", 1).toString())
  
  const date = new Date()
  const thisYear = date.getUTCFullYear()
  const thisMonth = date.getUTCMonth()
  const thisDate = date.getUTCDate()            
  const today = `${thisYear}-${thisMonth+1}-${thisDate}`
  const daysHeader = ["S", "M", "T", "W", "Th", "F", "Sa"]
  console.log(thisDate)
  const [displayMonth, setDisplayMonth] = useState(thisMonth)
  const [displayYear, setDisplayYear] = useState(thisYear)
  const [activeDate, setActiveDate] = useState(today)
  const [dateClick, setDateClick] = useState(true)

  console.log(activeDate)

  const monthStr = new Date(`${displayYear}`, `${displayMonth}`).toLocaleString('default', {month: 'long'})
  const daysInMonth = moment(`${displayYear}-${displayMonth+1}`, 'YYYY-MM').daysInMonth()
  const firstDayOfMonth = new Date(displayYear, displayMonth, 1).getDay()

  const todaysEvents = events.filter(({node}) => {if (node.start_date_time.split(" ", 1).toString() === `${activeDate}`) {return node}})
  const scrollRef = useRef(null)
  
  useEffect(() => {
    todaysEvents.length > 0 && scrollRef.current.scrollIntoView()
  }, [dateClick])

  let days = []
  for (let d=1; d <= daysInMonth; d++) {
    days.push(d)
  }

  const handleCarouselClick = (forward) => {
    if (forward === true) {
      if (displayMonth < 11) {
      setDisplayMonth(displayMonth+1)
      } else {
        setDisplayMonth(0)
        setDisplayYear(displayYear+1)
      }
    } else {
      if (displayMonth > 0) {
        setDisplayMonth(displayMonth-1)
      } else {
        setDisplayMonth(11)
        setDisplayYear(displayYear-1)
      }
    }
  }

  const handleDateClick = (date) => {
    setActiveDate(date)
    setDateClick(!dateClick)
  }
  
  return (
    <div className="ec-wrapper">
      <div className="ec-title"> 
        <h2>Event Calendar Project</h2>
        <Icon
          className="ec-title-icon"
          path={mdiCalendarMonth}
          size={1.25}
        />
      </div> 
      <div className="ec-description">
        <p>This Event Calendar component is my current web development project.  As such it is a work in progess.  The goal is to create a scratch-made &#127790; interactive display calendar.</p>
        <p>It is built with a stack of <a href="https://www.gatsbyjs.com/" target="_blank " rel="noreferrer">Gatsbyjs</a>, <a href="https://strapi.io/" target="_blank " rel="noreferrer">strapi CMS</a>, and is deployed to <a href="https://render.com/" target="_blank " rel="noreferrer">Render</a> (automatically updated when changes are pushed to GitHub), and is styled with 'vanilla' CSS.  moment.js is the only external library used in this project for its convenience when dealing with dates and times.</p>
        <p>&#10024; Please note that cutting-edge CSS properties are used in this project. <a href="https://caniuse.com/?search=container" target="_blank " rel="noreferrer">As of Oct 2022 @container queries are not supported by Firefox, and many mobile browsers.</a></p>
      </div>
      <div className="ec-calendar-wrapper">
        <div className="ec-month-carousel">
          <Icon
            className="ec-icon"
            path={mdiChevronDoubleLeft}
            size={1.25}
            onClick={() => handleCarouselClick(false)}
          />
          <div className="ec-month-year">
            <h2 >{monthStr}</h2>
            <h3>{displayYear}</h3>
          </div>
          <Icon
            className="ec-icon"
            path={mdiChevronDoubleRight}
            size={1.25}
            onClick={() => handleCarouselClick(true)}
          />
        </div>
        <ul 
          className="ec-calendar-grid"
        >
          {daysHeader.map((day, index) => {
            return (
              <li 
              key={index} 
              className="ec-day-wrapper"
            >
              <div className="ec-day-card">
                <h3 className="ec-day-text">{day}</h3>
              </div>
            </li>
            )}
          )}
          {days.map(date => {
            const calendarDate = `${displayYear}-${displayMonth+1}-${date}`
            const dateClicked = () => {
              return calendarDate === activeDate
            }
            const colorForeground = () => {
              if (calendarDate === today) {
                return 'hsl(29 74% 56%)'
              } else if (dateClicked()) {
                return 'hsl(198 99% 72%)'
              } else {
                return 'hsl(60 66% 89%)'}
              }
            const colorBackground = () => {
              if (dateClicked()) {
                return 'hsl(198 99% 36%)'
              } else {
                return 'hsl(198 99% 18%)'}
            }
          return (
            <li
              key={date} 
              className="ec-date-wrapper" 
              style={{gridColumnStart: date === 1 && `${firstDayOfMonth+1}`}}
              onClick={() => handleDateClick(calendarDate)}
            >
              <div 
                className="ec-date-card" 
                style={{borderColor: colorForeground(), backgroundColor: colorBackground()}}
              >
                <p 
                  className="ec-date-number"
                  style={{color: colorForeground()}}
                >
                  {date}
                </p>
                <div className="ec-event-pips-grid">
                {eventDateArray.map((e, i) => {
                  if (e === calendarDate) {
                    return (
                      <div key={i} className="ec-event-pips-icon-container">
                        <Icon
                          className="ec-event-pips-icon"
                          path={mdiStar}
                          size={.66}
                          color={dateClicked() ? "darkgreen" : "limegreen"}
                        />
                      </div>
                    )}
                  }
                )}
                </div>
              </div>
            </li>
            )}
          )}
        </ul>
        <div ref={scrollRef}>
          {todaysEvents.map(({node}, index) => {
            return (
              <div>
                <EventCard
                  key={index}
                  description1={node.description}
                  description2={node.description_2}
                  datestarttime={node.start_date_time}
                  endtime={node.end_date_time}
                  venuename={node.location_name}
                  venueaddress={node.location_address}
                  venuewebsite={node.location_website}
                />
              </div>
            )}
          )}
        </div>
      </div>
    </div>
  )
}

export default EventCalendar