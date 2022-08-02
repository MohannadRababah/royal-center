import './style.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
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


const App = () => {
  const nav = useNavigate()
  console.log(window.location.pathname)
  return (
    <>
      <Container sx={{ mb: "120px", display: window.location.pathname === '/' ? 'none' : null }}>
        <AppBar sx={{ height: "90px", backgroundColor: "#121212" }}>
          <Toolbar sx={{ height: "90px" }}>
            <Grid container>
              <Grid item md={1}>
                <Button
                  variant='text'
                  color="error"
                  onClick={() => {
                    nav("/");
                  }}
                >
                  Logout
                </Button>
              </Grid>
              <Grid item md={3.4}>
                <Button
                  variant="text"
                  color="error"
                  onClick={() => {
                    nav("/");
                  }}
                >
                  notifications
                </Button>
              </Grid>
              <Grid textAlign='center' item md={3}>
                <div onClick={()=>{nav('/dashboard')}}>
                  <Container sx={{ padding: '0', ":hover": { cursor: 'pointer' }, fontSize: "40px", color: "#F05454" }}>
                    ----Royal Center----
                  </Container>
                </div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Container>
      <Routes>
        <Route path='/' element={<Login />} />
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
      </Routes>
    </>

  )
}


export default App