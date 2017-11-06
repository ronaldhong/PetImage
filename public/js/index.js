///share comment display/hide


$(document).ready(function(){
    $(".comment_display").click(function(){
      $(`.${this.id}`).show(100);
      $(`#${this.id}`).hide();
      $(`#${this.id}_hide`).show();
    });

    $(".comment_hide").click(function(){
      $(`.${this.id}`.slice(0,-5)).hide(100);
      $(`#${this.id}`.slice(0,-5)).show();
      $(`#${this.id}`).hide();
    })
});
/////Delete mypost
function Conform_Delete()
    {
       return conform("Are You Sure?");
    }
///Fetch
if (document.querySelector("form.live-submit")){
  document.querySelector("form.live-submit").addEventListener("submit", function(event){
    event.preventDefault();
    let image;
    let title = document.querySelector("#pet-title").value.toString()
    let body = document.querySelector("#pet-body").value.toString()
    let contact = document.querySelector("#pet-contact").value.toString()
    // let image = document.querySelector("#pet-img").value.toString()
    console.log(document.querySelector("#pet-img").value.toString());
    if (document.querySelector("#pet-img").value.toString()){
      form = {
        title: title,
        body: body,
        contact: contact,
        lat:  document.querySelector("#pet-lat").value,
        long: document.querySelector("#pet-long").value,
        image:document.querySelector("#pet-img").value.toString()
      };
    }
    else{
      // let image = 'http://www.craftcuts.com/media/catalog/product/cache/42/small_image/360x250/0d0b21afdf5242369dcac3b6f8a25135/d/i/dimensional_animals_dogs_labrador_retriever.jpg';
      form = {
        title: title,
        body: body,
        contact: contact,
        lat:  document.querySelector("#pet-lat").value,
        long: document.querySelector("#pet-long").value,
        image:'http://www.craftcuts.com/media/catalog/product/cache/42/small_image/360x250/0d0b21afdf5242369dcac3b6f8a25135/d/i/dimensional_animals_dogs_labrador_retriever.jpg'
      };
    }

    // let lat = document.querySelector("#pet-lat").value
    // let long = document.querySelector("#pet-long").value
    console.log("form",form);
    fetch("/api/pet", {
      method: "POST",
      body: JSON.stringify(form),
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "content-type": "application/json"
      }
    })
    .then( function(response){
      alert("Your post is successfully saved!")
      return response

    })
    .catch( function(e) {
      console.log("ERROR")
    })
  });
}




//////Google map
function initMap() {
  var houston = {
    'lat': 29.7604,
    'lng': -95.3698
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: houston
  });
  fetch("/api/pet",{
    credentials: "same-origin",
    headers : {
        "Content-Type": "application/json",
        "Accept": "application/json"
       }
  })
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(map, 'rightclick', function(event) {
      alert("Latitude: " + event.latLng.lat() + " " + ", longitude: " + event.latLng.lng());
    });


    for (var i = 0; i < data.pet.length; i++) {
      let content_string = data.pet[i].body
      let position = {
        'lat': data.pet[i].lat,
        'lng': data.pet[i].long
      }
      let content = `
        <h3>${data.pet[i].title}</h3>
        <img class="user_upload_img" src=${data.pet[i].imageURL} height="100px" width="100px">
        <p>${data.pet[i].contact}</p>
        <p>${content_string}</p>
        <small>posted on ${data.pet[i].createAt}</small>
        `

      var marker = new google.maps.Marker({position: position, map: map})
      marker.addListener('click', function() {
        infowindow.setContent(content)
        infowindow.open(map, marker);
      })
    }
  })
}



// function readURL(input) {
//   if (input.files && input.files[0]) {
//     var reader = new FileReader();
//
//     reader.onload = function(e) {
//       $('#blah').attr('src', e.target.result).width(150).height(150);
//     };
//
//     reader.readAsDataURL(input.files[0]);
//   }
// }
