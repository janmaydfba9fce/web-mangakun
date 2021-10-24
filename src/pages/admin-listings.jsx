import { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";
import Modal from "../components/modal";
import { useHistory } from "react-router-dom";

const baseURL = "https://api-mangakun.herokuapp.com/";
const HEADER_TEXT_STYLE = {
  fontSize: "10px",
  color: "#888",
  fontWeight: "400",
};
export default function AdminListingsPage() {
  const history = useHistory();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});

  const getItems = async () => {
    await axios
      .get(baseURL + "api/post")
      .then((value) => {
        setItems(value.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteItem = async (id) => {
    await axios.delete(baseURL + `api/post/${id}`);
    await getItems();
  };

  const updatePost = async (id) => {
    console.log(id);
    // await axios.put(baseURL + `api/post/${id}`);
    // await getItems();
  };
  const auth = () => {
    var value = localStorage.getItem("auth");
    if (value === null || value === "") {
      history.replace("/login");
    }
  };

  useEffect(() => {
    auth();
    getItems();
    return () => {
      setItems([]);
    };
  }, []);

  window.document.title = "Manga" + " | " + "Mangakun";

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
          onClick={() => history.replace("/admin/post")}
        >
          <span className="text-dark me-3 pointer">
            <i className="fas fa-plus"></i>
          </span>
        </div>
      </nav>
      <section className="container-fluid">
        <div className="row">
          <div className="col"></div>
          <div className="col-md-8">
            <table className="table table-borderless  align-top mt-5">
              <thead>
                <tr>
                  <th scope="col" style={HEADER_TEXT_STYLE}>
                    Title
                  </th>

                  <th scope="col" style={HEADER_TEXT_STYLE}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((value) => {
                  return (
                    <tr key={value._id}>
                      <td style={{ fontWeight: "400" }}>{value.title}</td>
                      <td>
                        <div className="d-flex">
                          <i
                            className="fas fa-trash pointer"
                            onClick={() => deleteItem(value._id)}
                          />
                          <i
                            className="fas fa-edit ms-2 pointer"
                            data-mdb-toggle="modal"
                            data-mdb-target="#exampleModal"
                            onClick={() => {
                              setSelectedItem({ ...value });
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col"></div>
        </div>
        <Modal
          details={selectedItem}
          updateFn={() => updatePost(selectedItem._id)}
          refreshFn={() => getItems()}
        />
      </section>
    </section>
  );
}
