import { TableBar } from "@mui/icons-material"
import { Box, Pagination, Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"


const TableSkeleton = ({showPagination}) => {
    return <Box border={1} width='650px' margin='auto' sx={{ backgroundColor: 'white' }}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Skeleton variant='rectangular' />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant='rectangular' />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant='rectangular' />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant='rectangular' />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant='rectangular' />
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Skeleton variant='rectangular' />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant='rectangular' />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant='rectangular' />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant='rectangular' />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant='rectangular' />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Skeleton variant='rectangular' />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant='rectangular' />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant='rectangular' />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant='rectangular' />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant='rectangular' />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Skeleton variant='rectangular' />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant='rectangular' />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant='rectangular' />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant='rectangular' />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant='rectangular' />
                    </TableCell>
                </TableRow>
                {showPagination?<TableRow>
                    <TableCell colSpan={5} >
                        <Pagination disabled sx={{ justifyContent: 'center' }} hideNextButton hidePrevButton  count={5}></Pagination>
                    </TableCell>
                </TableRow>:null}
            </TableBody>
        </Table>
    </Box>
}

export default TableSkeleton