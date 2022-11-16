import React from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Image from "../assets/detail-photo.png";
import NavbarLogin from "../components/navbarLogin";
import { API } from "../config/api";
import "./detailPost.css";

const Detail = () => {
  let { id } = useParams();
  let { data: journey } = useQuery("journeysCache", async () => {
    const response = await API.get("/journey/" + id);
    return response.data.data;
  });

  //console.log(journey);
  return (
    <div>
      <NavbarLogin />
      <Container className="mt-5 mb-5">
        <div className="mb-5">
          <div className="row">
            <h1 className="col-9 title">{journey?.title}</h1>
            <h2 className="col-3 author"> {journey?.user?.fullname} </h2>
          </div>
          <div>
            <h4 className="date"></h4>
          </div>
        </div>
        <div className="d-flex justify-content-center mb-5">
          <img src={journey?.image} width="75%" alt="" />
        </div>
        <div>
          <div></div>
          <div className="justify">{journey?.descriptions}</div>
        </div>
      </Container>
    </div>
  );
};

export default Detail;
