/*Fonctions pour application dynamique. Fonctionne sur trois couches: la couche map (celle de menu.html)
 et la couche 'pages' qui contiendra toutes les autres pages (une à la fois). La "troisième couche"
 représente le menu, le menu est commun aux deux couches (toujours visible, tout comme le titre)*/

/* Page paramètre, change les paramètres en local, les fonctions permettent de changer le localStorage

 selon les besoins de l'utilisateur. Des options supplémentaires seront rajoutés selon les besoins*/


function renderparam() {
    $('body').scrollTop(0);
    document.addEventListener('touchmove', handleTouchMove, false);
    $("#statustitle").text("Paramètres");
    $("#back_button").hide();
    $("#mapdiv").hide();
    $("#rendercontent").hide().html("<div style='height: 55px;'></div>" +
        "<div id='inscription'>" +
        "Rayon de recherche :<br><div class='wrapper'>" +
        "<div class='toggle_radio'>" +
        "<input type='radio' class='toggle_option' value='0.009' id='first_toggle' name='toggle_option' checked>" +
        "<input type='radio' class='toggle_option' value='0.045' id='second_toggle' name='toggle_option'>" +
        "<input type='radio' class='toggle_option' value='0.090' id='third_toggle' name='toggle_option'>" +
        "<input type='radio' class='toggle_option' value='0.135' id='fourth_toggle' name='toggle_option'>" +
        "<label for='first_toggle'><p>1km</p></label>" +
        "<label for='second_toggle'><p>5km</p></label>" +
        "<label for='third_toggle'><p>10km</p></label>" +
        "<label for='fourth_toggle'><p>15km</p></label>" +
        "<div class='toggle_option_slider'>" +
        "</div>" +
        "</div> kilomètres" +
        "<br>Autorisation planning :" +
        "<div class='onoffswitch' id='switch' data-val='ON'>" +
        "<input type='checkbox' name='onoffswitch' class='onoffswitch-checkbox'" +
        "id='myonoffswitch' checked>" +
        "<label class='onoffswitch-label' for='myonoffswitch'>" +
        "<span class='onoffswitch-inner'></span>" +
        "<span class='onoffswitch-switch'></span>" +
        "</label>" +
        "</div>" +
        "<button id='roundbutton' onclick='maj()'>Mise à jour</button><br>" +
        "<button id='roundbutton' onclick='resetparam();'>Paramètres par défault</button>" +
        "</div>" +
        "<script>" +
        "$(\"input[type='checkbox']\").change(function() {" +
        "var val = $('#switch').attr('data-val');" +
        "val == 'OFF' ? $('#switch').attr('data-val', 'ON') : $('#switch').attr('data-val', 'OFF');" +
        "});" +
        "function maj() {" +
        "var ray = $('.toggle_option:checked').val();" +
        "localStorage.setItem('ray', ray);" +
        "var planning = $('#switch').attr('data-val');" +
        "localStorage.setItem('planningauth', planning);" +
        "window.location.href = '';};" +
        "function resetparam() {" +
        "document.getElementById('first_toggle').checked = true;" +
        "localStorage.setItem('ray', 0.009);" +
        "$('#switch').attr('data-val', 'ON');" +
        "localStorage.setItem('planningauth', 'ON');" +
        "$('#myonoffswitch').prop('checked', true);" +
        "}</script>").fadeIn(500);
}

/* Page mon compte. Affiche les infos essentiels et permet de changer certaines en cliquant dessus
 et en envoyant le tout sur le serveur. Le planning sera directement intégré dans cette page */

function renderaccount() {
    document.removeEventListener('touchmove', handleTouchMove);
    $("#statustitle").text("Mon compte");
    $("#mapdiv").hide();
    $("#back_button").hide();
    $("#rendercontent").hide().html("<div style='height: 55px;'></div>" +
        "<div id='inscription'>" +
        "<p>Ici vous pouvez voir et modifez vos informations personnels.</p>" +
        "<img id='userimg' onerror=\"this.src='../img/user.png';\" width='100' height='100'><br><br>" +
        "<input id='infomail' class='input' placeholder='Addresse Email' disabled><br><br>" +
        "<input id='infotel' class='input' type='tel' placeholder='N° Téléphone'><br><br>" +
        "<input id='infofn' class='input' placeholder='Prénom'><br><br>" +
        "<input id='infoln' class='input' placeholder='Nom'><br><br>" +
        "<input id='infoplace' class='input' placeholder='Addresse'><br><br>" +
        "<input id='infotown' class='input' placeholder='Ville'><br><br>" +
        "<input id='infocp' type='tel' class='input' placeholder='Code Postal'><br><br>" +
        "<input id='infoae' class='input' placeholder=\"Pas d'auto-école\" disabled><br><br>" +
        "<i>Note : </i>" +
        "<img id='star1' class='star' src='../img/ms.png'>" +
        "<img id='star2' class='star' src='../img/ms.png'>" +
        "<img id='star3' class='star' src='../img/ms.png'>" +
        "<img id='star4' class='star' src='../img/ms.png'>" +
        "<img id='star5' class='star' src='../img/ms.png'>" +
        "<hr class='hrs'>" +
        "<input id='infopwd' class='input' type='password' placeholder='Nouveau mot de passe'><br>" +
        "<br><input id='pass2' class='input' type='password' placeholder='Confirmation' onkeypress='if(event.keyCode == 13)update();'>" +
        "<button id='button' onclick=\"update();\">Mise à jour</button>" +
        "<hr class='hr' style='margin-top: 10px; margin-bottom: -5px'>" +
        "<button id='button' onclick='logout()'>Déconnexion</button><br><br>" +
        "<button onclick='takePicture()' id='medbutton'>Prendre une photo</button>" +
            //"<button onclick='OnDeviceReady()' id='medbutton'>Prendre une photo</button>" +
        "<button onclick='loadPicture()' id='medbutton'>Charger une photo</button><br>" +
        "<div id='result'></div></div>").fadeIn(500);
    info();
}
//Page de paiement numéro 1: Enregistrement)
function renderegister() {
    $('body').scrollTop(0);
    document.addEventListener('touchmove', handleTouchMove, false);
    $("#statustitle").text("Enregistrement du paiement");
    $("#mapdiv").hide();
    $("#back_button").hide();
    if (((localStorage.getItem("paytoken") && (localStorage.getItem("paytoken") == "null" || localStorage.getItem("paytoken") == "non")))
        || (localStorage.getItem("cbadd") && localStorage.getItem("cbadd") == "oui"))
        $("#rendercontent").hide().html("<div style='height: 55px;'></div>" +
            "<div id='inscription'>" +
            "Renseigner un moyen de paiement.<br>" +
            "<form action='' method='' id='braintree-payment-form'>" +
            "<p><label>Nom de ce moyen de paiement : </label>" +
            "<input type='text' class='inputpay' size='30' maxlength='20' id='payname' name='payname'>" +
            "</p>" +

            "<p><label>Numéro de carte : </label>" +
            "<input type='tel' class='inputpay' size='20' maxlength='16' id='cbnum' autocomplete='off' name='number'>" +
            "</p>" +

            "<p><label>Code à 3 chiffres : </label>" +
            "<input type='tel' autocomplete='off' class='inputpay' size='3' maxlength='3' name='cvv' id='cvv'>" +
            "</p>" +

            "<p><label>Expiration (MM/YYYY) : </label>" +
            "<input type='tel' class='inputpay' size='2' maxlength='2' name='month' id='month'> / " +
            "<input type='tel' class='inputpay' size='4' maxlength='4' name='year' id='year' onkeypress='if(event.keyCode == 13) submitpayment();'>" +
            "</p>" +

            "<input hidden name='mail' value='' id='paymail'>" +
            "<input hidden name='phone' value='' id='payphone'>" +
            "<input hidden name='userid' value='' id='userid'>" +
            "<input hidden name='cbtype' value='' id='cbtype'>" +

            "<input type='button' id='button' onclick='submitpayment();' class='paysubmit' value='Enregistrer'>" +
            "</form>" +
            "</div></div>" +

            "<script> info();" +
            "$('#cbnum').keyup(function(){" +
            "var num = $(\"#cbnum\").val();" +
            "if (num.match(/^4\\d{15}/) || num.match(/^4\\d{12}/))" +
            "$(\"#cbtype\").val('vis'); " +
            "else if (num.match(/^3[47][0-9]{13}$/))" +
            "$(\"#cbtype\").val('amx');" +
            "else if (num.match(/^5[1-5][0-9]{14}$/))" +
            "$(\"#cbtype\").val('mas');" +
            "else if (num.match(/^6(?:011|5[0-9]{2})[0-9]{12}$/))" +
            "$(\"#cbtype\").val('dis');" +
            "else if (num.match(/^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/))" +
            "$(\"#cbtype\").val('mae');" +
            "else $(\"#cbtype\").val('def');});" +

            "var phone = localStorage.getItem('phone');" +
            "var mail = localStorage.getItem('mail');" +
            "var userid = localStorage.getItem('userid');" +

            "$('#paymail').val(mail);" +
            "$('#payphone').val(phone);" +
            "$('#userid').val(userid);" +
            "$(function() {" +
            "$('#cbnum')" +
            ".blur(function() {" +
            "var value = $(this).val();" +
            "value = value.match(/.{1,4}/g).join(' ');" +
            "$(this).val(value); })" +
            ".focus(function() {" +
            "var value = $(this).val();" +
            "value = value.replace(/ /g, '');" +
            "$(this).val(value); });" +
            "});" +
            "$('form input[type=tel]').on('input', function () {" +
            "if($(this).val().length == $(this).attr('maxlength')) {" +
            "$(this).next('input').focus(); }" +
            "});" +
            "function submitpayment() { if (!$(\".inputpay\").val()) alert(\"remplis tous les champs wesh\"); else { loading(); var tab = [];" +
            "tab.push($('#paymail').val(), $('#payphone').val(), $('#month').val(), $('#year').val(), $('#cbtype').val(), " +
            "$('#userid').val(), $('#payname').val(), $('#cbnum').val(), $('#cvv').val());" +
            "paymentregister(tab);}}" +
            "var braintree = Braintree.create('MIIBCgKCAQEA3DfiypxkEUaCq67JNR3+HuFtnN5fhxemNaH" +
            "gcoafYzALydUgh1i7Gc5mAtJBFXkS9nEYIsKG/oPvLCyPko8Z/sLYMqAUaO54fRbeCT9ypwYKTz2WU9" +
            "U+3WcGVSOiZjGe8G2a+swqcgpL56rma+YXkZu/lyVrYrEq3Z7iFHsG02cG404cgdRtNp8KoIg7LfdmK" +
            "AdkST3BicBxi7BWk+/4XXqiwgB9fsKAZHCLWEM79HV1l/aUq7vR1OvHE8n6Rmng3gMEbnNwnteRPN0Fd" +
            "h+YogCQtDFuxCgKl0wNfIc/zo1xSKeidyt0b8sRlOnmrFOmVg7AvI+ljEa/NgmfdSelQIDAQAB');" +
            "braintree.onSubmitEncryptForm('braintree-payment-form');" +
            "</script>").fadeIn(500);
    else if ((localStorage.getItem("paytoken") != "non" && localStorage.getItem("cbadd") == "non")
        || (localStorage.getItem("paytoken") != "non" && !(localStorage.getItem("cbadd"))))
        renderpayments();
    localStorage.setItem("cbadd", "non");

    //var tab = [];
    //tab.push($('#paymail').val(), $('#payphone').val(),  $('#month').val(), $('#year').val(), $('#cbtype').val(),
    //	$('#userid').val(), $('#payname').val(),$('#number').val(), $('#cvv').val());
}

