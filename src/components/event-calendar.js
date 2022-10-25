import React, { useState, useEffect, useRef }from "react"
import { useStaticQuery, graphql } from "gatsby"
import moment from "moment"
import Icon from "@mdi/react"
import {mdiChevronDoubleLeft, mdiChevronDoubleRight, mdiCircle, mdiCalendarMonth } from "@mdi/js"

import "../styles/event-calendar.css"
import EventCard from "./event-card"

/* TODO: fill in days @ end of prev month and/or start of next month, maybe? */
/* when the cal container size > 600px? show events with some detail on the day */
/* TODO: Challenge: show events in the next row of the grid without upsetting the flow of the calendar */

const EventCalendar = () => {
  const data = useStaticQuery (graphql`
    query {
      allStrapiEvent(sort: {fields: start_date_time, order: ASC}) {
        edges {
          node {
            description
            description_2
            start_date_time
            end_date_time
            location_name
            location_address
            location_website
          }
        }
      }
    }
  `)
    
  const events = data.allStrapiEvent.edges
  const utcArray = events.map(({node}) => node.start_date_time)

  console.log(utcArray)
  
  const localDateArray = events.map(({node}) => node.start_date_time.split(0, -1))

  console.log(localDateArray)
  
  const date = new Date()
  const thisYear = date.getUTCFullYear()
  const thisMonth = date.getUTCMonth()
  const thisDate = date.getUTCDate()            
  const today = new Date(`${thisYear}-${thisMonth+1}-${thisDate}`).toISOString()
  const daysHeader = ["S", "M", "T", "W", "Th", "F", "Sa"]
  const [displayMonth, setDisplayMonth] = useState(thisMonth)
  const [displayYear, setDisplayYear] = useState(thisYear)
  const [activeDate, setActiveDate] = useState(today)
  const [dateClick, setDateClick] = useState(true)

  const monthStr = new Date(`${displayYear}`, `${displayMonth}`).toLocaleString('default', {month: 'long'})
  const daysInMonth = moment(`${displayYear}-${displayMonth+1}`, 'YYYY-MM').daysInMonth()
  const firstDayOfMonth = new Date(displayYear, displayMonth, 1).getDay()

  const todaysEvents = localDateArray.filter(({node}) => {
    if (node.split("T", 1).toString() === activeDate.split("T", 1).toString()) {
      return {node}
    }
  })
  
  const scrollRef = useRef(null)

  useEffect(() => {
    todaysEvents.length > 0 && scrollRef.current.scrollIntoView()
  }, [dateClick, todaysEvents.length])

  let days = []
  for (let d=1; d <= daysInMonth; d++) {
    days.push(d)
  }

  const handleCarouselClick = (forward) => {
    if (forward === true) {
      if (displayMonth < 11) {
      setDisplayMonth((dm) => dm + 1)
      } else {
        setDisplayMonth(0)
        setDisplayYear((dy) => dy + 1)
      }
    } else {
      if (displayMonth > 0) {
        setDisplayMonth((dm) => dm - 1)
      } else {
        setDisplayMonth(11)
        setDisplayYear((dy) => dy - 1)
      }
    }
  }

  const handleDateClick = (date) => {
    setActiveDate(date)
    setDateClick((dc) => !dc)
  }
  
  return (
    <div className="ec-wrapper">
      <div className="ec-title flex"> 
        <h2>Event Calendar Project</h2>
        <Icon
          className="ec-title-icon flex"
          path={mdiCalendarMonth}
          size={1.25}
        />
      </div> 
      <div className="ec-description">
        <p>This Event Calendar component is my current web development project.  As such it is a work in progess.  The goal is to create a scratch-made &#127790; interactive display calendar.</p>
        <p>It is built with a stack of <a href="https://www.gatsbyjs.com/" target="_blank" rel="noreferrer">Gatsbyjs</a>, <a href="https://strapi.io/" target="_blank" rel="noreferrer">strapi CMS</a>, and is deployed to <a href="https://render.com/" target="_blank" rel="noreferrer">Render</a> (automatically updated when changes are pushed to GitHub), and is styled mostly with 'vanilla' CSS while using conditional styles in the react code base.  The only external libraries used in this project are <a href="https://momentjs.com/" target="_blank" rel="noreferrer">moment.js</a> and <a href="https://www.npmjs.com/package/react-moment" target="_blank" rel="noreferrer">react-moment</a> for their convenience when dealing with dates and times, and <a href="https://materialdesignicons.com/" target="_blank" rel="noreferrer">Material Design Icons</a> for easy-to-use iconography.</p>
      </div>
      <div className="ec-calendar-wrapper">
        <div className="ec-month-carousel flex">
          <div className="ec-carousel-icon flex">
            <Icon
              path={mdiChevronDoubleLeft}
              size={1.25}
              onClick={() => handleCarouselClick(false)}
            />
          </div>
          <div className="ec-month-year flex flexd-column">
            <h2 >{monthStr}</h2>
            <h3>{displayYear}</h3>
          </div>
          <div className="ec-carousel-icon flex">
            <Icon
              path={mdiChevronDoubleRight}
              size={1.25}
              onClick={() => handleCarouselClick(true)}
            />
          </div>
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
            const calendarDate = new Date(`${displayYear}-${displayMonth+1}-${date}`).toISOString()
            const dateClicked = () => calendarDate === activeDate
            const colorForeground = () => {
              if (calendarDate === today) {
                return 'var(--clr-highlight'
              } else if (dateClicked()) {
                return 'var(--clr-bg-xlight)'
              } else {
                return 'var(--clr-text)'
              }
            }
            const colorBackground = () => {
              if (dateClicked()) {
                return 'var(--clr-bg-mlight)'
              } else {
                return 'var(--clr-bg-mdark)'
              }
            }
          return (
            <li
              key={date} 
              className="ec-date-wrapper" 
              style={{gridColumnStart: date === 1 && `${firstDayOfMonth+1}`}}
              onClick={() => handleDateClick(calendarDate)}
            >
              <div 
                className="ec-date-card flexd-column" 
                style={{borderColor: colorForeground(), backgroundColor: colorBackground()}}
              >
                <p 
                  className="ec-date-number"
                  style={{color: colorForeground()}}
                >
                  {date}
                </p>
                <div className="ec-event-pips-grid">
                {localDateArray.map((event, i) => {
                  if (event === calendarDate.split("T", 1).toString()) {
                    return (
                      <div key={i} className="ec-event-pips-icon-container flex">
                        <Icon
                          className="ec-event-pips-icon"
                          path={mdiCircle}
                          size={.5}
                          color={dateClicked() ? "var(--clr-visited)" : "var(--clr-highlight)"}
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