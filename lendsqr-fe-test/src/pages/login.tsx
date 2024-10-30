import "../styles/Base.scss";
import "../styles/login.scss";
import unboardSVG from "../assets/pablo-sign-in.png";
import Logo from "../assets/Group.svg";
import { useState } from "react";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="body">
      <img id="logoImg" src={Logo} alt="Company's Logo" />
      <div id="first__side">
        <img src={unboardSVG} alt="A visual representation for login" />
      </div>
      <div id="second__side">
        <div className="input__text">
          <h1 className="header">Welcome!</h1>
          <p className="paragraph">Enter details to login.</p>
        </div>
        <div className="form">
          <form className="login__form" onSubmit={handleSubmit}>
            <div className="total__input">
              <div className="form__group">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="form__input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form__group">
                <div className="password__input__container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Password"
                    className="form__input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="show__password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>
              <a type="button" className="forgot__password">
                FORGOT PASSWORD?
              </a>
            </div>
            <button type="submit" className="login__button">
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
