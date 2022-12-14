/* eslint-disable operator-linebreak */
import React, { useState } from "react";
import moment from "moment";
import Card from "./components/Card/Card";
import Dropdown from "./components/Dropdown/Dropdown";
import Button from "./components/Button/Button";
import TimeList from "./components/TimeList/TimeList";
import Message from "./components/Message/Message";
import Container from "./components/Container/Container";
import { Calendar } from "primereact/calendar";
import mentorsData from "./data/mentors";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./App.css";

function App() {
  const technologies = ["HTML", "CSS", "Javascript", "React"];
  const [mentors, setMentors] = useState(mentorsData);
  const [mentor, setMentor] = useState(mentorsData[0]);
  const [dates, setDates] = useState([new Date()]);
  const [date, setDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [time, setTime] = useState("");
  const [mentorOption, setMentorOption] = useState("");
  const [techOption, setTechOption] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(false);

  // Handle technologies dropdown select
  function handleTechnologiesChange(e) {
    let filteredMentors = mentorsData.filter((mentor) => {
      return mentor.languages.includes(e.target.value);
    });
    setMentors(filteredMentors);
    setDates([new Date()]);
    setTechOption(e.target.value);
  }

  // Handle mentors dropdown select
  function handleMentorsChange(e) {
    // Initialize date to today's date
    setDates([new Date()]);

    // Get availability data
    let mentor = mentors.filter((mentor) => mentor.id === e.target.value);
    let dates = Object.keys(mentor[0].availability);

    // convert dates and filter out dates before todays date
    dates = dates
      .map((date) => {
        let arr = date.split("/");
        return (date = new Date(arr[2], arr[0] - 1, arr[1]));
      })
      .filter((date) => {
        return date > new Date();
      });

    // Updating variables state
    setDates(dates);
    setMentor(mentor);
    setMentorOption(e.target.value);
  }

  // Handle Select date
  function handleSelectDate(e) {
    if (e.target.className === "p-highlight") {
      const day = e.target.innerText;
      const month =
        document.getElementsByClassName("p-datepicker-month")[0].innerText;
      const year =
        document.getElementsByClassName("p-datepicker-year")[0].innerText;
      const selectedDate = new Date(
        `${day} ${month} ${year}`
      ).toLocaleDateString("en-US");

      // Updating variables state
      setDate(selectedDate);
      setTimeSlots(mentor[0].availability[selectedDate]);
      setShow(true);
      setMessage(false);
    }
  }

  // Handle the time slot button click
  function handleTimeClick(e) {
    setTime(e.target.innerText);
    setShow(false);
    setMessage(true);
  }

  // Handle reset button click
  function handleResetBtnClick() {
    setDates([new Date()]);
    setMentors(mentorsData);
    setMessage(false);
    setTechOption("");
    setMentorOption("");
  }

  // Handle cancel button click
  function handleCancelBtnClick() {
    setShow(false);
    setMessage(false);
  }

  // Format date function
  function formatDate(date) {
    return moment(date, "MM/DD/YYYY").format("dddd, MMMM Do YYYY");
  }

  return (
    <>
      {!show ? (
        <Card>
          <Dropdown
            onChange={handleTechnologiesChange}
            name="technologies"
            id="technologies"
            option="technology"
            options={technologies}
            value={techOption}
          />
          <Dropdown
            onChange={handleMentorsChange}
            name="mentors"
            id="mentors"
            option="mentor"
            options={mentors}
            value={mentorOption}
          />
          <Calendar
            minDate={new Date()}
            readOnlyInput
            selectionMode="multiple"
            inline
            onClick={handleSelectDate}
            value={dates}
          />
          {message ? <Message day={date} time={time} /> : ""}
          <Container>
            <Button
              variant="primary"
              text="Confirm"
              handleClick={handleResetBtnClick}
            />
            <Button
              variant="secondary"
              text="Reset"
              handleClick={handleResetBtnClick}
            />
          </Container>
        </Card>
      ) : (
        ""
      )}
      {show ? (
        <Card>
          <TimeList
            date={formatDate(date)}
            timeSlots={timeSlots}
            handleClick={handleTimeClick}
          />
          <Button
            variant="secondary"
            text="Cancel"
            handleClick={handleCancelBtnClick}
          />
        </Card>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
