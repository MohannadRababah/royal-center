import { CloudDownload } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { v4 as uuid } from "uuid";

const schema= [
  {
    id: uuid(),
    label: "Property Number:",
    name: "officeNumber",
  },
  {
    id: uuid(),
    label: "Start Date:",
    name: "startDate",
  },
  {
    id: uuid(),
    label: "End Date:",
    name: "endDate",
  },
  {
    id: uuid(),
    label: "Total Payment:",
    name: "totalPayment",
  },
  {
    id: uuid(),
    label: "Payment Period:",
    name: "paymentPeriod",
  },
  {
    id: uuid(),
    label: "Each Payment:",
    name: "eachPayment",
    attFun:(item)=>{
        return parseInt(item.totalPayment)/parseInt(item.paymentPeriod)
    }
  },
  {
    id: uuid(),
    label: "Payed:",
    name: "payed"
  },
  {
    id: uuid(),
    label: "Next Payment:",
    name: "nextPayment",
    attFun:(item)=>{
      var date=new Date(parseInt(item.startDate.slice(6,10)),parseInt(item.startDate.slice(3,5))-1+(item.payed)*(12/(item.paymentPeriod)),parseInt(item.startDate.slice(0,3)));
      return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()//item.startDate.slice(0,3)+(parseInt(item.startDate.slice(3,5))+)// parseInt(totalPayment)/parseInt(paymentPeriod)paymentPeriod,payed,startDate
  }
  },
  {
    id: uuid(),
    label: "Contract Document:",
    name: "contractDocument",
    attFun:(value)=> value?.contractDocument?<a download={`Contract for office number ${value.officeNumber}`} target='_blank' href={value?.contractDocument}><Button variant="outlined" endIcon={<CloudDownload/>}>download</Button></a>:'Document not uploaded'//<a download={`Contract for office number ${value.officeNumber}`} target='_blank' href={value?.contractDocument}>Open</a>
  },
  {
    id: uuid(),
    label: "Office Owner:",
    name: "owner",
  },
];

const renterFields=[
  {
    id: uuid(),
    label: "Name:",
    name: "name",
  },
  {
    id: uuid(),
    label: "Phone number:",
    name: "phone",
  },
  {
    id: uuid(),
    label: "Email:",
    name: "email",
  },
]
export {renterFields}
export default schema