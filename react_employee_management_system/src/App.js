import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';

function App() {
  return (
    <div>
      <Router>
          <HeaderComponent />
          <div className="container">
            <Routes> 
              <Route path='/' exact element={<ListEmployeeComponent />} /> 
              <Route path='/employees' element={<ListEmployeeComponent />} />
              <Route path='/add-employee' exact element={<CreateEmployeeComponent />} /> 
              <Route path="/edit-employee/:id" element={<UpdateEmployeeComponent />} />
              <Route path="/view-employee/:id" element={<ViewEmployeeComponent />} />
               
            </Routes>
          </div>
          <FooterComponent />
      </Router>
    </div>
  );
}

export default App;