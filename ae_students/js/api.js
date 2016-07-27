/*Les requêtes:
 Elles utilisent xhr et donc la fonction createCORSRequest, cette fonction
 prend en paramètre le chemin et l'url (ce dernier est toujours à peu près le même)
 On crée les variables qui vont être envoyé dans la requête et on l'envoit.
 le xhr.onreadystatechange permet de suivre la requête, selon son statut
 on peux effectué des fonctions. Le code 4 correspond à la liaison effectué
 (Attention, même si la liaison est faite, la requête n'est pas terminé)
 C'est la qu'on récupère et traite la réponse. Principalemnt utile pour les gets. */


//////////// ----- INIT POUR TEST SEULEMENT -----////////////////////


function initaes() {
    var xhr = createCORSRequest('POST', "http://62.210.192.92/AE/web/index.php/resetstatus");
    if (!xhr) {
        return (1);
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("id=" + localStorage.getItem("userid"));
    localStorage.setItem("aestatus", "0");
    localStorage.setItem("i", 4);
    localStorage.setItem("resetmark", "true");

    setTimeout(function () {
        $("#map4").click();
        rendermenu();
    }, 300);
}

//Inscription
function register() {
    var url = "http://62.210.192.92/AE/web/index.php/register";
    var pwd = $("#pwd").val();
    var pwd2 = $("#pass2").val();
    var phone = $("#phone").val();
    var mail = $("#mail").val();
    var login = $("#login").val();
    var request = "login=" + login + "&mail=" + mail + "&pwd=" + pwd + "&pwd2=" + pwd2 + "&phone=" + phone;
    var xhr = createCORSRequest('POST', url);

    if (!xhr)
        return (1);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            $(".spinner").remove();
            $("#loadiv").remove();
            if (xhr.responseText == 0) {
                alert("Inscription effectué, un email de validation vous a été envoyé. Veuillez vérifier vos mails.", "", "Inscription");
                window.location.href = "connexion.html";
            }
            else
                navigator.notification.alert(xhr.responseText, "", "Inscription");
        }
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(request);
}

//Mot de passe perdu
function password() {
    var url = "http://62.210.192.92/AE/web/index.php/reset";
    var mail = $("#mail").val();
    var request = "mail=" + mail;
    var xhr = createCORSRequest('POST', url);

    if (!xhr)
        return (1);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4)
            $("#result").html("<b>" + xhr.responseText + "</b>");
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(request);
}

//Connexion
function login() {
    var url = "http://62.210.192.92/AE/web/index.php/login";
    var xhr = createCORSRequest('POST', url);
    var pwd = $("#pwd").val();
    var login = $("#login").val();
    var request = "login=" + login + "&pwd=" + pwd;
    //alert(request);

    if (!xhr)
        return (1);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var resp = xhr.responseText;
            if (resp == 0) {
                localStorage.setItem("token", "Tolkien le token");
                localStorage.setItem("login", $("#login").val());
                window.location.href = "menu.html";
                info();
            }
            else
                $("#result").html("<b>" + resp + "</b>");
        }
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(request);
}

//Mise à jour du profil
function update() {
    var id = localStorage.getItem("userid");
    var url = "http://62.210.192.92/AE/web/index.php/update";
    var pwd = $("#infopwd").val();
    var pwdcheck = $("#pass2").val();
    if (!(pwd == "" && pwdcheck == undefined) && pwd != pwdcheck) {
        $("#result").html("Les mots de passes ne sont pas identiques");
        return (1);
    }
    var mail = $("#infomail").val();
    var phone = $("#infotel").val();
    var place = $("#infoplace").val();
    var town = $("#infotown").val();
    var cp = $("#infocp").val();
    var firstname = $("#infofn").val();
    var lastname = $("#infoln").val();
    var request = "id=" + id + "&mail=" + mail + "&pwd=" + pwd + "&phone="
        + phone + "&firstname=" + firstname + "&lastname=" + lastname + "&place="
        + place + "&town=" + town + "&cp=" + cp;
    //alert(request);
    var xhr = createCORSRequest('POST', url);

    if (!xhr)
        return (1);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            renderaccount();
        }
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(request);
}

//Notation auto-école
function rating(aeclass, id_moniteur) {
    var url = "http://62.210.192.92/AE/web/index.php/rating";
    var vala = $("input:radio[name=a]:checked").val(); //Aimabilité
    var vale = $("input:radio[name=e]:checked").val(); //Efficacité
    var valp = $("input:radio[name=p]:checked").val(); //Propreté
    var xhr = createCORSRequest('POST', url);
    if (vale == undefined)
        vale = 1;
    if (vala == undefined)
        vala = 1;
    if (valp == undefined)
        valp = 1;

    var request = "note1=" + vala + '&note2=' + vale + '&note3=' + valp + "&aeclass=" +
        aeclass + "&id_moniteur=" + id_moniteur + "&userid=" + localStorage.getItem("userid");

    if (!xhr)
        return (1);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            $(".spinner").remove();
            $("#loadiv").remove();
            localStorage.setItem("aestatus", "0");
            navigator.notification.alert(xhr.responseText, "", "Notation effectuée");
            rendermenu();
        }
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(request);
}

