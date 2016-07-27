function renderDetailLesson(id) {
    document.removeEventListener('touchmove', handleTouchMove);
    console.log(id);
    cleanContainer();
    $("#statustitle").text("Détails de la leçon");
    $("#rendercontent").show();
    var url = "http://62.210.192.92/AE/web/index.php/detail_lesson/" + id;
    $.get(url, function (lesson) {
        var dateComplete = new moment(lesson[0].lesson_date, "YYYY-MM-DD hh:mm:ss");
        var noteMon = null;
        var noteUser = null;
        var dateJ = dateComplete.format("DD ") + numberToMonth(dateComplete.format("MM")) + dateComplete.format(" YYYY");
        var heureCreneau = dateComplete.format("hh:mm");
        var heureP = dateComplete.add(1, 'hours').format("hh:mm");
        if (lesson[0].mon_note1 != null && lesson[0].mon_note2 != null && lesson[0].mon_note3 != null) {
            noteMon = ((lesson[0].mon_note1 + lesson[0].mon_note2 + lesson[0].mon_note3) / 3).toFixed(1);
        }
        if (lesson[0].note_user_note1 != null && lesson[0].note_user_note2 != null && lesson[0].note_user_note3 != null) {
            noteUser = ((lesson[0].note_user_note1 + lesson[0].note_user_note2 + lesson[0].note_user_note3) / 3).toFixed(1);
        }

        var header = document.createElement("div");
        header.setAttribute("class", "dl-lesson-header");
        var header_title = document.createElement("p");
        header_title.setAttribute("class", "dl-lesson-title");
        header_title.innerHTML = "Cours de conduite du";
        var content = document.createElement("div");
        content.setAttribute("class", "dl-lesson-content");
        var date = document.createElement("p");
        date.setAttribute("class", "dl-lesson-date");
        date.innerHTML = dateJ;
        var heure = document.createElement("p");
        heure.setAttribute("class", "dl-lesson-heure");
        heure.innerHTML = heureCreneau + " - " + heureP;

        var moniteur = document.createElement("div");
        moniteur.setAttribute("class", "dl-mon-container");
        var header_moniteur = document.createElement("div");
        header_moniteur.setAttribute("class", "dl-mon-header");
        var moniteur_title = document.createElement("p");
        moniteur_title.setAttribute("class", "dl-mon-title dl-title");
        moniteur_title.innerHTML = "Moniteur de conduite :";
        var moniteurBody = document.createElement("div");
        moniteurBody.setAttribute("class", "dl-mon-body");
        var avatar_container = document.createElement("div");
        avatar_container.setAttribute("class", "dl-mon-av-container");
        var avatar = document.createElement("img");
        avatar.setAttribute("class", "dl-mon-avatar");
        if(lesson[0].photo_equipe != null){
            avatar.setAttribute("src", "http://62.210.192.92/Partners/wp-content/uploads/infos_partners/" + lesson[0].id_moniteur + "/photo-" + lesson[0].id_moniteur + "-" + lesson[0].photo_equipe);
        }else{
            avatar.setAttribute("src","../img/placeholder.png");
        }

        var moniteur_content = document.createElement("div");
        moniteur_content.setAttribute("class", "dl-mon-content");
        var prenom_nom = document.createElement("p");
        prenom_nom.setAttribute("class", "dl-mon-prenom-nom");
        prenom_nom.innerHTML = lesson[0].prenom_equipe + " " + lesson[0].nom_equipe.toUpperCase();
        var note_icon_mon = document.createElement("img");
        note_icon_mon.setAttribute("class", "dl-mon-note-icon");
        note_icon_mon.setAttribute("src", "../img/star-or-all_48x48.png");
        var note_mon = document.createElement("p");
        note_mon.setAttribute("class", "dl-mon-note");
        if (noteMon == null) {
            note_mon.innerHTML = "?/5";
        } else {
            note_mon.innerHTML = noteMon + "/5";
        }
        var auto_ecole = document.createElement("p");
        auto_ecole.setAttribute("class", "dl-mon-ae");
        auto_ecole.innerHTML = lesson[0].nom_auto_ecole;


        var facturation = document.createElement("div");
        facturation.setAttribute("class", "dl-fact-container");
        var header_facturation = document.createElement("div");
        header_facturation.setAttribute("class", "dl-fact-header");
        var facturation_title = document.createElement("p");
        facturation_title.setAttribute("class", "dl-fact-title dl-title");
        facturation_title.innerHTML = "Facturation :"
        var content_facturation = document.createElement("div");
        content_facturation.setAttribute("class", "dl-fact-content");
        var prix = document.createElement("p");
        prix.setAttribute("class", "dl-fact-prix");
        if (lesson[0].lesson_forfait == "0") {
            prix.innerHTML = lesson[0].lesson_prix + " €";
            var chiffresCB = document.createElement("p");
            chiffresCB.setAttribute("class", "dl-fact-chiffreCB");
            chiffresCB.innerHTML = "...X - " + lesson[0].lastfour;
            var imgCB = document.createElement("img");
            imgCB.setAttribute("class", "dl-fact-cbimg");
            switch (lesson[0].cb_type) {
                case "vis":
                    imgCB.setAttribute("src", "../img/vis.png");
                    break;
                case "amx":
                    imgCB.setAttribute("src", "../img/amx.png");
                    break;
                case "mas":
                    imgCB.setAttribute("src", "../img/mas.png");
                    break;
                case "dis":
                    imgCB.setAttribute("src", "../img/dis.png");
                    break;
                case "cb":
                    imgCB.setAttribute("src", "../img/cb.png");
                    break;
                default:
                    imgCB.setAttribute("src", "../img/cb.png");
                    break;
            }
        } else if (lesson[0].lesson_forfait == "1") {
            prix.innerHTML = "1 Crédit";
        }


        var notation = document.createElement("div");
        notation.setAttribute("class", "dl-note-container");
        var header_notation = document.createElement("div");
        header_notation.setAttribute("class", "dl-note-header");
        var notation_content = document.createElement("div");
        notation_content.setAttribute("class", "dl-note-content");
        var title_comment = document.createElement("p");
        title_comment.setAttribute("class", "dl-note-title dl-title");
        title_comment.innerHTML = "Ce que le moniteur en a pensé : ";
        var comment = document.createElement("p");
        if(lesson[0].note_user_com  != null){
            comment.setAttribute("class", "dl-note-content");
            comment.innerHTML = "&laquo;<i>" + lesson[0].note_user_com + "</i>&raquo;";
        }else {
            comment.setAttribute("class", "dl-note-content-void");
            comment.innerHTML = "Pas encore de commentaire";
        }


        var notation_footer = document.createElement("div");
        notation_footer.setAttribute("class", "dl-note-footer");
        var notation_footerLeft = document.createElement("div");
        notation_footerLeft.setAttribute("class", "dl-note-footer-left");
        var notation_footerRight = document.createElement("div");
        notation_footerRight.setAttribute("class", "dl-note-footer-right");
        var notation_note = document.createElement("p");
        notation_note.setAttribute("class", "dl-note-note");
        if (noteUser == null) {
            notation_note.innerHTML = "?/5";
        } else {
            notation_note.innerHTML = noteUser + "/5";
        }
        var notation_note_img = document.createElement("img");
        notation_note_img.setAttribute("class", "dl-note-img");
        notation_note_img.setAttribute("src", "../img/star-or-all_48x48.png");
        var notation_hrest = document.createElement("p");
        notation_hrest.setAttribute("class", "dl-note-hrest");
        if (lesson[0].note_user_est != null) {
            notation_hrest.innerHTML = lesson[0].note_user_est + " h";
        }else{
            notation_hrest.innerHTML = "?? h";
        } var notation_avEx = document.createElement("p");
        notation_avEx.setAttribute("class", "dl-note-av-ex");
        notation_avEx.innerHTML = "Avant examen";


        var renderContent = document.getElementById("rendercontent");


        header.appendChild(header_title);
        header.appendChild(date);
        header.appendChild(heure);
        moniteur.appendChild(header_moniteur);
        moniteur.appendChild(moniteur_title);
        avatar_container.appendChild(avatar);

        moniteur_content.appendChild(prenom_nom);
        moniteur_content.appendChild(note_icon_mon);
        moniteur_content.appendChild(note_mon);
        moniteur_content.appendChild(auto_ecole);
        moniteurBody.appendChild(avatar_container);
        moniteurBody.appendChild(moniteur_content);
        moniteur.appendChild(header);
        moniteur.appendChild(moniteurBody);

        content_facturation.appendChild(prix);
        if (lesson[0].lesson_forfait == "0") {
            content_facturation.appendChild(chiffresCB);
            content_facturation.appendChild(imgCB);
        }
        header_facturation.appendChild(facturation_title);
        facturation.appendChild(header_facturation);
        facturation.appendChild(content_facturation);

        header_notation.appendChild(title_comment);
        notation_content.appendChild(comment);

        notation_footerLeft.appendChild(notation_note);
        notation_footerLeft.appendChild(notation_note_img);
        notation_footerRight.appendChild(notation_hrest);
        notation_footerRight.appendChild(notation_avEx);

        notation_footer.appendChild(notation_footerLeft);
        notation_footer.appendChild(notation_footerRight);
        notation.appendChild(header_notation);
        notation.appendChild(notation_content);
        notation.appendChild(notation_footer);


        content.appendChild(moniteur);
        content.appendChild(facturation);
        content.appendChild(notation);
        renderContent.appendChild(header);
        renderContent.appendChild(content);
    }, "json");
}