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
            <div>Home</div>
            <div>Categories</div>
            <div>Watchlist</div>
            <div>Settings</div>
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
