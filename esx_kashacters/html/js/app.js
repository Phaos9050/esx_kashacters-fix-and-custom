$(".character-box").click(function () {
    $(".character-box").removeClass('active-char');
    $(this).addClass('active-char');
    $(".character-actions").css({"display":"block"});
    if ($(this).attr("data-ischar") === "true") {
        $("#delete").css({"display":"block"});
    } else {
        $("#delete").css({"display":"none"});
    }
});

$("#loc-next").click(function() {
    $("#location").val($("#location > option:selected").next().val());
})

$("#loc-prev").click(function() {
    $("#location").val($("#location > option:selected").prev().val());
})


$("#confirm").click(function () {
    $.post("http://esx_kashacters/DeleteCharacter", JSON.stringify({
        charid: $('.active-char').attr("data-charid"),
    }));
    Kashacter.CloseUI();
	closeModal();
});



function showModal() {
  let modal = document.getElementById("modal-container");
  modal.classList.toggle("show");
}

function closeModal() {
  let modal = document.getElementById("modal-container");
  modal.classList.toggle("show");
}

function newCharacter() {
  let btnPlay = document.getElementById("play");
  let locSelector = document.getElementById("location-selector");
  locSelector.classList.toggle("visible");
  btnPlay.classList.toggle("visible");
}

function playCharacter() {
  let btnPlay = document.getElementById("play");
  let btnDelete = document.getElementById("delete");
  let locSelector = document.getElementById("location-selector");
  locSelector.classList.toggle("visible");
  btnDelete.classList.toggle("visible");
  btnPlay.classList.toggle("visible");
}


$("#play").click(function () {
    $.post("http://esx_kashacters/CharacterChosen", JSON.stringify({
        charid: $('.active-char').attr("data-charid"),
        ischar: $('.active-char').attr("data-ischar"),
		loc : $('#location option:selected').val(),
    }));
    Kashacter.CloseUI();
});

(() => {
    Kashacter = {};

    Kashacter.ShowUI = function(data) {
        $('.main-container').css({"display":"block"});
        if(data.characters !== null) {
            $.each(data.characters, function (index, char) {
                if (char.charid !== 0) {
                    var charid = char.identifier.charAt(4);
                    $('[data-charid=' + charid + ']').html('<div class="row top"><div class="info name"><span class="name">'+ char.firstname +' '+ char.lastname +'</span></div></div><div class="row"><p class="info birthdate"><strong>Ngày Sinh: </strong><span>'+ char.dateofbirth +'</span></p><p class="info gender"><strong>Giới Tính: </strong><span>'+ char.sex +'</span></p></div><div class="row"><p class="info balance"><strong>Tiền: </strong><span>'+ char.money +'</span></p><p class="info bank"><strong>Bank: </strong><span>'+ char.bank +'</span></p></div><div class="row"><p class="info job"><strong>Nghề Nghiệp: </strong><span>'+ char.job +'</span></p></div><div class="row"><p class="info job2"><strong>Băng Đảng: </strong><span>'+ char.job2 +'</span></p></div></div>').attr("data-ischar", "true");
                }
            });
        }
    };

    Kashacter.CloseUI = function() {
        $('.main-container').css({"display":"none"});
        $(".character-box").removeClass('active-char');
		$('.BG').css({"display":"none"});
        $("#delete").css({"display":"none"});
		$(".character-info").html('<div class="character-info"><i class="fas fa-plus"></i><button>Karakter Oluştur</button></div></div>').attr("data-ischar", "false");
    };
    window.onload = function(e) {
        window.addEventListener('message', function(event) {
            switch(event.data.action) {
                case 'openui':
                    Kashacter.ShowUI(event.data);
                    break;
            }
        })
    }

})();