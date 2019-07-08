function uuid4() {
  var uuid = '', ii;
  for (ii = 0; ii < 32; ii += 1) {
    switch (ii) {
      case 8:
      case 20:
        uuid += '-';
        uuid += (Math.random() * 16 | 0).toString(16);
        break;
      case 12:
        uuid += '-';
        uuid += '4';
        break;
      case 16:
        uuid += '-';
        uuid += (Math.random() * 4 | 8).toString(16);
        break;
      default:
        uuid += (Math.random() * 16 | 0).toString(16);
    }
  }
  return uuid;
}
var docCookies = {
  getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};
if(docCookies.hasItem('anonymous_user_uuid') === false)
{
  docCookies.setItem('anonymous_user_uuid', uuid4(), Infinity);
}
$(document).ready(function() {


    var showCars=$('#showCars');

    showCars.on('click',function(e){

        e.preventDefault();
        var hideCars=$('#cars-card .car-card_hide');
        var hideCarsLen=hideCars.length;

        if(hideCarsLen>0){
            $.each(hideCars,function(index){
                $(this).removeClass('car-card_hide');  
            });
        } 

        $(this).magnificPopup({
          type: 'inline',
          preloader: false,
          showCloseBtn:true,
          closeBtnInside:true
        });
    });


    $('.contactus__tel').mask("+38(999) 999-9999");

    $('.popup-with-form').magnificPopup({
      type: 'inline',
      preloader: false,
      showCloseBtn:true,
      closeBtnInside:true
    });

  $('body').on('submit', 'form[name="contactus"]', function (e) {
    var form_data = new FormData(this);
    var $form = $(this);
    let $result_message = $form.find('.result-message');
    let $progress = $form.find('.ajax-progress');
    if (/^https:/.test($form.attr('action')) == false ||
        $form.attr('action') == 'https://api.zina.com.ua/send_form') {
      e.preventDefault();
    }
    else {
      return true;
    }
    let $submit = $form.find('[type="submit"]');
    $submit.prop('disabled', true);
    $progress.show();
    $.ajax({
      method: 'POST',
      processData: false,
      contentType: false,
      url: $form.attr('action'),
      data: form_data,
      headers: {'X-UUID': docCookies.getItem('anonymous_user_uuid')},
      success: function (data) {
        if(typeof data != "undefined" && data.status == true) {
          $submit.text('Отправлено');
          $result_message.show();
          if(typeof $.magnificPopup !== "undefined") {
            setTimeout(function(){
              $.magnificPopup.instance.close();
            }, 3000);
          }
        } else if (data && data.message) {
            alert(data.message);
        }
      },
      complete: function (jqXHR, textStatus) {
        $progress.hide();
        $form.find('[type="submit"]').prop('disabled', false);
      }
    });
  });
})