import React from "react";
import Meta from "../components/Meta";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container, Spinner } from "react-bootstrap";
import { FaEnvelope, FaHouseMedical, FaPhone } from "react-icons/fa6";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { createenquiry, resetState } from "../features/enquiry/enquirySlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

let schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  mobile: Yup.string()
    .min(11, "please enter a valid number !")
    .required("Required"),
  comment: Yup.string()
    .min(5, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

function Contact() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      comment: "",
      mobile: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createenquiry(values));
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });
  const {isLoading} = useSelector((state) => state.enquiry);
  
  return (
    <>
      <Meta title={"contact us"} />
      <section className="contact-wrapper py-5">
        <Container>
          <Row>
            <Col md="7" sm="6">
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label column className="fw-bolder fs-4" sm={12}>
                    Leave your message
                  </Form.Label>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label column sm={2}>
                    name
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="name"
                      onChange={formik.handleChange("name")}
                      onBlur={formik.handleBlur("name")}
                      value={formik.values.name}
                      placeholder="Enter your name"
                    />
                  </Col>
                <div className="error text-center text-danger">
                  {formik.touched.name && formik.errors.name}
                </div>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label column sm={2}>
                    mobile
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="mobile"
                      value={formik.values.mobile}
                      onChange={formik.handleChange("mobile")}
                      onBlur={formik.handleBlur("mobile")}
                      placeholder="Enter your mobile"
                    />
                  </Col>
                  <div className="error text-center text-danger">
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label column sm={2}>
                    Email
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="email"
                      name="name"
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                      placeholder="Enter your email"
                    />
                  </Col>
                <div className="error text-center text-danger">
                  {formik.touched.email && formik.errors.email}
                </div>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label column sm={2}>
                    Message
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      name="comment"
                      value={formik.values.comment}
                      onChange={formik.handleChange("comment")}
                      onBlur={formik.handleBlur("comment")}
                      as="textarea"
                      rows={3}
                    />
                  </Col>
                <div className="error text-center text-danger">
                  {formik.touched.comment && formik.errors.comment}
                </div>
                </Form.Group>
                <div className="text-center">
                  <Button
                    variant="transparent"
                    className="btn-def my-3 w-50 mx-auto"
                    type="submit"
                  >
                    {
                      isLoading ?(
                        <Spinner animation="grow" size="md" />
                      ):("send")
                    }
                    
                  </Button>
                </div>
              </Form>
            </Col>
            <Col md="5" sm="6">
              <h5>About Us</h5>
              <p className="text-muted my-3">
                For any comments or improvements to our online store, please
                fill out this contact form. We will take a look and get back to
                you within 24 hours. We always need your feedback to benefit
                from it continuously.
              </p>

              <div className="icon">
                <p>
                  <FaHouseMedical /> 123 Main Street, Anytown, CA 12345
                </p>
                <p>
                  {" "}
                  <FaEnvelope /> info@example.com
                </p>
                <p>
                  {" "}
                  <FaPhone /> + 01 234 567 88
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d100185.26209093946!2d31.28126484978029!3d30.719403939622367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2seg!4v1688657865247!5m2!1sar!2seg"
                width="100%"
                height="450"
                style={{ border: 0, borderRadius: "10px" }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
                title="our location"
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Contact;
