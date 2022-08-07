
const downloadDoc = (file) => {
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);
console.log(file,'lalallaalalalala');

    link.href = file;
    link.target="_blank"
    link.click();
}

export default downloadDoc