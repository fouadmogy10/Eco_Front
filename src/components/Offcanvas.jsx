import { useEffect } from "react";
import { useState } from "react";
import { Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";

function OffCanvas({ data, name, ...props }) {
  const dispatch = useDispatch();
  const [minP, setminP] = useState(0);
  const [maxP, setmaxP] = useState(0);
  const [Sort, setSort] = useState("");
  const [Cat, setCat] = useState("");
  const [Brand, setbrand] = useState("");
  const [Tag, setTag] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { products } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts({ minP, maxP, Sort, Cat, Brand, Tag }));
  }, [Sort, Cat, Brand, Tag]);
  const searchWithPrice = () => {
    if (minP >= 0 && minP !== "" && maxP !== "" && maxP !== 0 && minP < maxP) {
      dispatch(getProducts({ minP, maxP, Sort, Cat, Brand, Tag }));
    }
  };
  return (
    <>
      <div className="col-3">
        <Button
          variant="transparent"
          onClick={handleShow}
          className="btn-def me-2 w-100"
        >
          Filter
        </Button>
        <Offcanvas show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filter</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="filter-card mb-3">
              <h3 className="filter-title">shop by category</h3>
              <div>
                <div className="form-check" key={"54asasa"}>
                  <input
                    className="form-check-input"
                    type="radio"
                    value={""}
                    id={"all"}
                    name="category"
                    onChange={(e) => setCat(e.target.value)}
                    checked={Cat === ""}
                  />
                  <label
                    htmlFor={"all"}
                    className="form-check-label"
                    onClick={() => setCat("")}
                  >
                    All
                  </label>
                </div>
                {data.pCategories &&
                  data.pCategories.map((category, idx) => {
                    return (
                      <div className="form-check" key={idx}>
                        <input
                          className="form-check-input"
                          type="radio"
                          value={category.title}
                          id={category.title}
                          name="category"
                          onChange={(e) => setCat(e.target.value)}
                          checked={Cat === category.title}
                        />
                        <label
                          htmlFor={category.title}
                          className="form-check-label"
                          onClick={() => setCat(category.title)}
                        >
                          {category.title}
                        </label>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">shop by Brand</h3>
              <div>
                <div className="form-check" key={"54asasa"}>
                  <input
                    className="form-check-input"
                    type="radio"
                    value={""}
                    id={"allB"}
                    name="brand"
                    onChange={(e) => setbrand(e.target.value)}
                    checked={Brand === ""}
                  />
                  <label
                    htmlFor={"allB"}
                    className="form-check-label"
                    onClick={() => setbrand("")}
                  >
                    All
                  </label>
                </div>
                {data.brands &&
                  data.brands.map((brand, idx) => {
                    return (
                      <div className="form-check" key={idx}>
                        <input
                          className="form-check-input"
                          type="radio"
                          value={brand.title}
                          id={brand.title}
                          name="brand"
                          onChange={(e) => setbrand(e.target.value)}
                          checked={Brand == brand.title}
                        />
                        <label
                          htmlFor={brand.title}
                          className="form-check-label"
                          onClick={() => setbrand(brand.title)}
                        >
                          {brand.title}
                        </label>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">shop by tags</h3>
              <div className="d-flex">
                {["", "popular", "special", "featured"].map((tag, idx) => {
                  return (
                    <div className="form-check" key={idx}>
                      <label
                        htmlFor={tag}
                        className={
                          "form-check-label bg-light px-2 rounded-2 py-1 "
                        }
                        style={{
                          border: `${
                            Tag === tag ? "1px solid #e74821ff " : ""
                          }`,
                        }}
                        onClick={() => setTag(tag)}
                      >
                        {tag == "" ? "All" : tag}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title mb-4">Filter by</h3>

              <h5 className="sub-title">Price</h5>
              <div className="row align-items-center ">
                <Col xs="6">
                  <span>From</span>
                  <Form.Control
                    style={{ maxWidth: "130px" }}
                    placeholder="From"
                    type="number"
                    value={minP}
                    min={0}
                    onChange={(e) => setminP(e.target.value)}
                  />
                </Col>
                <Col xs="6">
                  <span>To</span>
                  <Form.Control
                    style={{ maxWidth: "130px" }}
                    placeholder="To"
                    value={maxP}
                    type="number"
                    min={50}
                    onChange={(e) => setmaxP(e.target.value)}
                  />
                </Col>
                <Button className="btn-def my-3  " onClick={searchWithPrice}>
                  Search By Price
                </Button>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>

      <div className="filter-sort-grid col-9">
        <div className=" d-flex  justify-content-between align-items-center">
          <div className=" d-flex align-items-center sort">
            <p className="mb-0 d-block">sort by:</p>
            <Form.Select size="sm" onChange={(e) => setSort(e.target.value)}>
              <option value={"title"}>Alphabetically , A-Z</option>
              <option value={"-title"}>Alphabetically , Z-A</option>
              <option value={"price"}>Price, low to high </option>
              <option value={"-price"}>Price, high to low</option>
              <option value={"created"}>Date, old to new </option>
              <option value={"-createdAt"}>Date, new to old </option>
            </Form.Select>
          </div>
          <p className="px-3 fw-bolder">{products.length} product</p>
        </div>
      </div>
    </>
  );
}

export default function Filter(data) {
  return (
    <>
      {["start"].map((placement, idx) => (
        <OffCanvas
          data={data.data}
          key={idx}
          placement={placement}
          name={placement}
        />
      ))}
    </>
  );
}
