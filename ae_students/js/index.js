document.addEventListener("deviceready", OnDeviceReady, false);

/* Vérifie les settings du planning afin de mieux l'initialisé, permet à l'uilisateur
 de se connecter ou de quitter l'application plus facilement et pour finir, vérifie
 qu'il est bien connecté à internet*/
 function OnDeviceReady()
 {
 	document.addEventListener("backbutton", function(e)
 	{
 		//Regarde le chemin de l'user. En cas de <- sur l'index, il quitte l'app
 		if( $("#home").length > 0)
 		{
 			e.preventDefault();
 			navigator.app.exitApp();
 		}
 		else
 			navigator.app.backHistory();

 	}, false);

 	if (localStorage.getItem('planningauth') == null)
 		localStorage.setItem('planningauth', "ON");

	/* Vérification connexion internet, des types de connexions supplémentaires
	(2G, 3G, 4G, Wi-Fi....) peuvent être vérifiés*/
	function checkInternet() 
	{
		var netState = navigator.connection.type;
		var states = {};
		states[Connection.NONE] = 1;
		return states[netState];
	}

	if (checkInternet() === 1)
		navigator.notification.confirm("Problème de connectivité internet, veuillez activer internet.", verif, "Erreur", "Ok");
	else
	{
		//Oui, le nom du Token est ridicule.
		if (localStorage.getItem("token") == "Tolkien le token") 
			window.location.href = "includes/menu.html";
		else
			window.location.href = "includes/connexion.html";
	}

	function verif() {
		setTimeout(function(){window.location.href="";}, 1000);
	}
}

