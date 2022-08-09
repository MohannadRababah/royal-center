import './style.css'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Login from './pages/LoginPage'
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from '@mui/material'
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
import createBackUp from './utils/createBackUp'


const App = () => {
  const nav = useNavigate()
  const location = useLocation()
  const UserContext = createContext()
  const [email, setEmail] = useState()


  useEffect(() => {
    console.log(email, 'email::::login validation');
    if (!localStorage.getItem('token') && window.location.pathname !== '/') {
      nav('/')
    }


  })

  return (
    <>
<Grid container spacing={3}>
      <Container sx={{ mb: "120px", display: window.location.pathname === '/'? 'none' : null }}>
        <AppBar sx={{ height: "90px", backgroundColor: "#121212" }}>
          <Toolbar sx={{ height: "90px" }}>

            <Grid item xs={2} textAlign='center'>
              <img src='/logo-removebg-preview.png' style={{ height: '100px', width: '100px', marginRight: '65px' }}></img>


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
                sx={{ color: '#e9ce7f' }}
                onClick={() => {
                  localStorage.clear()
                  nav("/");
                }}
              >
                Logout
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>
          <Box sx={{mt:'130px'}}>
            <Grid container spacing={3}>
            <Grid item lg={3} sm={4}  ><Button onClick={()=>{nav('/dashboard')}} sx={{color:window.location.pathname!=='/dashboard'?'black':'#e9ce7f',borderColor:'black',":hover":{borderColor:'#e9ce7f'},borderRadius:'50px',minWidth:'200px'}} variant='outlined'>Dashboard</Button></Grid>
            <Grid item lg={3} sm={4}  ><Button onClick={()=>{nav('/offices')}} sx={{color:window.location.pathname!=='/offices'?'black':'#e9ce7f',borderColor:'black',":hover":{borderColor:'#e9ce7f'},borderRadius:'50px',minWidth:'200px'}} variant='outlined'>PROPERTIES</Button></Grid>
            <Grid item lg={3} sm={4}  ><Button onClick={()=>{nav('/contracts')}} sx={{color:window.location.pathname!=='/contracts'?'black':'#e9ce7f',borderColor:'black',":hover":{borderColor:'#e9ce7f'},borderRadius:'50px',minWidth:'200px'}} variant='outlined'>CONTRACTS</Button></Grid>
            <Grid item lg={3} sm={4}  ><Button onClick={()=>{nav('/Renters')}} sx={{color:window.location.pathname!=='/Renters'?'black':'#e9ce7f',borderColor:'black',":hover":{borderColor:'#e9ce7f'},borderRadius:'50px',minWidth:'200px'}} variant='outlined'>RENTER`S INFO</Button></Grid>
            <Grid item lg={3} sm={4}  ><Button onClick={()=>{nav('/oldContratcs')}} sx={{color:window.location.pathname!=='/oldContratcs'?'black':'#e9ce7f',borderColor:'black',":hover":{borderColor:'#e9ce7f'},borderRadius:'50px',minWidth:'200px'}} variant='outlined'>OLD CONTRACTS</Button></Grid>
            <Grid item lg={3} sm={4}  ><Button onClick={()=>{nav('/officesPayments')}} sx={{color:window.location.pathname!=='/officesPayments'?'black':'#e9ce7f',borderColor:'black',":hover":{borderColor:'#e9ce7f'},borderRadius:'50px',minWidth:'200px'}} variant='outlined'>PROPERTY PAYMENTS</Button></Grid>
            <Grid item lg={3} sm={4}  ><Button onClick={()=>{nav('/reciepts')}} sx={{color:window.location.pathname!=='/reciepts'?'black':'#e9ce7f',borderColor:'black',":hover":{borderColor:'#e9ce7f'},borderRadius:'50px',minWidth:'200px'}} variant='outlined'>RECIEPTS</Button></Grid>
            <Grid item lg={3} sm={4}  ><Button onClick={()=>{
              createBackUp()
            }} sx={{color:'green',borderColor:'black',":hover":{borderColor:'#e9ce7f'},borderRadius:'50px',minWidth:'200px'}} variant='outlined'>CREATE BACKUP</Button></Grid>
            </Grid>    
          </Box>
        

      </Container></Grid>
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
          <Route path='/*' element={<Container sx={{textAlign:'center'}}><Typography variant='h4'>The requested page is not found</Typography><Typography variant='h4'>Error: 404</Typography></Container>} />
        </Routes>
      </UserContext.Provider>
    </>

  )
}


export default App