import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

import CustomButton from "../layout/Custom Button/CustomButton";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  return (
    <div>
      {userData.user ? (
        <CustomButton onClick={logout}>LOGOUT</CustomButton>
      ) : (
        <CustomButton onClick={login}>LOGIN</CustomButton>
      )}
    </div>
  );
}
