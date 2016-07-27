document.addEventListener("deviceready", OnDeviceReady, false);
var markers_temp = [];
var markers_length = 0;
var circle;
var marker_center;
var markers = [];
localStorage.setItem("i", 4);
localStorage.removeItem("ID1");
localStorage.removeItem("ID2");
localStorage.removeItem("ID3");
localStorage.removeItem("aename");
localStorage.removeItem("aename2");
localStorage.removeItem("aename3");
var infowindow;
var infoWindows = [];
var map;
var interval;
var id_marker = 0;

function closeAllInfoWindows() {
    for (var i = 0; i < infoWindows.length; i++) {
        infoWindows[i].close();
    }
    for (var i = 0; i < markers.length; i++) {
        markers[i].clicked = null;
    }
}
function cleanSelectedAE() {
    var icon = new google.maps.MarkerImage(
        '../img/check.png', null, null, null,
        new google.maps.Size(48, 48));
    localStorage.removeItem("ID1");
    localStorage.removeItem("ID2");
    localStorage.removeItem("ID3");
    localStorage.removeItem("aename");
    localStorage.removeItem("aename2");
    localStorage.removeItem("aename3");
    for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(icon);
        markers[i].customInfo = "";
    }
}
var aeAccepted = function (id_marker, id_ae, nom_ae) {

    document.getElementById("icon").setAttribute("class","icon");
    document.getElementById("mapdroit").setAttribute("class","visible_mapright");

    /*var id_ae = data[d].ID;
     var nom_ae = data[d].nom_auto_ecole;*/
    infowindow.close();
    $("#map1").text("Annuler").attr({
        "id": "map4",
        "class": "mapbutton2",
        "onclick": "cleanSelectedAE();"
    }).addClass("buttonleft");
    $("#map3").text("sélectionner ").attr({
        "id": "map5",
        "class": "mapbutton2",
        "onclick": ""
    }).addClass("buttonright").append($("<span></span>").attr("id", "mapspan"));
    $("#map2").hide();
    var bouton = document.getElementById(id_marker);

    var ID1 = localStorage.getItem("ID1");
    var ID2 = localStorage.getItem("ID2");
    var ID3 = localStorage.getItem("ID3");


    if ((ID1 == "") && (ID2 == "" || ID2 == null) && (ID3 == "" || ID3 == null)) {
        $("#map5").replaceWith("<button id='map5' class='mapbutton2 buttonright'>Sélectionnez <span id='mapspan'>3 auto-écoles" +
            "</span></button>");
        localStorage.removeItem("ID2");
        localStorage.removeItem("ID3");
    }

    var count = 0;
    var select_a = new Array();
    var icon = new google.maps.MarkerImage(
        '../img/check.png', null, null, null,
        new google.maps.Size(48, 48));

    var marker_select = null;

    var icon2 = new google.maps.MarkerImage(
        '../img/check2.png', null, null, null,
        new google.maps.Size(48, 48));

    for (var i = 0; i < markers.length; i++) {
        if (markers[i].customInfo == "selected") {
            count++;
            select_a.push(markers[i]);
        }
        if (markers[i].id == id_marker) {
            marker_select = markers[i];
        }
    }
    if ((ID1 == "") || (ID2 == "" || ID2 == null) || (ID3 == "" || ID3 == null)) {
        if (count == 0) {
            localStorage.setItem("ID1", id_ae);
            localStorage.setItem("aename", nom_ae);
            marker_select.setIcon(icon2);
            marker_select.customInfo = "selected";
            $("#map5").replaceWith("<button id='map5' class='mapbutton2 buttonright' onclick='renderchoice(localStorage." +
                "getItem(\"aename\"), localStorage.getItem(\"aename2\"), localStorage.getItem(\"aename3\"));'>Sélectionnez <span id='mapspan'>2 auto-écoles" +
                "</span></button>");
        } else if (count == 1 && ID1 != id_ae) {
            localStorage.setItem("ID2", id_ae);
            localStorage.setItem("aename2", nom_ae);
            marker_select.setIcon(icon2);
            marker_select.customInfo = "selected";
            $("#map5").replaceWith("<button id='map5' class='mapbutton2 buttonright' onclick='renderchoice(localStorage." +
                "getItem(\"aename\"), localStorage.getItem(\"aename2\"), localStorage.getItem(\"aename3\"));'>Sélectionnez <span id='mapspan'>1 auto-écoles" +
                "</span></button>");
        } else if (count == 2 && ID1 != id_ae && ID2 != id_ae) {
            localStorage.setItem("ID3", id_ae);
            localStorage.setItem("aename3", nom_ae);
            marker_select.setIcon(icon2);
            marker_select.customInfo = "selected";
            $("#map5").replaceWith("<button id='map5' class='mapbutton2 buttonright' onclick='renderchoice(localStorage." +
                "getItem(\"aename\"), localStorage.getItem(\"aename2\"), localStorage.getItem(\"aename3\"));'>Valider" +
                "</span></button>");
        } else if (count == 3) {

        }
    }
    if (ID1 == id_ae || ID2 == id_ae || ID3 == id_ae) {
        if (ID1 == id_ae) {
            $("#map5").replaceWith("<button id='map5' class='mapbutton2 buttonright'>Sélectionnez <span id='mapspan'>3 auto-écoles" +
                "</span></button>");
            marker_select.setIcon(icon);
            marker_select.customInfo = "";
            localStorage.setItem("ID1", ID2);
            localStorage.setItem("aename", localStorage.getItem("aename2"));
            localStorage.setItem("ID2", ID3);
            localStorage.setItem("aename2", localStorage.getItem("aename3"));
            localStorage.removeItem("ID3");
            localStorage.removeItem("aename3");
        }
        if (ID2 == id_ae) {
            $("#map5").replaceWith("<button id='map5' class='mapbutton2 buttonright'>Sélectionnez <span id='mapspan'>2 auto-écoles" +
                "</span></button>");
            marker_select.setIcon(icon);
            marker_select.customInfo = "";
            localStorage.setItem("ID2", ID3);
            localStorage.setItem("aename2", localStorage.getItem("aename3"));
            localStorage.removeItem("ID3");
            localStorage.removeItem("aename3");
        }
        if (ID3 == id_ae) {
            $("#map5").replaceWith("<button id='map5' class='mapbutton2 buttonright'>Sélectionnez <span id='mapspan'>1 auto-écoles" +
                "</span></button>");
            marker_select.setIcon(icon);
            marker_select.customInfo = "";
            localStorage.removeItem("ID3");
            localStorage.removeItem("aename3");
        }
    }

}
function OnDeviceReady() {

    //Partie Google map
    //Option rayon de recherche
    if (localStorage.getItem('ray') == null)
        localStorage.setItem('ray', 0.009);

    var stat = localStorage.getItem("aestatus");
    if (stat == "7" || stat == "4" /*|| stat == "w3"*/) {
        $("#mapsplash").remove();
        $("#mapdiv").hide();
    }
    else {
        navigator.geolocation.getCurrentPosition(onSuccess, onerror, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 10000
        });
        function onSuccess(position) {
            localStorage.removeItem("index");
            if (position == "error") {
                var lat = 48.855;
                var lon = 2.34;
            }
            else {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
            }
            //style perso pour ma map
            var styles = [
                {
                    "featureType": "water",
                    "stylers": [
                        {"color": "#0f96a0"}
                    ]
                }, {
                    "featureType": "landscape.man_made",
                    "stylers": [
                        {"color": "#808080"},
                        {"lightness": 75}
                    ]
                }, {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {"color": "#dce6c8"}
                    ]
                }, {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {"color": "#f5f5eb"}
                    ]
                }, {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {"color": "#461946"}
                    ]
                }, {
                    "featureType": "poi",
                    "elementType": "labels.icon",
                    "stylers": [
                        {"saturation": -100}
                    ]
                }, {
                    "featureType": "transit.station",
                    "stylers": [
                        {"saturation": -100}
                    ]
                }
            ];
            var styledMap = new google.maps.StyledMapType(styles,
                {name: "Styled Map"});

            //option pour ma map
            var mapOptions = {
                zoom: 14,
                maxZoom: 23,
                center: new google.maps.LatLng(lat, lon),
                mapTypeControl: false,
                zoomControl: false,
                disableDefaultUI: true,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.HYBRID, 'map_style']
                }
            };
            map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');
            //piste velo pour ma map
            var transitLayer = new google.maps.TransitLayer();
            transitLayer.setMap(map);


            var input = /** @type {HTMLInputElement} */(
                document.getElementById('pac-input'));
            var button = /** @type {HTMLInputElement} */(
                document.getElementById('mapbutton'));

            var searchBox = new google.maps.places.SearchBox(
                /** @type {HTMLInputElement} */(input));


            var drivermarkers = new google.maps.Marker();

            //retire le splashscreen une fois que la map arrête de charger (== fin ou bug)
            google.maps.event.addListenerOnce(map, 'idle', function () {
                $("#mapsplash").remove();
                /* Partie tutoriel. Après deconnexion, tutoriel est mis à la valeur clear, comme à la fin du tutoriel.
                 ** C'est à dire que le tutoriel dépend du premier lancement de  l'application et non de l'utilisateur et
                 ** qu'il se fait bien qu'une seule fois */
                if (localStorage.getItem('tutorial') == null) {
                    navigator.notification.confirm("Pour commencer, inscrivez vous à une auto-école, appuyer " +
                        "sur des boutons en bas selon votre situation et utilisez la carte pour sélectionner " +
                        "3 auto-écoles de votre choix. Le bouton vert légèrement en haut à droite permet" +
                        "d'afficher les autos écoles en liste et celui tout en haut à droite, lui, affiche le menu.",
                        localStorage.setItem('tutorial', 'clear'), "Tutoriel", "Compris !");
                }
            });

            /* Change le lieu de l'utilisateur avec la barre de recherche. Code de Emmanuel Delay
             ** provenant d'ici: http://stackoverflow.com/questions/32132680/google-maps-marker-does-not-move-with-search
             */
            google.maps.event.addListener(searchBox, 'places_changed', function () {
                var places = searchBox.getPlaces();
                var bounds = new google.maps.LatLngBounds();
                $("#icon").css({"background": "url('../img/Man_0.png')"});
                places.forEach(function (place) {
                    if (place.geometry.viewport)
                        bounds.union(place.geometry.viewport);
                    else
                        bounds.extend(place.geometry.location);
                    map.setCenter(place.geometry.location);
                });
                map.fitBounds(bounds);
                localStorage.setItem("lat", map.getCenter().lat());
                localStorage.setItem("lng", map.getCenter().lng());

                if (localStorage.getItem("aestatus") == "3") {
                    $("#statustitle").text("Prise de leçon");

                    renderlesson();
                    buttonPrixLessonNow();
                    var center = map.getCenter();
                    google.maps.event.trigger(map, "resize");
                    map.setCenter(center);
                }
                else if (localStorage.getItem("aestatus") == "0") {
                    mapaeinfo(map);
                    document.addEventListener("backbutton", function (e) {
                        var center = map.getCenter();
                        google.maps.event.trigger(map, "resize");
                        map.setCenter(center);
                    });
                }
                else if (localStorage.getItem("timeleft") == 0)
                    mypos(map);
            });

            $("#mapbutton").on('click', function () {
                map.setCenter({
                    lat: lat,
                    lng: lon
                });
                var latlng = new google.maps.LatLng(lat, lon);
                map.setCenter(latlng);
                localStorage.setItem("lat", lat);
                localStorage.setItem("lng", lng);
                $("#icon").css({"background": "url('../img/Man_0.png')"});
                if (localStorage.getItem("aestatus") == "3") {
                    $("#statustitle").text("En attente d'une leçon");

                    /*mapdriver(map, drivermarkers);*/
                    buttonPrixLessonNow();
                    var center = map.getCenter();
                    google.maps.event.trigger(map, "resize");
                    map.setCenter(center);
                }
                else if (localStorage.getItem("aestatus") == "0") {
                    mapaeinfo(map);
                    document.addEventListener("backbutton", function (e) {
                        var center = map.getCenter();
                        google.maps.event.trigger(map, "resize");
                        map.setCenter(center);
                    });
                }
                else if (localStorage.getItem("timeleft") == 0)
                    mypos(map);
            });

            $("body").on('click', '#map4', function () {
                localStorage.setItem("i", 4);
                localStorage.removeItem("index");
                $("#map4").replaceWith("<button id='map1' class='mapbutton3 buttonleft'>S\'inscrire près de chez moi</button>");
                $("#map2").show();
                if ($("#map5").length)
                    $("#map5").replaceWith("<button id='map3' class='mapbutton3 buttonright' onclick='renderselection();'" +
                        ">J\'ai déjà une auto-école</button>");
                else if ($("#map7").length)
                    $("#map7").replaceWith("<button id='map3' class='mapbutton3 buttonright' onclick='renderselection();'" +
                        ">J\'ai déjà une auto-école</button>");
                //mapaeinfo(map);
            });

            if (localStorage.getItem("resetmark") == "true" && localStorage.getItem("aestatus") == "2")
                mapaeinfo(map);
            //Déplacement d'un marqueur
            //google.maps.event.addListener(map, 'dragend', function() {
            google.maps.event.addListener(map, 'idle', function () {
                $("#icon").css({"background": "url('../img/Man_0.png')"});

                var lat = map.getCenter().lat();
                var lng = map.getCenter().lng();
                localStorage.setItem("lat", lat);
                localStorage.setItem("lng", lng);
                //setMarkers(map, lat, lng);
                $("#icon").css({"background": "url('../img/Man_0.png')"});
                marker_center = new google.maps.Marker({
                    draggable: false,
                    raiseOnDrag: false,
                    clickable: false,
                    map: map,
                    visible: false,
                    position: {lat: lat, lng: lng}
                });
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
                if (marker_center != null) {
                    marker_center.setMap(null);
                }
                if (circle != null) {
                    circle.setMap(null);
                }
                circle = new google.maps.Circle({
                    map: map,
                    radius: (parseFloat(localStorage.getItem("ray")) * 1000) * 111,    // 10 miles in metres
                    fillColor: '#009688',
                    strokeWeight: 0
                });
                circle.bindTo('center', marker_center, 'position');
                getDPT();
                /*Gestion type de carte après déplacement*/
                if (localStorage.getItem("aestatus") == "3") {
                    $("#statustitle").text("En attente d'une leçon");

                    renderlesson();
                    buttonPrixLessonNow();
                    var center = map.getCenter();
                    google.maps.event.trigger(map, "resize");
                    map.setCenter(center);
                }
                else if (localStorage.getItem("aestatus") == "0") {
                    mapaeinfo(map);
                    localStorage.setItem("i", 3);
                    document.addEventListener("backbutton", function (e) {
                        var center = map.getCenter();
                        google.maps.event.trigger(map, "resize");
                        map.setCenter(center);
                    });
                }
                else if (localStorage.getItem("timeleft") == 0)
                    mypos(map);
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
            });
            google.maps.event.addListener(map, 'dragstart', function () {
                $("#icon").css({"background": "url('../img/Man_1.png')"});
            });


            google.maps.event.addListener(map, 'zoom_changed', function () {
                var lat = map.getCenter().lat();
                var lng = map.getCenter().lng();
                var aes = localStorage.getItem("aestatus");
                localStorage.setItem("lat", lat);
                localStorage.setItem("lng", lng);
                if (aes == 0) {
                    mapaeinfo(map);
                }
                else if (aes == 2) {
                    mapdriver(map, drivermarkers);
                } else if (aes == 3) {
                    mapdriver(map, drivermarkers);
                }
                document.getElementById("map_canvas").style.display = "block";
            });

            google.maps.event.addListener(map, 'bounds_changed', function () {
                var bounds = map.getBounds();
                searchBox.setBounds(bounds);
            });

            google.maps.event.addListener(map, "click", function () {
                infowindow.close();
            });

            /*Garder ces appels de fonction. Les autres sont en surplus et rappellent sans cesse les mêmes fonctions qui se répètent et se lancent
             autant de fois que les événements relancent celle-ci. Pour exemple, si la fonction mapdriver est lancée au moment où l'application s'allume,
             si un événement relance l'application elle sera lancée 2fois toutes les 3 sec, 3fois toutes les 3 sec, etc... Ce qui engendre une surconsommation
             en ressources et en data pour l'utilisateur.*/
            var lat = map.getCenter().lat();
            var lng = map.getCenter().lng();
            localStorage.setItem("lat", lat);
            localStorage.setItem("lng", lng);
            if (localStorage.getItem("aestatus") == "2") {
                clearInterval(interval);
                $("#statustitle").text("En attente d'une leçon");
                /*renderlesson();*/
                buttonPrixLessonNow();
                /*interval = setInterval(function () {
                 mapdriver(map, drivermarkers);
                 }, 3000);*/
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
            }
            if (localStorage.getItem("aestatus") == "3") {
                clearInterval(interval);
                $("#statustitle").text("En attente d'une leçon");
                /*renderlesson();*/
                buttonPrixLessonNow();
                /*interval = setInterval(function () {
                 mapdriver(map, drivermarkers);
                 }, 3000);*/
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
            }
            else if (localStorage.getItem("aestatus") == "0") {
                $(".mapbutton3").show();
                mapaeinfo(map);
                document.addEventListener("backbutton", function (e) {
                    var center = map.getCenter();
                    google.maps.event.trigger(map, "resize");
                    map.setCenter(center);
                });
            }
            else if (localStorage.getItem("timeleft") == 0)
                mypos(map);
        };

        /*function initLaMap () {
         google.load("maps", "3");
         google.setOnLoadCallback(OnDeviceReady);
         }*/


        function onerror(error) {
            onSuccess("error");
        };
        //Requetes pour la map
        function mapaeinfo(map) //Récupère toutes les AE
        {


            $("#statustitle").text("Sélection d'une auto-école");
            //var pos = postransform(localStorage.getItem("pos"));
            var lat = localStorage.getItem("lat");
            var lng = localStorage.getItem("lng");
            var ray = localStorage.getItem("ray");
            var url = "http://62.210.192.92/AE/web/maprequest.php/mapaeinfo";


            $.post(url, {lat: lat, lon: lng, ray: ray})
                .done(function (data) {
                    if (markers.length > 0) {
                        for (var i = 0; i < markers.length; i++) {
                            if (markers[i].customInfo != "selected" && markers[i].clicked != "clicked") {
                                markers[i].setMap(null);
                                markers[i] = null;
                                markers.splice(i, 1);
                                i--;
                            }
                        }
                    }
                    for (var d = 0; d < data.length; d++) {
                        var marker = null;
                        id_marker++;
                        var average = 0;
                        var taux_rb = 0;
                        var taux_retg = 0;
                        var dist = distance(lat, lng, data[d].latitude, data[d].longitude);


                        if (data[d].note1 != null) {
                            average = (parseFloat(data[d].note1) + parseFloat(data[d].note2) +
                                parseFloat(data[d].note3)) / 3;
                        }
                        if (data[d].taux_r_b != null) {
                            taux_rb = data[d].taux_r_b;
                        }
                        if (data[d].taux_r_etg != null) {
                            taux_retg = data[d].taux_r_etg;
                        }

                        var string = '<div class="infowindows"></div> <center><b>' + data[d].nom_auto_ecole + '</b><br>Note : <b>' +
                            average.toFixed(1) + '★</b><br>Taux de réussite code : ';
                        if (data[d].taux_r_etg >= 50) {
                            string += '<span id="goodtext">' + data[d].taux_r_etg + '%</span>';
                        }
                        else {
                            string += '<span id="badtext">' + data[d].taux_r_etg + '%</span>';
                        }
                        string += '<br>Taux de réussite permis B : ';
                        if (data[d].taux_r_b >= 50) {
                            string += "<span id='goodtext'>" + data[d].taux_r_b + "%</span>";
                        }
                        else {
                            string += "<span id='badtext'>" + data[d].taux_r_b + "%</span>";
                        }
                        var icon = new google.maps.MarkerImage(
                            '../img/check.png', null, null, null,
                            new google.maps.Size(48, 48));

                        function visible()
                        {
                            console.log("works");
                            document.getElementById("icon").setAttribute("class","icon");
                            document.getElementById("mapdroit").setAttribute("class","visible_mapright");
                        }


                        string += "<br>" + data[d].adresse + " " + data[d].ville +
                            "<br><b>" + (dist * 1000).toFixed(0) + " m</b><br><button id='" + id_marker + "' class='bigbutton'" +
                            " onclick='aeAccepted(\"" + id_marker + "\", \"" + data[d].ID + "\", \"" + data[d].nom_auto_ecole + "\")/*;function () { visible()} */'>";


                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(data[d].latitude, data[d].longitude),
                            map: map,
                            title: "AE",
                            icon: icon,
                            info: string,
                            id: id_marker
                        });

                        for (var i = 0; i < markers.length - 1; i++) {

                            if ((markers[i].position.lat() == marker.position.lat()) && (markers[i].position.lng() == marker.position.lng())) {
                                marker.setMap(null);
                                marker = null;
                            }
                        }
                        if (marker != null) {
                            google.maps.event.addListener(marker, 'click', function () {
                                closeAllInfoWindows();
                                var button_str = "";
                                this.clicked = "clicked";

                                    document.getElementById("icon").setAttribute("class", "hidden_Joe");
                                    document.getElementById("mapdroit").setAttribute("class", "hidden_mapright");


                                infowindow = new google.maps.InfoWindow();

                                google.maps.event.addListener(infowindow,'closeclick',function()
                                {
                                    document.getElementById("icon").setAttribute("class","icon");
                                    document.getElementById("mapdroit").setAttribute("class","visible_mapright");


                                });
                                if (this.customInfo == "selected") {
                                    button_str = "Je ne veux plus<br>cette auto-école !</button><br><div id='text'></div>";

                                }
                                if (this.clicked == "clicked" && this.customInfo != "selected") {

                                    button_str = "Je veux<br>cette auto-école !</button><br><div id='text'></div>";
                                }
                                infowindow.setContent(this.info + button_str + "</div>");
                                infowindow.open(map, this);
                                infoWindows.push(infowindow);
                            });
                            markers.push(marker);
                        }
                    }
                });

        }


