function initMap(){
  var laboratoriaLima = { lat:-12.1191427 , lng:-77.0349046 };
  var map = new google.maps.Map(document.getElementById("map"),{
    zoom :18,
    center: laboratoriaLima
  });
  var markadorLaboratoria = new google.maps.Marker({
    position: laboratoriaLima ,
    map: map
  });

  var inputPartida = document.getElementById('punto-partida');
  var inputDestino = document.getElementById('punto-destino');

  new google.maps.places.Autocomplete(inputPartida);
  new google.maps.places.Autocomplete(inputDestino);

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  var calculateAndDisplayRoute = function( directionsService , directionsDisplay){
    directionsService.route({
      origin:inputPartida.value,
      destination:inputDestino.value,
      travelMode: 'DRIVING'
    },function(response,status){
      if(status ==='OK'){
        var distancia=
        Number((response.routes[0].legs[0].distance.text.replace("km","")).replace(',',"."));
        tarifa.classList.remove("none");
        var costo=distancia*1.75;
        if(costo<4){
          tarifa.innerHTML="S/. 4";
        }
        tarifa.innerHTML="S/. "+parseInt(costo);
        console.log(response.routes[0].legs[0].distance.text);

        directionsDisplay.setDirections(response);
      }else {
        window.alert('No encontramos una ruta.');
      }
    });
  }
  directionsDisplay.setMap(map);
  var TrazarRuta =function(){
    calculateAndDisplayRoute(directionsService,directionsDisplay);
  };
  document.getElementById('trazar-ruta').addEventListener('click',TrazarRuta);

  function buscar(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(funcionExito,funcionError)
    }
  }

  var latitud,longitud;
  var funcionExito = function(position){
    //var mapita = new google.maps.Map(document.getElementById("encuentrame"));
    latitud =position.coords.latitude;
    longitud =position.coords.longitude;
    mapa.setZoom(18);
    mapa.setCenter({lat:latitud, lng:longitud});

    var miUbicacion = new google.maps.Marker({
      position:{lat:latitud , lng:longitud },
      map: map
    });
  }

  var funcionError =function(error){
    alert("Tenemos  un problema  con encontrar tu ubicacion ")
  }

  document.getElementById("buscar").addEventListener("click",buscar);
}
