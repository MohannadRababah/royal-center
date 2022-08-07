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
        if (res.data.success) {
          axios
            .get("http://localhost:3001/get_All_Offices")
            .then((res) => {
              if (res.data.success) {
                console.log(res);
                setOffices(res.data.data);
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
  };


  useEffect(() => {
    axios
      .get("http://localhost:3001/get_All_Offices")
      .then((res) => {
        if (res.data.success) {
          console.log(res);
          setOffices(res.data.data)
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
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={6} textAlign='center'>
          <Button startIcon={<Add />} onClick={() => {
            nav('/officeManagment')
          }}>new Office</Button>
        </Grid>
        <Grid item xs={12}>
          <OfficesSummary
            data={offices}
            show={false}
            removeOffice={(officeNumber) => {
              removeOffice(officeNumber);
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Offices;
