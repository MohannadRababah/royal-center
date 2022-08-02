import {
    AppBar,
    Button,
    Toolbar,
    Grid,
    Typography,
    Box,
    MenuItem,
    MenuList,
    FormLabel,
    Divider,
    Container,
    Dialog,
    DialogContent,
    DialogActions
} from "@mui/material";
import axios from "axios";
import { TextField } from "mui-rff";
import { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { useNavigate } from "react-router";
import OfficesSummary from "../Components/OfficesSummary";





const OfficePaymentsSummary = ({ requiredPayments, setRequiredPayments }) => {

    const [officeNumber, setOfficeNumber] = useState('')
    const [payments, setPayments] = useState('')
    const [open, setOpen] = useState(false)


    const onSubmit = (values) => {
        console.log(values, 'kkkkkkkkkkk');
        axios.post('http://localhost:3001/addReciept', {
            officeNumber:officeNumber,
            name: values.name,
            amount: values.amount,
            desc: values.desc,
            date: values.date
        }).then((res) => {
            if (res.data.success) {
                axios
                    .post("http://localhost:3001/addPayment", {
                        officeNumber: officeNumber,
                        payed: payments
                    })
                    .then((res) => {
                        if (res.data.success) {
                            axios
                                .get("http://localhost:3001/get_Required_Payments")
                                .then((res) => {
                                    if (res.data.success) {
                                        setRequiredPayments(res.data.data)
                                    }
                                    else {
                                        console.log(res.data.message);
                                    }
                                })
                                .catch((err) => {
                                    console.log(err.message);
                                });
                        }
                        else {
                            console.log(res.data.message);
                        }
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            }
            else {
                console.log(res.data.message);
            }
        }).catch(err => {
            console.log(err.message);
        })


        setOpen(false)


    }



    return (
        <Box sx={{ backgroundColor: 'white', minHeight: '100px', minWidth: '700px', margin: 'auto' }}>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (

                    <Dialog fullWidth open={open} onClose={() => { setOpen(false) }}>
                        <DialogContent >
                            <form onSubmit={handleSubmit}>
                                <Grid item xs={12} textAlign='center'>
                                    <Typography variant="h4">
                                        Offices Payments
                                    </Typography>
                                </Grid>
                                <Container>
                                    <Grid item xs={12}>
                                        <Typography color='#73777B'>Office Number:</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {officeNumber}
                                    </Grid>
                                </Container>


                                <Grid item xs={12} margin={3}>
                                    <TextField label='Payment Date' required name="date"></TextField>
                                </Grid>
                                <Grid item xs={12} margin={3}>
                                    <TextField required label='Renter Name' name="name"></TextField>
                                </Grid>
                                <Grid item xs={12} margin={3}>
                                    <TextField required label='ammount' name="amount"></TextField>
                                </Grid>
                                <Grid item xs={12} margin={3}>
                                    <TextField required label='That`s For' name="desc"></TextField>
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                                    <Button type='submit'>Confirm</Button>
                                </Grid>


                            </form>

                        </DialogContent>
                    </Dialog>

                )}
            />
            <Grid item xs={12}>
                {
                    requiredPayments ? requiredPayments.map((item,idx) => {
                        var date = new Date(parseInt(item.startDate.slice(6, 10)), parseInt(item.startDate.slice(3, 5)) - 1 + (12 / (item.paymentPeriod)) + (item.payed) * (12 / (item.paymentPeriod)), parseInt(item.startDate.slice(0, 3)));
                        return <Box key={idx}><Box margin='10px' display='flex' justifyContent='space-evenly'>
                            <Box ><FormLabel sx={{ display: 'block' }}> Office Number : </FormLabel>{item.officeNumber}</Box>
                            <Box><FormLabel sx={{ display: 'block' }}> Required Payment : </FormLabel> {item.totalPayment / item.paymentPeriod}</Box>
                            <Box><FormLabel sx={{ display: 'block' }}> Payment Date : </FormLabel> {date.getDate()}/{date.getMonth()}/{date.getFullYear()}</Box>
                        </Box>
                            <Container sx={{ textAlign: 'right', marginBottom: '10px', marginTop: '20px' }}>
                                <Button variant="outlined" sx={{ height: '20px' }} onClick={() => {
                                    setPayments(item.payed)
                                    setOfficeNumber(item.officeNumber)
                                    setOpen(true)
                                }}>Add Payment</Button>
                            </Container>
                            <Divider /></Box>
                    }) : null
                }
            </Grid>

        </Box>
    )
}

export default OfficePaymentsSummary