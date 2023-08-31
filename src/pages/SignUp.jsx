import { AiFillEyeInvisible } from "react-icons/ai"; 
import { AiFillEye } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Meta from "../components/Meta";
import { Container, InputGroup, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { register, reset, resetState } from "../features/auth/authSlice";
import { toast } from "react-toastify";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
  Cpassword: yup.string().required("Confirm Password is Required"),
  mobile: yup
    .string()
    .required("phone is Required")
    .min(11, "enter valid mobile number"),
  lastname: yup.string().required(" Required"),
  firstname: yup.string().required(" Required"),
});

function SignUp() {
  const [toggle, settoggle] = useState(false);
  const [toggle2, settoggle2] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      Cpassword: "",
      mobile: "",
    },
    validationSchema: schema,
    onSubmit: async(values) => {
      if (formik.values.password !== formik.values.Cpassword) {
        toast.warn("password & Confirm Password must be matched");
      } else {
        await dispatch(
          register({
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            password: values.password,
            mobile: values.mobile,
          })
        );
        navigate("/login");
      }
    },
  });

  const authState = useSelector((state) => state);
  const { user, createdUser, isLoading, isSuccess } = authState.auth;

  useEffect(() => {
    if (user.userInfo !== null) {
      navigate("/");
    }
  }, [createdUser, isLoading, dispatch, navigate]);

  return (
    <>
      <Meta title={"Register"} />
      <Container className="py-5  text-center">
        <div className="text-capitalize py-3">
          <h2 className="display-5 fw-bolder mb-2">
            <FaUser size={40} /> register
          </h2>
          <span className="text-muted fs-5">create an account</span>
        </div>

        <Form
          style={{ maxWidth: "600px", margin: "auto" }}
          onSubmit={formik.handleSubmit}
        >
          <Form.Group className="mb-3" controlId="Fname">
            <Form.Control
              required
              name="firstname"
              type="text"
              placeholder="Enter Your First Name"
              aria-describedby="basic-addon1"
              onChange={formik.handleChange("firstname")}
              onBlur={formik.handleBlur("firstname")}
              value={formik.values.firstname}
            />
          </Form.Group>
          <div className="error mt-2 text-danger mb-2">
            {formik.touched.firstname && formik.errors.firstname}
          </div>
          <Form.Group className="mb-3" controlId="Lname">
            <Form.Control
              required
              name="lastname"
              type="text"
              placeholder="Enter Your Last Name"
              aria-describedby="basic-addon1"
              onChange={formik.handleChange("lastname")}
              onBlur={formik.handleBlur("lastname")}
              value={formik.values.lastname}
            />
          </Form.Group>
          <div className="error mt-2 text-danger mb-2">
            {formik.touched.lastname && formik.errors.lastname}
          </div>
          <Form.Group className="mb-3" controlId="mobile">
            <Form.Control
              required
              name="mobile"
              type="text"
              placeholder="Enter Your mobile number"
              aria-describedby="basic-addon1"
              onChange={formik.handleChange("mobile")}
              onBlur={formik.handleBlur("mobile")}
              value={formik.values.mobile}
            />
          </Form.Group>
          <div className="error mt-2 text-danger mb-2">
            {formik.touched.mobile && formik.errors.mobile}
          </div>
          <Form.Group className="mb-3" controlId="email">
            <Form.Control
              required
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              value={formik.values.email}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <div className="error mt-2 text-danger mb-2">
            {formik.touched.email && formik.errors.email}
          </div>

          <Form.Group className="mb-3 position-relative" controlId="password">
            <Form.Control
              required
              name="password"
              type={toggle ? "password" : "text"}
              placeholder="Password"
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              value={formik.values.password}
            />
            {
            toggle?(
              <AiFillEye
              cursor={"pointer"}
              className="position-absolute"
              style={{
                top: "22%",
                right: "12px",
              }}
              onClick={() => settoggle(!toggle)}
            />
            ):(
              <AiFillEyeInvisible
              cursor={"pointer"}
              className="position-absolute"
              style={{
                top: "22%",
                right: "12px",
              }}
              onClick={() => settoggle(!toggle)}
            />)
          }
          </Form.Group>
          <div className="error mt-2 text-danger mb-2">
            {formik.touched.password && formik.errors.password}
          </div>
          <Form.Group className="mb-3 d-flex " controlId="Cpassword">
            <Form.Control
            className="postion-relative"
              required
              name="Cpassword"
              type={toggle2 ? "password" : "text"}
              placeholder="Cpassword"
              onChange={formik.handleChange("Cpassword")}
              onBlur={formik.handleBlur("Cpassword")}
              value={formik.values.Cpassword}
            />
          {
            toggle2?(
              <AiFillEye
              cursor={"pointer"}
              className="position-absolute"
              style={{
                top: "22%",
                right: "12px",
              }}
              onClick={() => settoggle2(!toggle)}
            />
            ):(
              <AiFillEyeInvisible
              cursor={"pointer"}
              className="position-absolute"
              style={{
                top: "22%",
                right: "12px",
              }}
              onClick={() => settoggle2(!toggle2)}
            />)
          }
          </Form.Group>
          <div className="error mt-2 text-danger mb-2">
            {formik.touched.Cpassword && formik.errors.Cpassword}
          </div>
          {user?.isLoading ? (
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
              Register
            </Button>
          )}
        </Form>
      </Container>
    </>
  );
}

export default SignUp;