//Register ID pour GCM (notifs)
function sendregisterid(id) {
    var url = "http://62.210.192.92/AE/web/index.php/notif";
    var mail = localStorage.getItem("mail");
    var request = "id=" + id + "&mail=" + mail;
    var xhr = createCORSRequest('POST', url);

    if (!xhr)
        return (1);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(request);
}

//Reviens sur la carte (aestatus = non)
function resetstatus() {
    var xhr = createCORSRequest('POST', "http://62.210.192.92/AE/web/index.php/resetstatus");
    if (!xhr) {
        return (1);
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("id=" + localStorage.getItem("userid"));
    localStorage.setItem("aestatus", "0");
    localStorage.setItem("i", 4);
    localStorage.setItem("resetmark", "true");
    //OnDeviceReady(); 		//Fonction permettant de reload la map après avoir annulé un appel d'offre (normalement cela fonctionne sans... à confirmer)
    navigator.notification.alert("Votre demande a bien été annulé !", "", "Appel d'offre");

    setTimeout(function () {
        $("#map4").click();
        rendermenu();
    }, 300);
}

//Envoi d'un message aux auto-écoles
function appeloffre(n1, n2, n3) {
    renderwait("2");
    localStorage.setItem("aestatus", "2");
    var id = localStorage.getItem("userid");
    var url = "http://62.210.192.92/AE/web/index.php/appeloffre";
    var request = "id=" + id + "&aename=" + n1 + "&aename2=" + n2 + "&aename3=" + n3;
    var xhr = createCORSRequest('POST', url);

    if (!xhr)
        return (1);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            navigator.notification.alert(xhr.responseText, "", "Appel d'offre");
            $(".spinner").remove();
            $("#loadiv").remove();
            renderwait("2");
        }
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(request);
}


//Demande de leçons hors forfait (pos == AE ou personnalisé ? time = maintenant ou régulier ?)

function asklesson(date, forfait) {

    if (forfait == 1) {
        var url = "http://62.210.192.92/AE/web/index.php/lesson";
    } else {
        var url = "http://62.210.192.92/AE/web/index.php/freelesson";
    }
    console.log(date);
    var lat = parseFloat(localStorage.getItem('lat'));
    var lng = parseFloat(localStorage.getItem('lng'));
    var mail = localStorage.getItem("mail");
    console.log(date);
    var lieu = "Position introuvable";
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': {lat: lat, lng: lng}}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            lieu = results[0]["formatted_address"];
            var dpt = results[3]['address_components'][0]['long_name'];
            $.post(url, {
                mail: mail, date: date, lieu: lieu, lat: lat, lng: lng, dpt: dpt
            }).done(function (data) {
                console.log(data);//, '', "Demande de leçon");
                $(".spinner").remove();
                $("#loadiv").remove();
                if (data == "Demande envoyée") {

                    info();
                    rendermonitor();
                }
                else {
                    rendermenu();
                }
            });
            rendermenu();
        }
    });
}



function askFreeLessonNow() {
    var date = new Date().toString("dd-MM-yyyy H:mm:ss");
    var url = "http://62.210.192.92/AE/web/index.php/freelesson";
    var lat = parseFloat(localStorage.getItem('lat'));
    var lng = parseFloat(localStorage.getItem('lng'));
    var mail = localStorage.getItem("mail");
    console.log(date);
    var lieu = "Position introuvable";
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': {lat: lat, lng: lng}}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            lieu = results[0]["formatted_address"];
            var elt = results[0].address_components;
            for (i in elt) {
                if (elt[i].types[0] == 'postal_code') {
                    var dpt = elt[i].long_name;
                    $.post(url, {
                        mail: mail, date: date, lieu: lieu, lat: lat, lng: lng, dpt: dpt
                    }).done(function (data) {
                        console.log(data);//, '', "Demande de leçon");
                        $(".spinner").remove();
                        $("#loadiv").remove();
                        if (data == "Demande envoyée") {

                            rendermenu();
                        }
                        else {
                            rendermenu();
                        }
                    });

                }
            }
            rendermenu();
        }
    });
}

/* Confirmation d'autoécole possédé partenaire ou non.
 ** On envoie l'ae et le mail, on se charge du reste sur le serveur */
