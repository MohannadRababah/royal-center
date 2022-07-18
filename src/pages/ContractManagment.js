import { Box, Input } from "@mui/material";
import { Container } from "@mui/system";
import { Field, Form } from "react-final-form";
import { TextField } from "mui-rff";
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

const ContractManagment = () => {
  const location = useLocation();
  const nav = useNavigate();
  const [msg, setMsg] = useState("");
  const [initVal, setInitVal] = useState(location?.state?.contract);

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
          console.log(res);
          setMsg(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          setMsg(err.message);
        });
    }
  };

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
              {/* <Grid item xs={12}>
                <input
                  type="file"
                  onChange={uploadFile}
                  name="contractDoc"
                ></input>
              </Grid> */}
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
