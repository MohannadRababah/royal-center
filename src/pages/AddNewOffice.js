import { Container } from "@mui/system";
import { Form } from "react-final-form";
import { TextField,Select } from "mui-rff";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const AddNewOffice = () => {
  const location = useLocation();
  const nav = useNavigate();
  const [msg, setMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [initVal, setInitVal] = useState(location?.state?.office);
  const handleClose = () => {
    if (msg === "Office has been added" || msg === "Office data updated")
      nav("/offices");
    else setMsg("");
  };
  
  const onSubmit = (values) => {
    setSubmitting(false)

    console.log(values.sold);
    if (initVal) {
      axios
        .post("https://pure-meadow-98451.herokuapp.com/editOffice", {
          id: location?.state?.office?._id,
          oldOfficeNumber: location?.state?.office?.officeNumber,
          officeNumber: values.officeNumber,
          officeArea: values.officeArea,
          officePrice: values.officePrice,
          officeOwner: values.officeOwner,
          sold: values.sold,
          rented: location?.state?.office?.rented,
          token :localStorage.getItem('token')
        })
        .then((res) => {
          if(res.data.message==='user is not verified'){
            nav('/')
            return
        }
          console.log(res);
          setMsg(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          setMsg(err.message);
        });
    } else {
      axios
        .post("https://pure-meadow-98451.herokuapp.com/addOffice", {
          officeNumber: values.officeNumber,
          officeArea: values.officeArea,
          officePrice: values.officePrice,
          officeOwner: values.officeOwner,
          sold: false,
          token :localStorage.getItem('token')
        })
        .then((res) => {
          if(res.data.message==='user is not verified'){
            nav('/')
            return
        }
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
    <Typography textAlign='center' marginBottom={6} variant="h4"  color='black'>اضافة ممتلك</Typography>{
  console.log(location?.state?.office,'kkkkkkkkkkkk')

    }
      <Container sx={{ backgroundColor: "white",borderRadius:'10px',marginBottom:'30px', padding: "100px" , direction:'rtl'}}>
        
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
            officeOwner:location?.state?.office?.owner
          }}
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    name="officeNumber"
                    label="رقم الممتلك"
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    name="officeArea"
                    label="مساحة الممتلك"
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    name="officePrice"
                    label="سعر الممتلك"
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    name="officeOwner"
                    label="مالك الممتلك"
                  ></TextField>
                </Grid>
                {initVal&&<Grid  item xs={12}>
                  <Select
                    required
                    name="sold"
                    label="مباع"
                  >
                    <MenuItem value={true}>نعم</MenuItem>
                    <MenuItem value={false}>لا</MenuItem>
                  </Select>
                </Grid>}
                <Grid textAlign="left" item xs={12}>
                  <Button type="submit" variant="outlined">
                    {!initVal ? "اضافة" : "حفظ"}
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