function confirm_possessed_ae() {
    var url = "http://62.210.192.92/AE/web/index.php/confirm_possessed_ae";
    var xhr = createCORSRequest('POST', url);
    var mail = localStorage.getItem("mail");
    var aename = $('.picked')[0].name;
    var request = "mail=" + mail + "&aename=" + aename;
    if (!xhr)
        return (1);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            $(".spinner").remove();
            $("#loadiv").remove();
            /* Bouton deroulant à rajouter pour donner les informations sur l'ae  */
            if (xhr.responseText == 0)                        /* et pouvoir annuler la demande si nécessaire avec reseststatus(). */
            {
                localStorage.setItem("aestatus", "7");
                renderwait('7');
            }
            else if (xhr.responseText == 1) {
                localStorage.setItem("aestatus", "4");
                renderwait('4');
            }
        }
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(request);
}

function registertoAE(buttonIndex, aeid, id_devis, aename) {
    markers = [];
    var url = "http://62.210.192.92/AE/web/index.php/registertoAE";
    var xhr = createCORSRequest('POST', url);
    var id = localStorage.getItem("userid");
    var request = "id=" + id + "&aeid=" + aeid + "&index=" + buttonIndex + "&id_devis=" + id_devis;
console.log();
    if (!xhr)
        return (1);
    xhr.onreadystatechange = function (data) {
        if (xhr.readyState === 4 && buttonIndex == "1") {
            navigator.notification.alert("L'auto-école " + aename + " a été supprimée!");
            cleanContainer();
            rendermenu();

        } else {
            console.log(id_devis);
            localStorage.setItem("aestatus", "2");
            /*rendermenu();
            cleanContainer();
            renderPouce();*/
        }
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(request);
}//registerToAE

//Refuse un moniteur hors forfait
function declinemonitor() {
    var url = "http://62.210.192.92/AE/web/index.php/DeclineMonitor";
    var xhr = createCORSRequest('POST', url);
    if (!xhr)
        return (1);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("id=" + localStorage.getItem("userid"));
    rendermenu();
}


//Annule une leçon
function cancelLesson(id) {
    var url = "http://62.210.192.92/AE/web/index.php/CancelLesson";
    var xhr = createCORSRequest('POST', url);
    if (!xhr)
        return (1);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("id_class=" + id + "&userid=" + localStorage.getItem("userid"));
    renderplanning();
}

//Informations sur l'utilisateur
function info() {
    login = localStorage.getItem("login");
    var url = "http://62.210.192.92/AE/web/index.php/info/" + login;
    var xhr = createCORSRequest('GET', url);
    if (!xhr)
        return (1);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var resp = $.parseJSON(xhr.responseText);
            var average = (parseFloat(resp['avg(note1)']) + parseFloat(resp['avg(note2)']) + parseFloat(resp['avg(note3)'])) / 3;
            $("#infomail").attr("placeholder", resp['user_email']);
            if (resp['phone'] != null)
                $("#infotel").attr("placeholder", resp['phone']);
            if (resp['firstname'] != null)
                $("#infofn").attr("placeholder", resp['firstname']);
            if (resp['lastname'] != null)
                $("#infoln").attr("placeholder", resp['lastname']);
            if (resp['adresse'] != null)
                $("#infoplace").attr("placeholder", resp['adresse']);
            if (resp['ville'] != null)
                $("#infotown").attr("placeholder", resp['ville']);
            if (resp['cp'] != null)
                $("#infocp").attr("placeholder", resp['cp']);

            $("#userimg").attr("src", "http://62.210.192.92/Users/wp-content/uploads/infos_users/"
                + resp['ID'] + "/photo-" + resp['ID'] + "-" + resp['photo']);
            starrr(average.toFixed(1));
            if (resp['nom_auto_ecole'] != null)
                $("#infoae").attr("placeholder", resp['nom_auto_ecole']);

            if (resp['paytoken'] == "non")
                localStorage.setItem("paytoken", "non");
            else
                localStorage.setItem("paytoken", resp['paytoken']);
            localStorage.setItem("validcode", resp['validcode']);
            localStorage.setItem("aestatus", resp['aestatus']);
            localStorage.setItem("timeleft", resp['timeleft']);
            localStorage.setItem("forfait", resp['conduite']);
            localStorage.setItem("phone", resp['phone']);
            localStorage.setItem("mail", resp['user_email']);
            localStorage.setItem("studentae", resp['id_partner']);
            localStorage.setItem("userid", resp['ID']);
            rendermenucontent();
        }
    }

   /* xhr.onload = function() {
        if (this.status === 404) {

            return;
        }
        var reader = new FileReader()
        reader.onload = evt => {
            var contents = new Buffer(evt.target.result, 'binary')
            console.log('file len',contents.length)
        }
        reader.readAsBinaryString(xhr.response)
    }*/


    xhr.send();
}

