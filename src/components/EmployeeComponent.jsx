import React, { useEffect } from "react";
import { useState } from "react";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const { id } = useParams();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployeeById(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email.toLowerCase());
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  function saveOrUpdateEmployee(e) {
    e.preventDefault();
    if (validateForm()) {
      const employee = { firstName, lastName, email };
      console.log("Employee: ", employee);

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => console.error(error));
      } else {
        createEmployee(employee).then((response) => {
          console.log("Response: ", response.data);
          navigator("/employees");
        });
      }
    }
  }

  function validateForm() {
    let valid = true;
    let errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First Name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last Name is required";
      valid = false;
    }

    if (email.trim() && email.includes("@") && email.includes(".")) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }
    setErrors(errorsCopy);

    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center mb-4">Update Employee</h2>;
    } else {
      return <h2 className="text-center mb-4">New Employee</h2>;
    }
  }
  return (
    <div className="container">
      <br />
      <div className="card col-md-6 offset-md-3 offset-md-3">
        {/* <div className="row"> */}
        {pageTitle()}
        <div className="card-body">
          <form>
            <div className="form-group mb-2">
              <label className="form-label" htmlFor="grid-first-name">
                First Name:
              </label>
              <input
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
                id="grid-first-name"
                type="text"
                placeholder="Jane"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>
            <div className="form-group mb-2">
              <label className="form-label" htmlFor="grid-last-name">
                Last Name:
              </label>
              <input
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                id="grid-last-name"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>
            <div className="form-group mb-2">
              <label className="form-label" htmlFor="grid-email">
                Email:
              </label>
              <input
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="grid-email"
                type="email"
                placeholder="Doe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={saveOrUpdateEmployee}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default EmployeeComponent;
