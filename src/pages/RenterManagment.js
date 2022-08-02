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
const RenterManagment = () => {

    const [msg, setMsg] = useState('')
    const location = useLocation()
    const nav = useNavigate()
    console.log(location?.state?.renter);


    const handleClose = () => {
        if (msg === "Renters Data Updated")
            nav("/Renters");
        else setMsg("");
    };


    const onSubmit = (values) => {
        console.log(values, 'values');

        axios
            .post("http://localhost:3001/editRenter", {
                _id: values._id,
                name: values.name,
                phone: values.phone,
                email: values.email
            })
            .then((res) => {
                if (res.data.success) {
                    console.log(res);
                    setMsg(res.data.message);
                }
                else{
                    setMsg(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err);
                setMsg(err.message);
            });


    }
    return (
        <Container sx={{ backgroundColor: 'white', padding: '30px' }}>
            <Typography variant="h4" marginBottom={3} textAlign='center'>Edit Renter</Typography>
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
                                        label="Name"
                                    ></TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        name="phone"
                                        label="Phone Number"
                                    ></TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        name="email"
                                        label="Email"
                                    ></TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormLabel>ID</FormLabel>
                                    <Container><input type='file' /></Container>
                                </Grid>
                                <Grid textAlign="right" item xs={12}>
                                    <Button type="submit" variant="outlined">
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                />
            </Box>
        </Container>
    )
}

export default RenterManagment