import { Modal } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const ShowFilm = ({ film, show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Body
        style={{
          height: 0,
          paddingBottom: "56.25%",
          position: "relative",
        }}
      >
        <iframe
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          // eslint-disable-next-line react/prop-types
          src={film.trailer}
          title="YouTube video player"
          // eslint-disable-next-line react/no-unknown-property
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Modal.Body>
    </Modal>
  );
};
export default ShowFilm;
