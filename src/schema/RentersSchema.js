import { CloudDownload, CloudDownloadOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { v4 as uuid } from "uuid";
import downloadDoc from "../utils/downloadDocument";

const schema = [
  {
    id: uuid(),
    label: "الأسم :",
    name: "name",
  },
  {
    id: uuid(),
    label: "رقم الهاتف :",
    name: "phone",
  },
  {
    id: uuid(),
    label: "عنوان البريد الألكتروني :",
    name: "email",
  },
  {
    id: uuid(),
    label: "صورة هوية المستأجر :",
    name: "idDocument",
    valueFun: (value) => {
      return value?.idDocument ? <Button variant="outlined" endIcon={<CloudDownloadOutlined sx={{ marginRight: '10px' }} />} onClick={async () => {
        var anchor = document.createElement('a');
        anchor.href = await downloadDoc(value.idDocument);
        anchor.download = `صورة الهوية للمستأجر ${value?.name}`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      }}>download</Button> : 'لم يتم رفع المستند'
    }
  },
  {
    id: uuid(),
    label: "الممتلكات المستأجرة :",
    name: "offices",
    valueFun: (data) => {
      console.log(data, 'lalalala');
      if (data) return data?.offices.map((item, idx) => (
        idx !== data.offices.length - 1 ? (item + ' ,') : item
      ))
    }
  },

];


export default schema