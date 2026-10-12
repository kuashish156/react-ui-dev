import Logo from "../assets/Logo.jpg";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={Logo} alt="Taskmate Logo" />
        <span className="header-title">Taskmate</span>
        <p>Your Task Management App</p>
      </div>
      <div className="theme-selector">
        <span className="Light activeTheme">Light</span>
        <span className="Medium">Medium</span>
        <span className="Dark">Dark</span>
        <span className="gOne">gOne</span>
        <span className="gTwo">gTwo</span>
        <span className="gThree">gThree</span>
      </div>
    </header>
  );
};

export default Header;
