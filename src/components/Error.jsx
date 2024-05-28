import { Alert } from "react-bootstrap";

// Component to display error messages
// eslint-disable-next-line react/prop-types
const Error = ({ message }) => (
  <Alert variant="danger" className="text-center my-2">
    {message}
  </Alert>
);

export default Error;
