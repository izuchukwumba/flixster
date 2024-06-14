import "../styles/Navbar.css";
import logo from "../assets/new-flixster-logo.png";

function Navbar() {
  return (
    <div id="navbar-container">
      <div id="navbar">
        <div id="logo-container">
          <img id="logo" src={logo} />
        </div>
        <div id="nav-texts">
          <div id="app-name">Flixster Flick</div>
          <div id="nav-sections">
            <div onClick={() => alert("Coming soon")}>Home</div>
            <div onClick={() => alert("Coming soon")}>Categories</div>
            <div onClick={() => alert("Coming soon")}>Watchlist</div>
            <div onClick={() => alert("Coming soon")}>Settings</div>
          </div>
        </div>

        <div className="right-nav-content">
          <div id="user-welcome">Hello, Izuchukwu</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
