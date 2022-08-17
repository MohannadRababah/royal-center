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
import { Add, CloudDownload, CloudUploadOutlined } from "@mui/icons-material";
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
    if (res) {
      return await axios
        .post("https://pure-meadow-98451.herokuapp.com/uploadFile", {
          file: res,
        })
        .then((res) => {
          console.log(res);
          return res.data.data.documentId
        })
        .catch((err) => {
          console.log(err);
          // setMsg(err);
        });

    }

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
    <Container sx={{ backgroundColor: "white", padding: "100px", direction: 'rtl' }}>
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
                <Typography variant="h4">معلومات العقد</Typography>
              </Grid>
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
                  name="startDate"
                  label="تاريخ بدأ العقد"
                //type="date"
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  //type="date" 
                  required
                  name="endDate"
                  label="تاريخ نهاية العقد"
                ></TextField>

              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="totalPayment"
                  label="قيمة العقد الكلية"
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="paymentPeriod"
                  label="عدد الدفعات"
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <FormLabel>صورة عن العقد :</FormLabel>
                <Container>
                  <input id="hiddenInput1" style={{ display: 'none' }} type="file" name="contractDoc" onChange={(e) => { setToUploadContractFile(e); console.log(e); }} />
                  <label for='hiddenInput1'><Button sx={{ ":disabled": { color: '#1976d2', borderColor: '#1976d2' } }} disabled variant="outlined" endIcon={<><CloudUploadOutlined sx={{ marginRight: '10px' }} /></>}> Upload </Button></label>
                  <Box><label style={{ color: 'grey' }}>{toUploadContractFile ? 'File Choosen' : 'Choose a file to upload'}</label></Box>


                </Container>
              </Grid>




              {!initVal && <>
                <Grid item xs={12} textAlign='center'>
                  <Typography variant="h4">معلومات المستأجر</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button endIcon={!newRenter ? <Add sx={{ marginRight: '10px' }} /> : null} onClick={() => { setNewRenter(!newRenter) }}>{newRenter ? 'مستأجر قديم' : 'مستأجر جديد'}</Button>
                </Grid>
                {newRenter ? <><Grid item xs={12}>
                  <TextField
                    required
                    name="renterName"
                    label="اسم المستأجر"
                  ></TextField>
                </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      name="renterPhone"
                      label="هاتف المستأجر"
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      name="renterEmail"
                      label="البريد الألكتروني للمستأجر"
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <FormLabel>صورة الهوية الشخصية للمستأجر :</FormLabel>
                    <Container>
                      <input
                        id="hiddenInput2"
                        style={{ display: 'none' }}
                        type="file"
                        name="renterID"
                        onChange={(e) => { setToUploadIDFile(e) }}
                      />
                      <label for='hiddenInput2'><Button sx={{ ":disabled": { color: '#1976d2', borderColor: '#1976d2' } }} disabled variant="outlined" endIcon={<><CloudUploadOutlined sx={{ marginRight: '10px' }} /></>}> Upload </Button></label>
                      <Box><label style={{ color: 'grey' }}>{!!toUploadIDFile ? 'File Choosen' : 'Choose a file to upload'}</label></Box>


                    </Container>
                  </Grid>
                </> :
                  // <Field
                  // name="renterInfo"
                  // render={()=>()}
                  // />
                  <>
                    <Grid item xs={12}>
                      <Select label='المستأجرين' name="renterInfo" >
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



              <Grid textAlign="left" item xs={12} mt='10px'>
                <Button type="submit" variant="outlined">
                  {!initVal ? "اضافة" : "حفظ"}
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
