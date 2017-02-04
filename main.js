
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBOYKqiqoGO7CGhEbnRDJcjemY3Pl8rYc0",
    authDomain: "proyecto-demo-87025.firebaseapp.com",
    databaseURL: "https://proyecto-demo-87025.firebaseio.com",
    storageBucket: "proyecto-demo-87025.appspot.com",
    messagingSenderId: "139511772847"
  };
  firebase.initializeApp(config);
  // funcion para ocultar con el toggle switch 
$().ready(function() {
    $('.clicker').click(function() {
        $('.ocultar').each(function() {
            if ($(this).attr('disabled')) {
                $(this).removeAttr('disabled');
            }
            else {
                $(this).attr({
                    'disabled': 'disabled'
                });
            }
        });
    });
});
 /*
  ("Sistema de asistencia")
 ("almacenar: hora de marcado, hora de entrada y nombre del usuario")
 ("guardar un mensaje de estado de asistencia "+
 "15 minutos tarde: Has llegado tarde"+
 "si llego entre la hora y 15 minutos: Llegaste a la hora"+
 "antes de la hora de entrada: Has madrugado, te mereces un premio")
 ("parte inferior- pequeña sección en la que podamos"+
 " ingresar el nombre del usuario y mostrar el mensaje correspondiente a su asistencia y su hora de entrada.")
("Hora de entrada full time: 8 am // Hora de entrada part time: 4 pm")
*/









































  //ASINCRONO
function getAutoCompleteElements(substring){
  console.log(substring);
}
function loadForm(data){
  console.log(data);
}
$(document).ready(function(){
  $('#nombre1').on('keyup', function(e){
    if(e.which == 13){
      loadForm($(this).val());
    }else{
      getAutoCompleteElements($(this).val());
    }
  });
});
function loadAutoComplete(data){
   $("#nombre1").autocomplete(
    {
      source : data,
  });
}

function getAutoCompleteElements(substring){
  var val = substring;
  var i=0;
var names = [];
  firebase.database().ref('asistencia/').on('value', function(snapshot) {
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
//RECUPERAR DATOS: funcion load form y funcion set data into html
function loadForm(data){
  firebase.database().ref('asistencia/'+ data).on('value', function(snapshot){
    var data = snapshot.val();
    setDataIntoHTML(data);
  });
}
function setDataIntoHTML(data){
$("#marcado1").val(data.entrada.hora+":"+data.entrada.minuto);
$("#entrada1").val(data.llegada.hora+":"+data.llegada.minuto);
$("#mensaje1").val(data.mensaje);
}

  function getOrigin(){
    return $('#origen').val();
  }

  function getDestiny(){
    return $('#destino').val();
  }
  
  function getMessage(){
    return $('#mensaje').val();
  }

  function getHour(){
    return hh.className.slice(-1)+hx.className.slice(-1);
  }
  function getMinute(){
    return mm.className.slice(-1)+mx.className.slice(-1);
  }
 /* function getSecond(){
    return ss.className.slice(-1)+sx.className.slice(-1);
  }*/
  //FUNCION PARA GUARDAR DATOS
  function storeMessage(origin,destiny,message){
    //console.log(getHour()+"-"+getMinute()+"-"+getSecond());
    //console.log(origin+"-"+destiny+"-"+message);
    firebase.database().ref(
      'asistencia/'+getHour()+'/'+getMinute()+'/'+
      //getSecond()+'/'+
      getOrigin()
    ).set({
      mensaje : message,
      destino : destiny
    });
  }
//FIN FUNCION GUARDAR DATOS
  $(document).ready(function(){
    $('#mensaje').on('keypress', function(e){
      //console.log(e.which);
      if (e.which==13){
        storeMessage(getOrigin(), getDestiny(), getMessage());
      }
    });
  });

//FUNCION HORA EN LED
var led = document.getElementById('led'),
      els = led.childNodes,
    uid=0, size=15, w=0, h=0, row=0, col=0,
    arr_lights=[];

var hh = document.getElementById('time-hh'),
      hx = document.getElementById('time-h'),
      mm = document.getElementById('time-mm'),
      mx = document.getElementById('time-m'),
      ss = document.getElementById('time-ss'),
      sx = document.getElementById('time-s');

for(var k=0, len=els.length; k<len; k++){
  if(els[k].nodeType!=1)
    continue;
    w = parseInt(els[k].clientWidth);
  h = parseInt(els[k].clientHeight);
  row   = parseInt(h/size);
    col = parseInt(w/size);

  var t, l, sum=0;
  for(var i=0; i<row; i++){
    for(var j=0; j<col; j++){
      uid++;
      t = size*i;
      l = size*j;
      arr_lights.push( '<div uid="'+uid+'" id="l-'+uid+'" class="light row-'+i+' col-'+j+'" style="top:'+t+'px;left:'+l+'px"></div>');
    }
  }
  els[k].innerHTML = arr_lights.join("");
  arr_lights=[];
}

setInterval(function(){
    var now = new Date(),
        time_hh = parseInt(now.getHours()),
          time_mm = parseInt(now.getMinutes()),
            time_ss = parseInt(now.getSeconds());
    hh.className = "block-digital num-"+parseInt(time_hh/10);
    hx.className = "block-digital num-"+parseInt(time_hh%10);
    mm.className = "block-digital num-"+parseInt(time_mm/10);
    mx.className = "block-digital num-"+parseInt(time_mm%10);
    ss.className = "block-digital num-"+parseInt(time_ss/10);
    sx.className = "block-digital num-"+parseInt(time_ss%10);

}, 1000);
