  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
var mostrarErrores = 1;

var app = new Framework7({


    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'false',
    },

    
    // Add default routes
    routes: [
      {
        path: '/foro/',
        url: 'foro.html',
      },
       {
        path: '/horarios/',
        url: 'horarios.html',
      },
          {
        path: '/forologin/',
        url: 'forologin.html',
      },

      {
        path: '/foroinicio/',
        url: 'foroinicio.html',
      },

         {
        path: '/fororegister/',
        url: 'fororegister.html',
      },





    ]
    // ... other parameters
  } );

var mainView = app.views.create('.view-main');

var email;

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");

      $$('#btn-register').on('click', fnRegister);

    // $$('.tocaBoton').on('click', fnTocaBoton);

});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
        fnMostrarError(e);

})



// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
        fnMostrarError(e);


})
$$(document).on('page:init', '.page[data-name="fororegister"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized

      $$('#btn-register').on('click', fnRegister);
})





/** FUNCIONES PROPIAS **/
/*
function fnTocaBoton() {
    var mensaje = "";

    idDelBoton = this.id;
    mensaje = "Mi ID es: " + idDelBoton + "<br/>";

    // voy a "separar" el valor del id, usando los guiones bajos
    // el split separa un valor (en este caso una variable),
    // usando el caracter o caracteres indicandos como parámetro
    // el resultado es un array!
    var partes = idDelBoton.split("_");

    // sabiendo la forma: btn_g1_1 puedo tener:
    p0 = partes[0];
    p1 = partes[1];
    p2 = partes[2];

    mensaje += "Soy del Grupo: " + p1 + "<br/>";
    mensaje += "Y tengo el nro: " + p2 + "<br/>";


    $$('#msgBtn').html(mensaje);



};*/

function fnRegister() {

    var elMail = $$('#email').val(); // es un input... uso val!
    var laClave = $$('#clave').val(); // es un input... uso val!

    email = elMail;

    var huboError = 0;

    firebase.auth().createUserWithEmailAndPassword(elMail, laClave)          
      .catch(function(error) {       
        // Handle Errors here.
        huboError = 1;
        var errorCode = error.code;
        var errorMessage = error.message; 
        
        fnMostrarError(errorCode);
        fnMostrarError(errorMessage);
      })
      .then(function(){
          if(huboError == 0){
            // alert('OK');
            // lo seteo en el panel.... contenedor lblEmail
            mainView.router.navigate("/foroinicio/");
          }
      });
}



function fnMostrarError(txt) {
  if (mostrarErrores == 1) {
      console.log("ERROR: " + txt);
  }
}


