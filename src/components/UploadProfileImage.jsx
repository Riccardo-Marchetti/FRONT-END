import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Loading from "./Loading";
import Error from "./Error";

const UploadProfileImage = () => {
  const inputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = () => {
    inputRef.current.click();
  };

  const changeProfileImage = async () => {
    setIsLoading(true);
    let file = inputRef.current.files[0];
    if (file) {
      let formData = new FormData();
      formData.append("avatar", file);

      try {
        const response = await fetch("http://localhost:3001/user/me/upload", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json;
          console.log(data);
          window.location.reload();
        } else {
          throw new Error(`${response.status} - Error in fetch`);
        }
      } catch (error) {
        setError("Error in fetch");
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }
  return (
    <>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={changeProfileImage}
      />
      <Button
        className="profile-but-img rounded-circle border-black border-2  bg-transparent mt-3 me-1"
        style={{ width: "45px", height: "45px" }}
        onClick={handleClick}
      >
        <i className="fas fa-camera d-flex justify-content-center align-items-center "></i>
      </Button>
    </>
  );
};
export default UploadProfileImage;
