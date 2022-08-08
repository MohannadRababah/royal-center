import { TableBar } from "@mui/icons-material"
import { Box, Container, Divider, Grid, Pagination, Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"


const CardsSkeleton = () => {
    return <Box border={1} width='650px' margin='auto' sx={{ backgroundColor: 'white' }}>
        <Container>
            <Grid container spacing={3} mt={1} mb={1} >
                <Grid item xs={4}>
                    <Skeleton variant='rectangular' />
                </Grid>
                <Grid item xs={4}>
                    <Skeleton variant='rectangular' />
                </Grid>
                <Grid item xs={4}>
                    <Skeleton variant='rectangular' />
                </Grid>
                <Grid item xs={4}>
                    <Skeleton variant='rectangular' />
                </Grid>
                <Grid item xs={4}>
                    <Skeleton variant='rectangular' />
                </Grid>
                <Grid item xs={4}>
                    <Skeleton variant='rectangular' />
                </Grid>
                <Grid item xs={12}><Divider/></Grid>
                <Grid item xs={4}>
                    <Skeleton variant='rectangular' />
                </Grid>
                <Grid item xs={4}>
                    <Skeleton variant='rectangular' />
                </Grid>
                <Grid item xs={4}>
                    <Skeleton variant='rectangular' />
                </Grid>
                <Grid item xs={4}>
                    <Skeleton variant='rectangular' />
                </Grid>
                <Grid item xs={4}>
                    <Skeleton variant='rectangular' />
                </Grid>
                <Grid item xs={4}>
                    <Skeleton variant='rectangular' />
                </Grid>
                <Grid item xs={12}><Divider/></Grid>
                <Grid item xs={4}>
                    <Skeleton variant='rectangular' />
                </Grid>
                <Grid item xs={4}>
                    <Skeleton variant='rectangular' />
                </Grid>
                <Grid item xs={4}>
                    <Skeleton variant='rectangular' />
                </Grid>
                <Grid item xs={4}>
                    <Skeleton variant='rectangular' />
                </Grid>
                <Grid item xs={4}>
                    <Skeleton variant='rectangular' />
                </Grid>
                <Grid item xs={4}>
                    <Skeleton variant='rectangular' />
                </Grid>
            </Grid>
        </Container>
    </Box>
}

export default CardsSkeleton