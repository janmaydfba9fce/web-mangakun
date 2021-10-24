import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const baseURL = "https://api-mangakun.herokuapp.com/";

export default function Login() {
  const [isError, setIsError] = useState(false);
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = async (data) => {
    await axios
      .post(baseURL + "api/user/login", {
        email: data.email,
        password: data.password,
      })
      .then((value) => {
        localStorage.setItem("auth", value.data.user._id);
        history.replace("/admin");
        setIsError(false);
      })
      .catch((error) => {
        setIsError(true);
      });
  };

  const auth = () => {
    var value = localStorage.getItem("auth");
    if (value !== null) {
      history.replace("/admin");
    }
  };

  useEffect(() => {
    auth();
  }, []);
  window.document.title = "Sign in" + " | " + "Mangakun";
  return (
    <section className="container">
      <div className="row">
        <div className="col"></div>
        <div className="col-md-5 col-lg-5 col-xl-3">
          <section style={{ marginTop: "200px" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2 mt-5">
                <input
                  type="email"
                  id="form1Example1"
                  className="form-control"
                  placeholder="Email"
                  autoComplete="off"
                  required={true}
                  {...register("email")}
                />
              </div>

              <div>
                <input
                  type="password"
                  id="form1Example2"
                  className="form-control"
                  placeholder="Password"
                  required={true}
                  {...register("password")}
                />
              </div>
              {isError && (
                <p
                  className="text-danger p-0 m-0 mb-5 mt-2 text-center"
                  style={{ fontSize: "12px" }}
                >
                  Email and/or Password is invalid
                </p>
              )}
              <div className="d-flex justify-content-end mt-3">
                <p
                  className="pointer"
                  style={{ fontSize: "12px" }}
                  onClick={() => {
                    history.replace("/registration");
                  }}
                >
                  Don't have account?
                </p>
              </div>
              <button type="submit" className="btn btn-dark btn-block">
                Sign in
              </button>
            </form>
          </section>
        </div>
        <div className="col"></div>
      </div>
    </section>
  );
}
