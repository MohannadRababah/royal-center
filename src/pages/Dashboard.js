import { Height } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Toolbar,
  Grid,
  Typography,
  Box,
  MenuItem,
  MenuList,
  FormLabel,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import OfficesSummary from "../Components/OfficesSummary";
import TableSkeleton from "../Components/TableSkeleton";
import createBackUp from "../utils/createBackUp";

const Dashboard = () => {
  const nav = useNavigate();

  const [offices, setOffices] = useState([]);
  const [requiredPayments, setRequiredPayments] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const addPayment = (officeNumber, payed) => {
    axios
      .post("https://pure-meadow-98451.herokuapp.com/addPayment", {
        officeNumber: officeNumber,
        payed: payed,
        token: localStorage.getItem('token')
      })
      .then((res) => {
        if (res.data.success) {
          axios
            .post("https://pure-meadow-98451.herokuapp.com/get_Required_Payments", { token: localStorage.getItem('token') })
            .then((res) => {
              if (res.data.success) {
                setRequiredPayments(res.data.data)
              }
              else {
                console.log(res.data.message);
              }
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
        else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
   
    setDataLoaded(false)
    axios
      .post("https://pure-meadow-98451.herokuapp.com/get_Offices", { token: localStorage.getItem('token') })
      .then((res) => {
        if(res.data.message==='user is not verified'){
          nav('/')
          return
      }
        if (res.data.success) {
          console.log(res);
          setOffices(res.data.data);
         
          axios
            .post("https://pure-meadow-98451.herokuapp.com/get_Required_Payments", { token: localStorage.getItem('token') })
            .then((res) => {
              if (res.data.success) {
                setRequiredPayments(res.data.data)
                setDataLoaded(true)
              }
              else {
                console.log(res.data.message);
              }
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
        else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });





  }, []);


  return (
    <div>

      <Grid container spacing={3} >
        <Grid item  lg={6} xs={12} margin='auto' >
          {dataLoaded ? <OfficesSummary data={offices} show={true} /> : <TableSkeleton showPagination />}
        </Grid>
        {/* <Box sx={{ position: 'fixed', left: '0' }}>
          <MenuList
            sx={{
              backgroundColor: "#121212",
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              marginTop: '-100px',
              paddingTop: '70px',
              height: '100vh',
            }}
          >
            <MenuItem
              sx={{ color: "#e9ce7f", margin: "15px" }}
              onClick={() => nav("/offices")}
            >
              PROPERTIES
            </MenuItem>
            <MenuItem
              sx={{ color: "#e9ce7f", margin: "15px" }}
              onClick={() => nav("/contracts")}
            >
              CONTRACTS
            </MenuItem>
            <MenuItem
              sx={{ color: "#e9ce7f", margin: "15px" }}
              onClick={() => nav('/Renters')}
            >
              RENTER`S INFO
            </MenuItem>
            <MenuItem
              sx={{ color: "#e9ce7f", margin: "15px" }}
              onClick={() => nav('/oldContratcs')}
            >
              OLD CONTRACTS
            </MenuItem>
            <MenuItem
              sx={{ color: "#e9ce7f", margin: "15px" }}
              onClick={() => nav('/officesPayments')}
            >
              PROPERTY PAYMENTS
            </MenuItem>
            <MenuItem
              sx={{ color: "#e9ce7f", margin: "15px" }}
              onClick={() => nav('/reciepts')}
            >
              RECIEPTS
            </MenuItem>

            <MenuItem
              sx={{ color: "#e9ce7f", margin: "15px", marginTop: '100px', border: 1 }}
              onClick={async () => {
                createBackUp()
              }}
            >
              CREATE BACKUP
            </MenuItem>


          </MenuList>
        </Box> */}

        <Grid item lg={6} xs={12}  >
          {dataLoaded ? <Box  border={1} width={"60%"} sx={{ margin: "auto", minWidth: "550px", backgroundColor: 'white', mb: '30px', borderRadius: '10px',direction:'rtl' }}>
            <Container sx={{ textAlign: 'center',mb:'30px' }}>
              <Typography variant="h4">الدفعات المستحقة للممتلكات</Typography>
            </Container>
            {requiredPayments.length !== 0 ? <Table >
              <TableHead>
                <TableRow>
                  <TableCell> رقم الممتلك : </TableCell>
                  <TableCell> القيمة المستحقة : </TableCell>
                  <TableCell> تاريخ الأستحقاق : </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  requiredPayments.map(item => {
                    var date = new Date(parseInt(item.startDate.slice(6, 10)), parseInt(item.startDate.slice(3, 5)) - 1 + (item.payed) * (12 / (item.paymentPeriod)), parseInt(item.startDate.slice(0, 3)));
                    return <TableRow>
                      <TableCell>{item.officeNumber}</TableCell>
                      <TableCell>{item.totalPayment / item.paymentPeriod}</TableCell>
                      <TableCell>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</TableCell>
                    </TableRow>


                    {/* <Container sx={{ textAlign: 'right', marginBottom: '10px' }}>
                  <Button variant="outlined" sx={{ height: '20px' }} onClick={() => {
                    addPayment(item.officeNumber, item.payed)
                  }}>Add Payment</Button>
                </Container> */}
                    <Divider />
                  })
                }

                <TableRow >
                  <TableCell sx={{textAlign:'left',borderBottom:'0'}} colSpan={3}><Button variant="outlined" onClick={()=>{nav('/officesPayments')}}> الذهاب الى خدمة الدفعات المستحقة</Button></TableCell>

                </TableRow>
              </TableBody>
            </Table> : <Box sx={{ minHeight: '100px', marginTop: '80px' }} textAlign='center'>لا يوجد دفعات حالية</Box>}

          </Box> : <TableSkeleton />}
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
