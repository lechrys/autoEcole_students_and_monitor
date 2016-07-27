//Une bonne partie des fonctions non dépendantes de l'api en vrac


//Deconnexion, vide le 'cache' et redirige l'utilisateur
function logout()
{
  localStorage.clear();
  localStorage.setItem("tutorial", "clear");
  window.location.href = "../index.html";
}

function loading()
{
  $('body').scrollTop(0);
  document.addEventListener('touchmove', handleTouchMove, false);
  $("body").append("<svg class='spinner' width='65px' height='65px' viewBox='0 0 66 66' xmlns='http://www.w3.org/2000/svg'>" +
   "<circle class='path' fill='none' stroke-width='6' stroke-linecap='round' cx='33' cy='33' r='30'></circle>" +
   "</svg><div id='loadiv'></div>");
}

function reload() {
  location.reload();
}

//Show me the starrr !
function starrr(star)
{
  for (i = 5, k = 10; i > 0; i -= 0.5, --k)
  {
    if (star >= i)
    {
      if (k%2 == 1) //Si demi étoile
      {
        for (j = 0; j < star; ++j)
          $("#star" + j).attr("src", "../img/mfs.png");
        $("#star" + j).attr("src", "../img/mhs.png");
      }
      else
      {
        for (j = 0; j <= star; ++j)
          $("#star" + j).attr("src", "../img/mfs.png");
      }
      i = -1;
    }
  }
}

function getPhone() //Récup auto du numéro de tel pour inscription
{
  window.plugins.phonenumber.get(success, fail);

  function success(phonenumber) 
  {
    var phonenumber = phonenumber.substr(3);
    phonenumber = "0" + phonenumber;
    localStorage.setItem("phone", phonenumber);
    return phonenumber;
  }

  function fail() {
    localStorage.setItem("phone", "error");
  }
  return phonenumber;
}

//Prend ou charge une photo à l'aide du plugin camera
function loadPicture()
{
  navigator.camera.getPicture(onSuccess, onFail, { destinationType: Camera.DestinationType.FILE_URI,
   sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY, targetWidth: 200, targetHeight: 200
 });

  //Envoie au serveur avec le plugin file transfer
  function onSuccess(imageURI) {
    var myDate = new Date();
    var date = myDate.getFullYear() +"-" + (myDate.getMonth() + 1)  +"-" + myDate.getUTCDate() +"_" + myDate.getHours() + "-" + myDate.getMinutes() + "-" + myDate.getSeconds();
    var options = new FileUploadOptions();
    var userid = localStorage.getItem("userid");

    options.fileKey = "file";
    options.fileName = "photo-" + userid + "-" + date + ".jpeg";
    options.mimeType = "image/jpeg";
    var params = {};
    params.userid = localStorage.getItem("userid");
    params.date = date;
    params.account = "user";
    options.params = params;

    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://62.210.192.92/AE/web/upload.php"), win, fail, options);
    navigator.notification.alert("Changement effectué", "", "Photo de profile");
    reload();
    var win = function (r) {}
    var fail = function (error) {}
  }
  function onFail(error) {}
}

function takePicture()
{
  navigator.camera.getPicture(onSuccess, onFail, { destinationType: Camera.DestinationType.FILE_URI,
   cameraDirection: 1, quality: 100, targetWidth: 200, targetHeight: 200
 });

  function onSuccess(imageURI) {
    var userid = localStorage.getItem("userid");
    var myDate = new Date();
    var date = myDate.getFullYear() +"-" + (myDate.getMonth() + 1)  +"-" + myDate.getUTCDate() +"_" + myDate.getHours() + "-" + myDate.getMinutes() + "-" + myDate.getSeconds();
    //var date = Date.today().toString("yyyy-MM-dd_HH-mm-ss");
    var options = new FileUploadOptions();

    options.fileKey = "file";
    options.fileName = "photo-" + userid + "-" + date + ".jpeg";
    //options.fileName = "photo-" + localStorage.getItem("userid") + "-" + date + ".jpeg";
    options.mimeType = "image/jpeg";
    var params = {};
    params.userid = localStorage.getItem("userid");
    params.date = date;
    params.account = "user";
    options.params = params;

    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://62.210.192.92/AE/web/upload.php"), win, fail, options);
    navigator.notification.alert("Changement effectué", "", "Photo de profil");
    reload();
    var win = function (r) {}
    var fail = function (error) {}
  }
  function onFail(error) {


  }
}

