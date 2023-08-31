import React, { useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Meta from "../components/Meta";
import { Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist, getcartItem, login, reset, resetState } from "../features/auth/authSlice";
import { toast } from "react-toastify";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async(values) => {
     await dispatch(login(values));
      
    },
  });

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user?.userInfo?.token) {
      navigate("/");
      // dispatch(resetState())
    }
    if (isError) {
      navigate("/login");
      toast.error(`${message}`);
      dispatch(reset());
    }
  }, [user, isError, isSuccess, isLoading, dispatch, navigate]);
  return (
    <>
      <Meta title={"Login Page"} />
      <Container className="text-center py-5">
        <div className=" text-capitalize py-3">
          <h2 className="display-5 fw-bolder mb-2">
            <FaSignInAlt size={40} /> <>Login</>
          </h2>
          <span className="text-muted fs-5">Login to your account</span>
        </div>

        <Form
          style={{ maxWidth: "600px", margin: "auto" }}
          onSubmit={formik.handleSubmit}
        >
          <Form.Group className="my-3" controlId="email">
            <Form.Control
              required
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              value={formik.values.email}
            />
            <div className="error mt-2 text-danger">
              {formik.touched.email && formik.errors.email}
            </div>
          </Form.Group>

          <Form.Group className="my-3" controlId="password">
            <Form.Control
              required
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              value={formik.values.password}
            />
            <div className="error mt-2 text-danger">
              {formik.touched.password && formik.errors.password}
            </div>
          </Form.Group>

          {user?.loading ? (
            <Button
              type="button"
              variant="transparent"
              className="btn-def w-50"
            >
              <Spinner animation="border" size="sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Button>
          ) : (
            <Button
              type="submit"
              variant="transparent"
              className="btn-def w-50"
            >
              Login
            </Button>
          )}
        </Form>
      </Container>
    </>
  );
}

export default Login;