function renderpayments() {
    document.removeEventListener('touchmove', handleTouchMove);
    $("#rendercontent").hide().html("<div style='height: 50px;'></div>" +
        "<div id='payment'>" +
        "<p>Votre moyen de paiement est enregistré.</p><br>").fadeIn(500);
    infopayment();
}

//Paiement rapide
function renderpay() {
    $('body').scrollTop(0);
    getmonitor();
    document.addEventListener('touchmove', handleTouchMove, false);
    $("#statustitle").text("Paiement rapide pour leçon hors forfait");
    $("#mapdiv").hide();
    $("#back_button").show();
    $("#rendercontent").hide().html("<center>" +
        "<div style='height: 55px;'></div>" +
        "<div id='inscription'>" +
        "Maintenant, vous n'avez plus qu'à valider pour pouvoir faire votre " +
        "heure de conduite<br>Il vous sera facturé <span id='price'></span>€ TTC<br>" +
        "<form action='http://62.210.192.92/AE/web/pay.php' method='POST'" +
        "id='braintree-payment-form'>" +
        "<input hidden name='token' value='' id='fastpaytoken'>" +
        "<input hidden name='mail' value='' id='fastpaymail'>" +
        "<input hidden name='phone' value='' id='fastpayphone'>" +
        "<input hidden name='price' value='' id='price2'>" +
        "<input hidden name='id' value='' id='payid'>" +
        "<input type='submit' id='button' value='Payer'>" +
        "</form></div>" +
        "</center>" +
        "<script src='https://js.braintreegateway.com/v2/braintree.js'></script>" +
        "<script>" +
        "var mail = localStorage.getItem('mail');" +
        "var paytoken = localStorage.getItem('paytoken');" +
        "var phone = localStorage.getItem('phone');" +
        "var id = localStorage.getItem('userid');" +
        "$('#fastpaymail').val(mail);" +
        "$('#fastpaytoken').val(paytoken);" +
        "$('#fastpayphone').val(phone);" +
        "$('#payid').val(id);" +
        "//Token pour le serveur + chiffrement" +
        "var braintree = Braintree.create('MIIBCgKCAQEA3DfiypxkEUaCq67JNR3+HuFtnN5fhxem" +
        "NaH+gcoafYzALydUgh1i7Gc5mAtJBFXkS9nEYIsKG/oPvLCyPko8Z/sLYMqAUaO54fRbeCT9" +
        "ypwYKTz2WU9U+3WcGVSOiZjGe8G2a+swqcgpL56rma+YXkZu/lyVrYrEq3Z7iFHsG02cG404" +
        "cgdRtNp8KoIg7LfdmKAdkST3BicBxi7BWk+/4XXqiwgB9fsKAZHCLWEM79HV1l/aUq7vR1Ov" +
        "HE8n6Rmng3gMEbnNwnteRPN0Fdh+YogCQtDFuxCgKl0wNfIc/zo1xSKeidyt0b8sRlOnm" +
        "rFOmVg7AvI+ljEa/NgmfdSelQIDAQAB');" +
        "braintree.onSubmitEncryptForm('braintree-payment-form');" +
        "$(\"#back_button\").click(function () {rendermenu();});</script>").fadeIn(500);
}

//Paiement plus enregistrement
function renderegisterpay() {
    $('body').scrollTop(0);
    getmonitor();
    document.addEventListener('touchmove', handleTouchMove, false);
    $("#statustitle").text("Paiement pour leçon hors forfait");
    $("#mapdiv").hide();
    $("#back_button").show();
    $("#rendercontent").hide().html("<div style='height: 55px;'></div>" +
        "<div id='inscription'>" +
        "Complétez le formulaire ci dessous pour payer votre leçon et enregistrer votre" +
        " moyen de paiement<br>Il vous sera facturé <span id='price'></span>€ TTC" +
        "<form action='http://62.210.192.92/AE/web/registerpay.php' method='POST'" +
        "id='braintree-payment-form'>" +
        "<p><label>Numéro de carte: </label>" +
        "<input type='tel' class='inputpay' size='20' maxlength='16'" +
        "id='cbnum' autocomplete='off' name='number'></p>" +
        "<p><label>Code à 3 chiffres: </label>" +
        "<input type='tel' autocomplete='off' class='inputpay'" +
        "size='3' maxlength='3' name='cvv'></p>" +
        "<p><label>Expiration (MM/YYYY): </label>" +
        "<input type='tel' class='inputpay' size='2' maxlength='2' name='month'> / " +
        "<input type='tel' class='inputpay' size='4' maxlength='4' name='year'></p>" +
        "<input hidden name='mail' value='' id='paymail'>" +
        "<input hidden name='phone' value='' id='payphone'>" +
        "<input hidden name='price' value='' id='price2'>" +
        "<input hidden name='id' value='' id='payid'>" +
        "<input type='submit' id='button' value='Commander'>" +
        "</form></div></div><script>" +
        "var mail = localStorage.getItem('mail');" +
        "var phone = localStorage.getItem('phone');" +
        "var id = localStorage.getItem('userid');" +
        "$('#paymail').val(mail);" +
        "$('#payphone').val(phone);" +
        "$('#payid').val(id);" +
        "$(function()" +
        "{ $('#cbnum')" +
        ".blur(function()" +
        "{ var value = $(this).val();" +
        "value = value.match(/.{1,4}/g).join(' ');" +
        "$(this).val(value); })" +
        ".focus(function() { " +
        "var value = $(this).val();" +
        "value = value.replace(/ /g, '');" +
        "$(this).val(value); });" +
        "});" +
        "$('form input[type=tel]').on('input', function ()" +
        "{if($(this).val().length == $(this).attr('maxlength'))" +
        "{$(this).next('input').focus();}});" +
        "var braintree = Braintree.create('MIIBCgKCAQEA3DfiypxkEUaCq67JNR3+HuFtnN5fhxemNaH" +
        "gcoafYzALydUgh1i7Gc5mAtJBFXkS9nEYIsKG/oPvLCyPko8Z/sLYMqAUaO54fRbeCT9ypwYKTz2WU9" +
        "U+3WcGVSOiZjGe8G2a+swqcgpL56rma+YXkZu/lyVrYrEq3Z7iFHsG02cG404cgdRtNp8KoIg7LfdmK" +
        "AdkST3BicBxi7BWk+/4XXqiwgB9fsKAZHCLWEM79HV1l/aUq7vR1OvHE8n6Rmng3gMEbnNwnteRPN0Fd" +
        "h+YogCQtDFuxCgKl0wNfIc/zo1xSKeidyt0b8sRlOnmrFOmVg7AvI+ljEa/NgmfdSelQIDAQAB');" +
        "braintree.onSubmitEncryptForm('braintree-payment-form');" +
        "$(\"#back_button\").click(function () {rendermenu();});</script>").fadeIn(500);
}

