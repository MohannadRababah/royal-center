
import { Container } from "@mui/system";
import { Form } from "react-final-form";
import { TextField, Select } from "mui-rff";
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    MenuItem,
    Typography
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";



const AddNewReciept = () => {
    const todayDate = new Date
    const location = useLocation()

    const [recieptNumber, setRecieptNumber] = useState()
    const [oldRecieptNumber, setOldRecieptNumber] = useState()
    const initVal=location?.state?.initVal
    console.log(initVal);

    const onSubmit = (values) => {
       
console.log(values.recieptNumber,oldRecieptNumber,'lalaalalalkkakkakakaak');
        if(!initVal){
            axios.post('https://pure-meadow-98451.herokuapp.com/addReciept', {
                officeNumber:'random reciept',
                name: values.name,
                amount: values.amount,
                recieptNumber: values.recieptNumber,
                desc: values.desc,
                date: values.date, 
                token :localStorage.getItem('token')
            }).then((res) => {
                if (res.data.success) {
                        
                    axios.post('https://pure-meadow-98451.herokuapp.com/increase_reciept_number', { oldRecieptNumber: oldRecieptNumber,recieptNumber:values.recieptNumber, token :localStorage.getItem('token') }).then(response => {
                        console.log(response,'log increase');
                        
                        nav('/reciepts')
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
        }
        else{
            axios.post('https://pure-meadow-98451.herokuapp.com/editReciept', {
                officeNumber:'random reciept',
                name: values.name,
                amount: values.amount,
                oldRecieptNumber:oldRecieptNumber,
                recieptNumber: values.recieptNumber,
                desc: values.desc,
                date: values.date, 
                token :localStorage.getItem('token')
            })
            .then((res) => {
                nav('/reciepts')
            })
            .catch(err=>console.log(err.message))
        }

        
    }
    useEffect(() => {
        

        axios.post('https://pure-meadow-98451.herokuapp.com/get_reciept_number',{ token :localStorage.getItem('token')}).then(response => {
            setRecieptNumber(response.data.data)
            setOldRecieptNumber(initVal?initVal?.recieptNumber:response.data.data)
            console.log(response.data.data);
        })
    }, [])
    const nav = useNavigate()

    return <Box textAlign='center' >
        <Typography variant="h4">
            Receipts
        </Typography>
        <Container sx={{ backgroundColor: 'white', mt: '50px', marginBottom: '50px', paddingTop: '30px', border: 1, borderRadius: '10px' }}>
            <Form
                initialValues={!initVal?{
                    recieptNumber: recieptNumber,
                    // name: renterName,
                    // amount:addPaymentFormData.amount,
                    // desc:addPaymentFormData.desc,
                    date: `${todayDate.getDate()}/${todayDate.getMonth() + 1}/${todayDate.getFullYear()}`
                }:{...initVal}}
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (

                    <form onSubmit={handleSubmit}>

                        <Grid item xs={12} margin={3} >
                            <TextField  required label='Reciept Number' name="recieptNumber"></TextField>{/*retrieved*/}
                        </Grid>
                        <Grid item xs={12} margin={3}>
                            <TextField required label='Name' name="name"></TextField>{/*retrieved*/}
                        </Grid>
                        <Grid item xs={12} margin={3}>
                            <TextField required label='amount' name="amount"></TextField>{/*retrieved*/}
                        </Grid>
                        <Grid item xs={12} margin={3}>
                            <TextField label='Today`s Date' required name="date"></TextField>{/*generated from todays date*/}
                        </Grid>
                        <Grid item xs={12} margin={3}>
                            <TextField required label='That`s For' name="desc"></TextField>{/*retrieved as a structure*/}
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: '60px' }}>
                            <Button onClick={() => nav('/reciepts')}>Cancel</Button>
                            <Button type='submit'>Confirm</Button>
                        </Grid>


                    </form>



                )}
            />
        </Container></Box>
}

export default AddNewReciept