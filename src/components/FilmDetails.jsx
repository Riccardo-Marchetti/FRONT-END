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
    if (description.trim() === "") {
      alert("The comment field cannot be empty");
      return;
    }
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

        <Container className="comment-cont  px-sm-5  px-xl-0 col-lg-10  col-xxl-8  mt-4 mt-md-5 d-flex flex-column mb-5">
          <Row className="d-flex justify-content-start align-items-center  ">
            {/* <Col className="col-12  justify-content-start "> */}
            <Col className="text-center text-md-start  p-md-0 ms-xl-5 ps-xl-4 ">
              <h3 className="title-book-ticket mt-3 mt-md-4 ms-xl-3 ms-xxl-4 ">
                Add a new review
              </h3>
              <div className="flex-row ms-xl-2 ms-xxl-3">
                {[...Array(5)].map((star, i) => {
                  const ratingValue = i + 1;
                  return (
                    <div
                      key={i}
                      style={{ display: "inline-block", position: "relative" }}
                      className="mb-1 "
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
                className="mb-3 ms-xl-3 ms-xxl-4 mt-2 text-area mx-auto mx-xl-0 mx-md-0"
                onChange={(e) => setDescription(e.target.value)}
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                />
              </FloatingLabel>
              <Button
                className="mb-3 add-comment-but ms-xl-3 ms-xxl-4"
                onClick={handlePostComment}
                disabled={description.trim() === ""}
              >
                ADD COMMENT
              </Button>
            </Col>
            <h3 className="mb-3 mt-3 title-book-ticket text-center">Review:</h3>
            {comments.length === 0 ? (
              <p className="text-white text-center">
                No reviews for this movie yet.
              </p>
            ) : (
              (showAll ? comments : comments.slice(0, 5)).map((comment, i) => {
                return (
                  <Row
                    key={i}
                    className="mb-2 col-xl-10 mx-auto comment-row  py-3 mt-3"
                  >
                    <Col className="col-1  ps-0 pe-lg-0  col-img-prof">
                      <img
                        src={comment.user.avatar}
                        alt="user-avatar"
                        className="rounded-circle object-fit-cover"
                        style={{ width: "45px", height: "45px" }}
                      />
                    </Col>
                    <Col className="col-10   ps-4 ps-md-3 ps-lg-0 ps-xl-2 ps-xxl-4">
                      <div className="d-flex  align-items-center justify-content-between ">
                        <h6 className=" d-sm-flex mb-0  text-white">
                          {comment.user.username}
                        </h6>
                        {/* <Button className="bg-transparent border-0 "></Button> */}
                        <DropdownButton
                          id="dropdown-comment"
                          title={<i className="fas fa-ellipsis-h"></i>}
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
                          ({convertiData(comment.commentDay)})
                        </span>
                      </div>

                      <p className="text-white description">
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
            {/* </Col> */}

            <BookTicket show={show} convertiData={convertiData} />
          </Row>
        </Container>
      </main>
      <footer className="mt-5">
        <Footer />
      </footer>
    </>
  );
};

export default FilmDetails;
