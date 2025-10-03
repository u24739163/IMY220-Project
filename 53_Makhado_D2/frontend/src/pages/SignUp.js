import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MedBlock from "../components/MedBlock";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { authAPI } from "../api/api";

export default function SignUp() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function validatePassword(password) {
    const reg = /^(?=.{8,}$)(?=.*[^A-Za-z0-9])(?!.*\s).*$/;
    return reg.test(password);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const username = form.querySelector("#username")?.value.trim() || "";
    const email = form.querySelector("#email")?.value.trim() || "";
    const password = form.querySelector("#password")?.value || "";

    if (!validatePassword(password)) {
      alert(
        "Password must be at least 8 characters long, include at least one special character and contain no spaces."
      );
      return;
    }

    setIsLoading(true);

    try {
      const bio = form.querySelector("#bio")?.value.trim() || "";
      const response = await authAPI.signUp({
        username,
        email,
        password,
        bio,
      });

      if (response.success) {
        localStorage.setItem("currentUser", JSON.stringify(response.user));
        navigate("/home");
      } else {
        alert("Sign up failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      alert(
        error.message || "An error occurred during sign up. Please try again."
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
              Let's get you started
            </h2>
          </div>
          <div className="row">
            <h3 style={{ fontFamily: "SudoFont" }}>
              Please fill in the fields
            </h3>
          </div>
          <div className="row">
            <p style={{ fontFamily: "SudoFont", fontSize: 13, color: "#666" }}>
              *Password must be 8 letters long with at least one special
              character and no spaces
            </p>
          </div>

          <div className="row">
            <div className="container text-center">
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <div className="row">
                  <InputField
                    id="username"
                    name="username"
                    type="text"
                    label="Username"
                    placeholder="Username"
                    required
                  />
                </div>

                <div className="row">
                  <InputField
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Email"
                    required
                  />
                </div>

                <div className="row">
                  <InputField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Create a password"
                    required
                  />
                </div>

                <div className="row justify-content-center">
                  <Button
                    label={isLoading ? "Creating Account..." : "Create Account"}
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
          <MedBlock content={content()} />
        </div>
      </div>
    </>
  );
}