function paymentregister(tab) {
    var url = "http://62.210.192.92/AE/web/index.php/paymentregister";
    var xhr = createCORSRequest('POST', url);
    if (!xhr)
        return (1);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("mail=" + tab[0] + "&phone=" + tab[1] + "&month=" + tab[2] + "&year=" + tab[3] + "&cbtype=" + tab[4] + "&userid=" + tab[5] + "&payname=" + tab[6] + "&number=" + tab[7] + "&cvv=" + tab[8]);
    setTimeout(function () {
        $(".spinner").remove();
        $("#loadiv").remove();
        renderegister();
        if (xhr["response"] == "0")
            navigator.notification.alert("Votre moyen de paiement a bien été ajouté !", "", " ");
        else if (xhr["response"] == "1")
            navigator.notification.alert("Les informations de ce moyen de paiement ne sont pas valides !", "", "Attention !");
    }, 3000);
}


function infopayment() {
    login + localStorage.getItem("login");
    var url = "http://62.210.192.92/AE/web/index.php/info_payment/" + login;
    var xhr = createCORSRequest('GET', url);
    if (!xhr)
        return (1);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var respay = $.parseJSON(xhr.responseText);
            for (var i = 0; i < respay.length; i++) {
                $("#payment").append("<div style='text-align:left; margin-bottom:70px; margin-left:10px;' id=payment" + i + ">" +
                    "<h2 style='margin-bottom:-3px;' id='payname' name='payname'></h2>" +
                    "<img style='margin:0px; display:table; width:70px; height:auto;' id='cbtype' alt='' src=''/>" +
                    "<label>Numéro de carte: </label>" +
                    "<p id='cbnuminfo' class='cbinfo'></p><br>" +
                    "<label>Expiration : </label>" +
                    "<p id='expirationMonth' class='cbinfo'></p> / " +
                    "<p id='expirationYear' class='cbinfo'></p>" +
                    "<input hidden name='active' id='active' >" +
                    "<input hidden id='idactive' name='id' ><br>" +
                    "<button class='buttoninfocb remove' id='bigbutton' onclick='loading(); payment_remove(" + respay[i]['id'] + ");' >Supprimer</button>" +
                    "<button class='buttoninfocb active' id='bigbutton' onclick='loading(); payment_active(" + respay[i]['id'] + ");'>Activer</button>" +
                    "<br><br></div></div>").fadeIn(500);
                if (respay[i]['lastfour'] != null)
                    $('#payment' + i + ' > #cbnuminfo').append("**** **** **** " + respay[i]['lastfour']);
                if (respay[i]['cb_expirationMonth'] != null)
                    $('#payment' + i + ' > #expirationMonth').append(respay[i]['cb_expirationMonth']);
                if (respay[i]['cb_expirationYear'] != null)
                    $('#payment' + i + ' > #expirationYear').append(respay[i]['cb_expirationYear']);
                if (respay[i]['cb_type'] != null)
                    $('#payment' + i + ' > #cbtype').attr('src', '../img/' + respay[i]['cb_type'] + '.png');
                if (respay[i]['pay_name'] != null)
                    $('#payment' + i + ' > #payname').append(respay[i]['pay_name']);
                if (respay[i]['active'] != null && respay[i]['active'] == 1) {
                    $('#payment' + i + ' > #payname').append(' (active)');
                    $('#payment' + i + ' > .active').remove();
                    $('#payment' + i + ' > .remove').remove();
                    if (i != 0)
                        $('#payment' + i).insertBefore('#payment0');
                }
            }
            $("#payment").append("<br><button id='bigbutton' onclick='localStorage.setItem(\"cbadd\", \"oui\"); renderegister();'>Ajouter</button><br><br><br>" +
                "<script></script>").fadeIn(500);

        }
    }
    xhr.send();
}


function payment_active(id) {
    var url = "http://62.210.192.92/AE/web/index.php/payment_active";
    var xhr = createCORSRequest('POST', url);
    if (!xhr)
        return (1);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("id=" + id + "&login=" + localStorage.getItem("login"));
    setTimeout(function () {
        $(".spinner").remove();
        $("#loadiv").remove();
        renderegister();
        navigator.notification.alert("Votre moyen de paiement a bien été activé !", "", " ");
    }, 3000);

}

