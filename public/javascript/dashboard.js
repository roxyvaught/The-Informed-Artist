$(document).ready(function () {

  $("#portfolio-link").on("click", function () {
    console.log("you clicked portfolio");
    $("#portfolio-link").addClass("active");
    $("#portfolio").removeClass("d-none");
    $("#profile").addClass("d-none");
    $("#description").addClass("d-none");
    $("#description-link").removeClass("active");
    $("#profile-link").removeClass("active");

  });

  $("#profile-link").on("click", function () {
    console.log("you clicked profile");
    $("#profile-link").addClass("active");
    $("#profile").removeClass("d-none");
    $("#description").addClass("d-none");
    $("#portfolio").addClass("d-none");
    $("#description-link").removeClass("active");
    $("#portfolio-link").removeClass("active");

  });

  var user = {};

  $("#bioSave").on("click", function () {
    var bio = $("#shortBio").val().trim();
    console.log(bio);
    $.ajax("/api/bio/" + user.id, {
      type: "PUT",
      data: {
        short_bio: bio
      }
    }).then(function (data) {
      console.log(data);
      // window.location.replace(data);
    });
  });

  var descriptionArr = [];
  var description = [];
  var radio;
  $("#saveDescription").on("click", function () {
    event.preventDefault();
    description = $("[name='category2']");
    radio = $("[name='radios']");
    console.log(radio);

    $.each(description, function (index, element) {
      if (element.checked === true) {
        descriptionArr.push(element.value);
      }
    });

    $.each(radio, function (index, element) {
      if (element.checked === true) {
        radio = element.value ;
      }
    });

    console.log(descriptionArr);
    $.ajax("/api/portfolio/" + user.id, {
      type: "PUT",
      data: {
        radio: radio,
        categories: descriptionArr
      }
    }).then(function (data) {
      console.log(data);
    });
  });
});