/*
** classie - class helper functions
** from bonzo https://github.com/ded/bonzo
*/
(function(window) {
  'use strict';
// class helper functions from bonzo https://github.com/ded/bonzo
function classReg(className) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}
// classList support for class management
var hasClass, addClass, removeClass;

if ('classList' in document.documentElement) 
{
  hasClass = function(elem, c) {
    return elem.classList.contains(c);
  };
  addClass = function(elem, c) {
    elem.classList.add(c);
  };
  removeClass = function(elem, c) {
    elem.classList.remove(c);
  };
}
else 
{
  hasClass = function(elem, c) {
    return classReg(c).test(elem.className);
  };
  addClass = function(elem, c) {
    if (!hasClass(elem, c))
      elem.className = elem.className + ' ' + c;
  };
  removeClass = function(elem, c) {
    elem.className = elem.className.replace(classReg(c), ' ');
  };
}

function toggleClass(elem, c) {
  var fn = hasClass(elem, c) ? removeClass : addClass;
  fn(elem, c);
}

window.classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};
})(window);

/*
jQuery-Rotate-Plugin v0.2 by anatol.at
http://jsfiddle.net/Anatol/T6kDR/
*/
$.fn.rotate=function(options) {
  var $this=$(this), prefixes, opts, wait4css=0;
  prefixes=['-Webkit-', '-Moz-', '-O-', '-ms-', ''];
  opts=$.extend({
    startDeg: false,
    endDeg: 360,
    duration: 1,
    count: 1,
    easing: 'linear',
    animate: {},
    forceJS: false
  }, options);

  function supports(prop) {
    var can=false, style=document.createElement('div').style;
    $.each(prefixes, function(i, prefix) {
      if (style[prefix.replace(/\-/g, '')+prop]==='') {
        can=true;
      }
    });
    return can;
  }

  function prefixed(prop, value) {
    var css={};
    if (!supports.transform) {
      return css;
    }
    $.each(prefixes, function(i, prefix) {
      css[prefix.toLowerCase()+prop]=value || '';
    });
    return css;
  }

  function generateFilter(deg) {
    var rot, cos, sin, matrix;
    if (supports.transform) {
      return '';
    }
    rot=deg>=0 ? Math.PI*deg/180 : Math.PI*(360+deg)/180;
    cos=Math.cos(rot);
    sin=Math.sin(rot);
    matrix='M11='+cos+',M12='+(-sin)+',M21='+sin+',M22='+cos+',SizingMethod="auto expand"';
    return 'progid:DXImageTransform.Microsoft.Matrix('+matrix+')';
  }

  supports.transform=supports('Transform');
  supports.transition=supports('Transition');

  opts.endDeg*=opts.count;
  opts.duration*=opts.count;

  if (supports.transition && !opts.forceJS) { // CSS-Transition
    if ((/Firefox/).test(navigator.userAgent)) {
      wait4css=(!options||!options.animate)&&(opts.startDeg===false||opts.startDeg>=0)?0:25;
    }
    $this.queue(function(next) {
      if (opts.startDeg!==false) {
        $this.css(prefixed('transform', 'rotate('+opts.startDeg+'deg)'));
      }
      setTimeout(function() {
        $this
        .css(prefixed('transition', 'all '+opts.duration+'s '+opts.easing))
        .css(prefixed('transform', 'rotate('+opts.endDeg+'deg)'))
        .css(opts.animate);
      }, wait4css);

      setTimeout(function() {
        $this.css(prefixed('transition'));
        if (!opts.persist) {
          $this.css(prefixed('transform'));
        }
        next();
      }, (opts.duration*1000)-wait4css);
    });

  } else { // JavaScript-Animation + filter
    if (opts.startDeg===false) {
      opts.startDeg=$this.data('rotated') || 0;
    }
    opts.animate.perc=100;

    $this.animate(opts.animate, {
      duration: opts.duration*1000,
      easing: $.easing[opts.easing] ? opts.easing : '',
      step: function(perc, fx) {
        var deg;
        if (fx.prop==='perc') {
          deg=opts.startDeg+(opts.endDeg-opts.startDeg)*perc/100;
          $this
          .css(prefixed('transform', 'rotate('+deg+'deg)'))
          .css('filter', generateFilter(deg));
        }
      },
      complete: function() {
        if (opts.persist) {
          while (opts.endDeg>=360) {
            opts.endDeg-=360;
          }
        } else {
          opts.endDeg=0;
          $this.css(prefixed('transform'));
        }
        $this.css('perc', 0).data('rotated', opts.endDeg);
      }
    });
  }

  return $this;
};

