import axios from "axios"

const downloadDoc = async (id) => {
    const tempFile = await axios.post('http://localhost:3001/downloadFile', { fileId: id }).then(res => {
        return res.data.data.file
    }).catch(err => {
        console.log(err);
    })

    return tempFile
}

export default downloadDoc