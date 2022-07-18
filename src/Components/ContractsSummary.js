import { Add, Delete, Edit, More, MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import ContractSchema from "../schema/ContractSchema";

const ContractsSummary = ({ data, show, removeContract }) => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [officeNumber, setOfficeNumber] = useState();

  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogContent>
          Are you sure you want to delete the Contract?
        </DialogContent>
        <DialogActions sx={{display:'flex', justifyContent:'space-between'}}>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={()=>{removeContract(officeNumber);handleClose()}}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Button
        sx={{ marginLeft: "300px" }}
        onClick={() => {
          nav("/contractManagment");
        }}
        endIcon={<Add />}
        variant="text"
      >
        add contract
      </Button>
      <Box
        border={1}
        width="70%"
        sx={{
          margin: "auto",
          minWidth: "350px",
          overflow: "auto",
          backgroundColor: "white",
        }}
      >
        {data.map((item,idx) => {
          return (
            <Container key={idx} sx={{ mt: "30px" }}>
              <Typography variant="h5" marginBottom={3}>
                Contract info for office: {item.officeNumber}
              </Typography>
              <Grid container spacing={4}>
                {ContractSchema.map((schema,index) => {
                  return (
                    <Grid key={index} item xs={4}>
                      <Typography variant="h5">{schema.label}</Typography>
                      {!schema.attFun
                        ? item[schema.name]
                        : schema.attFun(item.totalPayment, item.paymentPeriod)}
                    </Grid>
                  );
                })}
                <Grid item xs={12} textAlign="right">
                  <Button sx={{ marginRight: "70px" }} variant="outlined" onClick={()=>{
                    nav('/contractManagment',{state:{contract:item}})
                  }}>
                    Edit contract
                  </Button>
                  <Button color="error" variant="outlined" onClick={()=>{setOpen(true);setOfficeNumber(item.officeNumber)}}>
                    Delete contract
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ margin: "10px" }} />
                </Grid>
              </Grid>
            </Container>
          );
        })}
      </Box>
    </Box>
  );
};

export default ContractsSummary;