function payment_remove(id) {
    var url = "http://62.210.192.92/AE/web/index.php/payment_remove";
    var xhr = createCORSRequest('POST', url);
    if (!xhr)
        return (1);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("id=" + id + "&login=" + localStorage.getItem("login"));
    setTimeout(function () {
        $(".spinner").remove();
        $("#loadiv").remove();
        renderegister();
        navigator.notification.alert("Votre moyen de paiement a bien été effacé !", "", " ");
    }, 3000);

}

//Infos pour la notation du moniteur
function ratingInfo() {
    var id = localStorage.getItem("userid");
    var url = "http://62.210.192.92/AE/web/index.php/RatingInfo/" + id;
    var xhr = createCORSRequest('GET', url);

    if (!xhr)
        return (1);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {

            var resp = $.parseJSON(xhr.responseText);
            if (resp["prenom_equipe"] != null)
                var content = "Nom du moniteur: " + resp["mobile"] + " " + resp["nom_equipe"] + "<br>Email: " + resp["user_email"] + "<br>";
            else
                var content = "Email: " + resp["mail"] + "<br>";
            if (resp["mobile"] != null)
                content += "Téléphone: " + resp["mobile"] + "<br>";
            content += "Pour la leçon du " + resp["date"] + "<br>Faîte au lieu: " + resp["lieu"] + "<br>";
            $("#lessoninfo").hide().html(content).fadeIn(500);

            /*$("#inputspan").hide().html("<input type='button' id='button' value='Envoyer cet avis' onclick='loading();rating(\"" +
                resp["ID"] + "\", \"" + resp["id_moniteur"] + "\");'>").fadeIn(500);*/
        }
    }
    xhr.send();
}


//Récupère les devis des auto-écoles ayant accepté l'inscription
function infodevis() {

    var id = localStorage.getItem("userid");
    var url = "http://62.210.192.92/AE/web/index.php/infodevis/" + id;
    var xhr = createCORSRequest('GET', url);
    if (!xhr)
        return (1);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var resp = $.parseJSON(xhr.responseText);
            for (i = 0; i < resp.length; ++i) {
                renderae(resp[i]["id_partner"], "2", "#aedesc" + i, resp[i]["prix_forfait"]);
                var content = "<button class=\"bigbuttonaeinfo\" id='bigbutton' onclick='$(\"#aedesc" + i + "\").toggle(200); " +
                    "$(\"#aedesc" + (i - 1) + ", #aedesc" + (i - 2) + ", #aedesc" + (i + 1) + ", #aedesc" + (i + 2) + "\").hide(200);" +
                    "if ($(\"#aedesc" + i + "\").is(\":visible\")) $(this).html(\"v&nbsp;&nbsp;" + resp[i]["nom_auto_ecole"];
                if (resp[i]["prix_forfait"] == 0)
                    content += "<img src=../img/deviswait.png id=devisok><br>\");";
                else
                    content += "<img src=../img/devisok.png id=devisok><br>\");";
                // content += "infodevistoggleback(\""+resp[0]["nom_auto_ecole"]+"\" ";
                // if (resp[1] != undefined)
                // {
                // 	content += ",\""+resp[1]["nom_auto_ecole"]+"\" ";
                // 	if (resp[2] != undefined)
                // 		content += ",\""+resp[2]["nom_auto_ecole"]+"\" ";
                // }
                //content += ");";
                content += "'";
                content += "id=\"aename\">&gt;&nbsp;&nbsp;" + resp[i]["nom_auto_ecole"];
                if (resp[i]["prix_forfait"] == 0)
                    content += "<img src='../img/deviswait.png' id='devisok'>";
                else
                    content += "<img src='../img/devisok.png' id='devisok'>";
                content += "<br></button><div id='aedesc" + i + "' hidden>";
                if (localStorage.getItem("aestatus") == "2" && resp[i]["prix_forfait"] != 0) {
                    if (resp.length > 1)
                        content += "<button onclick='registertoAE(\"1\", \"" + resp[i]["id_partner"] +"\",\"" +resp[i]["id_devis"]+
                            "\", \"" + resp[i]["nom_auto_ecole"] + "\")' id='medbutton' style='background-color: #5e35b1;'>Refuser</button>";
                    else if (resp.length == 1)
                        content += "<button onclick='resetstatus();' id='medbutton' style='background-color: #5e35b1;'>Refuser</button>";
                    content += "<button onclick='cleanContainer();renderPouce();registertoAE(\"0\", \"" + resp[i]["id_partner"] + "\",\"" +
                       resp[i]["id_devis"]+ "\")' id='medbutton' style='background-color: #5e35b1;'>Accepter</button><br><br></div>";

                }
                $("#aeinfocontent").append(content);
            }
        }
    }
    xhr.send();
}


