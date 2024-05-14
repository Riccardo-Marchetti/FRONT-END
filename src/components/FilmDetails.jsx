import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import MyNavBar from "./MyNavBar";
import { useParams } from "react-router-dom";

const FilmDetails = () => {
  const [film, setFilm] = useState([]);
  const [comments, setComments] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const params = useParams();

  const postComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/comment/me/${params.filmId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ rating, description }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.location.reload();
      } else {
        throw new Error(`${response.status} - Error in fetch`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/film/${params.filmId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setFilm(data);
        } else {
          throw new Error(`${response.status} - Error in fetch`);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchComment = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/comment/comments/${params.filmId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data.content);
          setComments(data.content);
        } else {
          throw new Error(`${response.status} - Error in fetch`);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFilm();
    fetchComment();
  }, [params.filmId]);
  const handleStarClick = (value, half) => {
    setRating(value + half);
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    postComment();
  };

  function convertiData(dataBackend) {
    if (dataBackend) {
      let partiData = dataBackend.split("-");
      let anno = partiData[0];
      let mese = partiData[1];
      let giorno = partiData[2];

      let dataConvertita = giorno + "-" + mese + "-" + anno;
      return dataConvertita;
    } else {
      return "";
    }
  }
  function convertiOra(commentTime) {
    let date = new Date(commentTime);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let formattedTime = hours + ":" + (minutes < 10 ? "0" : "") + minutes;
    return formattedTime;
  }
  return (
    <>
      <header>
        <MyNavBar />
      </header>
      <main className="flex-grow-1 ">
        <Container fluid className="mb-md-5">
          <Row
            className="justify-content-center position-relative"
            style={{
              minHeight: "60vh",
            }}
          >
            <div
              className="bg-cover"
              style={{ backgroundImage: `url('${film.cover}')` }}
            ></div>
            <Col className="col-12 col-md-6 d-flex justify-content-center align-items-center py-4">
              <img
                src={film.cover}
                alt={film.title}
                className="img-fluid fadeIn"
              />
            </Col>
            <Col className="col-12 col-md-6 d-flex flex-column justify-content-start  align-items-center px-5 pt-3 pb-5 p-md-5 col-details">
              <h1 className="my-4 mt-md-0 mb-md-3 text-center text-white fadeIn d-flex align-items-center">
                {film.title}
                <span className="fs-6 fw-normal ms-3">
                  <i className="fas fa-star"></i>{" "}
                  {film && film.rating ? film.rating.toFixed(1) : "Loading..."}
                  /5
                </span>
              </h1>
              <div>
                <p className="text-white fadeIn">
                  <strong>Duration:</strong> {film.duration} min
                </p>
                <p className="text-white fadeIn">
                  <strong>Exit date:</strong> {convertiData(film.exitDate)}
                </p>
                <p className="text-white fadeIn">
                  <strong>Director:</strong> {film.director}
                </p>
              </div>

              <p className="text-white fadeIn">{film.description}</p>
            </Col>
          </Row>
        </Container>

        <Row className=" mt-4 col-11 d-flex justify-content-start align-items-center ps-3">
          <Col className="col-12  justify-content-start ">
            <h3>Add a new review</h3>
            <Col className="col-12 col-md-6 col-lg-4">
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <div
                    key={i}
                    style={{ display: "inline-block", position: "relative" }}
                    className="mb-1"
                  >
                    <button
                      type="button"
                      style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "1.4em",
                      }}
                      onClick={() => handleStarClick(ratingValue, 0)}
                    >
                      {ratingValue <= rating ? (
                        <i className="fas fa-star"></i>
                      ) : (
                        <i className="far fa-star"></i>
                      )}
                    </button>
                    <button
                      type="button"
                      style={{
                        background: "transparent",
                        border: "none",
                        position: "absolute",
                        left: 0,
                        width: "50%",
                        overflow: "hidden",
                        fontSize: "1.4em",
                      }}
                      onClick={() => handleStarClick(ratingValue, -0.5)}
                    >
                      {ratingValue - 0.5 <= rating ? (
                        <i className="fas fa-star"></i>
                      ) : (
                        <i className="far fa-star"></i>
                      )}
                    </button>
                  </div>
                );
              })}
              <FloatingLabel
                controlId="floatingTextarea"
                label="Comments"
                className="mb-3 mt-1 text-area"
                onChange={(e) => setDescription(e.target.value)}
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                />
              </FloatingLabel>
              <Button className="mb-3 a" onClick={handlePostComment}>
                ADD COMMENT
              </Button>
            </Col>
            <h3 className="mb-4">Comments:</h3>
            {comments.length === 0 ? (
              <p>No comments for this movie yet.</p>
            ) : (
              (showAll ? comments : comments.slice(0, 5)).map((comment, i) => {
                return (
                  <Row key={i} className="mb-2 comment-row mt-3">
                    <Col className="col-1  ps-4 pe-2 pe-sm-5 col-img-prof">
                      <img
                        src={comment.user.avatar}
                        alt="user-avatar"
                        className="rounded-circle object-fit-cover"
                        style={{ width: "45px", height: "45px" }}
                      />
                    </Col>
                    <Col className="col-10 ps-5 ps-sm-4 ps-md-3 ps-lg-1 col-desc-comment">
                      <h6>
                        {comment.user.username}
                        <span className="fw-normal ms-2 date-comment">
                          ({convertiData(comment.commentDay)} -{" "}
                          {convertiOra(comment.commentTime)})
                        </span>
                      </h6>
                      <p>{comment.description}</p>
                    </Col>
                  </Row>
                );
              })
            )}
            {comments.length > 5 && (
              <p
                onClick={() => {
                  setShowAll(!showAll);
                }}
                className="show-all ms-2 mt-3"
              >
                {showAll ? "Show less" : "Show all"}
              </p>
            )}
          </Col>
        </Row>
      </main>
      <footer className="mt-5">
        <Footer />
      </footer>
    </>
  );
};
export default FilmDetails;
