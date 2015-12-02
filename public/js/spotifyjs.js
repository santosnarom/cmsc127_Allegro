var songno = 8;
$(document).ready(function(){
	    $('ul.tabs').tabs('select_tab', 'tab_id');
	    $('select').material_select();
	    $(".button-collapse").sideNav();
   	    $('.collapsible').collapsible();
   	    $("#artisttab").hide(); 
});
function switchtab(source){
		if(source == song && $("#songtab").is(":visible") == false){
			$("#songtab").show();
			$("#artisttab").hide();
		}else if(source == artist && $("#artisttab").is(":visible") == false){
			$("#artisttab").show();
			$("#songtab").hide(); 
		}
}

function loadFile(input) {
      var file = input.files[0],
        url = file.urn || file.name;
        
      ID3.loadTags(url, function() {
        showTags(url);
      }, {
        tags: ["title","artist","album","picture"],
        dataReader: ID3.FileAPIReader(file)
      });
}
    
function showTags(url) {
      var tags = ID3.getAllTags(url);
      console.log(tags);
      document.getElementById('title').textContent = tags.title || "";
      document.getElementById('artistname').textContent = tags.artist || "";
      var image = tags.picture;
      if (image) {
        var base64String = "";
        for (var i = 0; i < image.data.length; i++) {
            base64String += String.fromCharCode(image.data[i]);
        }
        var base64 = "data:" + image.format + ";base64," +
                window.btoa(base64String);
        document.getElementById('picture').setAttribute('src',base64);
      } else {
        document.getElementById('picture').style.display = "none";
      }
    
}

function playMusic(source){ 
    var songplaying = document.getElementById('songplaying');
    /*var songcard = document.createElement('div');
    var amusic = document.createElement('a');
    var cardimage = document.createElement('div');
    var cardpic = document.createElement('img');
    var cardcontent = document.createElement('div');
    var songtitle = document.createElement('p');
    var songartist = document.createElement('small');*/
    songplaying.src = source.getAttribute('data-value');
    songplaying.load(); 
    songplaying.play(); 
    document.getElementById('title').textContent = document.getElementById('title'+source.getAttribute('id')).textContent;
    document.getElementById('artistname').textContent = document.getElementById('artist'+source.getAttribute('id')).textContent;
    document.getElementById('picture').setAttribute('src',document.getElementById('pic'+source.getAttribute('id')).src);
    
    /*songcard.setAttribute("class","col s3 songcard");

    amusic.setAttribute("class","waves-effect waves-light white-text");
    amusic.setAttribute("id",(songno + 1));
    amusic.setAttribute("data-value",source);
    amusic.setAttribute("onClick","playMusic(this)");
    var cardhover = document.createElement('div');
    cardhover.setAttribute("class","card red hoverable");

    cardimage.setAttribute("class","card-image");
    var cardpic = document.createElement('img');
    cardpic.setAttribute("id","pic" + (songno + 1));
    cardpic.innerHTML = "mozart.jpg";
    cardimage.innerHTML = cardpic;

    cardcontent.setAttribute("class","card-content truncate");
    songtitle.setAttribute("id","title" + (songno + 1));
    songtitle.innerHTML = "asdasdsa";
    songartist.setAttribute("id","artist" + (songno + 1));
    songartist.innerHTML = "asdasdsa";

    cardcontent.appendChild(songtitle);
    cardcontent.appendChild(songartist);

    cardhover.appendChild(cardimage);
    cardhover.appendChild(cardcontent);

    amusic.appendChild(cardhover);

    songcard.appendChild(amusic);
    document.body.appendChild(songcard);*/

}
