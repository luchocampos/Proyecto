  
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
        path: '/fororegister2/',
        url: 'fororegister2.html',
      },

         {
        path: '/fororegister/',
        url: 'fororegister.html',
      },
         {
        path: '/inicioforo/',
        url: 'inicioforo.html',
      },
      {
        path: '/forogeneral/',
        url: 'forogeneral.html',
      },
         {
        path: '/perfil/',
        url: 'perfil.html',
      },







    ]
    // ... other parameters
  } );

var mainView = app.views.create('.view-main');

var email;
var nombre;
var db, refUsuarios, refContinuar;
// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");

db = firebase.firestore();
refUsuarios=db.collection("USUARIO");
refContinuar=db.collection("DATOS");







   $$('#continuar').on('click', fnContinuar);

      
      $$('#login').on('click', fnLogin);
      
      $$('.btn-facebook').on('click', fnFacebook);

      $$('#btn-register').on('click', fnRegister);

       $$('.btn-google').on('click', fnGoogle);



});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
        fnMostrarError(e);
   $$('#continuar').on('click', fnContinuar);
      $$('#login').on('click', fnLogin);
      $$('.btn-facebook').on('click', fnFacebook);
      $$('#btn-register').on('click', fnRegister);
      $$('.next').on('click', fnNext);
      $$('.btn-google').on('click', fnGoogle);
      

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
    var elNombre = $$('#nombre').val();
    var elUsuario = $$('#id').val();
     email = elMail;
    nombre = elNombre;
     var data = {
      nombre: elNombre,
      usuario: elUsuario,
      clave: laClave,
     } 
     refUsuarios.doc(nombre).set(data);


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
            mainView.router.navigate("/fororegister2/");
          }
      });


}



function fnMostrarError(txt) {
  if (mostrarErrores == 1) {
      console.log("ERROR: " + txt);
  }
}

 function fnGoogle(){
    if (!firebase.auth().currentUser){

      const provider = new firebase.auth.GoogleAuthProvider();

      provider.addScope ('https://www.googleapis.com/auth/cloud-platform');

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
      alert("ok");
      firebase.auth().signOut();
          mainView.router.navigate("/fororegister2/");

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
    mainView.router.navigate("/fororegister2/");

    }
  }



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

                
            mainView.router.navigate("/fororegister2/");

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
  
function fnContinuar(){
   var provincia = $$('#provincia').val();
 var localidad = $$('#localidad').val();
 var institucion = $$('#institucion').val();
 var carrera = $$('#carrera').val();

     var data = {
      
      provincia: provincia,
      localidad: localidad,
      institucion: institucion,
      carrera : carrera,


     } 

     refContinuar.doc(nombre).set(data);

};