//Page notation, les étoiles sont des radios buttons
function renderrating() {
    $('body').scrollTop(0);
    document.addEventListener('touchmove', handleTouchMove, false);
    $("#statustitle").text("Notation de l'auto-école");
    $("#mapdiv").hide();
    $("#back_button").hide();
    $("#rendercontent").hide().html("<div style='height: 55px;'></div>" +
        "<div id='lessoninfo'></div>" +
        "<form><center><br>Amabilité:<br>" +
        "<span class='star-rating'>" +
        "<input value='1' type='radio' name='a'><i></i>" +
        "<input value='2' type='radio' name='a'><i></i>" +
        "<input value='3' type='radio' name='a'><i></i>" +
        "<input value='4' type='radio' name='a'><i></i>" +
        "<input value='5' type='radio' name='a'><i></i>" +
        "</span><br>Efficacité:<br>" +
        "<span class='star-rating'>" +
        "<input value='1' type='radio' name='e'><i></i>" +
        "<input value='2' type='radio' name='e'><i></i>" +
        "<input value='3' type='radio' name='e'><i></i>" +
        "<input value='4' type='radio' name='e'><i></i>" +
        "<input value='5' type='radio' name='e'><i></i>" +
        "</span><br>Propreté:<br>" +
        "<span class='star-rating'>" +
        "<input value='1' type='radio' name='p'><i></i>" +
        "<input value='2' type='radio' name='p'><i></i>" +
        "<input value='3' type='radio' name='p'><i></i>" +
        "<input value='4' type='radio' name='p'><i></i>" +
        "<input value='5' type='radio' name='p'><i></i>" +
        "</span><br><br>" +
        "<span id='inputspan'></span>" +
        "</form></center><script>ratingInfo()</script>").fadeIn(500);
}

function renderchoice(n1, n2, n3) {
    $('body').scrollTop(0);
    document.addEventListener('touchmove', handleTouchMove, false);
    $("#statustitle").text("Confirmation de votre choix");
    $("#mapdiv").hide();
    $("#back_button").show();
    renderae(localStorage.getItem("ID1"), "choice", "#aedesc");
    renderae(localStorage.getItem("ID2"), "choice", "#aedesc2");
    renderae(localStorage.getItem("ID3"), "choice", "#aedesc3");
    $("#rendercontent").hide().html("<div style='height: 55px;'></div>" +
        "<div id=\"inscription\">" +
        "Voici votre choix d'auto-écoles, appuyer sur le nom d'une auto-école pour voir son profil.<br><br>");
    if (n1)
        $("#rendercontent").append("<button class=\"bigbuttonaeinfo\" id='bigbutton' onclick='$(\"#aedesc\").toggle(200); $(\"#aedesc2, #aedesc3\").hide(200);" +
            "if ($(\"#aedesc\").is(\":visible\")) $(this).html(\"v&nbsp;&nbsp;" + n1 + "\");" +
            "renderchoicetoggleback(\"" + n1 + "\", \"" + n2 + "\", \"" + n3 + "\");' id=\"aename\">&gt;&nbsp;&nbsp;" + n1 + "</button><br>" +
            "<div id='aedesc' hidden></div>").fadeIn(500);
    if (n2)
        $("#rendercontent").append("<button class=\"bigbuttonaeinfo\" id='bigbutton' onclick='$(\"#aedesc2\").toggle(200); $(\"#aedesc, #aedesc3\").hide(200);" +
            "if ($(\"#aedesc2\").is(\":visible\")) $(this).html(\"v&nbsp;&nbsp;" + n2 + "\");" +
            "renderchoicetoggleback(\"" + n1 + "\", \"" + n2 + "\", \"" + n3 + "\");' id=\"aename2\">&gt;&nbsp;&nbsp;" + n2 + "</button><br>" +
            "<div id='aedesc2' hidden></div>").fadeIn(500);
    if (n3)
        $("#rendercontent").append("<button class=\"bigbuttonaeinfo\" id='bigbutton' onclick='$(\"#aedesc3\").toggle(200); $(\"#aedesc, #aedesc2\").hide(200);" +
            "if ($(\"#aedesc3\").is(\":visible\")) $(this).html(\"v&nbsp;&nbsp;" + n3 + "\");" +
            "renderchoicetoggleback(\"" + n1 + "\", \"" + n2 + "\", \"" + n3 + "\");' id=\"aename3\">&gt;&nbsp;&nbsp;" + n3 + "</button><br>" +
            "<div id='aedesc3' hidden></div>").fadeIn(500);
    $("#rendercontent").append("<br><hr><br><p class=\"texteinfo\">Il ne vous reste plus qu'à confirmer votre choix afin de faire une " +
        "demande d\'inscription à ces auto-écoles qui vous répondront rapidement.</p><br><br>" +
        "<button style=\"width:80%;\" id=\"bigbutton\" onclick='loading(); appeloffre(\"" + n1 + "\", \"" + n2 + "\", \"" + n3 + "\");'>" +
        "Envoyer la demande</button><br><br></div>" +
        "<script>$(\"#back_button\").click(function () {rendermenu();});</script>").fadeIn(500);
}

function renderchoicetoggleback(n1, n2, n3) {
    setTimeout(function () {
        if ($("#aedesc").is(":hidden"))
            $("#aedesc").prev().prev().html("&gt;&nbsp;&nbsp;" + n1);
        if ($("#aedesc2").is(":hidden"))
            $("#aedesc2").prev().prev().html("&gt;&nbsp;&nbsp;" + n2);
        if ($("#aedesc3").is(":hidden"))
            $("#aedesc3").prev().prev().html("&gt;&nbsp;&nbsp;" + n3);
    }, 300);
}

