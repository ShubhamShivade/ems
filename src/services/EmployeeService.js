import axios from 'axios';

// const REST_API_BASE_URL = "http://localhost:8080/api/employees";
// const REST_API_DELETE_MULTIPLE = "http://localhost:8080/api/employees/bulk";

const REST_API_BASE_URL = "https://ems-serviceportal.up.railway.app/api/employees";
const REST_API_DELETE_MULTIPLE = "https://ems-serviceportal.up.railway.app/api/employees/bulk";

export const listEmployees = () => axios.get(REST_API_BASE_URL);

export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

export const getEmployeeById = (employeeId
) => axios.get(`${REST_API_BASE_URL}/${employeeId}`);

export const updateEmployee = (employeeId, employee) => axios.put(`${REST_API_BASE_URL}/${employeeId}`, employee);

export const deleteEmployee = (employeeId) => axios.delete(`${REST_API_BASE_URL}/${employeeId}`);

export const deleteSelectedEmployees = (selectedEmployees) => axios.delete(REST_API_DELETE_MULTIPLE, { data: selectedEmployees });

export const deleteAllEmployees = () => axios.delete(REST_API_BASE_URL);

export const searchEmployees = (search) => axios.get(`${REST_API_BASE_URL}?search=${search}`);