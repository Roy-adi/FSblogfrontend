import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS

import NavBar from './Component/NavBar';
import Create from './Component/Create';
import Update from './Component/Update';
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Signup from './Component/Auth/Signup';
import Login from './Component/Auth/Login';
import DataProvider from './Component/DataProvider';
import Profile from './Component/Profile';
import Home from './Component/Home/Home';
import Blogdetails from './Component/BlogDetails/Blogdetails';
function App() {

  return (
   <>
   <DataProvider>
   <BrowserRouter>
   <NavBar/>
   <Routes>
   <Route path='/' element={<Home/>} />
   <Route path='/signup' element={<Signup/>} />
   <Route path='/login' element={<Login/>} />
   <Route path='/profile' element={ <Profile/> } />
   <Route path='/create' element={<Create/>} />
   <Route path='/update/:id' element= {<Update/>}  />
   <Route path='/blog/:id' element={<Blogdetails/>} />
   </Routes>
   </BrowserRouter>

   </DataProvider>
   
   </>
  );
}


export default App;