function renderchoice2(n1) {
    $('body').scrollTop(0);
    document.addEventListener('touchmove', handleTouchMove, false);
    $("#statustitle").text("Confirmation de votre choix");
    $("#mapdiv").hide();
    $("#back_button").show();
    renderae(localStorage.getItem("ID1"), "", "#aedesc");
    clearInterval(interval);
    $("#rendercontent").hide().html("<div style='height: 55px;'></div>" +
        "<div id=\"inscription\">" +
        "Voici votre choix d'auto-écoles, appuyez sur le nom d'une auto-école pour voir son profil.<br><br>" +
        "<button id='bigbutton' onclick='$(\"#aedesc\").toggle(200);" +
        " if ($(\"#aedesc\").is(\":visible\")){" +
        "$(this).html(\"v&nbsp;&nbsp;" + n1 + "\");" +
        "} else {" +
        "$(this).delay(300).html(\"&gt;&nbsp;&nbsp;" + n1 + "\");" +
        "$(\"#aedesc\").prop(\"hidden\", \"hidden\");}'" +
        " id=\"aename\">&gt;&nbsp;&nbsp;" + n1 + "</button><br>" +
        "<div id='aedesc' hidden></div>" +
        "<br><hr><br><p class=\"texteinfo\">Il ne vous reste plus qu'à confirmer votre choix afin de faire une " +
        "demande d\'inscription à ces auto-écoles qui vous répondront rapidement.</p><br><br>" +
        "<button id=\"bigbutton\" onclick='renderlesson(\"hors_forfait\", \"\");'>" +
        "Envoyer la demande</button></div><br><br>" +
        "<script>$(\"#back_button\").click(function () {rendermenu();});</script>").fadeIn(500);

    $('#bigbutton').click(function () {
        $('#aedesc').toggle(function () {
            if ($(this).css('display') === 'none') {
                $(this).prop('hidden', 'hidden');
            }
            else {
                $(this).removeProp('hidden');
            }
        })
    })

}
/* ESSAYER LE DELAY AVEC .QUEUE()... */

function renderplanning() {
    document.removeEventListener('touchmove', handleTouchMove);
    var id = localStorage.getItem("userid");
    $("#statustitle").text("Mes leçons de conduite");
    $("#mapdiv").hide();
    $("#back_button").hide();
    /*$("#rendercontent").hide().html("<div style='height: 55px;'></div>" +
     "<div id='inscription' style='width: 90%;'>" +
     "<h2 class='statustitle'>" +
     "Par défault, votre planning est synchronisé avec votre agenda<br></h2>" +
     "<strong class='statustitle'>Vos prochaines heures: </strong>" +
     "<table class='hours'>" +
     "<tr id='calendarf'></tr>" +
     "</table><br>" +
     "<strong class='statustitle'>Vos précédentes heures: </strong>" +
     "<table class='hours'>" +
     "<tr id='calendarp'></tr>" +
     "</table>" +
     "<p id='userInfo'></p>" +
     "</div><script>" +
     "var mail = localStorage.getItem('mail');" +
     "getcalendar();" +
     "</script>").fadeIn(500);*/
    $.get("http://62.210.192.92/AE/web/index.php/planning/" + id, function (planning) {
        var list = document.createElement("div");
        list.setAttribute("class", "accordion");
        for (var i = 0; i < planning.length; i++) {
            var accordionSection = document.createElement("div");
            accordionSection.setAttribute("class","accordion-section");

            var accordionTitle = document.createElement("a");
            accordionTitle.setAttribute("class","accordion-section-title");
            accordionTitle.setAttribute("href","#accordion-"+i);

            var accordionContent = document.createElement("div");
            accordionContent.setAttribute("id", "accordion-"+i);
            accordionContent.setAttribute("class", "accordion-section-content");



            var datet = planning[i].date.split(" ")[0].toString();
            var heuret = planning[i].date.split(" ")[1].toString();

            var dateComplete = document.createElement("p");
            dateComplete.setAttribute("class", "planning-dateC");
            dateComplete.innerHTML = datet+" à "+heuret;
            var forfait = document.createElement("div");
            forfait.setAttribute("class", "planning-forfait");
            var prix = document.createElement("p");
            prix.setAttribute("class", "planning-prix");
            if (planning[i].forfait == "1") {
                forfait.innerHTML = "<b>Forfait :</b> Oui";
                prix.innerHTML = "<b>Prix :</b> 1 Crédit";
            } else {
                forfait.innerHTML = "<b>Forfait :</b> Non";
                prix.innerHTML = "<b>Prix : </b>" + planning[i].prix+" €";
            }

            var autoEcole = document.createElement("div");
            autoEcole.setAttribute("class", "planning-ae");
            autoEcole.innerHTML = planning[i].nom_ae;
            var moniteur = document.createElement("div");
            moniteur.setAttribute("class", "planning-moniteur");

            moniteur.innerHTML = "<b>Moniteur :</b> " + planning[i].nom_moniteur;
            var lieu = document.createElement("p");
            lieu.setAttribute("class", "planning-lieu");
            lieu.innerHTML = "<b>Lieu : </b>" + planning[i].lieu;
            var date = document.createElement("div");
            date.setAttribute("class", "planning-date");
            date.innerHTML = "<b>Date : </b>" + datet;
            var heure = document.createElement("div");
            heure.setAttribute("class", "planning-heure");
            heure.innerHTML = "<b>Heure : </b>" + heuret;



            var etat = document.createElement("img");
            etat.setAttribute("class", "planning-img");
            if (planning[i].Etat == "0") {
                etat.setAttribute("src", "../img/deviswait.png");
            }
            if (planning[i].Etat == "1") {
                etat.setAttribute("src", "../img/devisok.png");
            }

            var annuler = document.createElement("button");
            annuler.setAttribute("class", "planning-cancel");
            annuler.innerHTML = "Annuler !"

            accordionContent.appendChild(autoEcole);
            accordionContent.appendChild(moniteur);
            accordionTitle.appendChild(lieu);
            accordionContent.appendChild(date);
            accordionContent.appendChild(heure);
            accordionContent.appendChild(forfait);
            accordionContent.appendChild(annuler);
            accordionTitle.appendChild(etat);
            accordionTitle.appendChild(dateComplete);
            accordionTitle.appendChild(prix);
            accordionSection.appendChild(accordionTitle);
            accordionSection.appendChild(accordionContent);
            list.appendChild(accordionSection);


        }
        var renderContent = document.getElementById("rendercontent");
        renderContent.appendChild(list);


            $('.accordion-section-title' ).click(function(e) {
                // Grab current anchor value
                var currentAttrValue = $(this).attr('href');

                if($(e.target).is('.active')) {
                    $('.accordion .accordion-section-title').removeClass('active');
                    $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
                }else {
                    $('.accordion .accordion-section-title').removeClass('active');
                    $('.accordion .accordion-section-content').slideUp(300).removeClass('open');

                    // Add active class to section title
                    $(this).addClass('active');
                    // Open up the hidden content panel
                    $('.accordion ' + currentAttrValue).slideDown(300).addClass('open');
                }

                e.preventDefault();
            });

    }, "json");


}
function createCallback( i ){
    return function(){
        console.log('you clicked' + i);
    }
}
//Faire patientez l'uilisateur
function renderwait(status) {
    $('body').scrollTop(0);
    document.addEventListener('touchmove', handleTouchMove, false);
    info();
    $("#statustitle").text("Lorem hipster dolor sit amet.");
    $("#mapdiv").hide();
    $("#back_button").hide();
    var content = "<div style='height: 55px;'></div>" +
        "<button id='tomap' hidden onclick='rendermenu()'></button></div>" +
        "<div id='inscription'>";
    if (status == "2") {
        infodevis();
        content += "<p>Lorem ipsum dolor batman sit amet, consectetur adipisicing elit, sed do garrysmod" +
            " tempor incididunt ut labore et hodor magna aliqua.</p>" +
            "<p id='aeinfocontent'></p><button onclick='renderwait(\"2\")' id='medbutton'>Actualiser</button>" +
            "<button onclick='localStorage.setItem(\"resetmark\", \"true\"); resetstatus();' id='medbutton'>Annuler la demande</button>";
    }
    else if (status == "7") {
        infodevis();
        content += "<p>En attente de validation de la part de votre auto-école ou du moniteur.</p>" +
            "<p id='aeinfocontent'></p><button onclick='renderwait(\"7\")' id='medbutton'>Actualiser</button>" +
            "<button onclick='resetstatus();' id='medbutton'>Annuler la demande</button>";
    }
    else if (status == "4")
        content += "<p>En attente de validation de la part de votre auto-école ou du moniteur.<br>" +
            "Cette dernière n'étant partenaire, cela va être plus long qu'avec une auto-école partenaire</p>" +
            "<p id='aeinfocontent'></p><button onclick='renderwait(\"4\")' id='medbutton'>Actualiser</button>" +
            "<button onclick='resetstatus();' id='medbutton'>Annuler la demande</button>";
    /*else if (status == "w3")
     {
     content += "<p id='aeinfocontent'>Au moins une des auto-écoles a validé votre demande " +
     "d'inscription. Voila la ou les auto-écoles</p><p id='DivRenderAE'></p><br>";
     //Pas fait
     }*/
    content += "</div></div>";
    $("#rendercontent").hide().html(content).fadeIn(500);
}

