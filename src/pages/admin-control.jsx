import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";

const baseURL = "https://api-mangakun.herokuapp.com/";

export default function AdminControlPage() {
  const history = useHistory();

  const { register, handleSubmit } = useForm();
  const [locations, setLocations] = useState([]);
  const [toggle, setToggle] = useState({
    addLocation: false,
  });
  const [status, setStatus] = useState({
    isUploading: false,
  });

  const getLocations = async () => {
    await axios
      .get(baseURL + "api/location")
      .then((value) => {
        setLocations(value.data);
      })
      .catch((error) => console.log(error));
  };

  const onSubmit = async (data) => {
    setStatus((status) => ({
      ...status,
      isUploading: true,
    }));
    let fdPicturePosterUrl = new FormData();
    let fdPicture1 = new FormData();
    let fdPicture2 = new FormData();
    let fdPicture3 = new FormData();
    let fdPicture4 = new FormData();

    let qsPicturePosterUrl = document.querySelector("#posterUrl");
    fdPicturePosterUrl.append("photo", qsPicturePosterUrl.files[0]);

    let qsPicture1 = document.querySelector("#picture1");
    fdPicture1.append("photo", qsPicture1.files[0]);

    let qsPicture2 = document.querySelector("#picture2");
    fdPicture2.append("photo", qsPicture2.files[0]);

    let qsPicture3 = document.querySelector("#picture3");
    fdPicture3.append("photo", qsPicture3.files[0]);

    let qsPicture4 = document.querySelector("#picture4");
    fdPicture4.append("photo", qsPicture4.files[0]);

    try {
      const _uploadPoster = await axios.post(
        baseURL + "api/img",
        fdPicturePosterUrl
      );
      if (_uploadPoster.data.url != null) {
        console.log("IMG POSTER UPLOAD COMPLETED");
      }

      const _upload1 = await axios.post(baseURL + "api/img", fdPicture1);
      if (_upload1.data.url != null) {
        console.log("IMG 1 UPLOAD COMPLETED");
      }
      const _upload2 = await axios.post(baseURL + "api/img", fdPicture2);
      if (_upload2.data.url != null) {
        console.log("IMG 2 UPLOAD COMPLETED");
      }
      const _upload3 = await axios.post(baseURL + "api/img", fdPicture3);
      if (_upload3.data.url != null) {
        console.log("IMG 3 UPLOAD COMPLETED");
      }
      const _upload4 = await axios.post(baseURL + "api/img", fdPicture4);
      if (_upload4.data.url != null) {
        console.log("IMG 4 UPLOAD COMPLETED");
      }

      await axios
        .post(baseURL + "api/post", {
          title: data.title,
          overview: data.overview,
          posterUrl: _uploadPoster.data.url,
          images: [
            _upload1.data.url,
            _upload2.data.url,
            _upload3.data.url,
            _upload4.data.url,
          ],
        })
        .then(async (value) => {
          setStatus((status) => ({
            ...status,
            isUploading: false,
          }));
          history.replace("/admin");
        })
        .catch((error) => {
          setStatus((status) => ({
            ...status,
            isUploading: false,
          }));
        });
    } catch (error) {
      alert("UPLOADING FAILED, PLEASE CHECK YOUR INTERNET CONNECTION");
      console.log(error);
    }
  };

  const auth = () => {
    var value = localStorage.getItem("auth");
    if (value === null || value === "") {
      history.replace("/login");
    }
  };

  useEffect(() => {
    auth();
    getLocations();
    return () => {
      setLocations([]);
    };
  }, []);

  window.document.title = "Upload" + " | " + "Mangakun";

  return (
    <section>
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 sticky-top">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <span className="text-dark me-3 pointer fw-bold">Mangakun</span>
          </li>
        </ul>
        <div
          className="d-flex align-items-center"
          onClick={() => history.replace("/admin")}
        >
          <span className="text-dark me-3 pointer">
            <i className="fas fa-list"></i>
          </span>
        </div>
      </nav>
      <section className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col-md-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex justify-content-end">
                <p
                  className="m-0 p-0 mb-2 mt-5"
                  style={{ fontSize: "10px", fontWeight: "500" }}
                >
                  POSTER PICTURE
                </p>
              </div>
              <input
                className="form-control form-control-sm "
                id="posterUrl"
                type="file"
                required={true}
                accept="image/gif, image/jpeg, image/png"
              />
              <div className="d-flex justify-content-end">
                <p
                  className="m-0 p-0 mb-2 mt-3"
                  style={{ fontSize: "10px", fontWeight: "500" }}
                >
                  MANGA PICTURES
                </p>
              </div>
              <div className="d-flex mt-1">
                <input
                  className="form-control form-control-sm"
                  id="picture1"
                  type="file"
                  required={true}
                  accept="image/gif, image/jpeg, image/png"
                />
                <input
                  className="form-control form-control-sm ms-1"
                  id="picture2"
                  type="file"
                  required={true}
                  accept="image/gif, image/jpeg, image/png"
                />
              </div>
              <div className="d-flex mt-1">
                <input
                  className="form-control form-control-sm"
                  id="picture3"
                  type="file"
                  required={true}
                  accept="image/gif, image/jpeg, image/png"
                />
                <input
                  className="form-control form-control-sm ms-1"
                  id="picture4"
                  type="file"
                  required={true}
                  accept="image/gif, image/jpeg, image/png"
                />
              </div>
              <div className="d-flex align-items-start mt-2">
                <div className="w-100">
                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="Title"
                    required={true}
                    {...register("title")}
                  />
                  <textarea
                    className="form-control mt-2"
                    rows="11"
                    placeholder="Overview"
                    required={true}
                    {...register("overview")}
                  ></textarea>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-dark mt-5 w-100"
                  disabled={status.isUploading}
                >
                  POST
                </button>
              </div>
            </form>
          </div>
          <div className="col"></div>
        </div>
      </section>
    </section>
  );
}
