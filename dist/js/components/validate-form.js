function validate() {
    var inputName = $('input#sendname'),
        inputMail = $('input#sendmail'),
        id1 = inputName.attr('id'),
        id2 = inputMail.attr('id');

    switchInput(id1);
    switchInput(id2);

    function switchInput(id) {
        switch (id) {
            case 'sendname':
                var valName = inputName.val(),
                    rv_name = /^[a-zA-Zа-яА-Я]+$/;
                if (valName.length > 2 && valName.trim() !== '' && rv_name.test(valName)) {
                    inputName.removeClass('sform_error');
                } else {
                    inputName.addClass('sform_error');
                }
                break;
            case 'sendmail':
                var valMail = inputMail.val(),
                    rv_mail = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                if (valMail.trim() !== '' && rv_mail.test(valMail)) {
                    console.log('Here 1');
                    inputMail.removeClass('sform_error');
                } else {
                    console.log('Here 2');
                    inputMail.addClass('sform_error');
                }
                break;
        }
    }
}