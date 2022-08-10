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
import TableSkeleton from "../Components/TableSkeleton";
const Offices = () => {
  const [offices, setOffices] = useState([]);
  const nav = useNavigate();
  const [dataLoaded, setDataLoaded] = useState(false);


  const removeOffice = (officeNumber) => {
    setDataLoaded(false)
    console.log(officeNumber);
    axios
      .post("https://pure-meadow-98451.herokuapp.com/deleteOffice", { officeNumber: officeNumber, token :localStorage.getItem('token') })
      .then((res) => {
        if(res.data.message==='user is not verified'){
          nav('/')
          return
      }
        if (res.data.success) {
          axios
            .post("https://pure-meadow-98451.herokuapp.com/get_All_Offices",{ token :localStorage.getItem('token')})
            .then((res) => {
              if (res.data.success) {
                console.log(res);
                setOffices(res.data.data);
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
  };


  useEffect(() => {
    axios
      .post("https://pure-meadow-98451.herokuapp.com/get_All_Offices",{ token :localStorage.getItem('token')})
      .then((res) => {
        if(res.data.message==='user is not verified'){
          nav('/')
          return
      }
        if (res.data.success) {
          console.log(res);
          setOffices(res.data.data)
          setDataLoaded(true)

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
    <Box >
      <Grid container spacing={3}>
        <Grid item xs={6} textAlign='center'>
          <Button color="success" startIcon={<Add />} onClick={() => {
            nav('/officeManagment')
          }}>new Office</Button>
        </Grid>
        <Grid item xs={12}>
          {dataLoaded?<OfficesSummary
            data={offices}
            show={false}
            removeOffice={(officeNumber) => {
              removeOffice(officeNumber);
            }}
          />:<TableSkeleton showPagination/>}
        </Grid>
      </Grid>
    </Box>
  );
};
export default Offices;
