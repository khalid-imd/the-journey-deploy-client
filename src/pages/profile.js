import React, { useContext, useEffect } from "react";
import "./profile.css";
import { Container } from "react-bootstrap";
import UserIcon from "../assets/profile-user.png";
import NavbarLogin from "../components/navbarLogin";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { BiBookmark } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [state, dispatch] = useContext(UserContext);
  let { data: journeys, refetch } = useQuery("ProfileCache", async () => {
    const response = await API.get("/journeys");
    const responseProfile = response.data.data.filter(
      (p) => p.user.id == state.user.id
    );
    return responseProfile;
  });

  useEffect(() => {
    refetch();
  }, [state]);

  console.log(state);

  const navigate = useNavigate();

  return (
    <div>
      <NavbarLogin />
      <Container className="mt-5 mb-5">
        <div className="mb-5">
          <h1 className="bookmark">Profile</h1>
        </div>
        <div className="mb-5">
          <div className="d-flex justify-content-center mb-2">
            <img width="100px" src={UserIcon} alt="" />
          </div>
          <div className="d-flex justify-content-center name-user">
            {" "}
            {state?.user?.fullname}{" "}
          </div>
          <div className="d-flex justify-content-center email-user">
            {state?.user?.email}
          </div>
        </div>
        <div className="container">
          {journeys?.length !== 0 ? (
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {journeys?.map((item, index) => (
                <div className="col pt-4">
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
                          <div
                            onClick={() => {
                              navigate(`/detail/${item.id}`);
                            }}
                            key={index}
                            style={{ cursor: "pointer" }}
                          >
                            <h5 className="title-card">{item?.title}</h5>
                            <h5 className="author float-start">
                              {item?.user.fullname}
                            </h5>
                          </div>
                        </div>
                        <div className="col-2">
                          <BiBookmark />
                        </div>
                      </div>
                      <div>
                        <p className="desc-card">
                          {item?.descriptions.slice(0, 15)}... readmore
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h1>You have no journal yet...</h1>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Profile;
