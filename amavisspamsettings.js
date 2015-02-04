/**
 * Spam Settings plugin script
 * @version 1.0
 */

if (window.rcmail) {
  rcmail.addEventListener('init', function(evt) {
    var tab = $('<span>').attr('id', 'settingstabpluginamavisspamsettings').addClass('tablink amavisspamsettings');
    var button = $('<a>').attr('href', rcmail.env.comm_path+'&_action=plugin.amavisspamsettings').html(rcmail.gettext('amavisspamsettings', 'amavisspamsettings')).appendTo(tab);

    // add button and register commands
    rcmail.add_element(tab, 'tabs');

    rcmail.register_command('plugin.amavisspamsettings-save', function() { rcmail.amavisspamsettingsCommandSave() },true);
    rcmail.register_command('plugin.commandAddBlacklistSender',    function() { rcmail.amavisspamsettingsCommandAddBlacklistSender() },true);
    rcmail.register_command('plugin.commandRemoveBlacklistSender', function() { rcmail.amavisspamsettingsCommandRemoveBlacklistSender() },true);
    
    rcmail.register_command('plugin.commandAddWhitelistSender',    function() { rcmail.amavisspamsettingsCommandAddWhitelistSender() },true);
    rcmail.register_command('plugin.commandRemoveWhitelistSender', function() { rcmail.amavisspamsettingsCommandRemoveWhitelistSender() },true);

    if (rcmail.env.action == 'plugin.amavisspamsettings'  || rcmail.env.action == 'plugin.amavisspamsettings-save') {
    	var buttonAddBlacklistSenderRef = rcube_find_object('buttonAddBlacklistSender');
	    buttonAddBlacklistSenderRef.value = rcmail.gettext('addButton','amavisspamsettings');
	    buttonAddBlacklistSenderRef.disabled = false;
	
	var buttonRemoveBlacklistSenderRef = rcube_find_object('buttonRemoveBlacklistSender');
	    buttonRemoveBlacklistSenderRef.value = rcmail.gettext('removeButton','amavisspamsettings');
	    buttonRemoveBlacklistSenderRef.disabled = false;
    
	var buttonAddWhitelistSenderRef = rcube_find_object('buttonAddWhitelistSender');
	    buttonAddWhitelistSenderRef.value = rcmail.gettext('addButton','amavisspamsettings');
	    buttonAddWhitelistSenderRef.disabled = false;
    
	var buttonRemoveWhitelistSenderRef = rcube_find_object('buttonRemoveWhitelistSender');
	    buttonRemoveWhitelistSenderRef.value = rcmail.gettext('removeButton','amavisspamsettings');
    
	var selectCurrentBlacklistSenderRef = rcube_find_object('selectCurrentBlacklistSender');
	    selectCurrentBlacklistSenderRef.disabled = false;
	
	var selectCurrentWhitelistSenderRef = rcube_find_object('selectCurrentWhitelistSender');
	    selectCurrentWhitelistSenderRef.disabled = false;
    }
  });
 
}


rcube_webmail.prototype.amavisspamsettingsCommandAddBlacklistSender = function() {
	var inputBlacklistSenderRef = rcube_find_object('inputBlacklistSender');
    
	if (inputBlacklistSenderRef.value == '') {
	    alert(rcmail.gettext('noSender', 'amavisspamsettings'));
	    inputBlacklistSenderRef.focus();
	    return false;
	}
    
	if (inputBlacklistSenderRef.value.match('[^.a-zA-Z\-0-9\@\#\=]')) {
	    alert(rcmail.gettext('novalidemail', 'amavisspamsettings'));
    	    inputBlacklistSenderRef.focus();
    	    return false;    
	}
    
	if ( parent.rcmail.amavisspamsettingsValidateEMail(inputBlacklistSenderRef.value) != true) {
	    alert(rcmail.gettext('novalidemail', 'amavisspamsettings'));
    	    inputBlacklistSender.focus();
    	    return false;
	}
	var opt = document.createElement('option');
        opt.value = inputBlacklistSenderRef.value;
	opt.innerHTML = inputBlacklistSenderRef.value;
     
	document.forms["amavisspamsettings-form"].selectCurrentBlacklistSender.add(opt);
	inputBlacklistSenderRef.value = '';
	parent.rcmail.collectAllBlackListSenders();
}



rcube_webmail.prototype.amavisspamsettingsCommandRemoveBlacklistSender = function() {

	var inputBlacklistSenderRef = rcube_find_object('inputBlacklistSender');
	var selectCurrentBlacklistSenderRef = rcube_find_object('selectCurrentBlacklistSender');
    
	if (selectCurrentBlacklistSenderRef.selectedIndex < 0) {
	     alert(rcmail.gettext('noentryselected', 'amavisspamsettings'));
	} else {
    	     var selectedEMailAddress = selectCurrentBlacklistSenderRef.options[selectCurrentBlacklistSenderRef.selectedIndex].text;
             inputBlacklistSenderRef.value = selectedEMailAddress;
             selectCurrentBlacklistSenderRef.remove(selectCurrentBlacklistSenderRef.selectedIndex);
             parent.rcmail.collectAllBlackListSenders();
	}
}


