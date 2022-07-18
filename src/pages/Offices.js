import axios from "axios";
import { useEffect, useState } from "react";
import OfficesSummary from "../Components/OfficesSummary";

import {
  AppBar,
  Button,
  Toolbar,
  Grid,
  Typography,
  Box,
  MenuItem,
  MenuList,
} from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router";
import { Add } from "@mui/icons-material";
const Offices = () => {
  const [offices, setOffices] = useState([]);
  const nav = useNavigate();

  const removeOffice = (officeNumber) => {
    console.log(officeNumber);
    axios
      .post("http://localhost:3001/deleteOffice", { officeNumber: officeNumber })
      .then((res) => {
        axios
          .get("http://localhost:3001/get_All_Offices")
          .then((res) => {
            console.log(res);
            setOffices(res.data.data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/get_All_Offices")
      .then((res) => {
        console.log(res);
        setOffices(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <Box>
      <Container >
        <Button startIcon={<Add/>}  onClick={()=>{
          nav('/officeManagment')
        }}>new Office</Button>
      </Container>
      <OfficesSummary
        data={offices}
        show={false}
        removeOffice={(officeNumber) => {
          removeOffice(officeNumber);
        }}
      />
    </Box>
  );
};
export default Offices;