//Récupère tous les moniteurs et les affiches afin d'avertir l'utilisateur de l'arrivé de son moniteur
        function mapdriver(map, drivermarkers) {
            if (markers.length > 0) {
                for (var i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                    markers[i] = null;
                }
            }
            markers = [];
            if ($("#mapdiv").is(':hidden'))					// !!! A faire impérativement un clearInterval(myvar) sur le bouton d'accueil !!!
                clearInterval(interval);					// Cela permet de stoper l'exécution de la fonction mapdriver sinon exécutée plusieurs fois
            // sans cesse même sans être sur la map. A faire aussi sur la fonction mapaeinfo.
            var id = localStorage.getItem("userid");
            // var pos = postransform(localStorage.getItem("pos"));
            var lat = localStorage.getItem("lat");
            var lng = localStorage.getItem("lng");
            var url = "http://62.210.192.92/AE/web/maprequest.php/mapdriver";
            var request = "lat=" + lat + "&lon=" + lng + "&id=" + id;
            var xhr = createCORSRequest('POST', url);
            if (!xhr)
                return (1);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    var resp = $.parseJSON(xhr.responseText);

                    if (navigator.geolocation) {
                        var watchId = navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {enableHighAccuracy: true});
                    }
                    else
                        alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");

                    function successCallback(position) {
                        for (i = 0; i < resp.length; ++i) {
                            if (drivermarkers[resp[i]['id_moniteur']] == undefined) {
                                drivermarkers[resp[i]['id_moniteur']] = new google.maps.Marker({
                                    position: new google.maps.LatLng(resp[i]['latitude'], resp[i]['longitude']),
                                    map: map,
                                    Title: resp[i]['id_moniteur'],
                                    icon: '../img/carmark.png'
                                });
                                markers.push(drivermarkers[resp[i]['id_moniteur']]);
                            }
                            else {
                                pos = new google.maps.LatLng(resp[i]['latitude'], resp[i]['longitude']);
                                drivermarkers[resp[i]['id_moniteur']].setPosition(pos);
                                drivermarkers[resp[i]['id_moniteur']].setMap(map);
                                drivermarkers[resp[i]['id_moniteur']].setIcon('../img/carmark.png');
                            }
                        }
                    };
                    function errorCallback(err) {
                        console.log(err);
                    };
                }
            }
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(request);
        }

        /*Laisse l'utilisateur choisir sa position pour leçon individuelle*/
        function mypos(map) {
            var pos = localStorage.getItem("pos");
            $("#statustitle").text("Leçon individuelle");
            $("#map1").replaceWith('<button id="map6" class="mapbutton2 buttonleft" onclick' +
                '="renderlesson(\'hors_forfait\', \'\')">Se déplacer jusqu\'à votre auto-école</button>');
            $("#map3").replaceWith('<button id="map3" class="mapbutton2 buttonright" onclick' +
                '="renderlesson(\'hors_forfait\',\'pos\')">Valider la position</button>');
            $("#map2").hide();
            $(".mapright").remove();
        }

        function postransform(pos) //Transforme le string en tableau de nombres flottants
        {
            var count = pos.length - 2;
            pos = pos.substr(1, count);
            pos = pos.split(",");
            pos[1] = pos[1].substr(1);
            pos[0] = parseFloat(pos[0]);
            pos[1] = parseFloat(pos[1]);
            return pos;
        }

        function distance(lat1, lon1, lat2, lon2) //Code venant de geodatasource.com/developers/javascript
        {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var radlon1 = Math.PI * lon1 / 180;
            var radlon2 = Math.PI * lon2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) *
                Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344; //Vers Kilomètres
            return dist;
        }


        function createCORSRequest(method, url) {
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr)
                xhr.open(method, url, true);
            else if (typeof XDomainRequest != "undefined") {
                xhr = new XDomainRequest();
                xhr.open(method, url);
            }
            else
                xhr = null;
            return xhr;
        }
    }
}

