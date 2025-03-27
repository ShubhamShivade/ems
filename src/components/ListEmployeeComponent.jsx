import React, { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);

  // const [selectedEmployees, setSelectedEmployees] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.error(error));
  }
  function addNewEmployee() {
    navigator("/add-employee");
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }
  function removeEmployee(id) {
    const deletedEmployee = employees.find((employee) => employee.id === id);
    console.log("Deleted Employee: ", deletedEmployee);

    deleteEmployee(id)
      .then((response) => {
        console.log(response.data);
        getAllEmployees();
      })
      .catch((error) => console.error(error));
  }

  // useEffect(() => {
  //   const deleteEmployees = async () => {
  //     for (const employeeId of selectedEmployees) {
  //       try {
  //         await deleteEmployee(employeeId);
  //         setEmployees((prevEmployees) =>
  //           prevEmployees.filter((employee) => employee.id !== employeeId)
  //         );
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };
  //   deleteEmployees();
  // }, [selectedEmployees]);

  // async function deleteSelectedEmployees() {
  //   navigator("/employees");
  //   const remainingEmployees = employees.filter(
  //     (employee) => !selectedEmployees.includes(employee.id)
  //   );
  //   setEmployees(remainingEmployees);
  //   setSelectedEmployees([]);
  // }

  return (
    <div className="container bg-white p-4">
      <div>
        <h2 className="text-center fw-bold mb-4">List of Employees</h2>
        <div className="d-flex justify-content-center mb-3">
          <button onClick={addNewEmployee} className="btn btn-primary me-2">
            New Employee
          </button>

          {/* <button onClick={deleteSelectedEmployees} className="btn btn-danger">
            Delete Employee
          </button> */}
        </div>
        <table className="table table-bordered text-center">
          <thead className="table-light">
            <tr>
              {/* <th>Select</th> */}
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                {/* <td>
                  <input
                    type="checkbox"
                    name="checkbox"
                    onChange={(e) => setSelectedEmployees(e.target.value)}
                  />
                </td> */}
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>
                  <button
                    onClick={() => updateEmployee(employee.id)}
                    className="btn btn-info me-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => removeEmployee(employee.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;
