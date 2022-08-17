import { Form } from "react-final-form";
import { TextField } from "mui-rff";
import {
    Alert,
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    FormLabel,
    Grid,
    Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import uploadDocument from "../utils/uploadDocument";
import { CloudUploadOutlined, UploadFileOutlined } from "@mui/icons-material";
const RenterManagment = () => {

    const [msg, setMsg] = useState('')
    const location = useLocation()
    const nav = useNavigate()
    const [toUploadIDFile, setToUploadIDFile] = useState(location?.state?.renter?.idDocument ? location?.state?.renter?.idDocument : '');

    console.log(location?.state?.renter, 'lllllalalala');


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
    }
    const handleClose = () => {
        if (msg === "Renters Data Updated")
            nav("/Renters");
        else setMsg("");
    };


    const onSubmit = async (values) => {
        console.log(values, 'values');
        var tempFileID
        if (toUploadIDFile?.target) {
            tempFileID = await uploadFile(toUploadIDFile)
            console.log(tempFileID);
        }
        else {
            tempFileID = toUploadIDFile
        }

        axios
            .post("https://pure-meadow-98451.herokuapp.com/editRenter", {
                _id: values._id,
                name: values.name,
                oldPhone: location?.state?.renter?.phone,
                phone: values.phone,
                email: values.email,
                idDocument: tempFileID,
                token: localStorage.getItem('token')

            })
            .then((res) => {
                if (res.data.message === 'user is not verified') {
                    nav('/')
                    return
                }
                if (res.data.success) {
                    console.log(res);
                    setMsg(res.data.message);
                }
                else {
                    setMsg(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err);
                setMsg(err.message);
            });


    }
    return (<>
        <Typography variant="h4" marginBottom={7} textAlign='center' color='black'>التعديل على معلومات المستأجر</Typography>

        <Container sx={{ backgroundColor: 'white', padding: '30px', paddingTop: '60px', borderRadius: '10px', direction: 'rtl' }}>
            {
                msg && (
                    <Dialog open={msg ? true : false} onClose={handleClose} fullWidth>
                        <DialogContent>{msg}</DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>ok</Button>
                        </DialogActions>
                    </Dialog>
                )
            }
            <Box>
                <Form
                    initialValues={{
                        ...location?.state?.renter
                    }}
                    onSubmit={onSubmit}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        name="name"
                                        label="الأسم"
                                    ></TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        name="phone"
                                        label="رقم الهاتف"
                                    ></TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        name="email"
                                        label="البريد الألكتروني"
                                    ></TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormLabel>صورة عن هوية المستأجر :</FormLabel>
                                    <Container>
                                        <input
                                            id="hiddenInput"
                                            style={{display:'none'}}
                                            type='file'
                                            name="renterID"
                                            onChange={(e) => { setToUploadIDFile(e) }}
                                        />
                                        <label for='hiddenInput'><Button sx={{":disabled":{color:'#1976d2',borderColor:'#1976d2'}}} disabled variant="outlined" endIcon={<><CloudUploadOutlined sx={{marginRight:'10px'}}/></>}> Upload </Button></label>
                                        <Box><label style={{color:'grey'}}>{toUploadIDFile?'File Choosen':'Choose a file to upload'}</label></Box>

                                        
                                        
                                    </Container>
                                </Grid>
                                <Grid textAlign="left" item xs={12}>
                                    <Button type="submit" variant="outlined">
                                        حفظ
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                />
            </Box>
        </Container></>
    )
}

export default RenterManagment