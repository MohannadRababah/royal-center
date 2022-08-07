import './style.css'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Login from './pages/LoginPage'
import { AppBar, Button, Container, Grid, Toolbar, Typography } from '@mui/material'
import Dashboard from './pages/Dashboard'
import Offices from './pages/Offices'
import AddNewOffice from './pages/AddNewOffice'
import Contracts from './pages/Contracts'
import ContractManagment from './pages/ContractManagment'
import Renters from './pages/Renters'
import RenterManagment from './pages/RenterManagment'
import OldContracts from './pages/OldContracts'
import OfficePayments from './pages/OfficePayments'
import Reciepts from './pages/Reciepts'
import { createContext, useContext, useEffect, useState } from 'react'
import AddNewReciept from './pages/AddNewReciept'


const App = () => {
  const nav = useNavigate()
  const location = useLocation()
  const UserContext = createContext()
  const [email, setEmail] = useState()


  useEffect(()=>{
    console.log(email,'email::::login validation');
    if(email === undefined && window.location.pathname !== '/'){
      nav('/') 
    }
        
      
  })

  return (
    <>
      
      <Container sx={{ mb: "120px", display: window.location.pathname === '/' ? 'none' : null }}>
        <Grid container><AppBar sx={{ height: "90px", backgroundColor: "#121212" }}>
          <Toolbar sx={{ height: "90px" }}>

            <Grid item xs={2} textAlign='center'>
            <img src='/logo-removebg-preview.png' style={{height:'100px',width:'100px',marginRight:'65px'}}></img>

              
            </Grid>

            <Grid textAlign='center' item xs={8}>
              <div style={{ textAlign: 'center' }} onClick={() => { nav('/dashboard') }}>
                <Container sx={{ padding: '0', ":hover": { cursor: 'pointer' }, fontSize: "30px", color: "#e9ce7f" }}>
                  ♛ Royal Center ♛
                </Container>
              </div>
            </Grid>
            <Grid item xs={2} textAlign='right'>
            <Button
                variant='text'
                color="error"
                sx={{color:'#e9ce7f'}}
                onClick={() => {
                  nav("/");
                }}
              >
                Logout
              </Button>
            </Grid>
          </Toolbar>
        </AppBar></Grid>
      </Container>
      <UserContext.Provider value={{ email: email }}>
        <Routes>
          <Route path='/' element={<Login setEmail={setEmail} />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/offices' element={<Offices />} />
          <Route path='/officeManagment' element={<AddNewOffice />} />
          <Route path='/contracts' element={<Contracts />} />
          <Route path='/oldContratcs' element={<OldContracts />} />
          <Route path='/contractManagment' element={<ContractManagment />} />
          <Route path='/Renters' element={<Renters />} />
          <Route path='/renterManagment' element={<RenterManagment />} />
          <Route path='/officesPayments' element={<OfficePayments />} />
          <Route path='/reciepts' element={<Reciepts />} />
          <Route path='/recieptManagment' element={<AddNewReciept />} />
        </Routes>
      </UserContext.Provider>
    </>

  )
}


export default App