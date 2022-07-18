import { v4 as uuid } from "uuid";

export default [
  {
    id: uuid(),
    label: "Office Number:",
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
    attFun:(totalPayment,paymentPeriod)=>{
        return parseInt(totalPayment)/parseInt(paymentPeriod)
    }
  },
  {
    id: uuid(),
    label: "Contract Document:",
    name: "contractDocument",
  },
];
