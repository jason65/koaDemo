(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory)
  } else {
    factory(jQuery)
  }
}(function($) {
  var selectTextEditor = $.extend({}, $.fn.datagrid.defaults.editors, {
    stext: {
      init: function(container, options) {
        let span = $('<span></span>').appendTo(container);

        let input = $('<input type="text" class="datagrid-editable-input" style="width:200px">')

        if (options.selArr) {
          let select = $('<select class="datagrid-editable-select"><option value="">==请选择==</option></select>')
          input.appendTo(span);

          $(options.selArr).each(function(i, o) {
            $('<option value=' + o + '>' + (i + 1) + '.' + o + '</option>').appendTo(select)

            select.appendTo(span);
          })

          //添加事件
          select.change(function() {
            if (this.value) {
              input.val(input.val() + this.value + ' ')
            }
          })
        }

        return span
      },
      destroy: function(target) {
        $(target).remove();
      },
      getValue: function(target) {
        return $(target).find('input').val();
      },
      setValue: function(target, value) {
        $(target).find('input').val(value);
      },
      resize: function(target, width) {
        $(target)._outerWidth(width);
      }
    }
  });

  return selectTextEditor

}($)))
