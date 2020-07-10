//const axios = require('axios');

async function newFormHandler(event) {
    
    event.preventDefault();
    
    const title = document.querySelector('input[name="pic-title"]').value;

   const response = await fetch(`/api/pics`, {
    method: 'POST',
    body: JSON.stringify({
        title,
        
    }),
    headers: {
        'Content-Type': 'application/json'
    }
});

if(response.ok) {
    modal=document.getElementById('pic-modal')
    modal.style.display="none"
    document.location.replace('/');
}else {
    alert(response.statusText);
}

}

  document.querySelector('.new-pic-form').addEventListener('submit',newFormHandler)
