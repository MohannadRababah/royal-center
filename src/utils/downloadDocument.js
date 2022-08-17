import axios from "axios"

const downloadDoc = async (id) => {
    const tempFile = await axios.post('https://pure-meadow-98451.herokuapp.com/downloadFile', { fileId: id }).then(res => {
        return res.data.data.file
    }).catch(err => {
        console.log(err);
    })


    if (tempFile) {
        console.log(tempFile.toString(),'kxmkjxckjcj');
        return tempFile
    }
}

export default downloadDoc