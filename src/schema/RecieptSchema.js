import { v4 as uuid } from "uuid";

const schema= [
  {
    id: uuid(),
    label: "Office number:",
    name: "officeNumber",
  },
  {
    id: uuid(),
    label: "Name:",
    name: "name",
  },
  
  {
    id: uuid(),
    label: "Date:",
    name: "date",
  },
  {
    id: uuid(),
    label: "That`s For:",
    name: "desc",
  },
  {
    id: uuid(),
    label: "Payment Amount:",
    name: "amount",
  },
 
];

export default schema
