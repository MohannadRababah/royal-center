import { Button, Container, Divider, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import RecieptSchema from "../schema/RecieptSchema"


const RecieptsSummary = ({ reciepts, setReciepts }) => {
    console.log(reciepts);
    const nav=useNavigate()
    return (
        <>

            {
                reciepts.length!==0?reciepts.map((item, idx) => (
                    <>
                        {
                            RecieptSchema.map((schema) => (
                                item[schema.name] ?
                                    <Grid key={idx} item xs={4}>
                                        <Typography color='#73777B'>{schema.label}</Typography>
                                        {item[schema.name]}
                                    </Grid>
                                    : null
                            ))
                        }
                        <Grid item xs={12} textAlign='right'>
                            <Container>
                                <Button variant="outlined" onClick={()=>nav('/recieptManagment',{state:{initVal:item}})}>Edit</Button>
                            </Container>
                        </Grid>

                        <Grid item xs={12}><Divider /></Grid></>
                )):<Grid item xs={12} textAlign='center'>لا يوجد وصولات</Grid>
            }

        </>
    )
}

export default RecieptsSummary