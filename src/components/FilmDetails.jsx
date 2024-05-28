import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
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

  // Function to delete a user's comment
  const deleteMyComment = async (commentId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/comment/me/${params.filmId}/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        window.location.reload();
      } else {
        throw new Error(`${response.status} - Error in fetch`);
      }
    } catch (error) {
      setError("Error in fetch");
      setIsLoading(false);
    }
  };

  // Function to post a new comment
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

  // Fetching show details and comments when component mounts
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

  // Function to handle star click for rating
  const handleStarClick = (value, half) => {
    setRating(value + half);
  };

  // Function to handle posting a comment
  const handlePostComment = (e) => {
    e.preventDefault();
    if (description.trim() === "") {
      alert("The comment field cannot be empty");
      return;
    }
    postComment();
  };

  // Function to convert date format from YYYY-MM-DD to DD-MM-YYYY
  function convertData(dataBackend) {
    if (dataBackend) {
      let data = dataBackend.split("-");
      let year = data[0];
      let month = data[1];
      let day = data[2];

      let dataConvertita = day + "-" + month + "-" + year;
      return dataConvertita;
    } else {
      return "";
    }
  }

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
            <FilmCoverDetails show={show} convertiData={convertData} />
          </Row>
        </Container>

        <Row className="ms-3 me-0 mt-5 ms-md-0 me-md-0 justify-content-md-center">
          <Col className="px-0 col-12 col-md-6">
            <h3 className="title-book-ticket">Add a new review</h3>
            <div className="mb-2">
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <div
                    key={i}
                    style={{ display: "inline-block", position: "relative" }}
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
            </div>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Comments"
              className="text-area"
              onChange={(e) => setDescription(e.target.value)}
            >
              <Form.Control as="textarea" placeholder="Leave a comment here" />
            </FloatingLabel>
            <Button
              className="add-comment-but mt-3 mb-2"
              onClick={handlePostComment}
              disabled={description.trim() === ""}
            >
              Add comment
            </Button>
          </Col>
        </Row>
        <Row className="ms-3 me-3 ms-md-0 me-md-0 justify-content-md-center">
          <Col className="px-0 comment-col mt-3 col-12 col-md-6">
            <h3 className="title-book-ticket mt-3 mb-3 ">Review:</h3>
            {comments.length === 0 ? (
              <p className="text-white mb-4">No reviews for this movie yet.</p>
            ) : (
              (showAll ? comments : comments.slice(0, 5)).map((comment, i) => {
                return (
                  <Row key={i} className="comment-row mb-4 pt-2 ms-0 me-0">
                    <Col className="col-img-prof pt-2 px-0 col-1 col-md-2 col-lg-1">
                      <img
                        src={comment.user.avatar}
                        alt="user-avatar"
                        className="rounded-circle object-fit-cover ms-2 ms-sm-3 ms-xxl-3"
                        style={{ width: "45px", height: "45px" }}
                      />
                    </Col>
                    <Col className="col-10 pt-2 col-md-9 col-lg-10 ms-4 ms-sm-3 ms-md-0 ms-lg-4 ms-xl-3 ms-xxl-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="text-white m-0">
                          {comment.user.username}
                        </h6>

                        <DropdownButton
                          id="dropdown-comment"
                          title={<i className="fas fa-ellipsis-h "></i>}
                        >
                          <Dropdown.Item
                            onClick={() => deleteMyComment(comment.id)}
                          >
                            <i className="fas fa-trash-alt me-1"></i> Delete
                            comment
                          </Dropdown.Item>
                        </DropdownButton>
                      </div>

                      <div className="mb-2">
                        {[...Array(5)].map((star, i) => {
                          const ratingValue = i + 1;
                          const isHalfStar =
                            comment.rating === ratingValue - 0.5;
                          return (
                            <i
                              key={i}
                              className={`${
                                isHalfStar
                                  ? "fas fa-star-half-alt"
                                  : ratingValue <= comment.rating
                                  ? "fas fa-star"
                                  : "far fa-star"
                              }`}
                              style={{
                                color: "#ffd60a",
                                fontSize: "13px",
                                marginRight: "2px",
                              }}
                            ></i>
                          );
                        })}
                        <span className="fw-normal ms-1  date-comment footer-text-color ">
                          ({convertData(comment.commentDay)})
                        </span>
                      </div>

                      <p className="text-white description pt-1">
                        {comment.description}
                      </p>
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

        <BookTicket show={show} convertiData={convertData} />
      </main>

      <footer className="mt-5">
        <Footer />
      </footer>
    </>
  );
};

export default FilmDetails;
