import { Container } from "@mui/system";
import { Form } from "react-final-form";
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

const AddNewOffice = () => {
  const location = useLocation();
  const nav = useNavigate();
  const [msg, setMsg] = useState("");
  const [initVal, setInitVal] = useState(location?.state?.office);
  const handleClose = () => {
    if (msg === "Office has been added" || msg === "Office data updated")
      nav("/offices");
    else setMsg("");
  };
  const onSubmit = (values) => {
    console.log(values);
    if (initVal) {
      axios
        .post("http://localhost:3001/editOffice", {
          id: location?.state?.office?._id,
          oldOfficeNumber: location?.state?.office?.officeNumber,
          officeNumber: values.officeNumber,
          officeArea: values.officeArea,
          officePrice: values.officePrice,
          rented: location?.state?.office?.rented,
        })
        .then((res) => {
          console.log(res);
          setMsg(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          setMsg(err.message);
        });
    } else {
      axios
        .post("http://localhost:3001/addOffice", {
          officeNumber: values.officeNumber,
          officeArea: values.officeArea,
          officePrice: values.officePrice,
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
    <>
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
                    name="officeArea"
                    label="office area"
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    name="officePrice"
                    label="office price"
                  ></TextField>
                </Grid>
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
    </>
  );
};

export default AddNewOffice;
