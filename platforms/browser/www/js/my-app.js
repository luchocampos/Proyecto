  
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

      
      $$('#login').on('click', fnLogin);
      
      $$('.btn-facebook').on('click', fnFacebook);

      $$('#btn-register').on('click', fnRegister);



});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
        fnMostrarError(e);
      $$('#login').on('click', fnLogin);
      $$('.btn-facebook').on('click', fnFacebook);
      $$('#btn-register').on('click', fnRegister);
             $$('.next').on('click', fnNext);


})



// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="foro"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
        fnMostrarError(e);


})
$$(document).on('page:init', '.page[data-name="fororegister"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized



})







/** FUNCIONES PROPIAS **/
var swiper = new Swiper(".swiper-container",{
spaceBetween:0,
    pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },

}
);




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


function fnFacebook(){
  
   if (!firebase.auth().currentUser){

      const provider = new firebase.auth.FacebookAuthProvider();

      provider.addScope ('public_profile');

      firebase.auth().signInWithPopup(provider).then (function(result){

        var token = result.credential.accesstoken;
        var user = result.user;
        console.log(user);
        
      }).catch (function (error) {

        var errorCode = error.Code
        var errorMessage = error.message;
        var erroremail = error.email;
        var credential = error.credential;

        if (errorCode=== 'auth/account-exists-with-different-credential'){
          alert('Es el mismo usuario')
        }
      })

    }else {
      firebase.auth().signOut();
    mainView.router.navigate("/foroinicio/");

    }
  }
   // document.getElementById('.btn-facebook').addEventListener('click', fnFacebook,false);



function fnLogin() {

    email = $$('#email').val();
    var clave = $$('#clave').val();
       
//Se declara la variable huboError (bandera)
    var huboError = 0;
        
    firebase.auth().signInWithEmailAndPassword(email, clave)
        .catch(function(error){
//Si hubo algun error, ponemos un valor referenciable en la variable huboError
            huboError = 1;
            var errorCode = error.code;
            var errorMessage = error.message;
            fnMostrarError(errorMessage);
            fnMostrarError(errorCode);
        })
        .then(function(){   
//En caso de que esté correcto el inicio de sesión y no haya errores, se dirige a la siguiente página
            if(huboError == 0){

                
            mainView.router.navigate("/foroinicio/");

                      } else {
                          // doc.data() will be undefined in this case
                          //console.log("No such document!");
                      }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });   }

function fnNext(){
swiper.slideNext()


};
   




