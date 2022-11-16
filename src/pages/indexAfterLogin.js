import React, { useContext, useEffect, useState } from "react";
import "./indexAfterLogin.css";
import { Button, Card, Container, Form } from "react-bootstrap";
import NavbarLogin from "../components/navbarLogin";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { BiBookmark } from "react-icons/bi";
import { UserContext } from "../context/userContext";
import ToastBookmark from "../atoms/toast-bookmark";

const IndexLogin = () => {
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (item) => {
    try {
      const data = await API.post("/bookmark", { journey_id: item.id });
      console.log(item);
    } catch (error) {
      console.log(error);
    }
  };

  const [state] = useContext(UserContext);
  const [query, setQuery] = useState("");

  let { data: journeys, refetch } = useQuery("journeyCache", async () => {
    const response = await API.get("/journeys");
    return response.data.data;
  });

  useEffect(() => {
    refetch();
  }, [state]);

  const navigate = useNavigate();

  return (
    <div>
      <NavbarLogin />
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
          <ToastBookmark show={showToast} setShow={setShowToast} />
          {journeys?.length !== 0 ? (
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {journeys
                ?.filter((item) => {
                  return query.toLocaleLowerCase() === ""
                    ? item
                    : item.title.toLocaleLowerCase().includes(query);
                })
                .map((item, index) => (
                  <div className="col pt-4">
                    <div className="card h-100">
                      <img
                        style={{ minHeight: "50%", maxHeight: "50%" }}
                        src={item?.image}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <div className="row mb-2">
                          <div className="col-10">
                            <div
                              onClick={() => {
                                navigate(`/detail/${item.id}`);
                              }}
                              key={index}
                              style={{ cursor: "pointer" }}
                            >
                              <h5 className="title-card">
                                {item?.title.slice(0, 20)}...
                              </h5>
                              <h5 className="author float-start">
                                {item?.user.fullname}
                              </h5>
                            </div>
                          </div>
                          <div
                            className="col-2"
                            onClick={() => {
                              handleSubmit(item);
                              setShowToast(true);
                            }}
                            style={{ zIndex: "1" }}
                          >
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
            <div>
              <h1>There's no journal yet...</h1>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default IndexLogin;
