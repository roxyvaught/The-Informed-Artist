async function editFormHandler(event) {
    event.preventDefault();
    const pic_id = window.location.toString().split('/') [
        window.location.toString().split('/').length-1]
    const id = window.location.toString().split('/') [
    window.location.toString().split('/').length-2]
    const title = document.querySelector('input[name="edit-post-title"]').value;
    const post_url = document.querySelector('input[name="edit-post-url"]').value;
    const notes = document.querySelector('textarea[name="edit-notes"]').value;
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_url,
            title,
            notes
        }),
        headers: {
            'Content-Type':'application/json'
        }
       
  })
     if(response.ok) {
     document.location.replace(`/posts/${pic_id}`);
     } else {
      alert(response.statusText);
 }
} 

async function deleteFormHandler(event) {
    event.preventDefault();
    const pic_id = window.location.toString().split('/') [
        window.location.toString().split('/').length-1]
    const id = window.location.toString().split('/') [
        window.location.toString().split('/').length-2]
        
        const response = await fetch(`/api/posts/${id}`, {
            method:'DELETE',
        })
        if(response.ok) {
            document.location.replace(`/posts/${pic_id}`);
        }else{
            alert(response.statusText);
        }
        
    }


  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
  document.querySelector('#delete-artist').addEventListener('click',deleteFormHandler)