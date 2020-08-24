import React from "react";
import "../../assets/scss/auth.scss";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

import FormInput from "../layout/Form Input/FormInput";
import CustomButton from "../layout/Custom Button/CustomButton";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

import { Alert } from "antd";

const API_URL = "http://localhost:5000/";

class Register extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
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
    const { username, email, password, confirmPassword } = this.state;

    try {
      const newUser = {
        username,
        email,
        password,
        confirmPassword,
      };

      await axios.post(API_URL + "users/register", newUser);
      const loginRes = await axios.post(API_URL + "users/login", {
        email,
        password,
      });

      this.setState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
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
    const { username, email, password, confirmPassword, setError } = this.state;

    return (
      <div className="container">
        <h1>REGISTER</h1>
        <Link to="/login" className="account-link">
          Already have an account? Click here
        </Link>
        {setError && <Alert message={setError} type="error" showIcon />}
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
            placeholder="username"
            prefix={<UserOutlined />}
          />
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
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            placeholder="confirm password"
            prefix={<LockOutlined />}
          />

          <CustomButton>Register</CustomButton>
        </form>
      </div>
    );
  }
}

export default Register;
