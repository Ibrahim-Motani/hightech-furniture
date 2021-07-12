import { useContext } from "react";
import DataContext from "../../store/data-context";
import "./Navbar.css";

const Navbar = ({ openSidebar }) => {
  const { logoutUser } = useContext(DataContext);

  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__right">
        <i className="fa fa-clock-o" aria-hidden="true"></i>
        &nbsp; &nbsp; &nbsp;
        <p>{new Date().toDateString()}</p>
      </div>
      <button onClick={() => logoutUser()} className="ui inverted red button">Logout</button>
    </nav>
  );
};

export default Navbar;
