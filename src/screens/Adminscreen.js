import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
// import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.css";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";

function Adminscreen() {
  if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
    window.location.href = "/home";
  }

  return (
    <div className="mt-3 ml-3 mr-3 bxs2">
      <h1 className="text-center adminHead">
        <strong>Admin Panel</strong>
      </h1>

      <div className="mt-3 profileTab">
        <Tabs defaultActiveKey="bookings" className="Tabs mb-3" variant="pills">
          <Tab eventKey="bookings" title="Bookings">
            <Bookings />
          </Tab>
          <Tab eventKey="allRooms" title="All Rooms">
            <Rooms />
          </Tab>
          <Tab eventKey="addRooms" title="Add Rooms">
            <AddRooms />
          </Tab>
          <Tab eventKey="users" title="Users">
            <Users />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Adminscreen;

//I will create the component here for the booking tab

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async () => {
    axios
      .get("http://localhost:5000/api/bookings/getallbookings")
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err);
      });
  }, []);

  function deleteBooking(bookingID) {
    setLoading(true);
    axios
      .post("http://localhost:5000/api/bookings/deletebooking", bookingID)
      .then((res) => {
        setLoading(false);
        alertify.success("Booking deleted successfully!");
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        alertify.error("Error deleting booking!");
      });
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>All Bookings</h1>
        {loading && <Loading />}

        <table className="table table-bordered table-primary bxs2">
          <thead className="thead-dark">
            <tr>
              <th>Booking ID</th>
              <th>User ID</th>
              <th>Room</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Status</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {bookings &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.roomName}</td>
                    <td>{booking.from}</td>
                    <td>{booking.to}</td>
                    <td>{booking.status}</td>
                    <td>
                      <button
                        className="btn-danger btn-sm"
                        onClick={() => {
                          deleteBooking(booking._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//Component for the rooms list

export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async () => {
    axios
      .get("http://localhost:5000/api/rooms/getallrooms")
      .then((res) => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err);
      });
  }, []);

  return (
    <div className="row container-fluid">
      <div className="col-md-12">
        <h1>All Rooms</h1>
        {loading && <Loading />}

        <table className="table table-bordered table-success bxs2">
          <thead className="thead-dark">
            <tr>
              <th style={{width: '30%'}}>Room</th>
              <th>Room Name</th>
              <th>Rent Per Day</th>
              <th>Type</th>
              <th>Facilities</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {rooms &&
              rooms.map((room) => {
                return (
                  <tr>
                    <td>
                      <img
                        src={room.imageurls[1]}
                        className="img-responsive imgSmall"
                      />
                    </td>
                    <td>{room.name}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.type}</td>
                    <td>{room.facilities}</td>
                    <td>{room.phonenumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//component for the users list

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async () => {
    axios
      .get("http://localhost:5000/api/users/getallusers")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err);
      });
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>All Registered Users</h1>
        {loading && <Loading />}

        <table className="table table-bordered table-warning bxs2">
          <thead className="thead-dark">
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "Yes" : "No"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//and this is the component for adding rooms

export function AddRooms() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [roomName, setRoomName] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [type, setType] = useState("");
  const [facilities, setFacilities] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [maxCount, setMaxCount] = useState("");
  const [description, setDescription] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");

  function addRoom() {
    const newRoom = {
      roomName,
      rentPerDay,
      type,
      facilities,
      phoneNumber,
      maxCount,
      description,
      imageurls: [image1, image2, image3],
    };

    setLoading(true);
    axios
      .post("http://localhost:5000/api/rooms/addroom", newRoom)
      .then((res) => {
        setLoading(false);
        console.log(res);
        alertify
          .alert("Success", "You have successfully added the Room!")
          .set({
            transition: "slide",
            movable: true,
            onok: function(closeEvent) {
              alertify.success("Ok");
              window.location.reload();
            },
          });
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
        alertify.error("Error adding the Room!");
      });

    setRoomName("");
    setRentPerDay("");
    setType("");
    setFacilities("");
    setPhoneNumber("");
    setMaxCount("");
    setDescription("");
    setImage1("");
    setImage2("");
    setImage3("");
  }

  return (
    <div className="row">
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Rent Per Day"
          value={rentPerDay}
          onChange={(e) => setRentPerDay(e.target.value)}
        />
        <br />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="" active="true" selected>
            Select
          </option>
          <option value="deluxe">Deluxe</option>
          <option value="non-deluxe">Non-Deluxe</option>
        </select>
        <br />
        <textarea
          type="text"
          className="form-control"
          placeholder="Available Facilities"
          value={facilities}
          onChange={(e) => setFacilities(e.target.value)}
        />
        <br />
        <input
          type="number"
          className="form-control"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div className="col-md-5">
        <input
          type="number"
          className="form-control"
          placeholder="Max Count"
          value={maxCount}
          onChange={(e) => setMaxCount(e.target.value)}
        />
        <br />
        <textarea
          type="text"
          className="form-control"
          placeholder="Description of the Room"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Image Url 1"
          value={image1}
          onChange={(e) => setImage1(e.target.value)}
        />
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Image Url 2"
          value={image2}
          onChange={(e) => setImage2(e.target.value)}
        />
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Image Url 3"
          value={image3}
          onChange={(e) => setImage3(e.target.value)}
        />
        <br />
        <button
          className="btn-md btn-primary float-end"
          type="submit"
          onClick={addRoom}
        >
          Add Room
        </button>
      </div>
    </div>
  );
}
