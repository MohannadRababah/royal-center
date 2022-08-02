import { Box, FormControl, FormLabel, Input, MenuItem, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Field, Form } from "react-final-form";
import { TextField, Select } from "mui-rff";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import uploadDocument from "../utils/uploadDocument";
import { Add } from "@mui/icons-material";

const ContractManagment = () => {
  const location = useLocation();
  const nav = useNavigate();
  const [msg, setMsg] = useState("");
  const [initVal, setInitVal] = useState(location?.state?.contract);
  const [newRenter, setNewRenter] = useState(false);
  const [renters, setRenters] = useState([{name:'mohannad',phone:'099'}]);

  const uploadFile = (file) => {
    const fileToUpload = uploadDocument(file.target.files[0]).finally(() => {
      axios
        .post("http://localhost:3001/uploadFile", {
          file: fileToUpload,
        })
        .then((res) => {
          console.log(res);
          console.log(fileToUpload, "kkkk");
        })
        .catch((err) => {
          console.log(err);
          // setMsg(err);
        });
    });
  };

  const handleClose = () => {
    if (msg === "Contract has been added" || msg === "Contract data updated")
      nav("/contracts");
    else setMsg("");
  };
  const onSubmit = (values) => {
    
    if (!!initVal) {
      axios
        .post("http://localhost:3001/editContract", {
          id: location?.state?.contract?._id,
          oldOfficeNumber: location?.state?.contract?.officeNumber,
          officeNumber: values.officeNumber,
          startDate: values.startDate,
          endDate: values.endDate,
          totalPayment: values.totalPayment,
          paymentPeriod: values.paymentPeriod,
        })
        .then((res) => {
          console.log(res);
          setMsg(res?.data?.message);
        })
        .catch((err) => {
          console.log(err);
          setMsg(err.message);
        });
    } else {

      axios
        .post("http://localhost:3001/addContract", {
          officeNumber: values.officeNumber,
          startDate: values.startDate,
          endDate: values.endDate,
          totalPayment: values.totalPayment,
          paymentPeriod: values.paymentPeriod,
        })
        .then((res) => {
          if (res.data.success) {
            axios.post('http://localhost:3001/addRenter', {
              name: values?.renterName,
              phone: newRenter?values?.renterPhone:values?.renterInfo,
              email: values?.renterEmail,
              idDocument: 'todo',
              officeNumber: values?.officeNumber,
            }).then(() => {
              setMsg(res.data.message);
            }).catch(err => {
              setMsg(err.message);
            })
          } else {
            setMsg(res.data.message)
          }
          console.log(res);

        })
        .catch((err) => {
          console.log(err);
          setMsg(err.message);
        });





    }
  };

  useEffect(()=>{
    axios.get('http://localhost:3001/get_Renters').then(res=>{
      setRenters(res.data.data)
    }).catch(err=>{
      setMsg(err.message);
    })
  })

  return (
    <Container sx={{ backgroundColor: "white", padding: "100px" }}>
      {msg && (
        <Dialog open={msg ? true : false} onClose={handleClose} fullWidth>
          <DialogContent>{msg}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>ok</Button>
          </DialogActions>
        </Dialog>
      )}
      <Form
        initialValues={{
          ...initVal,
        }}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid textAlign='center' item xs={12}>
                <Typography variant="h4">Contract's Information</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="officeNumber"
                  label="office number"
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="startDate"
                  label="Start Date"
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField required name="endDate" label="End Date"></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="totalPayment"
                  label="Total Payment"
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="paymentPeriod"
                  label="Payment Period"
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Contract:</FormLabel>
                <Container>
                  <input
                    type="file"
                    //onChange={uploadFile}
                    name="contractDoc"
                  ></input>
                </Container>
              </Grid>




              {!initVal && <>
                <Grid item xs={12} textAlign='center'>
                  <Typography variant="h4">Renter's Information</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button endIcon={!newRenter?<Add/>:null} onClick={()=>{setNewRenter(!newRenter)}}>{newRenter?'Select from existing renters':'New renter'}</Button>
                  </Grid>
                {newRenter ? <><Grid item xs={12}>
                  <TextField
                    required
                    name="renterName"
                    label="Renter's name:"
                  ></TextField>
                </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      name="renterPhone"
                      label="Renter's Phone Number:"
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      name="renterEmail"
                      label="Renter's Email:"
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <FormLabel>Renter's ID:</FormLabel>
                    <Container>
                      <input
                        type="file"
                        //onChange={uploadFile}
                        name="renterID"
                      ></input>
                    </Container>
                  </Grid>
                </> :
                  // <Field
                  // name="renterInfo"
                  // render={()=>()}
                  // />
                  <>
                    <Grid item xs={12}>
                      <Select label='Choose from existing renters:' name="renterInfo" >
                        {
                          renters.map((item,idx)=>{
                            return <MenuItem key={idx} value={item.phone}>name: {item.name} phone: {item.phone}</MenuItem>
                          })
                        }
                      </Select>
                    </Grid>
                  </>
                }
              </>}



              <Grid textAlign="right" item xs={12}>
                <Button type="submit" variant="outlined">
                  {!initVal ? "Add" : "Save"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </Container>
  );
};

export default ContractManagment;
