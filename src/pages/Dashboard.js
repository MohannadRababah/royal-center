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
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import OfficesSummary from "../Components/OfficesSummary";

const Dashboard = () => {
  const nav = useNavigate();

  const [offices, setOffices] = useState([]);
  const [requiredPayments, setRequiredPayments] = useState([]);

  const addPayment = (officeNumber, payed) => {
    axios
      .post("http://localhost:3001/addPayment", {
        officeNumber: officeNumber,
        payed: payed
      })
      .then((res) => {
        if (res.data.success) {
          axios
            .get("http://localhost:3001/get_Required_Payments")
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
    axios
      .get("http://localhost:3001/get_Offices")
      .then((res) => {
        if(res.data.success){
          console.log(res);
          setOffices(res.data.data);
        }
        else{
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });

    axios
      .get("http://localhost:3001/get_Required_Payments")
      .then((res) => {
        if(res.data.success){
          setRequiredPayments(res.data.data)
        }
        else{
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });


  }, []);


  return (
    <div>

      <Box sx={{ display: "flex" }}>
        <Container >
          <OfficesSummary data={offices} show={true} />
        </Container>
        <Box sx={{ position: 'fixed', right: '0' }}>
          <MenuList
            sx={{
              backgroundColor: "#121212",
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
            }}
          >
            <MenuItem
              sx={{ color: "#F05454", margin: "15px" }}
              onClick={() => nav("/offices")}
            >
              Offices
            </MenuItem>
            <MenuItem
              sx={{ color: "#F05454", margin: "15px" }}
              onClick={() => nav("/contracts")}
            >
              Contracts
            </MenuItem>
            <MenuItem
              sx={{ color: "#F05454", margin: "15px" }}
              onClick={() => nav('/Renters')}
            >
              Renters Info
            </MenuItem>
            <MenuItem
              sx={{ color: "#F05454", margin: "15px" }}
              onClick={() => nav('/oldContratcs')}
            >
              Old Contracts
            </MenuItem>
            <MenuItem
              sx={{ color: "#F05454", margin: "15px" }}
              onClick={() => nav('/officesPayments')}
            >
              Offices Payments
            </MenuItem>
            <MenuItem
              sx={{ color: "#F05454", margin: "15px" }}
              onClick={() => nav('/reciepts')}
            >
              Reciepts
            </MenuItem>
          </MenuList>
        </Box>
      </Box>
      <Container sx={{ marginTop: '100px' }}>
        <Box border={1} sx={{ backgroundColor: 'white', width: '60%', minWidth: '350px', margin: 'auto' }}>
          <Container sx={{ textAlign: 'center' }}>
            <Typography variant="h4">Offices payments</Typography>
          </Container>
          {
            requiredPayments.map(item => {
              var date = new Date(parseInt(item.startDate.slice(6, 10)), parseInt(item.startDate.slice(3, 5)) - 1 + (12 / (item.paymentPeriod)) + (item.payed) * (12 / (item.paymentPeriod)), parseInt(item.startDate.slice(0, 3)));
              return <Box margin={3}><Box margin='10px' display='flex' justifyContent='space-evenly'>
                <FormLabel> Office Number : </FormLabel>{item.officeNumber}
                <FormLabel > Required Payment : </FormLabel> {item.totalPayment / item.paymentPeriod}
                <FormLabel> Payment Date : </FormLabel> {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
              </Box>
                {/* <Container sx={{ textAlign: 'right', marginBottom: '10px' }}>
                  <Button variant="outlined" sx={{ height: '20px' }} onClick={() => {
                    addPayment(item.officeNumber, item.payed)
                  }}>Add Payment</Button>
                </Container> */}
                <Divider /></Box>
            })
          }
        </Box>
      </Container>
    </div>
  );
};

export default Dashboard;
