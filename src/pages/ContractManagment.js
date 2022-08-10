import { Box, FormControl, FormLabel, Input, MenuItem, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Field, Form } from "react-final-form";
import { TextField, Select, DatePicker } from "mui-rff";
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
import { Add, CloudDownload } from "@mui/icons-material";
import { OnChange } from "react-final-form-listeners";
import downloadDoc1 from "../utils/downloadDocument";

const ContractManagment = () => {
  const location = useLocation();
  const nav = useNavigate();
  const [msg, setMsg] = useState("");
  const [initVal, setInitVal] = useState(location?.state?.contract);
  const [newRenter, setNewRenter] = useState(false);
  const [renters, setRenters] = useState([]);
  const [toUploadContractFile, setToUploadContractFile] = useState(location?.state?.contract?.contractDocument ? location?.state?.contract?.contractDocument : '');
  const [toUploadIDFile, setToUploadIDFile] = useState();

  const defaultStartEndDate = new Date()

  const uploadFile = async (file) => {
    console.log(file);
    const res = await uploadDocument(file?.target?.files[0])
    if (res)
      return res;
    //   axios
    //     .post("https://pure-meadow-98451.herokuapp.com/uploadFile", {
    //       file: fileToUpload,
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       console.log(fileToUpload, "kkkk");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       // setMsg(err);
    //     });

  };
  console.log(location?.state?.contract?.contractDocument);
  const handleClose = () => {
    if (msg === "Contract has been added" || msg === "Contract data updated")
      nav("/contracts");
    else setMsg("");
  };

  const dateFormater = (date) => {
    var dateTemp = '01/01/2022'.split('')
    dateTemp[0] = date[8]
    dateTemp[1] = date[9]
    dateTemp[2] = '/'
    dateTemp[3] = date[5]
    dateTemp[4] = date[6]
    dateTemp[5] = '/'
    dateTemp[6] = date[0]
    dateTemp[7] = date[1]
    dateTemp[8] = date[2]
    dateTemp[9] = date[3]

    dateTemp = dateTemp.join('')
    console.log(dateTemp, 'dateTemp:::::::::');
    return dateTemp

  }

  const checkDateForZeroes = (tempDate) => {
    if (!Number.isInteger(parseInt(tempDate.charAt(1)))) {
      tempDate = '0' + tempDate.slice(0, tempDate.length)
    }
    if (!Number.isInteger(parseInt(tempDate.charAt(4)))) {
      tempDate = tempDate.slice(0, 3) + '0' + tempDate.slice(3, tempDate.length)
    }
    console.log(tempDate);
    return tempDate

  }


  const onSubmit = async (values) => {

    var tempFileContract
    if (toUploadContractFile?.target) {
      tempFileContract = await uploadFile(toUploadContractFile)
    }
    else {
      tempFileContract = toUploadContractFile
    }


    if (!!initVal) {
      axios
        .post("https://pure-meadow-98451.herokuapp.com/editContract", {
          id: location?.state?.contract?._id,
          oldOfficeNumber: location?.state?.contract?.officeNumber,
          officeNumber: values.officeNumber,
          startDate: checkDateForZeroes(values.startDate),
          endDate: checkDateForZeroes(values.endDate),
          totalPayment: values.totalPayment,
          paymentPeriod: values.paymentPeriod,
          contractDocument: tempFileContract,
          token: localStorage.getItem('token')
        })
        .then((res) => {
          if (res.data.message === 'user is not verified') {
            nav('/')
            return
          }
          console.log(res);
          setMsg(res?.data?.message);
        })
        .catch((err) => {
          console.log(err);
          setMsg(err.message);
        });
    } else {
      var tempFileId = ''
      if (newRenter) {
        if (!!toUploadIDFile) tempFileId = await uploadFile(toUploadIDFile)
      }

      axios
        .post("https://pure-meadow-98451.herokuapp.com/addContract", {
          officeNumber: values.officeNumber,
          startDate: checkDateForZeroes(values.startDate),
          endDate: checkDateForZeroes(values.endDate),
          totalPayment: values.totalPayment,
          paymentPeriod: values.paymentPeriod,
          contractDocument: tempFileContract,
          token: localStorage.getItem('token')
        })
        .then((res) => {
          if (res.data.message === 'user is not verified') {
            nav('/')
            return
          }
          if (res.data.success) {
            axios.post('https://pure-meadow-98451.herokuapp.com/addRenter', {
              name: values?.renterName,
              phone: newRenter ? values?.renterPhone : values?.renterInfo,
              email: values?.renterEmail,
              idDocument: tempFileId,
              officeNumber: values?.officeNumber,
              token: localStorage.getItem('token')
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

  const formatDoc = () => {

  }



  useEffect(() => {
    axios.post('https://pure-meadow-98451.herokuapp.com/get_Renters', { token: localStorage.getItem('token') }).then(res => {
      if (res.data.message === 'user is not verified') {
        nav('/')
        return
      }
      setRenters(res.data.data)
      console.log(res.data.data, 'lalalalal');
    }).catch(err => {
      setMsg(err.message);
    })

  }, [])

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
        initialValues={initVal ? {
          ...initVal,
        } :
          {
            startDate: checkDateForZeroes(`${defaultStartEndDate.getDate()}/${defaultStartEndDate.getMonth() + 1}/${defaultStartEndDate.getFullYear()}`),
            endDate: checkDateForZeroes(`${defaultStartEndDate.getDate()}/${defaultStartEndDate.getMonth() + 1}/${defaultStartEndDate.getFullYear() + 1}`)
          }
        }
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
                  label="Property number"
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="startDate"
                  label="Start Date"
                //type="date"
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  //type="date" 
                  required
                  name="endDate"
                  label="End Date"
                ></TextField>

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
                  <input type="file" name="contractDoc" onChange={(e) => { setToUploadContractFile(e) }} />
                </Container>
              </Grid>




              {!initVal && <>
                <Grid item xs={12} textAlign='center'>
                  <Typography variant="h4">Renter's Information</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button endIcon={!newRenter ? <Add /> : null} onClick={() => { setNewRenter(!newRenter) }}>{newRenter ? 'Select from existing renters' : 'New renter'}</Button>
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
                        name="renterID"
                        onChange={(e) => { setToUploadIDFile(e) }}
                      />
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
                          renters.map((item, idx) => {
                            return <MenuItem key={idx} value={item.phone}> {item.name} - {item.phone}</MenuItem>
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
