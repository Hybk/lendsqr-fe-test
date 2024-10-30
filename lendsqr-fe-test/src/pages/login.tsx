import "../styles/Base.scss";
import "../styles/login.scss";
import unboardSVG from "../assets/pablo-sign-in.png";
import Logo from "../assets/Group.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form data:", formData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="log__body">
      <img id="logoImg" src={Logo} alt="Company's Logo" />
      <div id="first__side">
        <img src={unboardSVG} alt="A visual representation for login" />
      </div>
      <div id="second__side">
        <div className="input__text">
          <h1 className="header__text">Welcome!</h1>
          <p className="paragraph">Enter details to login.</p>
        </div>
        <div className="form">
          <form className="login__form" onSubmit={handleSubmit}>
            <div className="total__input">
              <div className="form__group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="form__input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form__group">
                <div className="password__input__container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="form__input"
                    value={formData.password}
                    onChange={handleChange}
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
            <button
              type="submit"
              className="login__button"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loader__container">
                  <Loader2 className="loader__icon loader" />
                </span>
              ) : (
                "LOG IN"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
