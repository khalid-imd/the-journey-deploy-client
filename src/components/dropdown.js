import Dropdown from "react-bootstrap/Dropdown";
import User from "../assets/dropdown-user.png";
import Journey from "../assets/dropdown-journey.png";
import Bookmark from "../assets/dropdown-bookmark.png";
import Logout from "../assets/dropdown-logout.png";
import IconProfile from "../assets/profile-user.png";
import { Link } from "react-router-dom";

const DropdownProfile = () => {
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="bg-none">
          <img width="25px" src={IconProfile} alt="" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link to="/profile" className="text-decoration-none">
              <img src={User} alt="user" /> Profile
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/new-journey" className="text-decoration-none">
              <img src={Journey} alt="journey" /> New Journey
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/bookmark" className="text-decoration-none">
              <img src={Bookmark} alt="bookmark" /> Bookmark
            </Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <Link to="/" className="text-decoration-none">
              <img src={Logout} alt="logout" /> Logout
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropdownProfile;
