import React from "react";
import { GoogleLogin } from "react-google-login";
import { Button, Box } from "@mui/material";
import Img from "./../../assets/google.png";
import { makeStyles } from "@mui/styles";
import componentStyles from "./../../theme/views/auth/login";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(componentStyles);

const GoogleLoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const responseGoogle = (res) => {
    const emailUsed = res.profileObj.email;
    const index = emailUsed.indexOf("@");
    const domain = emailUsed.substr(index);
    if (domain !== "@iitbbs.ac.in") alert("Please use iitbbs email id");
    else {
      localStorage.setItem("isLoggedIn", true);
      navigate("/");
    }
  };

  return (
    <GoogleLogin
      clientId="816660866473-fadi5se1vpsndhpo004d466d1iea1hvl.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
      render={(renderProps) => (
        <Button
          classes={{ root: classes.buttonRoot }}
          sx={{}}
          onClick={renderProps.onClick}
        >
          <Box component="span" marginRight="4px">
            <Box
              alt="..."
              component="img"
              width="20px"
              className={classes.buttonImg}
              src={Img}
            ></Box>
          </Box>
          <Box component="span" marginLeft=".75rem">
            Google
          </Box>
        </Button>
      )}
    />
  );
};
export default GoogleLoginPage;
