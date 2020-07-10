var addartistModal = document.querySelector("#add-artist-modal");
var editartistModal = document.querySelector("#edit-artist-modal");
var addartist = document.querySelector("#add-artist");
var closeAddartist = document.querySelector("#close-add-artist");
var editartist = document.querySelector("#edit-artist");
var closeEditartist = document.querySelector("#close-edit-artist");

openModal = (modal) => {
    modal.style.display="block";
}

closeModal =(modal) => {
    modal.style.display="none";
}
addartist.onclick= () => {
    openModal(addartistModal)
}
closeAddartist.onclick = () => {
    closeModal(addartistModal)
}
// editartist.onclick= () => {
//     openModal(editartistModal)
// }
// closeEditartist.onclick = () => {
//     closeModal(editartistModal)
// }