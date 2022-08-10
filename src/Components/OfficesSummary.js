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
          <Typography variant="h4">الممتلكات</Typography>
        </Container>
        <Dialog fullWidth open={open} onClose={handleClose}>
          <DialogContent sx={{textAlign:'center'}}>
            الرجاء التأكيد على عملية حذف الممتلك   
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={handleClose}>الغاء</Button>
            <Button onClick={() => { removeOffice(officeNumber); handleClose() }}>حذف</Button>
          </DialogActions>
        </Dialog>
        <Table sx={{direction:'rtl'}}>
          <TableHead>
            <TableRow>
              <TableCell width={200}>رقم الممتلك</TableCell>
              <TableCell width={200}>مساحة الممتلك</TableCell>
              <TableCell width={200}>مأجر</TableCell>
              <TableCell width={200}>المالك</TableCell>
              <TableCell sx={{ display: show ? "none" : null }} width={200}>مباع</TableCell>
              <TableCell sx={{ display: show ? "none" : null }} width={200}>
                تعديل/حذف
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
                    {office.rented ? "نعم" : "لا"}
                  </TableCell>
                  <TableCell width={200}>{office.owner}</TableCell>
                  <TableCell sx={{ display: show ? "none" : null }} width={200}>{office.sold ? 'نعم' : 'لا'}</TableCell>
                  <TableCell sx={{ display: show ? "none" : null }} width={200}>

                    <Button disabled={office.rented} endIcon={<Delete />} onClick={() => { setOpen(true); setOfficeNumber(office.officeNumber) }}> حذف ممتلك </Button>
                    <Button endIcon={<Edit />} onClick={() => { nav('/officeManagment', { state: { office: office } }) }}> تعديل ممتلك </Button>

                  </TableCell>
                </TableRow>
              );
            }):<TableRow><TableCell colSpan={show ? 4 : 6} sx={{textAlign:'center'}}>لا يوجد ممتلكات للعرض</TableCell></TableRow>}
            <TableRow >
              <TableCell colSpan={show ? 4 : 6} >
                <Pagination  sx={{justifyContent:'center'}} page={paginationPage} hideNextButton hidePrevButton onClick={(e) => { console.log(parseInt(e.target.innerText)); setPaginationPage(parseInt(e.target.innerText)) }} count={Math.ceil(data.length / 5)}></Pagination>
              </TableCell>
            </TableRow>



            <TableRow sx={{ display: !show ? "none" : null }}>
              
              <TableCell sx={{textAlign:'left',borderBottom:'0'}} colSpan={4}>
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
