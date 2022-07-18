import {
  AppBar,
  Button,
  Toolbar,
  Grid,
  Typography,
  Box,
  MenuItem,
  MenuList,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import OfficesSummary from "../Components/OfficesSummary";

const Dashboard = () => {
  const nav = useNavigate();

  const [offices, setOffices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get_Offices")
      .then((res) => {
        console.log(res);
        setOffices(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div>
      
      <Box sx={{ display: "flex" }}>
        <Container >
          <OfficesSummary data={offices} show={true} />
        </Container>
        <Box sx={{position:'fixed',right:'0'}}>
        <MenuList
          sx={{
            backgroundColor: "#121212",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
          }}
        >
          <MenuItem
            sx={{ color: "#F05454", margin: "15px" }}
            onClick={() => nav("/offices")}
          >
            Offices
          </MenuItem>
          <MenuItem
            sx={{ color: "#F05454", margin: "15px" }}
            onClick={() => nav("/contracts")}
          >
            Contracts
          </MenuItem>
          <MenuItem
            sx={{ color: "#F05454", margin: "15px" }}
            onClick={() => console.log("kkk")}
          >
            ssss
          </MenuItem>
          <MenuItem
            sx={{ color: "#F05454", margin: "15px" }}
            onClick={() => console.log("kkk")}
          >
            ssss
          </MenuItem>
          <MenuItem
            sx={{ color: "#F05454", margin: "15px" }}
            onClick={() => console.log("kkk")}
          >
            ssss
          </MenuItem>
        </MenuList>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
