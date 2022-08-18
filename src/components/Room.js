import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
// import $ from "jquery";

function Room({ room, fromDate, toDate, change }) {
  const [show, setShow] = useState(false);


  // const [display, setDisplay] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bxs2">
      <div className="col-md-4">
        <img src={room.imageurls[0]} className="img-responsive imgSmall" />
      </div>
      <div className="col-md-6">
        <h1>{room.name}</h1>
        <b>
          <p>Facilities: {room.facilities}</p>
          <p>Max Count: {room.maxcount}</p>
          <p>Phone Number: {room.phonenumber}</p>
          <p>Type: {room.type}</p>
        </b>

        <div className="mb-2" style={{ float: "right" }}>

        {(change) && (<Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
              <button className="btn btn-sm mr-2">Book Now</button>
            </Link>)}    
            
          
           
          <button className="btn btn-sm" onClick={handleShow}>
            {" "}
            View Details{" "}
          </button>
        </div>
      </div>

      <>
        <Modal show={show} onHide={handleClose} size="none">
          <Modal.Header closeButton>
            <Modal.Title>{room.name}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>
              <Carousel autoPlay={true} prevLabel="" nextLabel="">
                {room.imageurls.map((url) => {
                  return (
                    <Carousel.Item>
                      <img src={url} className="img-responsive imgBig" />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>
            <div className="mt-3">
              <p>{room.description}</p>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default Room;
