$(document).ready(function () {
  
  var artist = {};

  $.get("/api/user_data").then(function (data) {
    console.log(data);
    artist = data;
  });

  
$("#bioSave").on("click", function () {
  var bio = $("#shortBio").val().trim();
  console.log(bio);
  $.ajax("/api/" + artist.id, {
    type: "PUT",
    data: {
      short_bio: bio
    }
  }).then(function (data) {
    console.log(data);
    // window.location.replace(data);
  });
});

  var artClassArr = [];
  var artClass = [];
  var radio;
  $("#saveArtClass").on("click", function () {
    event.preventDefault();
    artClass = $("[name='category2']");
    radio = $("[name='radios']");
    console.log(radio);

    $.each(artClass, function (index, element) {
      if (element.checked === true) {
        artClassArr.push(element.value);
      }
    });

    $.each(radio, function (index, element) {
      if (element.checked === true) {
        radio = element.value ;
      }
    });

    console.log(artClass);
    $.ajax("/api/" + artist.id, {
      type: "PUT",
      data: {
        radio: radio,
        categories: artClassArr
      }
    }).then(function (data) {
      console.log(data);
    });
  });
});