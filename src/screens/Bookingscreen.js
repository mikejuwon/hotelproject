import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
import moment from "moment";
import PaymentIcon from "@mui/icons-material/Payment";
import HotelIcon from "@mui/icons-material/Hotel";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";


function Bookingscreen() {
  const { fromDate } = useParams();
  const { toDate } = useParams();
  const { roomid } = useParams();

  const totalDays = moment(toDate).diff(moment(fromDate), "days") + 1;

  const [room, setRoom] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [totalAmount, setTotalAmount] = useState();

  useEffect(() => {

    if(!localStorage.getItem('currentUser')){
      window.location.href = "/login"
    }


    setLoading(true);
    axios
      .post("http://localhost:5000/api/rooms/getroombyid/", { roomid: roomid })
      .then((res) => {
        const result = res.data;
        setRoom(result);
        setTotalAmount(result.rentperday * totalDays);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        setError(true);
      });
  }, []);

  function onToken(token) {
    const userid = JSON.parse(localStorage.getItem("currentUser"))._id;
    const roomName = room.name;
    const roomID = roomid;

    const bookingDetails = {
      roomName,
      roomID,
      userid,
      fromDate,
      toDate,
      totalAmount,
      totalDays,
      token,
    };

    try {
      // const result = await
      setLoading(true);
      axios.post("http://localhost:5000/api/bookings/bookroom", bookingDetails);
      // .then((res) => {
      //   console.log(res);
      //   console.log(res.data);
      // })

      setLoading(false);

      alertify
          .alert("Success!", "You have successfully booked the room!")
          .set({
            transition: "slide",
            movable: true,
            'onok': function(closeEvent) {
            alertify.success("ajs.ok")
            window.location.href = "/profile";
          }});
        

      // Swal.fire({
      //   position: 'top-end',
      //   icon: 'success',
      //   title: 'The room has been booked successfully!',
      //   showConfirmButton: false,
      //   timer: 2000
      // })
      // .then(result => {
      //   window.location.href = "/profile";
      // })
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong booking the room!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  return (
    <div className="m-5">
      {loading ? (
        <Loading />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bxs2">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="img-responsive imgBig" />
            </div>

            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>
                  <HotelIcon sx={{ mr: 1 }} />
                  Booking Details:{" "}
                </h1>
                <hr />

                <b>
                  <p>
                    Name of Client:{" "}
                    {JSON.parse(localStorage.getItem("currentUser")).name}
                  </p>
                  <p>From: {fromDate}</p>
                  <p>To: {toDate}</p>
                  <p>Max Count: {room.maxcount}</p>
                </b>
              </div>

              <div style={{ textAlign: "right" }}>
                <h1>
                  <PaymentIcon sx={{ mr: 1 }} />
                  Payment Breakdown:{" "}
                </h1>
                <hr />

                <b>
                  <p>Total Days: {totalDays}</p>
                  <p>Rent Per Day: ₦{room.rentperday}</p>
                  <p>Total Amount: ₦{totalAmount}</p>
                </b>
              </div>

              <div style={{ float: "right" }}>
                <Link to="/home" className="btn btn-md mr-2">
                  {" "}
                  Back Home
                </Link>

                <StripeCheckout
                  amount={totalAmount * 100}
                  currency="NGN"
                  token={onToken}
                  stripeKey="pk_test_51Ko7zTJ6pNgzJnXZhqQaGVQuQA5IjsRjcbGImihtmxGSeOwf3xvGqBSGeCapPt3SfVnXCBVfHAgWU8SsRFyVANOK002IZVLIs0"
                >
                  <button className="btn btn-md">Pay Now</button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
