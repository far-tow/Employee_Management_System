package eu.fartow.employee_managment_system.controller;

import eu.fartow.employee_managment_system.exception.ResourceNotFoundException;
import eu.fartow.employee_managment_system.model.Employee;
import eu.fartow.employee_managment_system.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173") // Replace with your frontend URL
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Gett all employees
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    //Create employee rest api
    @PostMapping("/employees")
    public Employee createEmployee(@Valid @RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }

    //Get employee by id rest api
    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));
        return ResponseEntity.ok(employee);
    }

    // Update employee by id rest api
    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployeeById(@PathVariable Long id, @RequestBody Employee employeeData) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

        // Update the employee data with the new values from the request body
        employee.setFirstName(employeeData.getFirstName());
        employee.setLastName(employeeData.getLastName());
        employee.setEmailId(employeeData.getEmailId());

        // Save the updated employee
        Employee updatedEmployee = employeeRepository.save(employee);

        return ResponseEntity.ok(updatedEmployee);
    }

    //Delete employee by id rest api
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

        employeeRepository.delete(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}