package eu.fartow.employee_managment_system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"eu.fartow.employee_managment_system", "eu.fartow.employee_managment_system.config"})
public class EmployeeManagmentSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmployeeManagmentSystemApplication.class, args);
    }

}