function setSelectedAE(marker_id, id_ae, nom_ae) {
    var bouton = document.getElementById(marker_id);


    var ID1 = localStorage.getItem("ID1");
    var ID2 = localStorage.getItem("ID2");
    var ID3 = localStorage.getItem("ID3");

    var count = 0;
    var select_a = new Array();
    var icon = new google.maps.MarkerImage(
        '../img/check.png', null, null, null,
        new google.maps.Size(48, 48));

    var icon2 = new google.maps.MarkerImage(
        '../img/check2.png', null, null, null,
        new google.maps.Size(48, 48));

    for (var i = 0; i < markers.length; i++) {
        if (markers[i].customInfo = "selected") {
            count++;
            select_a.push(markers[i]);
        }
    }

    if (count == 0) {
        localStorage.setItem("ID1", id_ae);
        localStorage.setItem("aename", nom_ae);
        select_a[0].setIcon(icon2);
        bouton.innerHTML = "Je ne veux plus <br>cette auto-école !<br>";
    } else if (count == 1) {
        localStorage.setItem("ID2", id_ae);
        localStorage.setItem("aename2", nom_ae);
        select_a[1].setIcon(icon2);
        bouton.innerHTML = "Je ne veux plus <br>cette auto-école !<br>";
    } else if (count == 2) {
        localStorage.setItem("ID3", id_ae);
        localStorage.setItem("aename3", nom_ae);
        select_a[2].setIcon(icon2);
        bouton.innerHTML = "Je ne veux plus <br>cette auto-école !<br>";
    } else if (count == 3) {

    }
    if (ID1 == id_ae || ID2 == id_ae || ID3 == id_ae) {
        bouton.innerHTML = "Je veux <br>cette auto-école !<br>";
        if (ID1 == id_ae) {
            select_a[0].setIcon(icon);
            select_a[0].customInfo = "";
            localStorage.setItem("ID1", ID2);
            localStorage.setItem("aename", localStorage.getItem("aename2"));
            localStorage.setItem("ID2", ID3);
            localStorage.setItem("aename2", localStorage.getItem("aename3"));
        }
        if (ID2 == id_ae) {
            select_a[1].setIcon(icon);
            select_a[1].customInfo = "";
            localStorage.setItem("ID2", ID3);
            localStorage.setItem("aename2", localStorage.getItem("aename3"));
        }
        if (ID3 == id_ae) {
            select_a[2].setIcon(icon);
            select_a[2].customInfo = "";
            localStorage.setItem("ID3", "");
            localStorage.setItem("aename3", "");

        }
    }

}