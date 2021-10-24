import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import parse from "html-react-parser";

const IMAGE_STYLE = {
  width: "500px",
  objectFit: "cover",
};
export default function UserFeedItemPreviewPage() {
  const history = useHistory();
  const location = useLocation();
  window.document.title = location.state.title + " | " + "Mangakun";

  return (
    <section>
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 sticky-top">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item" onClick={() => history.replace("/")}>
            <span className="text-dark me-3 pointer">
              <i className="fas fa-chevron-left me-2"></i>Back
            </span>
          </li>
        </ul>
        <div className="d-flex align-items-center"></div>
      </nav>
      <section className="container">
        <div className="row mt-2">
          <div className="col"></div>
          <div className="col-md-8">
            <div className="bg-light">
              <div className="d-flex p-5">
                <img
                  src={location.state.posterUrl}
                  alt="Page 1"
                  style={{
                    height: "250px",
                  }}
                />
                <div className="ms-4">
                  <h4 className="p-0 m-0">{location.state.title}</h4>
                  <p
                    style={{ fontSize: "14px", color: "gray" }}
                    className="p-0 m-0 mt-2"
                  >
                    {parse(location.state.overview)}
                  </p>
                </div>
              </div>
            </div>
            {location.state.images.map((element, index) => {
              return (
                <img
                  key={index}
                  src={location.state.images[index]}
                  class="d-block w-100"
                  alt={`Page${index}`}
                  style={IMAGE_STYLE}
                />
              );
            })}
          </div>
          <div className="col"></div>
        </div>
      </section>
    </section>
  );
}
