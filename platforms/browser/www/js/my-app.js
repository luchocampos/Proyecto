  
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

       $$('.btn-google').on('click', fnGoogle);



});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
        fnMostrarError(e);
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
var items = [];
for (var i = 1; i <= 10000; i++) {
  items.push({
    title: 'Item ' + i,
    subtitle: 'Subtitle ' + i
  });
}

var virtualList = app.virtualList.create({
  // List Element
  el: '.virtual-list',
  // Pass array with items
  items: items,
  // Custom search function for searchbar
  searchAll: function (query, items) {
    var found = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
    }
    return found; //return array with mathced indexes
  },
  // List item Template7 template
  itemTemplate:
    '<li>' +
      '<a href="#" class="item-link item-content">' +
        '<div class="item-inner">' +
          '<div class="item-title-row">' +
            '<div class="item-title">{{title}}</div>' +
          '</div>' +
          '<div class="item-subtitle">{{subtitle}}</div>' +
        '</div>' +
      '</a>' +
    '</li>',
  // Item height
  height: app.theme === 'ios' ? 63 : (app.theme === 'md' ? 73 : 46),
});




function fnRegister() {

    var elMail = $$('#email').val(); // es un input... uso val!
    var laClave = $$('#clave').val(); // es un input... uso val!
    var elNombre = $$('#nombre').val();
    var elUsuario = $$('#id').val();
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
  




