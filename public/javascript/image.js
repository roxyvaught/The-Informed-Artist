const form = document.querySelector('form');

form.addEventListener('submit', event => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Client-ID feae38853c20803");

    var  formdata = new FormData();
    const image = document.getElementById('image-input');
    // returns an array
    formdata.append("image", image.files[0])

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };
    fetch("https://api.imgur.com/3/image", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
});

/*
   <form>
      <input name="image" id="image-input" accept="image/*" type= "file">
      <button type="submit">Submit</button> 
   </form>

    <script src="/javascript/image.js"></script>

*/