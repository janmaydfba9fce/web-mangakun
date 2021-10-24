import { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "../components/carousel";

const baseURL = "https://api-mangakun.herokuapp.com/";

export default function UserFeedPage() {
  const [feed, setFeed] = useState([]);
  const [locations, setLocations] = useState([]);

  const getFeed = async () => {
    await axios
      .get(baseURL + "api/post")
      .then((value) => {
        setFeed(value.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getLocations = async () => {
    await axios
      .get(baseURL + "api/location")
      .then((value) => {
        setLocations(value.data);
        console.log(value.data);
      })
      .catch((error) => console.log(error));
  };

  const getFilteredFeed = async (title) => {
    await axios
      .get(baseURL + `api/post/${title}`)
      .then((value) => {
        setFeed(value.data);
      })
      .catch((error) => {
        getFeed();
      });
  };
  useEffect(() => {
    getFeed();
    getLocations();
    return () => {
      setFeed([]);
      getLocations([]);
    };
  }, []);

  window.document.title = "Read Manga Online | Mangakun";

  return (
    <section>
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 sticky-top">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <span className="text-dark me-3 pointer fw-bold">Mangakun</span>
          </li>
        </ul>
        <div className="d-flex align-items-center"></div>
      </nav>
      <section className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col-md-12">
            <Carousel data={feed} />
          </div>
          <div className="col"></div>
        </div>
      </section>
    </section>
  );
}
