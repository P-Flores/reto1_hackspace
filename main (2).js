
  var config = {
    apiKey: "AIzaSyBOYKqiqoGO7CGhEbnRDJcjemY3Pl8rYc0",
    authDomain: "proyecto-demo-87025.firebaseapp.com",
    databaseURL: "https://proyecto-demo-87025.firebaseio.com",
    storageBucket: "proyecto-demo-87025.appspot.com",
    messagingSenderId: "139511772847"
  };
  firebase.initializeApp(config);
/* 
//Probando conexion
var presenceRef = firebase.database().ref("disconnectmessage");
// Write a string when this client loses connection
presenceRef.onDisconnect().set("I disconnected!");

var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    alert("connected");
  } else {
    alert("not connected");
  }
});
*/
 /* funciónque agregara un evento a un elemento HTML, y solamente mostraremos el key y el texto de latecla presionada 
 */
/*$(document).ready(function(){
    $('#tags').on('keypress', function(e){
      console.log(e.which+"-"+e.key);
    });
  });*/
/*
Comenzaremos a refactorizar el códigoque tenemos para proveerla funcionalidad deseada, primero restringiremos si en el texto de autocomplete, se comienza a teclear cualquier tecla distinta al ENTER se comenzara a cargar las opciones del autocomplete sinose cargara toda la data del usuario en el formulario, se cambiódel evento keypress a keyup puesto que el primero retornaba data cuando era presionada una tecla pero no retornaba lo que realmente existíaen el elemento del HTML
*/ 

function getAutoCompleteElements(substring){
  console.log(substring);
}
function loadForm(data){
  console.log(data);
}
$(document).ready(function(){
  $('#tags').on('keyup', function(e){
    if(e.which == 13){
      loadForm($(this).val());
    }else{
      getAutoCompleteElements($(this).val());
    }
  });
});



/*
Continuaremos con el flujo de mostrar el autocomplete por ello realizaremos la funcionalidad de la funcion getAutoCompleteElements, en la funciónpasa lo siguiente: se hace referencia a los usuarios en general y se piden todos los valores, lo que retorna estáen la variable spanshot y de la cual solo nos importan sus valores por ello le realizamos un val() y obtendremos todos los nombres de los usuarios, posteriormente los recorremos en un bucle a travésde la variable key. Posteriormente realizamos una validación, si es que el substring enviado es parte del nombre entonces la funciónindexOf retornara un numero entre 0 y la dimensióndel nombre porello es la validaciónde que sea mayor a –1 y la siguiente validaciónde menor a 5 es para que no se muestrenmásde 5 elementos en el autocomplete.
*/

function loadAutoComplete(data){
 // console.log(data);
  // Posteriormente se realizara el seteo de esas coincidencias en el texto que se desplegara al tipear algúntexto
  $("#tags").autocomplete(
    {
      source : data,
  });
  
}

function getAutoCompleteElements(substring){
  var val = substring;
  var i=0;
var names = [];
  firebase.database().ref('usuario/').on('value', function(snapshot) {
    for (key in snapshot.val()){
      if (key.indexOf(val)>-1){
        if(i<5){
          names.push(key);
          i++;
        }
      }
    }
    loadAutoComplete(names);
  });
}
//A continuación proseguiremos con el flujo de cargar toda la data del usuario, modificando el códigopara que luzca de la siguiente forma, como ya escribimos el nombre la base de datos de firebase busca la ruta de usuario el nombre que pasas.


function loadForm(data){
  firebase.database().ref('usuario/'+ data).on('value', function(snapshot){
    var data = snapshot.val();
    setDataIntoHTML(data);
  });
}
function setDataIntoHTML(data){
  //console.log(data);
 // mostrar toda la informacióndel usuario en forma de arrayFinalmente modificaremos la funciónfinal para que se pinte adecuadamente en el formulario la data del usuario a partir de su nombre, se le agregara el texto correspondiente a cada elemento HTML
  
$("#email").val(data.email);
$("#last").val(data.apellido);
$("#dni").val(data.dni);
$("#age").val(data.edad);
$("#name").val(data.nombre);
$("#sex").val(data.sexo);
$("#telephone").val(data.telefono);
}
