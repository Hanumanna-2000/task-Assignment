
import './App.css';
import Adduser from './components/User/Adduser';
import Alluser from './components/User/Alluser';
import Home from './components/User/Home';
import LoginUser from './components/User/LoginUser';
import Navbar from './components/User/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Verifyotp from './components/User/Verifyotp';
import Taskadd from './components/User/Taskadd';

import Updatetask from './components/User/Updatetask';
import GetAlltask from './components/User/GetAlltask';
import DeleteTask from './components/User/DeleteTask';

import AuthProvider from './components/authentication/AuthProvider';
import ProtectedRoute from './components/authentication/ProtectedRoute';
import Dashboard from './components/User/Dashboard';


function App() {
  return (
    <BrowserRouter>

    <AuthProvider>
    <Navbar/>
    <Routes>
      <Route  path='/' element={<Home/>}  />
      <Route  path='/adduser' element={<Adduser/>}  />
      <Route  path='/userlist' element={<ProtectedRoute><Alluser/></ProtectedRoute>}  />
      <Route  path='/login' element={<LoginUser/>}  />
      <Route  path='/verifyotp' element={<Verifyotp/>}  />
      <Route  path='/addtask' element={
        <ProtectedRoute>
          <Taskadd/>
        </ProtectedRoute>
      }  />
      <Route  path='/getalltask' element={<ProtectedRoute><GetAlltask/></ProtectedRoute>}  />
      <Route  path='/updatetask/:id' element={<Updatetask/>}  />
      <Route  path='/deletetask/:id' element={<DeleteTask/>}  />
      <Route  path='/dashboard' element={<Dashboard/>}  />


    </Routes>
    </AuthProvider>

    

    </BrowserRouter>
  );
}

export default App;
{/* <div className="App">
      <Navbar/>
      <Adduser/>
      <hr/>
      <Alluser/>
      <hr/>
      <LoginUser/>
      <hr/>
      {/* <Verifyotp/> */}
      // <hr/>
    // </div> */}