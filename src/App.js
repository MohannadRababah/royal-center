import './style.css'
import { Routes,Route, useNavigate } from 'react-router-dom'
import Login from './pages/LoginPage'
import { AppBar, Button, Container, Grid, Toolbar, Typography } from '@mui/material'
import Dashboard from './pages/Dashboard'
import Offices from './pages/Offices'
import AddNewOffice from './pages/AddNewOffice'
import Contracts from './pages/Contracts'
import ContractManagment from './pages/ContractManagment'


const App=()=>{
    const nav=useNavigate()
    console.log(window.location.pathname)
    return (
        <>
        <Container sx={{ mb: "120px", display:window.location.pathname==='/'?'none':null }}>
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
              <Grid item md={4}>
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
              <Grid item md={3}>
                <Container sx={{ fontSize: "40px", color: "#F05454" }}>
                  Royal Center
                </Container>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Container>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/offices' element={<Offices/>}/>
            <Route path='/officeManagment' element={<AddNewOffice/>}/>
            <Route path='/contracts' element={<Contracts/>}/>
            <Route path='/contractManagment' element={<ContractManagment/>}/>
        </Routes>
        </>

    )
}


export default App