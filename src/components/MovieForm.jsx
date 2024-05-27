import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Loading from "./Loading";
import Error from "./Error";

const MovieForm = () => {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [exitDate, setExitDate] = useState("");
  const [trailer, setTrailer] = useState("");
  const [cover, setCover] = useState("");
  const [filmState, setFilmState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCreated, setIsCreated] = useState(false);

  const postFilm = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/film", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          director,
          type,
          duration,
          rating,
          description,
          exitDate,
          trailer,
          cover,
          filmState,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    postFilm();
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <>
      <Form onSubmit={handleSubmit} className="text-white">
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDirector" className="mt-3 ">
          <Form.Label>Director</Form.Label>
          <Form.Control
            type="text"
            name="director"
            onChange={(e) => setDirector(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formType" className="mt-3 ">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            onChange={(e) => setType(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDuration" className="mt-3 ">
          <Form.Label>Duration</Form.Label>
          <Form.Control
            type="text"
            name="duration"
            onChange={(e) => setDuration(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formRating" className="mt-3 ">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="number"
            name="rating"
            onChange={(e) => setRating(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDescription" className="mt-3 ">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formExitDate" className="mt-3 ">
          <Form.Label>Exit Date</Form.Label>
          <Form.Control
            type="date"
            name="exitDate"
            onChange={(e) => setExitDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formTrailer" className="mt-3 ">
          <Form.Label>Trailer</Form.Label>
          <Form.Control
            type="url"
            name="trailer"
            onChange={(e) => setTrailer(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formCover" className="mt-3 ">
          <Form.Label>Cover</Form.Label>
          <Form.Control
            type="url"
            name="cover"
            onChange={(e) => setCover(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formFilmState" className="mt-3 ">
          <Form.Label>Film State</Form.Label>
          <Form.Control
            type="text"
            name="filmState"
            onChange={(e) => setFilmState(e.target.value)}
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
          <Modal.Title>Film created</Modal.Title>
        </Modal.Header>
        <Modal.Body>Film created successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsCreated(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieForm;
