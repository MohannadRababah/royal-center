
const uploadDocument = (file) => {
    return new Promise((resolve) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        var base64String = reader.result;
        var n = base64String.indexOf("base64,") + 7;
        base64String = reader.result.substr(n);
        const data = window.atob(base64String)
        const image = data
  
        const buf = new Uint8Array(image.length);
        for (let i = 0; i < image.length; i++) {
          buf[i] = image.charCodeAt(i);
        }
        return resolve(buf);
      }
  
    })
  }

export default uploadDocument