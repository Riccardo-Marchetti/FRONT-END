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
import FilmCoverDetails from "./FilmCoverDetails";
import BookTicket from "./BookTicket";
import Loading from "./Loading";
import Error from "./Error";

const FilmDetails = () => {
  const [show, setShow] = useState([]);
  const [comments, setComments] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();

  const postComment = async () => {
    setIsLoading(true);
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
      setError("Error in fetch");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchShow = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3001/show/film/${params.filmId}`,
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
          setShow(data);
          setIsLoading(false);
        } else {
          throw new Error(`${response.status} - Error in fetch`);
        }
      } catch (error) {
        setError("Error in fetch");
        setIsLoading(false);
      }
    };

    const fetchComment = async () => {
      setIsLoading(true);
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
          setIsLoading(false);
        } else {
          throw new Error(`${response.status} - Error in fetch`);
        }
      } catch (error) {
        setError("Error in fetch");
        setIsLoading(false);
      }
    };

    fetchShow();
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

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
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
            <FilmCoverDetails show={show} convertiData={convertiData} />
          </Row>
        </Container>

        <BookTicket show={show} convertiData={convertiData} />
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
              <Button
                className="mb-3 add-comment-but"
                onClick={handlePostComment}
              >
                ADD COMMENT
              </Button>
            </Col>
            <h3 className="mb-4">Comments:</h3>
            {comments.length === 0 ? (
              <p>No comments for this movie yet.</p>
            ) : (
              (showAll ? comments : comments.slice(0, 5)).map((comment, i) => {
                return (
                  <Row key={i} className="mb-2 comment-row py-3 mt-3">
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
