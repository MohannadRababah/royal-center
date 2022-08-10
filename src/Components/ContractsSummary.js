import { Add, Delete, Edit, More, MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ContractSchema from "../schema/ContractSchema";
import { renterFields } from "../schema/ContractSchema";

const ContractsSummary = ({ data, rentersData, removeContract, edit, setContracts }) => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [officeNumber, setOfficeNumber] = useState();
  //const [officeOwner, setOfficeOwner] = useState([]);
  const [payed, setPayed] = useState();
  const [owners, setOwners] = useState(['ahmad', 'mohammad'])




  const getOwner = async (officeNum) => {
    const res = await axios.post("https://pure-meadow-98451.herokuapp.com/getOwner", { officeNumber: officeNum, token: localStorage.getItem('token') })
    console.log(res?.data?.data?.officeOwner, 'kkkkkkkkkkkkkk');

    return res?.data?.data?.officeOwner

  }
  console.log(data, 'response.data.officeOwner::');







  const addPayment = (officeNumber, payed) => {
    axios
      .post("https://pure-meadow-98451.herokuapp.com/addPayment", {
        officeNumber: officeNumber,
        payed: payed,
        token: localStorage.getItem('token')
      })
      .then((res) => {
        if (res.data.success) {
          axios
            .post("https://pure-meadow-98451.herokuapp.com/get_Contracts", { token: localStorage.getItem('token') })
            .then((res) => {

              console.log(res);

              setContracts(res.data.data);
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
        else {
          console.log(res.data.messsage);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }


  const handleClose = () => {
    setOpen(false);
    setMsg('')

  };

  return (
    <Box mb='30px'>
      {/* <Dialog fullWidth open={msg ? true : false} onClose={handleClose}>
        <DialogContent sx={{ textAlign: 'center' }}>
          {msg}
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={() => { addPayment(officeNumber, payed); handleClose() }}>confirm</Button>
        </DialogActions>
      </Dialog> */}

      {edit && <><Dialog fullWidth open={open} onClose={handleClose}>
        <DialogContent>
          Are you sure you want to delete the Contract?
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={() => { removeContract(officeNumber); handleClose() }}>Delete</Button>
        </DialogActions>
      </Dialog>
        <Button
          color='success'
          sx={{ marginLeft: "17%" }}
          onClick={() => {
            nav("/contractManagment");
          }}
          endIcon={<Add />}
          variant="text"
        >
          add contract
        </Button></>}

      {data.length !== 0 ? data.map((item, idx) => {
        // {
        //   console.log(getOwner(data?.[idx]?.officeNumber).then(res => {
        //     console.log(res, 'kkkkkkkkkkkkk');
        //   }), 'kkkkk')
        // }
        return (
          <Box
            border={1}
            width="70%"
            sx={{
              margin: "auto",
              marginBottom: '30px',
              borderRadius: '50px',
              boxShadow: '5px 7px 5px 2px  #545151',
              minWidth: "350px",
              overflow: "auto",
              backgroundColor: "white",
              minHeight: '100px'
            }}
          >
            <Container key={idx} sx={{ mt: "30px" }}>
              <Typography variant="h5" marginBottom={3}>
                Contract info for Property: {item.officeNumber}
              </Typography>
              <Grid container spacing={4}>
                {ContractSchema.map((schema, index) => {
                  return (
                    <Grid key={index} item xs={4}>
                      <Typography color='#73777B'>{schema.label}</Typography>
                      {!schema.attFun
                        ? item[schema.name]
                        : schema.attFun(item)}
                    </Grid>
                  );
                })}

                {
                  rentersData.map((renter, renterIdx) => {
                    return renterFields.map((schema, index) => {
                      return edit ? renter?.offices.includes(item.officeNumber) ? (
                        <Grid key={index} item xs={4}>
                          {renter[schema.name] ? <Typography color='#73777B'>{schema.label}</Typography> : null}
                          {renter[schema.name]}
                        </Grid>
                      ) : null
                        :
                        renterIdx === idx ? <Grid key={index} item xs={4}>
                          {renter[schema.name] ? <Typography color='#73777B'>{schema.label}</Typography> : null}
                          {renter[schema.name]}
                        </Grid> : null
                    })
                  })
                }
                {/* {
                  <Typography variant="h5" marginBottom={3}>
                    Office Owner: {getOwner(data?.[idx]?.officeNumber).finally((res)=>{return res})}
                  </Typography>
                } */}
                {edit && <Grid item xs={12} marginTop={5} display='flex' justifyContent='space-evenly'>
                  {/* <Button sx={{ marginRight: "70px" }} variant="outlined" onClick={() => {
                    setOfficeNumber(item.officeNumber)
                    setPayed(item.payed)
                    setMsg("Confirm the payment.")
                  }}>
                    add payment
                  </Button> */}
                  <Button sx={{ marginRight: "70px" }} variant="outlined" onClick={() => {
                    nav('/contractManagment', { state: { contract: item } })
                  }}>
                    Edit contract
                  </Button>
                  <Button color="error" variant="outlined" onClick={() => { setOpen(true); setOfficeNumber(item.officeNumber) }}>
                    Delete contract
                  </Button>
                </Grid>}
                <Grid item xs={12}>
                  <Divider sx={{ margin: "10px" }} />
                </Grid>
              </Grid>
            </Container>
          </Box>);



      }) : <Box textAlign='center'>لا يوجد عقود للعرض</Box>}

    </Box>
  );
};

export default ContractsSummary;
