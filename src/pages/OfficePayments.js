import { Box, Container, Grid, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import CardsSkeleton from "../Components/CardsSkeleton";
import OfficePaymentsSummary from "../Components/OfficePaymentsSummary"


const OfficePayments = () => {
  const [requiredPayments, setRequiredPayments] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);


  useEffect(()=>{
    axios
      .post("https://pure-meadow-98451.herokuapp.com/get_Required_Payments",{ token :localStorage.getItem('token')})
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
  },[])
    return (
        <Container >
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} textAlign='center'>
                        <Typography variant="h4">
                          Property Payments
                        </Typography>
                    </Grid>
                    <OfficePaymentsSummary requiredPayments={requiredPayments} setRequiredPayments={setRequiredPayments} dataLoaded={dataLoaded} setDataLoaded={setDataLoaded}/>
                </Grid>
            </Box>
        </Container>
    )
}


export default OfficePayments