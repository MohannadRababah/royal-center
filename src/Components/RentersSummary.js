import { Edit } from "@mui/icons-material"
import { Container, Grid, Box, Divider, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router"
import RentersSchema from "../schema/RentersSchema"

const RentersSummary = ({ data }) => {

    const nav=useNavigate()
    return (
        <Box sx={{ backgroundColor: 'white' }}>
            <Grid container spacing={2}>
                {
                    data.map((item) => {
                        return <>{RentersSchema.map((schema) => {
                            return <Grid item xs={4}>
                                <Container><Typography color='#73777B'>{schema.label}</Typography></Container>
                                <Container>{schema?.valueFun ? schema.valueFun(item[schema.name]) : item[schema.name]}</Container>
                            </Grid>
                        })}
                            <Grid textAlign='right' item xs={12}>
                                <Button sx={{marginRight:"100px"}} variant='outlined' startIcon={<Edit/>}  onClick={()=>{
                                    nav('/renterManagment',{state:{renter:item}})
                                }}>Edit</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider sx={{ margin: "10px" }} />
                            </Grid>
                        </>
                    })
                }

            </Grid>
        </Box>
    )
}

export default RentersSummary