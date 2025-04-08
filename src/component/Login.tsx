import React, { useState } from "react";
import { TextField, Button, Typography, Container, Paper } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { base_url, createAccountAPI, loginAPI } from "./Api";

interface FormValues {
  email: string;
  password: string;
  confirmPassword?: string;
}

const LoginSignup: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (values: FormValues) => {
    const payload = {
      username: values.email,
      password: values.password,
      ...(isLogin ? {} : { role: "user" }),
    };

    const endpoint = isLogin ? loginAPI : createAccountAPI;

    try {
      const response = await fetch(`${base_url}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        window.location.href = "/";
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("Something went wrong");
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
    confirmPassword: !isLogin
      ? Yup.string()
          .oneOf([Yup.ref("password"), undefined], "Passwords must match")
          .required("Required")
      : Yup.string(),
  });

  return (
    <Container maxWidth="sm" className="flex justify-center items-center min-h-screen">
      <Paper elevation={3} className="p-6 w-full">
        <Typography variant="h5" className="text-center font-bold">
          {isLogin ? "Login to CricQuiz" : "Sign Up for CricQuiz"}
        </Typography>
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-4 flex flex-col gap-4">
              <Field as={TextField} label="Email" name="email" fullWidth />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              
              <Field as={TextField} label="Password" type="password" name="password" fullWidth />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              
              {!isLogin && (
                <>
                  <Field as={TextField} label="Confirm Password" type="password" name="confirmPassword" fullWidth />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                </>
              )}
              
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                {isLogin ? "Login" : "Sign Up"}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Button color="primary" onClick={toggleForm}>
            {isLogin ? "Sign Up" : "Login"}
          </Button>
        </Typography>
      </Paper>
    </Container>
  );
};

export default LoginSignup;