function renderlessonMap() {
    var map = new google.maps.Map(document.getElementById('map_canvas'), {
        scrollwheel: false,
    });
}
function renderlesson(from, pos) {
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener('scrollwheel', renderlessonMap, false);
    info();
    console.log("renderlesson");
    $("#statustitle").text("Prise d'une leçon de conduite");
    $("#rendercontent").hide();
    $("#back_button").hide();
    $(".mapright").hide();

    $("#map1").replaceWith("<button id='map6' class='mapbutton2 buttonleft' onclick='askFreeLessonNow()'>Maintenant</button>");
    $("#map3").replaceWith("<button id='map3' class='mapbutton2 buttonright' onclick='renderProgLesson()'>Programmer une heure<span id='mapspan'>" +
        "</span></button>");
    $("#map2").hide();
    aeinfo("wait", localStorage.getItem('studentae'));
    if (from == "map") {
        $("#tomap").show();
        $("#back_button").show();
    }
}

//page après "programmer 1H de conduite"

function renderProgLesson() {
    var inscrit = localStorage.getItem("inscrit");

    if (inscrit == "false") {
        console.log(inscrit);
        calendarRender(0);
    } else {
        document.addEventListener('touchmove', handleTouchMove, false);
        document.addEventListener('scrollwheel', renderlessonMap, false);
        info();
        $("#statustitle").text("Programmer une heure");
        $("#rendercontent").hide();
        $("#back_button").show();
        $(".mapright").hide();

        $("#map6").replaceWith("<button id='map1' onclick='calendarRender(1)' class='mapbutton2 buttonleft'>Faire une demande dans son AE</button>");
        $("#map3").replaceWith("<button id='map3' onclick='calendarRender(0)' class='mapbutton2 buttonright' >Faire une demande dans le réseau AE<span id='mapspan'>" +
            "</span></button>");


        $("#map2").hide();
        $("#mapdiv").append(content).fadeIn(500);
        aeinfo("wait", localStorage.getItem('studentae'));
        $("#back_button").click(function () {
            rendermenu();
        }).fadeIn(500);
    }
}


function renderabout() {
    $('body').scrollTop(0);
    document.addEventListener('touchmove', handleTouchMove, false);
    $("#statustitle").text("À propos");
    $("#mapdiv").hide();
    $("#back_button").hide();
    $("#rendercontent").hide().html("<div style='height: 55px;'></div>Version: V0.91 <br>Dernière mise à jour: Novembre 2015" +
        "<br>Version précise: V0.91 (Beta 3) du 15 mai 2016").fadeIn(500);

}

/* Affichage en liste des infos sur la carte, récupère moins d'auto-écoles que la carte
 ** Les autos écoles sont triés et la couleur des % changent selon leurs valeurs
 ** l'action du boutton image est définie dans le script tout à la fin de la fonction. La variable
 ** Average fait la moyenne de la conversion en float des notes puis est tronqué pour avoir qu'une décimal */
function renderlist(resp) {
    document.removeEventListener('touchmove', handleTouchMove);
    localStorage.setItem("i", 3);
    listinterval();
    $("#statustitle").text("Sélection par liste");
    $("#mapdiv").hide();
    $("#back_button").show();

    resp.sort(function (a, b) {
        sort = a.distance - b.distance
        return sort;
    });

    var string = "<div style='height: 55px;'></div>" +
        "<p class='statustitle' id='list_select'>Veuillez selectionner 3 auto-écoles</p><div class='picklist'>";
    for (n = 0; n < 10 && n < resp.length; ++n) {
        //Test pour  plus jolie affichage
        if (resp[n]['taux_r_etg'] == null)
            resp[n]['taux_r_etg'] = 0;
        if (resp[n]['taux_r_b'] == null)
            resp[n]['taux_r_b'] = 0;

        if (resp[n]['avg(note1)'] == null)
            var average = "--";
        else
            var average = ((parseFloat(resp[n]['avg(note1)']) + parseFloat(resp[n]['avg(note2)'])
            + parseFloat(resp[n]['avg(note3)'])) / 3).toFixed(1);

        string += "<button name=\"" + resp[n]['nom_auto_ecole'] + "\" AEID=\"" +
            resp[n]['ID'] + "\" onclick='if ($(\".picked\").length < 3) " +
            "{ if ($(this).hasClass(\"picked\") == true) {$(this).animate({backgroundColor: \"#009688\"}, 200); " +
            "$(this).animate({\"color\":\"white\"}, 200);} else {$(this).animate({backgroundColor: \"#FDD835\"}, 200);" +
            "$(this).animate({\"color\":\"#009688\"}, 200);} classie.toggle(this, \"picked\"); } else if " +
            "($(this).hasClass(\"picked\") == true) {classie.toggle(this, \"picked\");" +
            "$(this).animate({backgroundColor: \"#009688\"}, 200); $(this).animate({\"color\":\"white\"}, 200);}'><h3><b>" +
            resp[n]['nom_auto_ecole'] + "</h3></b><b>" +
            resp[n]['adresse'] + " " + resp[n]['ville'] + "</b><br>Note : <b>" +
            average + "★</b><br>Réussite code : ";
        if (resp[n]['taux_r_etg'] >= 50)
            string += "<span id=\"goodtext\">" + resp[n]['taux_r_etg'] + "%</span>";
        else
            string += "<span id=\"badtext\">" + resp[n]['taux_r_etg'] + "%</span>";
        string += "<br>Réussite permis B : ";
        if (resp[n]['taux_r_b'] >= 50)
            string += "<span id=\"goodtext\">" + resp[n]['taux_r_b'] + "%</span>";
        else
            string += "<span id=\"badtext\">" + resp[n]['taux_r_b'] + "%</span>";
        string += "<br><br><b id=\"dist\"><span id=\"bigtext\">" +
            resp[n]['distance'] + " m</b></span><br></button>";
    }
    $("#rendercontent").hide().html(string + "</div><button class=\"selectbutton buttonleft\" " +
        "onclick=\"rendermenu()\">Retour à la carte</button><button class=\"selectbutton buttonright\">" +
        "Encore 3 auto-écoles</button><div style=\"height: 50px;\"></div><script>" +
        "$(\"#back_button\").click(function () {rendermenu();});</script>").fadeIn();
}

//Interval pour vérification nombre ae choisis, vérifie toutes les 0,6 secondes
function listinterval() {
    setInterval(function () {
        var i = $('.picked').length;
        if (i == 0) {
            $(".buttonright.selectbutton").replaceWith('<button class="selectbutton buttonright">' +
                'Encore 3 auto-écoles</button>');
            $(".buttonleft.selectbutton").replaceWith('<button class="selectbutton buttonleft" ' +
                'onclick="rendermenu()">Retour à la carte</button>');
            $("#list_select").html("Veuillez selectionner 3 auto-écoles");
        }
        else if (i == 1) {
            $(".buttonright.selectbutton").replaceWith('<button class="selectbutton buttonright">' +
                'Encore 2 auto-écoles</button>');
            $(".buttonleft.selectbutton").replaceWith('<button class="selectbutton buttonleft" ' +
                'onclick="maprequest()">Annuler</button>');
            $("#list_select").html("Selectionnez 2 autres auto-écoles");
        }
        else if (i == 2) {
            $(".buttonright.selectbutton").replaceWith('<button class="selectbutton buttonright">' +
                'Encore 1 auto-école</button>');
            $(".buttonleft.selectbutton").replaceWith('<button class="selectbutton buttonleft" ' +
                'onclick="maprequest()">Annuler</button>');
            $("#list_select").html("Plus qu'une dernière auto-école");
        }
        else {
            $(".buttonright.selectbutton").replaceWith("<button class=\"selectbutton buttonright\"" +
                " onclick=\"var n1 = $('.picked')[0].name; var n2 = $('.picked')[1].name; var n3 = $('.picked')" +
                "[2].name; localStorage.setItem('ID1', $('.picked:eq(0)').attr('AEID')); " +
                "localStorage.setItem('ID2', $('.picked:eq(1)').attr('AEID')); localStorage.setItem" +
                "('ID3', $('.picked:eq(2)').attr('AEID')); renderchoice(n1, n2, n3);\">Accepter</button>");
            $(".buttonleft.selectbutton").replaceWith("<button class=\"selectbutton buttonleft\" " +
                "onclick=\"maprequest()\">Annuler</button>");
            $("#list_select").html("Confirmez votre choix.");
        }
    }, 600);
}

