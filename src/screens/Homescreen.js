import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loading from "../components/Loading";
import Error from "../components/Error";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
// import DatetimeRangePicker from "react-bootstrap-datetimerangepicker";
import moment from "moment";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Homescreen() {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [show, setShow] = useState(false);
  const [roomsDuplicate, setRoomsDuplicate] = useState([]);

  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("all");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/rooms/getallrooms")
      .then((res) => {
        const result = res.data;
        setRooms(result);
        setRoomsDuplicate(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleApply = (event, picker) => {
    setShow(true);

    const tempRooms = [];
    var availability = false;

    const fromDate = moment(picker.startDate._d).format("DD-MMM-YYYY");
    const toDate = moment(picker.endDate._d).format("DD-MMM-YYYY");

    for (const room of roomsDuplicate) {
      availability = false;
      for (const booking of room.currentbookings) {
        if (
          (moment(booking.from).isBetween(
            moment(fromDate),
            moment(toDate),
            null,
            "[]"
          ) &&
            moment(booking.to).isBetween(
              moment(fromDate),
              moment(toDate),
              null,
              "[]"
            )) ||
          (moment(fromDate).isBetween(
            moment(booking.from),
            moment(booking.to),
            null,
            "[]"
          ) &&
            moment(toDate).isBetween(
              moment(booking.from),
              moment(booking.to),
              null,
              "[]"
            ))
        ) {
          availability = true;
          break;
        }
      }
      if (!availability) {
        tempRooms.push(room);
      }
      setRooms(tempRooms);
    }
  };

  const handleEvent = (event, picker) => {
    // console.log("start: ", picker.startDate);
    // console.log("end: ", picker.endDate);
    setFromDate(moment(picker.startDate._d).format("DD-MMM-YYYY"));
    setToDate(moment(picker.endDate._d).format("DD-MMM-YYYY"));
    // setFromDate(picker.startDate._d.toISOString());
    // setToDate(picker.endDate._d.toISOString());
  };

  function filterBySearch() {
    const tempRooms = roomsDuplicate.filter((room) =>
      room.name.toLowerCase().includes(searchKey.toLowerCase())
    );

    setRooms(tempRooms);
  }

  function filterByType(e) {
    setType(e);
    if (e !== "all") {
      const tempRooms = roomsDuplicate.filter(
        (room) => room.type.toLowerCase() === e.toLowerCase()
      );

      setRooms(tempRooms);
    } else {
      setRooms(roomsDuplicate);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-between mt-3 bxs2 filterBar">
        <div className="row justify-content-center mb-3">
          <div className="col-md-6">
            <DateRangePicker
              startDate={fromDate}
              endDate={toDate}
              onEvent={handleEvent}
              onApply={handleApply}
            >
              <button className="dateBtn">
                <DateRangeIcon sx={{ mr: 2 }} />
                {moment(fromDate).format("DD-MMM-YYYY")}{" "}
                <CompareArrowsIcon sx={{ ml: 1, mr: 1 }} />{" "}
                {moment(toDate).format("DD-MMM-YYYY")}
                <ArrowDropDownIcon sx={{ ml: 2 }} />
              </button>
            </DateRangePicker>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <input
              className="form-control"
              type="text"
              placeholder="Search Rooms"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              onKeyUp={filterBySearch}
            />
          </div>

          <div className="col-md-6">
            <select
              value={type}
              onChange={(e) => setType(filterByType(e.target.value))}
            >
              <option value="all">All</option>
              <option value="deluxe">Deluxe</option>
              <option value="non-deluxe">Non-Deluxe</option>
            </select>
          </div>
        </div>

       
          
        
      </div>

      {/* <div className="row justify-content-center mt-3 bxs3">
      <h1>Hotel Rooms Available</h1>
    </div> */}

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loading />
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-12 mt-3">
                <Room
                  room={room}
                  fromDate={fromDate}
                  toDate={toDate}
                  change={show}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
