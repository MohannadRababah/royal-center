import { Delete, Edit, More, MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

const OfficesSummary = ({ data, show, removeOffice }) => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [officeNumber, setOfficeNumber] = useState();

  const handleClose=()=>{
    setOpen(false)
  }


  return (
    <Box border={1} width={"60%"} sx={{ margin: "auto", minWidth: "350px", backgroundColor:'white' }}>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          Are you sure you want to delete the office?
        </DialogContent>
        <DialogActions sx={{display:'flex', justifyContent:'space-between'}}>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={()=>{removeOffice(officeNumber);handleClose()}}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={200}>office number</TableCell>
            <TableCell width={200}>office area</TableCell>
            <TableCell width={200}>rented</TableCell>
            <TableCell sx={{ display: show ? "none" : null }} width={200}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((office, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell width={200}>{office.officeNumber}</TableCell>
                <TableCell width={200}>{office.officeArea}</TableCell>
                <TableCell width={200}>
                  {office.rented ? "yes" : "no"}
                </TableCell>
                <TableCell sx={{ display: show ? "none" : null }} width={200}>
                  
                <Button startIcon={<Delete/>} onClick={()=>{setOpen(true);setOfficeNumber(office.officeNumber)}}>remove office</Button>
                <Button startIcon={<Edit/>} onClick={()=>{nav('/officeManagment',{state:{office:office}})}}>edit office</Button>
                
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow sx={{ display: !show ? "none" : null }}>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Button
                variant="outlined"
                onClick={() => {
                  nav("/offices");
                }}
              >
                عرض جميع المكاتب
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default OfficesSummary;
