import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SmolBlock from "../components/SmolBlock";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { authAPI } from "../api/api";

export default function Login() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const email = form.querySelector("#email")?.value.trim() || "";
    const password = form.querySelector("#password")?.value || "";

    setIsLoading(true);

    try {
      const response = await authAPI.signIn({ email, password });

      if (response.success) {
        localStorage.setItem("currentUser", JSON.stringify(response.user));
        navigate("/home");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(
        error.message || "An error occurred during login. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function content() {
    return (
      <>
        <div className="container text-center" style={{ marginTop: "10px" }}>
          <div className="row">
            <h2 style={{ fontFamily: "SudoFont", fontWeight: 600 }}>
              Welcome back!
            </h2>
          </div>
          <div className="row">
            <h3 style={{ fontFamily: "SudoFont" }}>
              Please fill in your email and password.
            </h3>
          </div>
          <div className="row">
            <div className="container text-center">
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <div className="row">
                  <InputField
                    id="email"
                    name="email"
                    type="email"
                    label="Email address"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="row">
                  <InputField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="row justify-content-center">
                  <Button
                    label={isLoading ? "Signing in..." : "Login"}
                    type="submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <SmolBlock content={content()} />
        </div>
      </div>
    </>
  );
}