function infodevistoggleback(aename0, aename1, aename2) {
    setTimeout(function () {
        if ($("#aedesc0") && $("#aedesc0").is(":hidden"))
            $("#aedesc0").prev().text("&gt;&nbsp;&nbsp;" + aename0);
        else if ($("#aedesc0") && $("#aedesc0").is(":hidden"))
            $("#aedesc0").prev().text("&gt;&nbsp;&nbsp;" + aename0);
        if ($("#aedesc1") && $("#aedesc1").is(":hidden"))
            $("#aedesc1").prev().text("&gt;&nbsp;&nbsp;" + aename1);
        else if ($("#aedesc1") && $("#aedesc1").is(":hidden"))
            $("#aedesc1").prev().text("&gt;&nbsp;&nbsp;" + aename1);
        if ($("#aedesc2") && $("#aedesc2").is(":hidden"))
            $("#aedesc2").prev().text("&gt;&nbsp;&nbsp;" + aename2);
        else if ($("#aedesc2") && $("#aedesc2").is(":hidden"))
            $("#aedesc2").prev().text("&gt;&nbsp;&nbsp;" + aename2);
    }, 300);
}


/*function infodevisicon(prix0, prix1, prix2)
 {
 setTimeout(function(){
 if (prix0 == 0)
 $("#aedesc0").prev().append("<img src=../img/deviswait.png id=devisok><br>");
 else
 $("#aedesc0").prev().append("<img src=../img/devisok.png id=devisok><br>");
 }, 300);
 }*/

//Fiche d'information Auto-école

function aeinfo(from, aeid, div, prix_forfait) {
    var url = "http://62.210.192.92/AE/web/index.php/aeinfo/" + aeid;
    var xhr = createCORSRequest('GET', url);
    if (!xhr)
        return (1);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var resp = $.parseJSON(xhr.responseText);
            if (resp["taux_r_etg"] == undefined || resp["nb_candidat_etg"] == undefined) {
                resp["taux_r_etg"] = "--";
                resp["nb_candidat_etg"] = "--";
            }
            if (resp["taux_r_b"] == undefined || resp["nb_candidat_b"] == undefined) {
                resp["taux_r_b"] = "--";
                resp["nb_candidat_b"] = "--";
            }
            if (resp["user_login"] == undefined)
                var partenaire = "non partenaire";
            else
                var partenaire = "partenaire";
            if (resp['avg(note1)'] == null)
                var average = "--";
            else
                var average = ((parseFloat(resp['avg(note1)']) + parseFloat(resp['avg(note2)'])
                + parseFloat(resp['avg(note3)'])) / 3).toFixed(1);
            if (from == "choice")
                var content = "<br>" + resp["adresse"] + ", " + resp["ville"] +
                    "<br>Note : " + average + "<br>Réussite code : " + resp["taux_r_etg"] +
                    " % (" + resp["nb_candidat_etg"] + " candidats)<br>" +
                    "Réussite permis : " + resp["taux_r_b"] + " % (" + resp["nb_candidat_b"] + " candidats)";
            else if (from == "2") {
                var content = "<br>" + resp["adresse"] + ", " + resp["ville"] +
                    "<br>Note : " + average + "<br>Réussite code : " + resp["taux_r_etg"] +
                    " % (" + resp["nb_candidat_etg"] + " candidats)<br>" +
                    "Réussite permis : " + resp["taux_r_b"] + " % (" + resp["nb_candidat_b"] + " candidats)" +
                    "<br><fieldset><legend><b>Contenu du devis</b></legend><p class='deviscontent'>";
                if (prix_forfait == 0)
                    content += "<b>Attente de la réponse de votre auto-école.</b></p></fieldset>";
                else
                    content += "<b>Prix : " + prix_forfait + " €</b></p></fieldset>";
            }
            else
                var content = "<br>Nom auto-école : " + resp["nom_auto_ecole"] + "<br>Téléphone : " +
                    resp["phone"] + "<br>Email : " + resp["user_email"] + "<br>Prix de l'heure : " +
                    resp["prix_hdc"] + "<br>Prix 20 heures : " + resp["prix_forfait"] + "<br>Note : " + average + "<br>";
            $(div).hide().prepend(content);
        }
    }
    xhr.send();
}

