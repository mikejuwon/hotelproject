import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Badge from "react-bootstrap/Badge";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import "bootstrap/dist/css/bootstrap.min.css";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="row mt-3 ml-3 profileTab">
      <div col-md-9>
        <Tabs defaultActiveKey="profile" className="Tabs mb-3" variant="pills">
          <Tab eventKey="profile" title="Profile">
            <h1>My Profile</h1>
            <hr />
            <h1>Name: {user.name}</h1>
            <h1>Email: {user.email}</h1>
            <h1>Admin: {user.isAdmin ? "Yes" : "No"}</h1>
          </Tab>
          <Tab eventKey="bookings" title="Bookings">
            {<MyBookings />}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Profilescreen;

export function MyBookings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    setLoading(true);
    axios
      .post("http://localhost:5000/api/bookings/getbookingsbyuserid", {
        userid: user._id,
      })
      .then((res) => {
        const data = res.data;
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }, []);

  function cancelBooking(bookingID, roomID) {
    setLoading(true);
    axios
      .post("http://localhost:5000/api/bookings/cancelbooking", {
        bookingID,
        roomID,
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        setLoading(false);

        alertify
          .alert("Success", "You have successfully cancelled the booking!")
          .set({
            transition: "slide",
            movable: true,
            onok: function(closeEvent) {
              alertify.success("Ok");
              window.location.reload();
            },
          });

        // Swal.fire(
        //   'Success!',
        //   'You have cancelled the booking!',
        //   'success'
        // ).then(result => {
        //   window.location.reload();
        // });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err);
        Swal.fire({
          title: "Error!",
          text: "Oops! Something went wrong cancelling the booking!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-9">
          {loading && <Loading />}
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="bxs2">
                  <h1>Booking for: {booking.roomName}</h1>
                  <p>Booking ID: {booking._id}</p>
                  <p>
                    <b>Check-in:</b> {booking.from}
                  </p>
                  <p>
                    <b>Check-out:</b> {booking.to}
                  </p>
                  <p>Total Days: {booking.totalDays}</p>
                  <p>
                    <b>Total Amount:</b> ₦{booking.totalAmount}
                  </p>
                  <p>
                    Booking Status:{" "}
                    {booking.status === "Booked" ? (
                      <Badge pill bg="success">
                        Confirmed ✔
                      </Badge>
                    ) : (
                      <Badge pill bg="danger" >
                        Cancelled ❌
                      </Badge>
                    )}
                    {booking.status !== "Cancelled" && (
                      <span>
                        <button
                          className="btn-danger btn-md float-right"
                          onClick={() => {
                            cancelBooking(booking._id, booking.roomID);
                          }}
                        >
                          Cancel Booking
                        </button>
                      </span>
                    )}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
