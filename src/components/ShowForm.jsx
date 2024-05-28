import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Loading from "./Loading";
import Error from "./Error";

const ShowForm = () => {
  const [showDate, setShowDate] = useState("");
  const [showTime, setShowTime] = useState([""]);
  const [idFilm, setIdFilm] = useState("");
  const [idCinemaRoom, setIdCinemaRoom] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCreated, setIsCreated] = useState(false);

  // Function to make a POST request to create a new show
  const postFilm = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/show", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          showDate,
          showTime,
          idFilm,
          idCinemaRoom,
        }),
      });
      if (response.ok) {
        // eslint-disable-next-line no-unused-vars
        const data = await response.json();
        setIsCreated(true);
        setIsLoading(false);
      } else {
        throw new Error(`${response.status} - Errore nella fetch`);
      }
    } catch (error) {
      setError("Error in fetch");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    postFilm();
  };

  // If the data is still loading, show the loading component
  if (isLoading) {
    return <Loading />;
  }

  // If there is an error, show the error component
  if (error) {
    return <Error message={error} />;
  }

  return (
    <>
      <Form onSubmit={handleSubmit} className="text-white">
        <Form.Group controlId="showDate">
          <Form.Label>Show data</Form.Label>
          <Form.Control
            type="date"
            value={showDate}
            onChange={(e) => setShowDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="showTime" className="mt-3 ">
          <Form.Label>Show times (separated by commas)</Form.Label>
          <Form.Control
            type="text"
            value={showTime}
            onChange={(e) => setShowTime(e.target.value.split(","))}
          />
        </Form.Group>
        <Form.Group controlId="idFilm" className="mt-3 ">
          <Form.Label>Film id</Form.Label>
          <Form.Control
            type="number"
            value={idFilm}
            onChange={(e) => setIdFilm(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="idCinemaRoom" className="mt-3 ">
          <Form.Label>Cinema room id</Form.Label>
          <Form.Control
            type="number"
            value={idCinemaRoom}
            onChange={(e) => setIdCinemaRoom(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="mt-3 mb-3 search-button"
        >
          Submit
        </Button>
      </Form>
      <Modal show={isCreated} onHide={() => setIsCreated(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Show created</Modal.Title>
        </Modal.Header>
        <Modal.Body>Show created successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsCreated(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ShowForm;
