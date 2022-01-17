import React, { useState } from 'react'
import { useStore, useSelector } from 'react-redux'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"

function CommonUser() {
  const store = useStore()
  const user = useSelector(() => store.getState().user.user)
  const [viewClock,setViewClock] = useState(false)

  const setday = (e:{dateStr:string}) => {
    setViewClock(!viewClock)
  }

  return (
    <div className="calendar-box">
        {viewClock && <FullCalendar
          plugins={[dayGridPlugin,interactionPlugin]}
          locale="ja"
          initialEvents={[{ title: 'initial event', start: new Date() }]}
          dateClick={setday}
        />}
    </div>
  )
}

export default CommonUser
