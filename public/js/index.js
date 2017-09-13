function Conform_Delete()
    {
       return conform("Are You Sure Want to Delete?");
    }
///Fetch
document.querySelector("form.live-submit").addEventListener("submit", function(event){
  event.preventDefault();
  let title = document.querySelector("#pet-title").value.toString()
  let body = document.querySelector("#pet-body").value.toString()
  let contact = document.querySelector("#pet-contact").value.toString()

  form = {
    title: title,
    body: body,
    contact: contact,
    lat:  document.querySelector("#pet-lat").value,
    long: document.querySelector("#pet-long").value
};
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
    console.log("json", response)
    return response
  })
  .then( function(r) {
    return r.json()

  })
  .catch( function(e) {
    console.log("ERROR:", e)

  })
});



//////Google map
function initMap() {
  var houston = {
    lat: 29.7604,
    lng: -95.3698
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: houston
  });
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
    google.maps.event.addListener(map, 'click', function(event) {
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
        <img src="https://iheartcats.com/wp-content/uploads/2017/05/cat-1.jpeg" height="100" width="100">
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
