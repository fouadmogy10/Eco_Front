import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const Bcard = ({ ke, id, title, author, category, img, description,l,md,sm }) => {
  return (
    <> 
      <Col lg={l} md={md} sm={sm}>
        <Card className="mb-3 border-0">
          <Card.Img variant="top" alt={title} src={img} loading="lazy"  className="w-100" height={200}  style={{
          objectFit: "contain"
          ,aspectRatio:1
        }}/>
          {/* <div className="img" style={{ backgroundImage: `url(${img})` }}></div> */}
          <Card.Body>
            <div className="my-3">
              <small className="text-muted ">Last updated 3 mins ago</small>
            </div>
            <Card.Title>{title}</Card.Title>
            <Card.Text
              className="post-item-description "
              dangerouslySetInnerHTML={{ __html: description }}
            ></Card.Text>
            <Link to={`/blogs/${id}`}>
              <Button variant="transparent" className="btn-def">
                Read more...
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default Bcard;