rcube_webmail.prototype.amavisspamsettingsCommandAddWhitelistSender = function() {
	var inputWhitelistSenderRef = rcube_find_object('inputWhitelistSender');
	var selectCurrentWhitelistSenderRef = rcube_find_object('selectCurrentWhitelistSender');
    
        if (inputWhitelistSenderRef.value == '') {
	    alert(rcmail.gettext('noSender', 'amavisspamsettings'));
	    return false;
	    input_whitelistSenderInputField .focus();
        }
    
	if (inputWhitelistSenderRef.value.match('[^.a-zA-Z\-0-9\@\#\=]')) {
	    alert(rcmail.gettext('novalidemail', 'amavisspamsettings'));
    	    inputWhitelistSenderRef.focus();
    	    return false;    
	}

    
	if ( parent.rcmail.amavisspamsettingsValidateEMail(inputWhitelistSenderRef.value) != true) {
    	    alert(rcmail.gettext('novalidemail', 'amavisspamsettings'));
	    inputWhitelistSenderRef.focus();
    	    return false;
	}
    
	var opt = document.createElement('option');
	opt.value = inputWhitelistSenderRef.value;
	opt.innerHTML = inputWhitelistSenderRef.value;
	selectCurrentWhitelistSenderRef.appendChild(opt); 
     
	inputWhitelistSenderRef.value = '';
	parent.rcmail.collectAllWhiteListSenders();
}



rcube_webmail.prototype.amavisspamsettingsCommandRemoveWhitelistSender = function() {
	    var inputWhitelistSenderRef = rcube_find_object('inputWhitelistSender');
	    var selectCurrentWhitelistSenderRef = rcube_find_object('selectCurrentWhitelistSender');
    
	    if (selectCurrentWhitelistSenderRef.selectedIndex <0) {
		 alert(rcmail.gettext('noentryselected', 'amavisspamsettings'));
	    } else {
    		var selectedEMailAddress = selectCurrentWhitelistSenderRef.options[selectCurrentWhitelistSenderRef.selectedIndex].text;
    	        inputWhitelistSenderRef.value = selectedEMailAddress;
		    selectCurrentWhitelistSenderRef.remove(selectCurrentWhitelistSenderRef.selectedIndex);
    		parent.rcmail.collectAllWhiteListSenders();
	    }

}



rcube_webmail.prototype.amavisspamsettingsCommandSave = function() {
	var inputAmavisSpamTag2LevelRef = rcube_find_object('inputAmavisSpamTag2Level');
	var inputAmavisSpamKillLevelRef = rcube_find_object('inputAmavisSpamKillLevel');
	var inputAmavisSpamSubjectTag2Ref = rcube_find_object('inputAmavisSpamSubjectTag2');
	var inputAmavisSpamModifiesSubjRef = rcube_find_object('inputAmavisSpamModifiesSubj');
	
	if ( inputAmavisSpamSubjectTag2Ref.value != '' && inputAmavisSpamSubjectTag2Ref.value.match('[^().a-zA-Z\#\* +\-0-9]') ) {
	    alert(rcmail.gettext('wrongspamsubjectTag', 'amavisspamsettings'));
	    inputAmavisSpamSubjectTag2Ref.focus();
	    return;
	}
	
	parent.rcmail.collectAllBlackListSenders();
	parent.rcmail.collectAllWhiteListSenders();
	rcmail.gui_objects.amavisspamsettingsform.submit();
}








rcube_webmail.prototype.amavisspamsettingsValidateEMail = function(email) {
    var atpos=email.indexOf("@");
    var dotpos=email.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
        return false;
    }
    return true;
}


rcube_webmail.prototype.collectAllBlackListSenders = function() {
    var selectCurrentBlacklistSenderRef = rcube_find_object('selectCurrentBlacklistSender');
    var input_allBlackListSenders = rcube_find_object('_allBlackListSenders');
    
    
    input_allBlackListSenders.value = "";
    for (var i = 0; i < selectCurrentBlacklistSenderRef.options.length; i++) { 
	input_allBlackListSenders.value = input_allBlackListSenders.value + selectCurrentBlacklistSenderRef.options[i].value;
	if (i < (selectCurrentBlacklistSenderRef.options.length-1)) {
	    input_allBlackListSenders.value = input_allBlackListSenders.value + ";"
	}
    }
}



rcube_webmail.prototype.collectAllWhiteListSenders = function() {
    var selectCurrentWhitelistSenderRef = rcube_find_object('selectCurrentWhitelistSender');
    var input_allWhiteListSenders = rcube_find_object('_allWhiteListSenders');
    
    
    input_allWhiteListSenders.value = "";
    for (var i = 0; i < selectCurrentWhitelistSenderRef.options.length; i++) { 
	input_allWhiteListSenders.value = input_allWhiteListSenders.value + selectCurrentWhitelistSenderRef.options[i].value;
	if (i < (selectCurrentWhitelistSenderRef.options.length-1)) {
	    input_allWhiteListSenders.value = input_allWhiteListSenders.value + ";"
	}
    }
}


rcube_webmail.prototype.amavisspamsettingsIsNumber = function(n) {
     return !isNaN(parseFloat(n)) && isFinite(n);
}










