import React, {useEffect, useState, useContext} from 'react'
import {DateSingleInput} from '@datepicker-react/styled'
import { ThemeProvider } from "styled-components";

import AuthContext from "../contexts/auth";


const Diary = () => {
  const { showDiary, setShowDiary } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [showDatepicker, setShowDatepicker] = useState(true);

  const handleDataChange = (event) => {
        setDate(event.date);

        setShowDiary(true);
   }

  const handleFocusChange = () => {

  }

  useEffect(() => {
      setDate(new Date);
  }, []);

  return (
    <ThemeProvider
        theme={{
        width: "100%",
        height: "100%",
        breakpoints: ["32em", "48em", "64em"],
        reactDatepicker: {
            daySize: [36, 40],
            fontFamily: "system-ui, -apple-system",
            colors: {
            accessibility: "#83d67c",
            selectedDay: "#db5a35",
            selectedDayHover: "#32494D",
            primaryColor: "#50b848"
            }
        }
        }}
    >
        <DateSingleInput
        onDateChange={handleDataChange}
        onFocusChange={handleFocusChange}
        date={date} 
        showDatepicker={showDatepicker}
        showClose={false}
        showResetDate={false}
        displayFormat={"dd/MM/yyyy"}
        />
    </ThemeProvider>
  )
}

export default Diary;