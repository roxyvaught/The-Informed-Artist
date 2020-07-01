const form = document.querySelector('form');

form.addEventListener('submit', event => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Client-ID feae38853c20803");

    var  formdata = new FormData();
    formdata.append("image", "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7")

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };
    fetch("https://api.imgur.com/3/image", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
});
