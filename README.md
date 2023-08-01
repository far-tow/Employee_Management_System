## **Employee Management System**

### Including Back-end in Java (Spring boot) and Front-end in both React & Vue3. (The Vue3 version has more features).

### A simple application to have a register over employees (or members).

## Getting Started

###  _Instruction (Backend):_

#### 1. Create a database.
#### 2. Open "application.properties" and change the URL, USERNAME and PASSWORD of your created database.
#### 3. If you are using REACT front-end (or Vue), you have to get access to back-end. You do that by opening /config/CorsConfig.class and change the port to your REACT port (3000) in this line:

```
.allowedOrigins("http://localhost:5173") // Replace with your frontend URL

```
#### 4. You have to do the same to /controller/EmployeeController.class for the @CrossOrigin annotation:

```
@CrossOrigin(origins = "http://localhost:5173") // Replace with your frontend URL
```
##### (Vue often is running on port 5173)

#### 5. That's it. Just run the application and start the front-end application. 

Created by Farhad Towfighian  www.fartow.se