/*Selection si le type à déjà une auto-école, il choisit sa ville puis voit les AE correspondantes*/

function renderselection() {
    document.removeEventListener('touchmove', handleTouchMove);
    $("#statustitle").text("Quel est votre auto-école ?");
    $("#mapdiv").hide();
    $("#back_button").show();
    $("#rendercontent").hide().html("<div style='height: 55px;'></div>" +
        "<p class='statustitle'>Sélectionnez votre auto-école</p><input class=\"input\" place" +
        "holder=\"Ville ou code postal\" maxlength=\'5\' id=\"cityname\" onkeypress='if(event.keyCode == 13)ae_list_city();'><br><button id=\"bigbutton\" onclick=\"ae_list_city()\">" +
        "Lancer la recherche</button><br><br>Liste des auto-écoles correspondantes au critère :<br><div " +
        "id='resultsearch'></div><script>$(\"#back_button\").click(function () {rendermenu();});</script>").fadeIn(500);
}

//Retour au menu, un petit show, et la map réaparrait : Magique !
function rendermenu() {
    console.log("plop2");
    $('body').scrollTop(0);
    info();
    document.addEventListener('touchmove', handleTouchMove, false);
    $("#statustitle").text("Accueil");
    var aestatus = localStorage.getItem("aestatus");
    //On regarde ce qu'on affiche.
    if (aestatus == "3" && localStorage.getItem("timeleft") > 0) {
        console.log("switch render.js");
        renderlesson("", "");
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    } else if (aestatus == "2") {
        renderwait("2");
    } else if (aestatus == "7") {
        renderwait("7");
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    }
    else if (aestatus == "4") {
        renderwait("4");
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    }
    /*
     else if (aestatus == "w3")
     renderwait("w3");
     */
    else if (aestatus == "1") {
        renderlesson("", "");
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    }
    else if (aestatus == "5") {
        renderInProg();
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    }
    else if (aestatus == "6") {
        renderrating();
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    }
    //AESTATUS NON
    else {
        $("#back_button").hide();
        $("#mapdiv").show();
        $("#rendercontent").html("");
    }
    //$("#test").click();
}

//contenu du menu de droite
function rendermenucontent() {
    var timeleft = localStorage.getItem("timeleft");
    var paytoken = localStorage.getItem("paytoken");
    var conduite = localStorage.getItem("forfait");
    var validcode = localStorage.getItem("validcode");
    var aestatus = localStorage.getItem("aestatus");

    //Partie: Crédit
    if (timeleft > 1)
        $("#rightstatus").html("<b>Crédit</b><br><span id='span_ok'>• </span>" + timeleft + " heures<br>restantes");
    else if (timeleft == 1)
        $("#rightstatus").html("<b>Crédit</b><br><span id='span_ok'>• </span>" + timeleft + " heure<br>restante !");
    else
        $("#rightstatus").html("<b>Crédit</b><br><span id='span_ko'>• </span>Épuisé");

    //Partie: paiement
    if (paytoken == "non")
        $("#check_register_menu").html("<span id='span_ko'>• </span>Non enregistré")
    else
        $("#check_register_menu").html("<span id='span_ok'>• </span>Enregistré")

    //Partie: en cours
    if (validcode == "oui" && conduite == "oui")
        $("#leftstatus").html("<b>En cours</b><br> <span id='span_ok'>• </span>Code validé<br>"
            + "<span id='span_ok'>• </span>En conduite");
    else if (validcode == "oui" && conduite == "non")
        $("#leftstatus").html("<b>En cours</b><br> <span id='span_ok'><b>• </b></span>Code validé<br>"
            + "<span id='span_ko'>• </span>Pas de conduite");
    else if (validcode == "non" && conduite == "non" && aestatus == "2")
        $("#leftstatus").html("<b>En cours</b><br> <span id='span_ko'>• </span>Pas d'autoécole<br>"
            + "<span id='span_ok'>• </span>Demande en cours");
    else if (validcode == "non" && conduite == "non")
        $("#leftstatus").html("<b>En cours</b><br> <span id='span_ko'>• </span>Code non validé<br>"
            + "<span id='span_ko'>• </span>Pas de conduite");

    else
        $("#leftstatus").html("<b>En cours</b><br> <span id='span_ko'>• </span>Pas d'autoécole<br>"
            + "<span id='span_ko'>• </span>Pas de demande");
}

function renderae(aeid, from, div, prix_forfait) {
    document.removeEventListener('touchmove', handleTouchMove);
    //$("#statustitle").text("Fiche auto-école");
    //$("#back_button").replaceWith("<img id='back_button' src='../img/back.png'>");

    var content = "<div style='height: 55px;'></div>";
    if (from == "devis")
        content += "<button onclick='registertoAE(\"1\", " + aeid + ")' id='medbutton'>Refuser</button>" +
            "<button onclick='registertoAE(\"0\", " + aeid + ")' id='medbutton'>Accepter</button>";

    $(div).html(content).fadeIn(500);
    aeinfo(from, aeid, div, prix_forfait);
}

//Montre le moniteur et son devis pour la leçon libre.
function rendermonitor() {
    getmonitor();
    $("#back_button").show();
    document.addEventListener('touchmove', handleTouchMove, false);
    $("#statustitle").text("Profil du moniteur");
    var content = "<div style='height: 55px;'></div>" +
        "<br><br><div id='DivRenderMonitor'></div>" +
        "<br><button onclick='cancelLesson(\"free\")' id='bigbutton'>Annuler la demande</button>" +
        "<script>$(\"#back_button\").click(function () {rendermenu();});</script>";
    $("#rendercontent").hide().html(content).fadeIn(500);
}


function renderInProg() {
    document.addEventListener('touchmove', handleTouchMove, false);
    $("#statustitle").text("Vous êtes en cours de conduite");
    $("#back_button").hide();
    $("#mapdiv").hide();
    var content = "<div style='height: 55px;'></div>" +
        "<br><br><p>Si vous n'êtes pas en train de conduire et que vous voyez ce message (Et donc que le moniteur n'est pas venu " +
        "ou n'a pas arrêté la leçon), contactez votre auto-école.<br><b>Si votre heure viens juste de finir, " +
        "c'est normal, relancez l'application ou retournez à l'Accueil depuis le menu pour retrouver la page de notation</b></p>";
    $("#rendercontent").hide().html(content).fadeIn(500);
}

// Fonctionde debug, affiche le resultat html d'une requete
function rendererror(resp) {
    document.removeEventListener('touchmove', handleTouchMove);
    $("#statustitle").text("Réponse de l'API");
    $("#mapdiv").hide();
    $("#rendercontent").html("<div style='height: 55px;'></div>" + resp);
}

function clearMap() {
    $('#map_canvas').empty();
    $('#map_canvas').css('height', '0px');
}

function buttonPrixLessonNow() {
    var lat = parseFloat(localStorage.getItem('lat'));
    var lng = parseFloat(localStorage.getItem('lng'));

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': {lat: lat, lng: lng}}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var elt = results[0].address_components;
                for (i in elt) {
                    if (elt[i].types[0] == 'postal_code') {
                        var dpt = elt[i].long_name;
                        $.post("http://62.210.192.92/AE/web/index.php/prixnow", {dpt: dpt}).done(function (data) {
                            var button = document.getElementById('map6');
                            button.innerText = "Maintenant \n" + data + " €";
                        });
                    }
                }
            }
        }
    );
}