//Fiche moniteur (+ auto-école) pour leçon libre
function getmonitor() {
    var id = localStorage.getItem("userid");
    var url = "http://62.210.192.92/AE/web/index.php/monitor/" + id;
    var xhr = createCORSRequest('GET', url);
    if (!xhr)
        return (1);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var resp = $.parseJSON(xhr.responseText);
            if (resp["user_email"] != null) {
                $("#DivRenderMonitor").hide().html("Ce moniteur a accepté votre heure hors forfait.<br>" +
                    "A vous de confirmer votre choix et de payer. <br>Nom: " + resp["nom_equipe"] + "<br>Prénom: " +
                    resp["prenom_equipe"] + "<br>Adresse: " + resp["adresse"] + ", " + resp["ville"] + "<br>Mail: " +
                    resp["user_email"] + "<br>Téléphone: " + resp["phone"] + "<br>Réussite permis: " + resp["taux_r_b"] +
                    "%<br>Prix de l'heure: " + resp["prix_hdc"] + "€<br>Note: <img id='star1' class='star' src='../img/ms.png'>" +
                    "<img id='star2' class='star' src='../img/ms.png'><img id='star3' class='star' src='../img/ms.png'>" +
                    "<img id='star4' class='star' src='../img/ms.png'><img id='star5' class='star' src='../img/ms.png'></div>" +
                    "<button onclick='declinemonitor();' id='medbutton'>Refuser</button><button onclick='if(localStorage.get" +
                    "Item(\"paytoken\") != \"non\"){renderpay();}else{renderegisterpay();}' id='medbutton'>Accepter</button>").fadeIn(500);
                $("#price").html(resp["prix_hdc"]);
                $("#price2").val(resp["prix_hdc"]);
                $("#userimg").attr("src", "http://62.210.192.92/Partners/wp-content/uploads/infos_partners/"
                    + resp['ID'] + "/photo-" + resp['photo_equipe']);
                var average = (parseFloat(resp['avg(note1)']) + parseFloat(resp['avg(note2)']) + parseFloat(resp['avg(note3)'])) / 3;
                starrr(average.toFixed(1));
            }
            else {
                $("#DivRenderMonitor").hide().html("Votre demande est toujours en cours. Aucun moniteur l'a accepté pour l'instant.").fadeIn(500);
            }
        }
    }
    xhr.send();
}

//Requete pour affichage en liste des auto-écoles les plus proches
function maprequest() {

    //var pos = postransform(localStorage.getItem("pos"));
    var lat = localStorage.getItem("lat");
    var lon = localStorage.getItem("lng");
    var url = "http://62.210.192.92/AE/web/maprequest.php/maplist";
    var request = "lat=" + lat + "&lon=" + lon + "&ray=" + localStorage.getItem("ray");
    var xhr = createCORSRequest('POST', url);
    console.log(lon);
    if (!xhr)
        return (1);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            //Get all AE and show infos
            resp = jQuery.parseJSON(xhr.responseText);
            for (n = 0; n < resp.length; ++n) {
                var dist = distance(lat, lon, resp[n]['latitude'], resp[n]['longitude']) * 1000;
                dist = dist.toFixed(0);
                resp[n]['distance'] = dist;
            }
            renderlist(resp);
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
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(request);
}

//Sélection par ville ou CP de l'auto-école de l'utilisateur (i.e 'J'ai déjà une auto-école')
//Sélection par ville ou CP de l'auto-école de l'utilisateur (i.e 'J'ai déjà une auto-école')
function ae_list_city() {
    if ($("#cityname").val() != "")
        var ville = $("#cityname").val();
    else
        var ville = "UNDEFINED";

    var url = "http://62.210.192.92/AE/web/maprequest.php/aelistcity/" + ville;
    var xhr = createCORSRequest('GET', url);
    if (!xhr)
        return (1);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            //Get all AE and show infos
            resp = jQuery.parseJSON(xhr.responseText);
            var string = "<div class='picklist'>";

            for (n = 0; n < resp.length; ++n) {
                string += "<button name=\"" + resp[n]['nom_auto_ecole'] + "\" onclick='if ($(\".picked\").length < 1) " +
                    "{ if ($(this).hasClass(\"picked\") == true)" +
                    "{$(this).animate({backgroundColor: \"#009688\"}, 200); $(this).animate({\"color\":\"white\"}, 200);} else {$(this).animate({backgroundColor: \"#FDD835\"}, 200); $(this).animate({\"color\":\"#009688\"}, 200);} " +
                    "classie.toggle(this, \"picked\"); } else if ($(this).hasClass(\"picked\") == true)" +
                    "{classie.toggle(this, \"picked\"); $(this).animate({backgroundColor: \"#009688\"}, 200); $(this).animate({\"color\":\"white\"}, 200);}'><h3><b>" +
                    resp[n]['nom_auto_ecole'] + "</h3></b>Adresse: <b>" + resp[n]['adresse'] + ", " +
                    resp[n]["ville"] + " (" + resp[n]["cp"] + ")</b><br><br></button>";
            }
        }
        $("#resultsearch").hide().html(string + "</div><button id='Confirmer' class='selectbutton' style='width: 100%; float:left; " +
            "left:0px;' onclick='confirm_possessed_ae()'>Confirmer</button><br><br><br>").fadeIn(500);
    }
    xhr.send();
}

