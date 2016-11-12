var assigned = false,
    physical = false,
    emotional = false,
    expression = false,
    identity = false;

var cssPrefix = (Array.prototype.slice
    .call(window.getComputedStyle(document.documentElement, ''))
    .join('')
    .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
)[1];

function share() {
    var store = serialize();
    document.location.hash = store;

    setTimeout(function() {
        $('#share-modal input').val(document.location.href).focus();
        $('#share-modal input').val(document.location.href).select();
    }, 100);
}

function changeIdentity() {
    identity = true;

    $('.unicorn img.thought').addClass('show');
}

function changeExpression() {
    expression = true;

    var deg = 360 * $('section.expression input#expression-feminine').val() / 100
            - 360 * $('section.expression input#expression-masculine').val() / 100
            + 360 * $('section.expression input#expression-other').val() / 100;
    deg = Math.floor(deg);
    deg %= 360;

    $('.unicorn img.expression').addClass('show');
    $('.unicorn img.plain')[0].setAttribute('style', 'filter: hue-rotate(' + deg + 'deg)');
    $('.unicorn img.assigned')[0].setAttribute('style', 'filter: hue-rotate(' + deg + 'deg)');
    if (cssPrefix == 'webkit') {
        $('.unicorn img.plain')[0].setAttribute('style', '-' + cssPrefix + '-filter: hue-rotate(' + deg + 'deg)');
        $('.unicorn img.assigned')[0].setAttribute('style', '-' + cssPrefix + '-filter: hue-rotate(' + deg + 'deg)');
    }
}

function changeAssigned() {
    assigned = true;
    $('.unicorn img.assigned').addClass('show');
}

function changePhysical() {
    physical = true;
    $('.unicorn img.physical').addClass('show');
}

function changeEmotional() {
    emotional = true;
    $('.unicorn img.emotional').addClass('show');
}

$('section.identity input').change(changeIdentity);
$('section.expression input').change(changeExpression);
$('section.assigned input').change(changeAssigned);
$('section.physical input').change(changePhysical);
$('section.emotional input').change(changeEmotional);

$(document).scroll(function() {
    $('.unicorn').css({
        marginTop: $(document).scrollTop()
    });
});

$('button').click(share);

function serialize() {
    var data = [];

    $('input[type=range]').each(function() {
        data.push(this.value);
    });
    $('input[type=radio]').each(function() {
        data.push(this.checked - 0);
    });

    return data.join(',');
}

function unserialize(store) {
    var data = store.split(',');

    $('input[type=range]').each(function() {
        this.value = data.shift();
    });
    $('input[type=radio]').each(function() {
        this.checked = data.shift() == '1'? true: false;
    });
}

if (document.location.hash.length > 1) {
    unserialize(document.location.hash.replace(/#/, ''));
    setTimeout(function() {
        changeIdentity();
        changeAssigned();
        changePhysical();
        changeEmotional();
        changeExpression();
    }, 50);
}

$('#btn-download').click(function() {
	var canvas = $("#dl-canvas")[0];
	var context = canvas.getContext("2d");
    var img = $("#unicorn-jpg")[0]; //draw background
 		context.drawImage(img,0,0);
 
         var birth = $("#assigned-female")[0].checked ? 910 : -100;
         birth = $("#assigned-male")[0].checked ? 1207 : birth;
         birth = $("#assigned-other")[0].checked ? 1502 : birth;
         img = $("#util-png")[0];
	     context.drawImage(img,0,0,42,51,birth,937,42,51);

 	     context.drawImage(img,42,0,29,51,880+5.6*$("#identity-female").val(),371,29,51);
         context.drawImage(img,42,0,29,51,880+5.6*$("#identity-male").val(),419,29,51);
         context.drawImage(img,42,0,29,51,880+5.6*$("#identity-other").val(),465,29,51);

         context.drawImage(img,71,0,29,51,880+5.6*$("#expression-feminine").val(),622,29,51);
         context.drawImage(img,71,0,29,51,880+5.6*$("#expression-masculine").val(),669,29,51);
         context.drawImage(img,71,0,29,51,880+5.6*$("#expression-other").val(),716,29,51);

         context.drawImage(img,100,0,29,51,880+5.6*$("#physical-women").val(),1109,29,51);
         context.drawImage(img,100,0,29,51,880+5.6*$("#physical-men").val(),1156,29,51);
         context.drawImage(img,100,0,29,51,880+5.6*$("#physical-other").val(),1203,29,51);

         context.drawImage(img,129,0,29,51,880+5.6*$("#emotional-women").val(),1364,29,51);
         context.drawImage(img,129,0,29,51,880+5.6*$("#emotional-men").val(),1410,29,51);
         context.drawImage(img,129,0,29,51,880+5.6*$("#emotional-other").val(),1457,29,51);

        var dataURL = canvas.toDataURL('image/png');
	  	window.open(dataURL);
});
