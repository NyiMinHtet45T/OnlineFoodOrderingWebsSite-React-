import React from 'react'
import EventsCard from './EventsCard'

export default function Events() {
  return (
    <div>
      <div className="mt-5 px-5 flex flex-wrap gap-5">
         {
            [1,1,1].map(item => <EventsCard/>)
         }
      </div>
    </div>
  )
}