function cancelCallBack(buttonIndex, lesson) {
    if (buttonIndex == 1)
        cancelLesson(lesson)
}

//Transformations des dates chiffre->mots
function verbify(date) {
    date = date.toString()
    date = date.split(" ");
    var month = new Array();
    month['Jan'] = "Janvier";
    month['Feb'] = "Février";
    month['Mar'] = "Mars";
    month['Apr'] = "Avril";
    month['May'] = "Mai";
    month['Jun'] = "Juin";
    month['Jul'] = "Juillet";
    month['Aug'] = "Août";
    month['Sep'] = "Septembre";
    month['Oct'] = "Octobre";
    month['Nov'] = "Novembre";
    month['Dec'] = "Decembre";
    date[4] = date[4].split(":");

    var string = "<br>Le " + date[2] + " " + month[date[1]] + " " + date[3] + " à " + date[4][0] + "H" + date[4][1] + "<br>";
    return string;  //Le 18 Aout 2015 à 20 heures.
}

function numberify(date) {
    date = date.toString()
    date = date.split(" ");
    var month = new Array();
    month['Jan'] = "01";
    month['Feb'] = "02";
    month['Mar'] = "03";
    month['Apr'] = "04";
    month['May'] = "05";
    month['Jun'] = "06";
    month['Jul'] = "07";
    month['Aug'] = "08";
    month['Sep'] = "09";
    month['Oct'] = "10";
    month['Nov'] = "11";
    month['Dec'] = "12";
    date[4] = date[4].split(":");

    date = [date[2], month[date[1]], date[3], date[4][0]];
    return date;
}

function askfreelesson(pos, time) {
    if (time == "now")
        var plan = new Date().toString("dd-MM-yyyy H:mm:ss");
    else
        var plan = time.toString("dd-MM-yyyy H:mm:ss");
    var url = "http://62.210.192.92/AE/web/index.php/freelesson";
    var latlng = localStorage.getItem("pos");
    var xhr = createCORSRequest('POST', url);
    var mail = localStorage.getItem("mail");
    if (!xhr)
        return (1);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    if (pos == "pos") {
        var latlng = postransform(latlng);

        var place = "Position introuvable";
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'latLng': {lat: latlng[0], lng: latlng[1]}}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var place = results[0]["formatted_address"];
                var request = "mail=" + mail + "&plan=" + plan + "&place=" + place + "&latitude=" + latlng[0] + "&longitude=" + latlng[1] +
                    "&dept=" + results[3]['address_components'][0]['long_name'];
                xhr.send(request);
                rendermenu();
            }
        });
    }
    else {
        var latlng = postransform(latlng);
        var request = "mail=" + mail + "&plan=" + plan + "&latitude=" + latlng[0] + "&longitude=" + latlng[1];
        xhr.send(request);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText);//, '', "Demande de leçon");
            $(".spinner").remove();
            $("#loadiv").remove();
            if (xhr.responseText == "Demande envoyée") {
                rendermenu();
            }
            else
                rendermenu();
        }
    }
}
/*Création de la requête CORS (Inutile d'y toucher)
 Initialise xhr, prépare la requete et retourne l'objet xhr */
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

function getDPT() {
    var lat = parseFloat(localStorage.getItem('lat'));
    var lng = parseFloat(localStorage.getItem('lng'));

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': {lat: lat, lng: lng}}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var elt = results[0].address_components;
                for (i in elt) {
                    if (elt[i].types[0] == 'postal_code') {
                        var dpt = elt[i].long_name;
                        console.log("dpt");
                        localStorage.setItem("dpt", dpt);
                        return dpt;
                    }
                }
            }
        }
    );
}

function getLat() {
    return parseFloat(localStorage.getItem('lat'));
}

function getLng() {
    return parseFloat(localStorage.getItem('lng'));
}

function getCal(forfait) {
    var lat = getLat();
    var lng = getLng();
    var dpt = localStorage.getItem("dpt");

    if (forfait == 0) {
        var dateText = document.getElementById("date-bar-date").innerHTML;

        var url = "http://62.210.192.92/AE/web/index.php/getcalendar";
        console.log(dateText);
        console.log(dpt);
        console.log(lat);
        console.log(lng);
        $.ajax({
            type: "POST",
            url: url,
            data: {date: dateText, dpt: dpt, lat: lat, lng: lng},
            success: function (data) {
                //Dans render.js
                //Une fois le résultat obtenu, on fout tout dans la liste
                setListLesson(data, 0);
            },
            dataType: "json"
        });
    }
    if (forfait == 1) {
        setListLesson(null, 1)
    }
}

function callback(cb) {
    cb();
}