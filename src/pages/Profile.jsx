import { FaRegEdit } from "react-icons/fa";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/auth/authSlice";
import Meta from "../components/Meta";
import { useEffect } from "react";

function Profile() {
  const dispatch = useDispatch();
  const [Edit, setEdit] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const [formData, setformData] = useState({
    firstname: user?.userInfo?.firstname,
    email: user?.userInfo?.email,
    lastname: user?.userInfo?.lastname,
    mobile: user?.userInfo?.mobile,
  });
  const onchange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const submit = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData));
    setEdit(true);
  };
  useEffect(() => {
    window.scroll(0,0)
  }, [])
  return (
    <>
      <Meta title={"My Profile"} />
      <div className="py-5">
        <Container>
          <div className="py-3 d-flex justify-content-between">
            <h4>{Edit == false && "Update"} Profile</h4>
            <h4>
              <FaRegEdit onClick={() => setEdit(false)} cursor={"pointer"} />
            </h4>
          </div>
          <Form onSubmit={submit}>
            <Form.Group as={Row} className="mb-3" controlId="First">
              <Form.Label column sm={3}>
                First Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  name="firstname"
                  onChange={onchange}
                  disabled={Edit}
                  type="text"
                  placeholder="First Name"
                  value={formData.firstname}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="Last">
              <Form.Label column sm={3}>
                Last Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  name="lastname"
                  onChange={onchange}
                  disabled={Edit}
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastname}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalEmail"
            >
              <Form.Label column sm={3}>
                Email
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  onChange={onchange}
                  disabled={Edit}
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  name="email"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="Phone">
              <Form.Label column sm={3}>
                Phone Number
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  onChange={onchange}
                  disabled={Edit}
                  type="text"
                  placeholder="Phone Number"
                  value={formData.mobile}
                  name="mobile"
                />
              </Col>
            </Form.Group>

            {Edit == false && (
              <Button variant="transparent" type="submit" className="btn-def">
                Submit
              </Button>
            )}
          </Form>
        </Container>
      </div>
    </>
  );
}

export default Profile;
