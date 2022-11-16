import React, { useContext, useEffect, useState } from "react";
import "./bookmark.css";
import { Container } from "react-bootstrap";
import NavbarLogin from "../components/navbarLogin";
import { UserContext } from "../context/userContext";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { BiBookmark } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import ToastUnbookmark from "../atoms/toast-unbookmark";

// const dataCard = [
//   {
//     Image: CardImage,
//     Author: "Cipto",
//     Title: "Bersemayam di tanah Dewata",
//     Date: "29 July 2020",
//     Description:
//       "Liburan di tahun baru 2020 keberangkatan saya menuju Pulau Dewata Bali.  Sampai lah saya malam itu di Bali Airport menujukan waktu jam 02.00, dan melanjutkan pejalanan yang menyenangkan..",
//   },
//   {
//     Image: CardImage,
//     Author: "Cipto",
//     Title: "Bersemayam di tanah Dewata",
//     Date: "29 July 2020",
//     Description:
//       "Liburan di tahun baru 2020 keberangkatan saya menuju Pulau Dewata Bali.  Sampai lah saya malam itu di Bali Airport menujukan waktu jam 02.00, dan melanjutkan pejalanan yang menyenangkan..",
//   },
//   {
//     Image: CardImage,
//     Author: "Cipto",
//     Title: "Bersemayam di tanah Dewata",
//     Date: "29 July 2020",
//     Description:
//       "Liburan di tahun baru 2020 keberangkatan saya menuju Pulau Dewata Bali.  Sampai lah saya malam itu di Bali Airport menujukan waktu jam 02.00, dan melanjutkan pejalanan yang menyenangkan..",
//   },
//   {
//     Image: CardImage,
//     Author: "Cipto",
//     Title: "Bersemayam di tanah Dewata",
//     Date: "29 July 2020",
//     Description:
//       "Liburan di tahun baru 2020 keberangkatan saya menuju Pulau Dewata Bali.  Sampai lah saya malam itu di Bali Airport menujukan waktu jam 02.00, dan melanjutkan pejalanan yang menyenangkan..",
//   },
//   {
//     Image: CardImage,
//     Author: "Cipto",
//     Title: "Bersemayam di tanah Dewata",
//     Date: "29 July 2020",
//     Description:
//       "Liburan di tahun baru 2020 keberangkatan saya menuju Pulau Dewata Bali.  Sampai lah saya malam itu di Bali Airport menujukan waktu jam 02.00, dan melanjutkan pejalanan yang menyenangkan..",
//   },
// ];

const BookMark = () => {
  const [showToast, setShowToast] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  let navigate = useNavigate();

  let { data: bookmarks, refetch } = useQuery("bookmarkCache", async () => {
    const response = await API.get("/bookmarks");
    const responseBookmark = response.data.data.filter(
      (p) => p.user.id == state.user.id
    );
    return responseBookmark;
  });

  useEffect(() => {
    refetch();
  }, [state]);

  console.log(bookmarks);

  const handleDelete = async (bookmarkId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      };
      const response = await API.delete(`/bookmark/${bookmarkId}`, config);
      console.log(response);
      refetch();
      navigate("/bookmark");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavbarLogin />
      <Container className="mt-5 mb-5">
        <div className="mb-5">
          <h1 className="bookmark">Bookmark</h1>
        </div>
        <div className="container">
          <ToastUnbookmark show={showToast} setShow={setShowToast} />
          {bookmarks?.length !== 0 ? (
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {bookmarks?.map((item, index) => (
                <div className="col pt-4">
                  <div className="card h-100">
                    <img
                      style={{ minHeight: "50%", maxHeight: "50%" }}
                      src={
                        "http://localhost:5000/uploads/" + item?.journey.image
                      }
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <div className="row">
                        <div className="col-10">
                          <div
                            onClick={() => {
                              navigate(`/detail/${item.id}`);
                            }}
                            key={index}
                            style={{ cursor: "pointer" }}
                          >
                            <h5 className="title-card">
                              {item?.journey.title.slice(0, 15)}...
                            </h5>
                            <h5 className="author float-start">
                              {item?.user.fullname}
                            </h5>
                          </div>
                        </div>
                        <div
                          className="col-2"
                          style={{ zIndex: "1" }}
                          onClick={() => {
                            handleDelete(item.id);
                            setShowToast(true);
                          }}
                        >
                          <BiBookmark />
                        </div>
                      </div>

                      <p className="desc-card">
                        {item?.journey.descriptions.slice(0, 30)}... readmore
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h1>You haven't bookmark any journal yet...</h1>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
export default BookMark;
