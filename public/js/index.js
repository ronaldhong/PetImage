let coord_list=[]
function initMap() {


  var houston = {lat: 29.7604, lng: -95.3698};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: houston
  });
  var infowindow = new google.maps.InfoWindow();

  fetch("http://localhost:8080/")
  .then( function(response){
    return response.json()
  })
  .then(function(data){
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      let position ={'lat':data[i].lat, 'lng': data[i].lng}
      var marker= new google.maps.Marker({
        position: position,
        map: map
      })
      var infoWindow = new google.maps.InfoWindow({
        content:`
          <h3>${data[i].title}</h3>
          <img src="https://iheartcats.com/wp-content/uploads/2017/05/cat-1.jpeg" height="100" width="100">
          <p>${data[i].time}</p>
          <p>${data[i].body}</p>
          `
      })
      marker.addListener('click', function(){
        infoWindow.open(map,marker);
      })
      // google.maps.event.addListener(marker, 'click', (function(marker, i) {
      //         return function() {
      //           console.log("click");
      //           infowindow.setContent(data[i].title);
      //           infowindow.open(map, marker);
      //         }
      //       }
      //     )
      //   )(marker, i);
    }
  })
}
function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah')
                    .attr('src', e.target.result)
                    .width(150)
                    .height(150);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