//Léo le 31/03/2016
//Code de page prog lesson
//Prise d'heure de conduite
function calendarRender(forfait) {
    $("#statustitle").text("Prise de leçon");
    $("#mapdiv").hide();

    var headerBarDate = document.createElement('div');
    headerBarDate.setAttribute('id', 'header-bar-date-prog');
    headerBarDate.setAttribute('class', 'header-bar-date');

    var dateBarDate = document.createElement('p');
    dateBarDate.setAttribute('id', 'date-bar-date');

    var dateNow = moment();

    var prevHeaderBtn = document.createElement('button');
    prevHeaderBtn.setAttribute('id', 'btn-prev-date');
    prevHeaderBtn.setAttribute('class', 'btn-bar-date btn-bar-date-disabled');
    prevHeaderBtn.setAttribute('value', 'Précédent');

    var nextHeaderBtn = document.createElement('button');
    nextHeaderBtn.setAttribute('id', 'btn-next-date');
    nextHeaderBtn.setAttribute('class', 'btn-bar-date');
    nextHeaderBtn.setAttribute('value', 'Suivant');

    prevHeaderBtn.addEventListener('click', function () {
        var dateText = document.getElementById("date-bar-date");
        var prevDate = new moment(dateText.innerHTML, "DD-MM-YYYY");
        if (prevDate < moment() && prevDate < moment() && prevDate < moment()) {
            prevHeaderBtn.setAttribute('class', 'btn-bar-date btn-bar-date-disabled');
        } else {
            var newDate = prevDate.subtract(1, "day");
            if (prevDate.isSame(moment(), 'day') && prevDate.isSame(moment(), 'month') && prevDate.isSame(moment(), 'year')) {
                prevHeaderBtn.setAttribute('class', 'btn-bar-date btn-bar-date-disabled');
            }
            dateText.innerHTML = newDate.format("DD-MM-YYYY");
        }
        getCal(forfait);
    });

    nextHeaderBtn.addEventListener('click', function () {
        var dateText = document.getElementById("date-bar-date");
        var prevDate = new moment(dateText.innerHTML, "DD-MM-YYYY");
        var newDate = prevDate.add(1, "day");
        dateText.innerHTML = newDate.format("DD-MM-YYYY");
        prevHeaderBtn.setAttribute('class', 'btn-bar-date');
        getCal(forfait);
    });

    dateBarDate.innerHTML = dateNow.format("DD-MM-YYYY");
    headerBarDate.appendChild(prevHeaderBtn);
    headerBarDate.appendChild(dateBarDate);
    headerBarDate.appendChild(nextHeaderBtn);
    document.getElementById("container").appendChild(headerBarDate);
    getCal(forfait);
    footerDualButton("Annuler", returnBack, "Valider", validationHeure, forfait);

}

function setListLesson(data, forfait) {
    document.removeEventListener('touchmove', handleTouchMove);
    var dateText = document.getElementById("date-bar-date");
    if (document.getElementById("liste_creneaux") != null) {
        document.getElementById("container").removeChild(document.getElementById("liste_creneaux"));
    }
    var liste = document.createElement("ul");
    liste.setAttribute("id", "liste_creneaux");
    var prix_array;
    if (data != null) {
        var sorted_data = data["prix"].sort(function (a, b) {
            return a - b;
        });
        prix_array = data["prix"];
        console.log(data);
    }
    for (var i = 0; i < 24; i++) {
        var item = document.createElement("li");
        item.setAttribute("class", "item");
        item.setAttribute("id", i);
        var jour_nuit = document.createElement("div");
        jour_nuit.setAttribute("class", "jn");

        var astre = document.createElement("img");
        astre.setAttribute("class", "astre");

        if ((i >= 0) && (i <= 5)) {
            astre.setAttribute("src", "../img/1.png");
        }
        if ((i >= 21) && (i <= 23)) {
            astre.setAttribute("src", "../img/1.png");
        }
        if ((i >= 5) && (i <= 7)) {
            astre.setAttribute("src", "../img/2.png");
        }
        if ((i >= 7) && (i <= 8)) {
            astre.setAttribute("src", "../img/3.png");
        }
        if ((i >= 8) && (i <= 18)) {
            astre.setAttribute("src", "../img/4.png");
        }
        if ((i >= 18) && (i <= 19)) {
            astre.setAttribute("src", "../img/3.png");
        }
        if ((i >= 19) && (i <= 21)) {
            astre.setAttribute("src", "../img/2.png");
        }
        if ((i >= 21) && (i <= 23)) {
            astre.setAttribute("src", "../img/1.png");
        }

        var j = i + 1;
        if (j == 24) {
            j = 0;
        }

        var p_creneau = document.createElement("p");
        p_creneau.setAttribute("class", "creneaux");
        p_creneau.innerText = i + "h - " + j + "h";

        var p_prix = document.createElement("p");

        if (forfait == 0) {
            console.log(i);
            p_prix.innerHTML = prix_array[i] + " €";
            p_prix.setAttribute("class", "prix");
            if (prix_array[i] == sorted_data[0]) {
                p_prix.setAttribute("class", "prix pas-cher");
            }
            if (prix_array[i] == sorted_data[sorted_data.length - 1]) {
                p_prix.setAttribute("class", "prix cher");
            }
            item.addEventListener("click", function () {
                cleanSelectedHour();
                this.setAttribute("class", "item selected-hour");
            }, false);
        }
        if (forfait == 1) {
            p_prix.innerHTML = "1 Crédit";
            p_prix.setAttribute("class", "prix");
            console.log(i);
            item.addEventListener("click", function () {
                cleanSelectedHour();
                this.setAttribute("class", "item selected-hour");
            }, false);
        }

        jour_nuit.appendChild(astre);
        item.appendChild(jour_nuit);
        item.appendChild(p_creneau);
        item.appendChild(p_prix);
        liste.appendChild(item);
    }
    $("#mapdiv").hide();
    document.getElementById("container").appendChild(liste);
}

function footerDualButton(textButtonLeft, actionButtonLeft, textButtonRight, actionButtonRight, arg) {
    if (document.getElementById("footer-button") != null) {
        document.getElementById("container").removeChild(document.getElementById("footer-button"));
    }
    var footerContainer = document.createElement("div");
    var buttonLeft = document.createElement("button");
    var buttonRight = document.createElement("button");

    footerContainer.setAttribute("id", "footer-button");

    buttonLeft.setAttribute("id", "button-left");
    buttonLeft.setAttribute("class", "selectbutton");
    buttonLeft.innerHTML = textButtonLeft;
    buttonLeft.addEventListener("click", actionButtonLeft);

    buttonRight.setAttribute("id", "button-right");
    buttonRight.setAttribute("class", "selectbutton");
    buttonRight.innerHTML = textButtonRight;
    if (arg == null) {
        buttonRight.addEventListener("click", actionButtonRight);
    } else {
        buttonRight.addEventListener("click", function () {
            actionButtonRight(arg);
        });
    }
    footerContainer.appendChild(buttonLeft);
    footerContainer.appendChild(buttonRight);

    document.getElementById("container").appendChild(footerContainer);
    console.log("button footer");
}

function getSelectedHour() {
    var creneau = document.getElementsByClassName("selected-hour");
    var hour = creneau[0];
    return hour;
}

function cleanSelectedHour() {
    var creneau = document.getElementsByClassName("selected-hour");
    for (var i = 0; i < creneau.length; i++) {
        creneau[i].setAttribute("class", "item");
    }
}

function validationHeure(forfait) {
    var selection = getSelectedHour();
    var h = selection.id;
    var dateText = document.getElementById("date-bar-date");
    var date = new moment(dateText.innerHTML + " " + h + ":00", "DD-MM-YYYY HH:mm").format("MM-DD-YYYY HH:mm");
    console.log(date);
    var lat = parseFloat(localStorage.getItem("lat"));
    var lng = parseFloat(localStorage.getItem("lng"));
    var mail = localStorage.getItem("mail");
    if (forfait == 1) {
        var url = "http://62.210.192.92/AE/web/index.php/lesson";
        $.post(url, {
            mail: mail,
            date: date,
            lieu: "Auto-école",
            lat: lat,
            lng: lng,
            dpt: localStorage.getItem("dpt")
        }).done(function (data) {
            alert("ça marche putain !!!!!" + data);
            renderplanning();


        });
    } else {
        var url = "http://62.210.192.92/AE/web/index.php/freelesson";
        $.post(url, {
            mail: mail,
            date: date,
            lieu: "Auto-école",
            lat: lat,
            lng: lng,
            dpt: localStorage.getItem("dpt")
        }).done(function (data) {
            alert("ça marche p***** !!!!!" + data);
            cleanContainer();
            renderplanning();
        });
    }
}
//Fin

function returnBack() {
    $('#DivRenderAE').hide();
    cleanContainer();
    rendermenu();
    $("#mapdiv").show();
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
}

