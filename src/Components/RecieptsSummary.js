import { Container, Divider, Grid, Typography } from "@mui/material"
import RecieptSchema from "../schema/RecieptSchema"


const RecieptsSummary = ({ reciepts, setReciepts }) => {
    console.log(reciepts);
    return (
        <Container sx={{backgroundColor:'white',paddingBottom:'30px',paddingTop:'5px'}}>

            {
                reciepts.map((item, idx) => (
                    <><Grid container spacing={3} margin={3} >
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
                       
                    </Grid> <Divider/></>
                ))
            }

        </Container>
    )
}

export default RecieptsSummary