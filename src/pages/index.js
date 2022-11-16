import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "./index.css";
import Jumbotron from "../components/jumbotron";
import { useQuery } from "react-query";
import { API } from "../config/api";
import Login from "../components/login";
import { BiBookmark } from "react-icons/bi";

const Index = () => {
  const [query, setQuery] = useState("");

  let { data: journeys } = useQuery("journeysCache", async () => {
    const response = await API.get("/journeys");
    return response.data.data;
  });

  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <Jumbotron />
      <Container className="mt-5 mb-5">
        <div className="mb-4">
          <h1 className="journey">Journey</h1>
        </div>
        <Form className="row mx-4 mb-5">
          <div className="col-10">
            <Form.Control
              type="search"
              classname="form-control rounded "
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <Button type="button" className=" col-2 btn-primary">
            search
          </Button>
        </Form>
        <div className="container">
          {journeys?.length !== 0 ? (
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {journeys
                ?.filter((item) => {
                  return query.toLocaleLowerCase() === ""
                    ? item
                    : item.title.toLocaleLowerCase().includes(query);
                })
                .map((item, index) => (
                  <div className="col pt-4" onClick={() => setShowLogin(true)}>
                    <div className="card h-100">
                      <img
                        src={item?.image}
                        style={{ minHeight: "50%", maxHeight: "50%" }}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <div className="row mb-2">
                          <div className="col-10">
                            <div>
                              <h5
                                className="title-card"
                                style={{ cursor: "pointer" }}
                              >
                                {item?.title.slice(0, 20)}...
                              </h5>
                              <h5 className="author float-start">
                                {item?.user.fullname}
                              </h5>
                            </div>
                          </div>
                          <div className="col-2">
                            <BiBookmark />
                          </div>
                        </div>

                        <p className="desc-card">
                          {item?.descriptions.slice(0, 30)}... readmore
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <h1>There's no journal yet...</h1>
          )}
        </div>
      </Container>
      <Login show={showLogin} setShow={setShowLogin} />
    </div>
  );
};

export default Index;