function renderPouce() {
    var mContainer = document.createElement("div");
    mContainer.setAttribute("id", "pouce-container");
    var parfait = document.createElement("span");
    parfait.setAttribute("id", "pouce-parfait");
    parfait.innerHTML = "Parfait !";

    var st = document.createElement("span");
    st.setAttribute("id", "pouce-st");
    st.innerHTML = "Vous y êtes presque";

    var pouce = document.createElement("img");
    pouce.setAttribute("id", "pouce-img");
    pouce.setAttribute("src", "../img/pouce.png");

    var txt = document.createElement("span");
    txt.setAttribute("id", "pouce-txt");
    txt.innerHTML = "Vous serez prochainement contacté par l'Auto-école que vous avez choisi";

    var annuler = document.createElement("button");
    annuler.setAttribute("id", "pouce-btn");

    var img = document.createElement("img");
    img.setAttribute("id", "pouce-btn-img");
    img.setAttribute("src", "../img/sad.png");

    var title_btnannuler = document.createElement("span");
    title_btnannuler.setAttribute("id", "pouce-btn-title");
    title_btnannuler.innerHTML = "Annuler ça !";

    var content_btnannuler = document.createElement("span");
    content_btnannuler.setAttribute("id", "pouce-btn-content");
    content_btnannuler.innerHTML = "Oups ! Je me suis trompé...";

    annuler.appendChild(img);
    annuler.appendChild(content_btnannuler);
    annuler.appendChild(title_btnannuler);

    annuler.onclick = function () {
        cleanStatutBar();
        resetstatus();
        cleanContainer();
        $("#mapdiv").show();
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    };

    var statutBar = document.getElementById("statusbar");
    var statutTitle = document.getElementById("statustitle");
    var actualiser = document.createElement("img");
    actualiser.setAttribute("id", "actuBar");
    if(statutTitle.innerHTML != "Patientez !"){
        statutTitle.innerHTML = "Patientez !";
    }else{
        statutTitle.innerHTML = "Actualiser !";
    }
    actualiser.setAttribute("src", "../img/rafraichir.png");
    statutBar.appendChild(actualiser);
    actualiser.addEventListener('click', function () {
        var aestatus = localStorage.getItem("aestatus");
        statutTitle.innerHTML = "Actualiser !!";
        $("#mapdiv").hide();
        cleanContainer();
        renderwait("3");
        if(aestatus == "2"){
            var i = 0;
            statutBar.removeChild(actualiser);
            statutTitle.innerHTML = "Veuillez patienter quelques instants !!";
            cleanContainer();
            renderPouce();
            console.log("j'actualise", i++);
        } else if (aestatus == "3"){
            cleanStatutBar();
            cleanContainer();
            actualiser.remove();
            OnDeviceReady();
            $("#mapdiv").show();
            renderlesson("", "");
        }
    });

    mContainer.appendChild(parfait);
    mContainer.appendChild(st);
    mContainer.appendChild(pouce);
    mContainer.appendChild(txt);
    mContainer.appendChild(annuler);
    var container = document.getElementById("container");
    container.appendChild(mContainer);

}//renderPouce

function refreshPage() {
    window.setTimeout('history.go(0)', 3000);
    console.log("azeazeazeaze");
}

function renderNotation(){

    document.addEventListener('touchmove', handleTouchMove, false);
    $("#statustitle").text("Notation de l'auto-école");
    $("#mapdiv").hide();
    $("#back_button").hide();
    /*var rating_info = ratingInfo();*/
    var id = localStorage.getItem("userid");
    var url = "http://62.210.192.92/AE/web/index.php/RatingInfo/" + id;

    $.get(url, function() {

    var date = null;
    var lieu = null;
    var mobile = null;
    var nom_moniteur = null;
    var email = null;
    var prenom_moniteur = null;

    date = resp["date"];
    lieu = resp["lieu"];
    mobile = resp["mobile"];
    nom_moniteur = resp["nom_equipe"];
    email = resp["user_email"];
    prenom_moniteur = resp["prenom_equipe"];

    var info = document.createElement("div");
    info.setAttribute("id", "info-moniteur");

    var lesson_content = document.createElement("div");
    lesson_content.setAttribute("class", "div_lesson_content");
    var date_lesson = document.createElement("p");
    date_lesson.setAttribute("class", "date_lesson");
        if(date_lesson != null) {
            date_lesson.innerHTML = "Pour la leçon du " + date + "qui à eut lieu au" + lieu;
        }else{
            date_lesson.innerHTML = "Pour la leçon votre dernière leçon de conduite "
        }

    var nContainer = document.createElement("div");
    nContainer.setAttribute("id", "notation-container");

    var maintenant = document.createElement("span");
    maintenant.setAttribute("id", "notation-maintenant");
    maintenant.innerHTML = "Maintenant il faut noter !!";

    var etoile_container = document.createElement("span");
    etoile_container.setAttribute("id", "container_etoile");
    etoile_container.setAttribute("class", "star-rating");

    var etoile = document.createElement("input");
    etoile.setAttribute("id", "etoile-img1");
    etoile.setAttribute("type", "radio");
    etoile.setAttribute("name", "a");
    etoile.setAttribute("value", "1");
    var valeur1 = '1';
    $('#etoile-img1').val(valeur1);

    var baliseI = document.createElement("i");

    var etoile2 = document.createElement("input");
    etoile2.setAttribute("id", "etoile-img2");
    etoile2.setAttribute("type", "radio");
    etoile2.setAttribute("name", "a");
    etoile2.setAttribute("value", "2");
    var valeur2 = '2';
    $('#etoile-img2').val(valeur2);

    var baliseI2 = document.createElement("i");

    var etoile3 = document.createElement("input");
    etoile3.setAttribute("id", "etoile-img3");
    etoile3.setAttribute("type", "radio");
    etoile3.setAttribute("name", "a");
    etoile3.setAttribute("value", "3");
    var valeur3 = '3';
    $('#etoile-img3').val(valeur3);

    var baliseI3 = document.createElement("i");

    var etoile4 = document.createElement("input");
    etoile4.setAttribute("id", "etoile-img4");
    etoile4.setAttribute("type", "radio");
    etoile4.setAttribute("name", "a");
    etoile4.setAttribute("value", "4");
    var valeur4 = '4';
    $('#etoile-img4').val(valeur4);

    var baliseI4 = document.createElement("i");

    var etoile5 = document.createElement("input");
    etoile5.setAttribute("id", "etoile-img5");
    etoile5.setAttribute("type", "radio");
    etoile5.setAttribute("name", "a");
    etoile5.setAttribute("value", "5");
    var valeur5 = '5';
    $('#etoile-img5').val(valeur5);

    var baliseI5 = document.createElement("i");

    ///////////////////////////Button/////////////////////////////////////
    var text_btn = document.createElement("span");
    text_btn.setAttribute("id", "notation-btn");
    text_btn.innerHTML = "Je valide ma notation";

    var valider = document.createElement("button");
    valider.setAttribute("id", "valider-btn");

    valider.onclick = function(){
        /*loading();rating("\"" + resp["ID"] + "\", \"" +
         resp["id_moniteur"] + "\");'>").fadeIn(500);*/
    };

    //////////////////////////////appendChild//////////////////////////////
    lesson_content.appendChild(date_lesson);

    etoile.appendChild(baliseI);
    etoile2.appendChild(baliseI2);
    etoile3.appendChild(baliseI3);
    etoile4.appendChild(baliseI4);
    etoile5.appendChild(baliseI5);

    etoile_container.appendChild(etoile);
    etoile_container.appendChild(baliseI);
    etoile_container.appendChild(etoile2);
    etoile_container.appendChild(baliseI2);
    etoile_container.appendChild(etoile3);
    etoile_container.appendChild(baliseI3);
    etoile_container.appendChild(etoile4);
    etoile_container.appendChild(baliseI4);
    etoile_container.appendChild(etoile5);
    etoile_container.appendChild(baliseI5);

    valider.appendChild(text_btn);


    nContainer.appendChild(maintenant);
    nContainer.appendChild(info);
    nContainer.appendChild(etoile_container);
    nContainer.appendChild(lesson_content);

    var container = document.getElementById("container");
    container.appendChild(nContainer);
    container.appendChild(valider);

    }, "json");
}//renderNotation

function cleanContainer() {
    var container = document.getElementById("container");
    var menu = document.getElementById("statusbar");
    var rendercontent = document.getElementById("rendercontent");
    var map = document.getElementById("mapdiv");
    var statusbar = document.getElementById("slidemenu");
    container.innerHTML = "";
    rendercontent.innerHTML = "";
    container.appendChild(map);
    container.appendChild(rendercontent);
    container.appendChild(menu);
    container.appendChild(statusbar);
}

function cleanStatutBar(){
    var lactu = document.getElementById("actuBar");
    lactu.remove();
}


