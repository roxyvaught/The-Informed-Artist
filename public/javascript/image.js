const form = document.querySelector('form');
imageEl = document.querySelector('.imgurImage');

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
        .then(data => {
            console.log(data)
            console.log(data.data.link)
            var imgurImg = data.data.link
            imageEl.setAttribute('src', imgurImg)
        })
});

/*
   <form>
      <input name="image" id="image-input" accept="image/*" type= "file">
      <button type="submit">Submit</button> 
   </form>

    <script src="/javascript/image.js"></script>

*/