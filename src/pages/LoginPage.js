import { Alert, Button, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { TextField } from "mui-rff";
import { useState } from "react";
import { Form } from "react-final-form";
import { useNavigate } from "react-router";

const Login = () => {
    const nav=useNavigate()
    const [errMsg,setErrMsg]=useState('')
  const onSubmit = (values) => {
    axios
      .post("http://localhost:3001/login", {
        email: values.email.toLowerCase().trim(),
        password: values.password,
      })
      .then((res) => {
        console.log(res);
        if(res.data.success)
        nav('/dashboard',{state:{email:values.email.toLowerCase().trim()}})
        setErrMsg(res.data.message)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div >
      <Container><Typography marginTop={5} align='center' variant="h4">♛Royal Center♛</Typography></Container>
        {errMsg&&<Alert sx={{width:'80%',margin:'auto'}} variant='outlined' severity='error'>{errMsg}</Alert>}
      <Container
        sx={{
          margin: "auto",
          mt: "15%",
          backgroundColor: "white",
          width: "40%",
          textAlign: "center",
          padding: "30px",
        }}
      >
        <Form
        initialValues={{
          'email':'royal',
          'password':'1234'
        }}
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                required
                sx={{ margin: "10px" }}
                label="userName"
                name="email"
              ></TextField>
              <TextField
                required
                sx={{ margin: "10px" }}
                label="password"
                name="password"
                type='password'
              ></TextField>
              <Button type="submit" sx={{ mt: "10px" }}>
                Login
              </Button>
            </form>
          )}
        />
      </Container>
    </div>
  );
};

export default Login;