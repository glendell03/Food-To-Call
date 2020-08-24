import React from "react";
import "../../assets/scss/auth.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";

import FormInput from "../layout/Form Input/FormInput";
import CustomButton from "../layout/Custom Button/CustomButton";

import { Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const API_URL = "http://localhost:5000/";

class Login extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      user: undefined,
      setError: undefined,
    };
  }

  componentDidMount() {
    const user = this.context;
    this.setState({
      user: user,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    try {
      const loginUser = {
        email,
        password,
      };

      const loginRes = await axios.post(API_URL + "users/login", loginUser);
      this.setState({
        email: "",
        password: "",
        user: {
          setUserData: { token: loginRes.data.token, user: loginRes.data.user },
        },
      });

      localStorage.setItem("auth-token", loginRes.data.token);
      this.props.history.push("/users/me");
      window.location.reload();
    } catch (error) {
      error.response.data.msg &&
        this.setState({ setError: error.response.data.msg });
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    const { email, password, setError } = this.state;
    return (
      <div className="container login">
        <h1>LOGIN</h1>
        <Link to="/register" className="account-link">
          Doesn't have an account yet? Click to register
        </Link>
        {setError && <Alert message={setError} type="error" showIcon />}
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            placeholder="email"
            prefix={<MailOutlined />}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            placeholder="password"
            prefix={<LockOutlined />}
          />
          <CustomButton>Login</CustomButton>
        </form>
      </div>
    );
  }
}

export default Login;
