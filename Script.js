function _display_ajouter_annonce(){
let _to_display=document.getElementsByClassName("_ajouter_annonce")
if (_to_display[0].style.display=="flex"){
    _to_display[0].style.display="none";
}
else{
    _to_display[0].style.display="flex";
}

}


function _display_sous_categories(_catégorie_class,_ordre){
 let _var_1=_catégorie_class;
 let _num=_ordre
 const _node=document.getElementsByClassName(_var_1)
 const _node2=_node[0].getElementsByTagName("ul");
 
 _node2[_num].style.visibility="visible";
}

function _hide_sous_categories(_catégorie_class,_ordre){
    let _var_1=_catégorie_class;
    let _num=_ordre
    const _node=document.getElementsByClassName(_var_1)
    const _node2=_node[0].getElementsByTagName("ul");
    _node2[_num].style.visibility="hidden";
   }
function _afficher_categories(){
    
    let _screen_width = screen.width;
    var _cat=document.getElementsByClassName("_categories")
        
        if (_cat[0].style.display=="block"){_cat[0].style.display="none"
        
        }
        else {_cat[0].style.display="block"
        
        };


}
function screen_resized(){
    let _screen_width = screen.width;
    var _cat=document.getElementById("_category_button");
    if (_screen_width<600){ 
        _cat.style.display="flex";

    }else{_cat.style.display="none";}
}

function print_screen_size(_element_id){
    let _screen_width = screen.width;
    var _div_size=document.getElementById(_element_id)
    _div_size.innerHTML=_screen_width;
}
// Form functions
const _client_entry_template = [
    "_nouvelle_annonce_nom",
    "_nouvelle_annonce_Tel",
    "_nouvelle_annonce_region",
    "_nouvelle_annonce_Mail",
    "_select_categories",
    "_nouvelle_annonce_titre",
    "_nouvelle_annonce_description",
    "_nouvelle_annonce_photo",
    "_nouvelle_annonce_prix", 
]

function _get_client_post(_post){
    let _client_post={}
    let _field_value=""
    for (let i of _post){
        _field_value=document.getElementById(i).value
        _client_post[i]=_field_value
    }
    _client_post["_nouvelle_annonce_date"]=_get_date()

    return _client_post
}


const publierBtn=document.getElementById('_publier_annonce')
publierBtn.onclick = () => {
    var _list_array=[]
    let getLocalStorage = localStorage.getItem("_all_posts"); //get local storage
    if (getLocalStorage==null){
        _list_array=[]
    } else {
        _list_array=JSON.parse(getLocalStorage);
    }
    
    let _new_post=_get_client_post(_client_entry_template);
    _list_array.push(_new_post); 
    localStorage.setItem("_all_posts",JSON.stringify(_list_array)); // setting local storage
}

function _publish_ads(){
    var _list_array=[]
    let getLocalStorage = localStorage.getItem("_all_posts"); //get local storage
    if (getLocalStorage==null){
        _list_array=[]
    } else {
        _list_array=JSON.parse(getLocalStorage);
    }
    let _ads_syntax=""
    for (let i=0; i< _list_array.length ; i++){
        _ads_syntax+=`<div class="_annonce"><img src="./assets/no_image_icon.png" alt=""><div><h5> ${_list_array[i]["_select_categories"]}</h5> <h4>${_list_array[i]["_nouvelle_annonce_date"]}</h4> <h2>${_list_array[i]["_nouvelle_annonce_titre"]}</h2> <p>${_list_array[i]["_nouvelle_annonce_description"]}</p></div> </div>`
    }
    document.getElementById("_main").innerHTML=_ads_syntax;
}

function _get_date(){
    const _date= new Date()
    const _post_time=`${_date.getDate()}/${_date.getMonth()}/${_date.getFullYear()} - ${_date.getHours()}:${_date.getMinutes()}`
    return _post_time
}

_publish_ads()


//liste carrousselle
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
//liste carrousselle

//Form validation
function _validate_form(_form,_mail,_number){
let _entered_mail=document.forms[_form][_mail].value;
let _entered_tel=document.forms[_form][_number].value;
let _validation=false
let _mail_valid=true
let _tel_valid=true
console.log(_entered_mail)

    if (_entered_mail=='' && _entered_tel==""){
        alert("Veuillez entrer une adresse mail et un numero de télephone valide !");
        _mail_valid=false;
        _tel_valid=false;
        
    }else if(_entered_tel==''){
    alert("Veuillez entrer un numero de télephone valide !");
    _tel_valid=false;
    }
    else if(_entered_mail=='')
    {
        alert("Veuillez entrer  une adresse mail valide !");
    }
    else if (_entered_tel.length<8 ){
   
        alert("Veuillez entrer un numéro de 8 CHIFFRE!");
        //document.forms[_form][_name].style.backgroundcolor=red;
        _tel_valid=false;
        
    }
    else if (!_entered_mail.includes('@')&& !_entered_mail.includes('.')){
   
        alert("Veuillez entrer un email valide");
        //document.forms[_form][_name].style.backgroundcolor=red;
        _tel_valid=false;
        
    }
    else{
        alert("Votre annonce est ajoutée avec succes");
    }
    _validation= (_mail_valid && _tel_valid)
    return _validation;

}
