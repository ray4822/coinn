$(document).ready(function() {
    //flag = window.setInterval(isonline, 500);
    $('#dialogs').on('click', '.weui-dialog__btn', function() {
        $(this).parents('.js_dialog').fadeOut(200);
        $(this).parents('.js_dialog').attr('aria-hidden', 'true');
        $(this).parents('.js_dialog').removeAttr('tabindex');
    });
    $(".btnlang").click(function() {
        if ($(".list-lang").is(":hidden"))
            $(".list-lang").show();
        else
            $(".list-lang").hide();
    })
    // 阻止弹窗内部滚动冒泡
    $('.js_dialog_wrap').on('touchmove', function(e) {
        if ($.contains(document.getElementById('js_wrap_content'), e.target)) {} else {
            e.preventDefault();
        }
    });
    $('.js_close').on('click', function() {
        closeDialog($(this));
    });
});

function closeDialog(o) {
    const $jsDialogWrap = o.parents('.js_dialog_wrap');
    $jsDialogWrap.attr('aria-hidden', 'true').attr('aria-modal', 'false').removeAttr('tabindex');
    $jsDialogWrap.fadeOut(300);
    $jsDialogWrap.find('.js_dialog').removeClass('weui-half-screen-dialog_show');
    setTimeout(function() {
        $('#' + $jsDialogWrap.attr('ref')).trigger('focus');
    }, 300);
}

function isformnull(form, reject = '') {
    if (form == null)
        form = "form";
    $("input").blur(function() {
        var num = 0;
        var t = $(form).serializeArray();
        $.each(t, function(i, item) {
            if (reject != null) {
                if (item['value'] == '' && reject.indexOf(item['name']) === -1)
                    num++;
            } else {
                if (item['value'] == '')
                    num++;
            }
        });
        if (num == 0)
            $(form + " .btnform").addClass("btnred");
        else
            $(form + " .btnform").removeClass("btnred");
        return null;
    })
}

function getformnull(form, reject = null) {
    var num = 0;
    if (form == null)
        form = "form";
    var t = $(form).serializeArray();
    $.each(t, function(i, item) {
        if (reject != null) {
            if (item['value'] == '' && reject.indexOf(item['name']) === -1)
                num++;
        } else {
            if (item['value'] == '')
                num++;
        }
    });
    return num;
}

function uploader(obj) {
    var uploaderInput = $(obj).attr("id");
    $("#" + uploaderInput).on("change", function(e) {
        var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>';
        var url = window.URL || window.webkitURL || window.mozURL,
            files = e.target.files;
        for (var i = 0, len = files.length; i < len; ++i) {
            console.log(i);
            var file = files[i];
            if (url) {
                src = url.createObjectURL(file);
            } else {
                src = e.target.result;
            }
            $("#show" + uploaderInput).html($(tmpl.replace('#url#', src)));
            if (window.FileReader) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    var index = layer.load(1, {
                        shade: [0.1, '#fff']
                    });
                    $.ajax({
                        type: 'post',
                        url: "/index/Index/upload",
                        dataType: "json",
                        data: "img=" + e.target.result,
                        success: function(data) {
                            if (data.code == 99) {
                                $("input[name='" + uploaderInput + "']").val(data.result);
                                layer.close(index);
                            }
                        }
                    });
                }
            } else {
                alert("Not supported by your browser!");
            }
        }
    })
}

function isonline() {
    $.ajax({
        type: 'post',
        url: "/index/Passport/online",
        dataType: "json",
        data: '',
        success: function(result) {
            console.log(result);
        }
    });
}

function reload() {
    window.setTimeout(function() {
        window.location.reload();
    }, 2000) //2秒
}

function gourl(url, type) {
    window.setTimeout(function() {
        if (type == 'back')
            window.history.go(url);
        else
            window.location.href = url;
    }, 2000) //2秒
}