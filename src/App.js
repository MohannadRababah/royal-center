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
import { ApartmentOutlined, AttachMoneyOutlined, CloudDownloadOutlined, DashboardOutlined, DynamicFormOutlined, ErrorOutline, Logout, MonetizationOnOutlined, ReceiptLongOutlined, SupervisorAccountOutlined } from '@mui/icons-material'
import axios from 'axios'


const App = () => {
  const nav = useNavigate()
  const location = useLocation()
  const UserContext = createContext()
  const [email, setEmail] = useState()
  const [paymentsNotif, setPaymentsNotif] = useState(false)


  useEffect(() => {
    window.scrollTo(0, 0)
    console.log(email, 'email::::login validation');
    if (!localStorage.getItem('token') && window.location.pathname !== '/') {
      nav('/')
    }


  })

  useEffect(() => {

    axios
      .post("https://pure-meadow-98451.herokuapp.com/get_Required_Payments", { token: localStorage.getItem('token') })
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.length > 0) {
            setPaymentsNotif(true)

          }
        }
        else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });


  })

  return (
    <>
      <Grid container spacing={3}>
        <Container sx={{ mb: "120px", display: window.location.pathname === '/' ? 'none' : null }}>
          <AppBar sx={{ height: "90px", backgroundColor: "#121212" }}>
            <Toolbar sx={{ height: "90px" }}>

              <Grid item xs={2} textAlign='center'>
                <Box width='100px' marginTop='15px' marginLeft='40px' onClick={() => { nav('/dashboard') }} sx={{ ":hover": { cursor: 'pointer' } }}><img src='/logo-removebg-preview.png' style={{ height: '100px' }}></img></Box>


              </Grid>

              <Grid textAlign='center' item xs={8}>
                <div style={{ textAlign: 'center' }} >
                  <Container onClick={() => { nav('/dashboard') }} sx={{ padding: '0', ":hover": { cursor: 'pointer' }, fontSize: "30px", color: "#e9ce7f", width: '300px' }}>
                    ♛ Royal Center ♛
                  </Container>
                </div>
              </Grid>
              <Grid item xs={2} textAlign='right'>
                <Button
                endIcon={<Logout/>}
                  variant='text'
                  color="error"
                  sx={{ color: '#e9ce7f' }}
                  onClick={() => {
                    localStorage.clear()
                    nav("/");
                  }}
                >
                  تسجيل الخروج
                </Button>
              </Grid>
            </Toolbar>
          </AppBar>
          <Box sx={{ paddingTop: '130px', direction: 'rtl' }} >
            <Grid container spacing={3} margin='auto'>
              <Grid item textAlign='center' lg={3} sm={4}  ><Button endIcon={<DashboardOutlined sx={{marginRight:'10px'}}/>} onClick={() => { nav('/dashboard') }} sx={{ backgroundColor: 'white', color: window.location.pathname !== '/dashboard' ? 'black' : '#E6BD37', borderColor: 'black', ":hover": { backgroundColor: 'white', borderColor: '#E6BD37' }, borderRadius: '50px', minWidth: '200px' }} variant='outlined'>الصفحة الرئيسية </Button></Grid>
              <Grid item textAlign='center' lg={3} sm={4}  ><Button endIcon={<ApartmentOutlined sx={{marginRight:'10px'}}/>} onClick={() => { nav('/offices') }} sx={{ backgroundColor: 'white', color: window.location.pathname !== '/offices' ? 'black' : '#E6BD37', borderColor: 'black', ":hover": { backgroundColor: 'white', borderColor: '#E6BD37' }, borderRadius: '50px', minWidth: '200px' }} variant='outlined'>الممتلكات</Button></Grid>
              <Grid item textAlign='center' lg={3} sm={4}  ><Button onClick={() => { nav('/contracts') }} sx={{backgroundColor: 'white', color: window.location.pathname !== '/contracts' ? 'black' : '#E6BD37', borderColor: 'black', ":hover": { backgroundColor: 'white', borderColor: '#E6BD37' }, borderRadius: '50px', minWidth: '200px' }} variant='outlined'>العقود <img src='/contract-icon.png' width={20} style={{marginRight:'10px'}} /></Button></Grid>
              <Grid item textAlign='center' lg={3} sm={4}  ><Button endIcon={<SupervisorAccountOutlined sx={{marginRight:'10px'}}/>} onClick={() => { nav('/Renters') }} sx={{ backgroundColor: 'white', color: window.location.pathname !== '/Renters' ? 'black' : '#E6BD37', borderColor: 'black', ":hover": { backgroundColor: 'white', borderColor: '#E6BD37' }, borderRadius: '50px', minWidth: '200px' }} variant='outlined'>معلومات المستأجرين</Button></Grid>
              <Grid item textAlign='center' lg={3} sm={4}  ><Button endIcon={paymentsNotif ? <ErrorOutline color='error' sx={{ marginRight: '10px' }} /> : <MonetizationOnOutlined sx={{ marginRight: '10px' }}/>} onClick={() => { nav('/officesPayments') }} sx={{ backgroundColor: 'white', color: window.location.pathname !== '/officesPayments' ? 'black' : '#E6BD37', borderColor: 'black', ":hover": { backgroundColor: 'white', borderColor: '#E6BD37' }, borderRadius: '50px', minWidth: '200px' }} variant='outlined'>الدفعات المستحقة للممتلكات</Button></Grid>
              <Grid item textAlign='center' lg={3} sm={4}  ><Button endIcon={<ReceiptLongOutlined sx={{marginRight:'10px'}}/>} onClick={() => { nav('/reciepts') }} sx={{ backgroundColor: 'white', color: window.location.pathname !== '/reciepts' ? 'black' : '#E6BD37', borderColor: 'black', ":hover": { backgroundColor: 'white', borderColor: '#E6BD37' }, borderRadius: '50px', minWidth: '200px' }} variant='outlined'>الوصولات</Button></Grid>
              <Grid item textAlign='center' lg={3} sm={4}  ><Button onClick={() => { nav('/oldContratcs') }} sx={{ backgroundColor: 'white', color: window.location.pathname !== '/oldContratcs' ? 'black' : '#E6BD37', borderColor: 'black', ":hover": { backgroundColor: 'white', borderColor: '#E6BD37' }, borderRadius: '50px', minWidth: '200px' }} variant='outlined'>العقود المحذوفة <img src='/result-wrong-icon.png' width={17} style={{marginRight:'10px'}}></img></Button></Grid>
              <Grid item textAlign='center' lg={3} sm={4}  ><Button endIcon={<CloudDownloadOutlined sx={{marginRight:'10px'}}/>} onClick={() => {
                createBackUp()
              }} sx={{ backgroundColor: 'white', color: 'green', borderColor: 'black', ":hover": { backgroundColor: 'white', borderColor: 'green' }, borderRadius: '50px', minWidth: '200px' }} variant='outlined'>تحميل نسخة احتياطية</Button></Grid>
            </Grid>
          </Box>


        </Container></Grid>
      <UserContext.Provider value={{ email: email }}>
        <Routes>
          <Route path='/' element={<Login setEmail={setEmail} />} />
          <Route path='/dashboard' element={<Dashboard setPaymentsNotif={setPaymentsNotif} />} />
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
          <Route path='/*' element={<Container sx={{ textAlign: 'center' }}><Typography variant='h4' color='black'>The requested page is not found</Typography><Typography variant='h4' color='black'>Error: 404</Typography></Container>} />
        </Routes>
      </UserContext.Provider>
    </>

  )
}


export default App