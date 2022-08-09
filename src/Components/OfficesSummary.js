import { Delete, Edit, More, MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const OfficesSummary = ({ data, show, removeOffice }) => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [paginationPage, setPaginationPage] = useState(1);
  const [paginationData, setPaginationData] = useState(data.slice((paginationPage - 1) * 5, paginationPage * 5));
  const [officeNumber, setOfficeNumber] = useState();

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    setPaginationData(data.slice((paginationPage - 1) * 5, paginationPage * 5))
  },[paginationPage])


  return (
    <>
      <Box border={1} width={"60%"} sx={{ margin: "auto", minWidth: "550px", backgroundColor: 'white', mb: '30px', borderRadius: '10px' }}>
        <Container sx={{ textAlign: 'center', mb: '30px' }}>
          <Typography variant="h4">Properties</Typography>
        </Container>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            Are you sure you want to delete the office?
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={handleClose}>cancel</Button>
            <Button onClick={() => { removeOffice(officeNumber); handleClose() }}>Delete</Button>
          </DialogActions>
        </Dialog>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={200}>Property number</TableCell>
              <TableCell width={200}>Property area</TableCell>
              <TableCell width={200}>rented</TableCell>
              <TableCell width={200}>owner</TableCell>
              <TableCell sx={{ display: show ? "none" : null }} width={200}>sold</TableCell>
              <TableCell sx={{ display: show ? "none" : null }} width={200}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length!==0?paginationData.map((office, idx) => {
              return (
                <TableRow key={idx}  >

                  <TableCell width={200}>{office.officeNumber}</TableCell>
                  <TableCell width={200}>{office.officeArea}</TableCell>
                  <TableCell width={200}>
                    {office.rented ? "yes" : "no"}
                  </TableCell>
                  <TableCell width={200}>{office.owner}</TableCell>
                  <TableCell sx={{ display: show ? "none" : null }} width={200}>{office.sold ? 'yes' : 'no'}</TableCell>
                  <TableCell sx={{ display: show ? "none" : null }} width={200}>

                    <Button disabled={office.rented} startIcon={<Delete />} onClick={() => { setOpen(true); setOfficeNumber(office.officeNumber) }}>remove office</Button>
                    <Button startIcon={<Edit />} onClick={() => { nav('/officeManagment', { state: { office: office } }) }}>edit office</Button>

                  </TableCell>
                </TableRow>
              );
            }):<TableRow><TableCell colSpan={show ? 4 : 6} sx={{textAlign:'center'}}>لا يوجد ممتلكات للعرض</TableCell></TableRow>}
            <TableRow >
              <TableCell colSpan={show ? 4 : 6} >
                <Pagination sx={{justifyContent:'center'}} hideNextButton hidePrevButton onClick={(e) => { console.log(parseInt(e.target.innerText)); setPaginationPage(parseInt(e.target.innerText)) }} count={Math.ceil(data.length / 5)}></Pagination>
              </TableCell>
            </TableRow>



            <TableRow sx={{ display: !show ? "none" : null }}>
              
              <TableCell sx={{textAlign:'right'}} colSpan={4}>
                <Button
                  
                  variant="outlined"
                  onClick={() => {
                    nav("/offices");
                  }}
                >
                  عرض جميع الممتلكات
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>

    </>
  );
};

export default OfficesSummary;
