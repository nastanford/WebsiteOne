!function(t,e){"function"==typeof define&&define.amd?define(["jquery"],e):t.Tokenfield=e(t.jQuery)}(this,function(t){"use strict";var e=function(e,i){var n=this;this.$element=t(e),this.textDirection=this.$element.css("direction"),this.options=t.extend({},t.fn.tokenfield.defaults,{tokens:this.$element.val()},this.$element.data(),i),this._delimiters="string"==typeof this.options.delimiter?[this.options.delimiter]:this.options.delimiter,this._triggerKeys=t.map(this._delimiters,function(t){return t.charCodeAt(0)});var s,a="function"==typeof window.getMatchedCSSRules?window.getMatchedCSSRules(e):null,r=e.style.width,o=this.$element.width();a&&t.each(a,function(t,e){e.style.width&&(s=e.style.width)});var p="rtl"===t("body").css("direction")?"right":"left";this.$element.data("original-styles",{position:this.$element.css("position"),hidingPosition:this.$element.css(p)}).data("original-tabindex",this.$element.prop("tabindex")),this.$element.css("position","absolute").css(p,"-10000px").prop("tabindex",-1),this.$wrapper=t('<div class="tokenfield form-control" />'),this.$element.hasClass("input-lg")&&this.$wrapper.addClass("input-lg"),this.$element.hasClass("input-sm")&&this.$wrapper.addClass("input-sm"),"rtl"===this.textDirection&&this.$wrapper.addClass("rtl");var h=this.$element.prop("id")||(new Date).getTime()+""+Math.floor(100*(1+Math.random()));this.$input=t('<input type="text" class="token-input" autocomplete="off" />').appendTo(this.$wrapper).prop("placeholder",this.$element.prop("placeholder")).prop("id",h+"-tokenfield");var l=t('label[for="'+this.$element.prop("id")+'"]');if(l.length&&l.prop("for",this.$input.prop("id")),this.$copyHelper=t('<input type="text" />').css("position","absolute").css(p,"-10000px").prop("tabindex",-1).prependTo(this.$wrapper),r?this.$wrapper.css("width",r):s?this.$wrapper.css("width",s):this.$element.parents(".form-inline").length&&this.$wrapper.width(o),(this.$element.prop("disabled")||this.$element.parents("fieldset[disabled]").length)&&this.disable(),this.$mirror=t('<span style="position:absolute; top:-999px; left:0; white-space:pre;"/>'),this.$input.css("min-width",this.options.minWidth+"px"),t.each(["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent"],function(t,e){n.$mirror[0].style[e]=n.$input.css(e)}),this.$mirror.appendTo("body"),this.$wrapper.insertBefore(this.$element),this.$element.prependTo(this.$wrapper),this.update(),this.setTokens(this.options.tokens,!1,!1),this.listen(),!t.isEmptyObject(this.options.autocomplete)){var u="rtl"===this.textDirection?"right":"left",d=t.extend({},this.options.autocomplete,{minLength:this.options.showAutocompleteOnFocus?0:null,position:{my:u+" top",at:u+" bottom",of:this.$wrapper}});this.$input.autocomplete(d)}if(!t.isEmptyObject(this.options.typeahead)){var c=t.extend({},this.options.typeahead,{});this.$input.typeahead(c),this.typeahead=!0}};e.prototype={constructor:e,createToken:function(e,i){"string"==typeof e&&(e={value:e,label:e}),"undefined"==typeof i&&(i=!0);var n=this,s=t.trim(e.value),a=e.label.length?t.trim(e.label):s;if(!(!s.length||!a.length||s.length<this.options.minLength||this.options.limit&&this.getTokens().length>=this.options.limit)){var r=t.Event("beforeCreateToken");if(r.token={value:s,label:a},this.$element.trigger(r),r.token){if(s=r.token.value,a=r.token.label,!this.options.allowDuplicates&&t.grep(this.getTokens(),function(t){return t.value===s}).length){var o=t.Event("preventDuplicateToken");o.token={value:s,label:a},this.$element.trigger(o);var p=this.$wrapper.find('.token[data-value="'+s+'"]').addClass("duplicate");return setTimeout(function(){p.removeClass("duplicate")},250),!1}var h=t('<div class="token" />').attr("data-value",s).append('<span class="token-label" />').append('<a href="#" class="close" tabindex="-1">&times;</a>');this.$input.hasClass("tt-query")?this.$input.parent().before(h):this.$input.before(h),this.$input.css("width",this.options.minWidth+"px");var l=h.find(".token-label"),u=h.find(".close");this.maxTokenWidth||(this.maxTokenWidth=this.$wrapper.width()-u.outerWidth()-parseInt(u.css("margin-left"),10)-parseInt(u.css("margin-right"),10)-parseInt(h.css("border-left-width"),10)-parseInt(h.css("border-right-width"),10)-parseInt(h.css("padding-left"),10)-parseInt(h.css("padding-right"),10),parseInt(l.css("border-left-width"),10)-parseInt(l.css("border-right-width"),10)-parseInt(l.css("padding-left"),10)-parseInt(l.css("padding-right"),10),parseInt(l.css("margin-left"),10)-parseInt(l.css("margin-right"),10)),l.text(a).css("max-width",this.maxTokenWidth),h.on("mousedown",function(){return n.disabled?!1:(n.preventDeactivation=!0,void 0)}).on("click",function(t){return n.disabled?!1:(n.preventDeactivation=!1,t.ctrlKey||t.metaKey?(t.preventDefault(),n.toggle(h)):(n.activate(h,t.shiftKey,t.shiftKey),void 0))}).on("dblclick",function(){return n.disabled||!n.options.allowEditing?!1:(n.edit(h),void 0)}),u.on("click",t.proxy(this.remove,this));var d=t.Event("afterCreateToken");d.token=r.token,d.relatedTarget=h.get(0),this.$element.trigger(d);var c=t.Event("change");return c.initiator="tokenfield",i&&this.$element.val(this.getTokensList()).trigger(c),this.update(),this.$input.get(0)}}},setTokens:function(e,i,n){if(e){i||this.$wrapper.find(".token").remove(),"undefined"==typeof n&&(n=!0),"string"==typeof e&&(e=this._delimiters.length?e.split(new RegExp("["+this._delimiters.join("")+"]")):[e]);var s=this;return t.each(e,function(t,e){s.createToken(e,n)}),this.$element.get(0)}},getTokenData:function(e){var i=e.map(function(){var e=t(this);return{value:e.attr("data-value"),label:e.find(".token-label").text()}}).get();return 1==i.length&&(i=i[0]),i},getTokens:function(e){var i=this,n=[],s=e?".active":"";return this.$wrapper.find(".token"+s).each(function(){n.push(i.getTokenData(t(this)))}),n},getTokensList:function(e,i,n){e=e||this._delimiters[0],i="undefined"!=typeof i&&null!==i?i:this.options.beautify;var s=e+(i&&" "!==e?" ":"");return t.map(this.getTokens(n),function(t){return t.value}).join(s)},getInput:function(){return this.$input.val()},listen:function(){var e=this;this.$element.on("change",t.proxy(this.change,this)),this.$wrapper.on("mousedown",t.proxy(this.focusInput,this)),this.$input.on("focus",t.proxy(this.focus,this)).on("blur",t.proxy(this.blur,this)).on("paste",t.proxy(this.paste,this)).on("keydown",t.proxy(this.keydown,this)).on("keypress",t.proxy(this.keypress,this)).on("keyup",t.proxy(this.keyup,this)),this.$copyHelper.on("focus",t.proxy(this.focus,this)).on("blur",t.proxy(this.blur,this)).on("keydown",t.proxy(this.keydown,this)).on("keyup",t.proxy(this.keyup,this)),this.$input.on("keypress",t.proxy(this.update,this)).on("keyup",t.proxy(this.update,this)),this.$input.on("autocompletecreate",function(){var i=t(this).data("ui-autocomplete").menu.element,n=e.$wrapper.outerWidth()-parseInt(i.css("border-left-width"),10)-parseInt(i.css("border-right-width"),10);i.css("min-width",n+"px")}).on("autocompleteselect",function(t,i){return e.createToken(i.item)&&(e.$input.val(""),e.$input.data("edit")&&e.unedit(!0)),!1}).on("typeahead:selected",function(i,n,s){var a="value";t.each(e.$input.data("ttView").datasets,function(t,e){e.name===s&&(a=e.valueKey)}),e.createToken(n[a])&&(e.$input.typeahead("setQuery",""),e.$input.data("edit")&&e.unedit(!0))}).on("typeahead:autocompleted",function(){e.createToken(e.$input.val()),e.$input.typeahead("setQuery",""),e.$input.data("edit")&&e.unedit(!0)}),t(window).on("resize",t.proxy(this.update,this))},keydown:function(e){function i(t){if(s.$input.is(document.activeElement)){if(s.$input.val().length>0)return;t+="All";var i=s.$input.hasClass("tt-query")?s.$input.parent()[t](".token:first"):s.$input[t](".token:first");if(!i.length)return;s.preventInputFocus=!0,s.preventDeactivation=!0,s.activate(i),e.preventDefault()}else s[t](e.shiftKey),e.preventDefault()}function n(i){if(e.shiftKey){if(s.$input.is(document.activeElement)){if(s.$input.val().length>0)return;var n=s.$input.hasClass("tt-query")?s.$input.parent()[i+"All"](".token:first"):s.$input[i+"All"](".token:first");if(!n.length)return;s.activate(n)}var a="prev"===i?"next":"prev",r="prev"===i?"first":"last";s.firstActiveToken[a+"All"](".token").each(function(){s.deactivate(t(this))}),s.activate(s.$wrapper.find(".token:"+r),!0,!0),e.preventDefault()}}if(this.focused){var s=this;switch(e.keyCode){case 8:if(!this.$input.is(document.activeElement))break;this.lastInputValue=this.$input.val();break;case 37:i("rtl"===this.textDirection?"next":"prev");break;case 38:n("prev");break;case 39:i("rtl"===this.textDirection?"prev":"next");break;case 40:n("next");break;case 65:if(this.$input.val().length>0||!e.ctrlKey&&!e.metaKey)break;this.activateAll(),e.preventDefault();break;case 9:case 13:if(this.$input.data("ui-autocomplete")&&this.$input.data("ui-autocomplete").menu.element.find("li:has(a.ui-state-focus)").length)break;if(this.$input.hasClass("tt-query")&&this.$wrapper.find(".tt-is-under-cursor").length)break;if(this.$input.hasClass("tt-query")&&this.$wrapper.find(".tt-hint").val().length)break;if(this.$input.is(document.activeElement)&&this.$input.val().length||this.$input.data("edit"))return this.createTokensFromInput(e,this.$input.data("edit"));if(13===e.keyCode){if(!this.$copyHelper.is(document.activeElement)||1!==this.$wrapper.find(".token.active").length)break;if(!s.options.allowEditing)break;this.edit(this.$wrapper.find(".token.active"))}}this.lastKeyDown=e.keyCode}},keypress:function(e){return this.lastKeyPressCode=e.keyCode,this.lastKeyPressCharCode=e.charCode,-1!==t.inArray(e.charCode,this._triggerKeys)&&this.$input.is(document.activeElement)?(this.$input.val()&&this.createTokensFromInput(e),!1):void 0},keyup:function(t){if(this.preventInputFocus=!1,this.focused){switch(t.keyCode){case 8:if(this.$input.is(document.activeElement)){if(this.$input.val().length||this.lastInputValue.length&&8===this.lastKeyDown)break;this.preventDeactivation=!0;var e=this.$input.hasClass("tt-query")?this.$input.parent().prevAll(".token:first"):this.$input.prevAll(".token:first");if(!e.length)break;this.activate(e)}else this.remove(t);break;case 46:this.remove(t,"next")}this.lastKeyUp=t.keyCode}},focus:function(){this.focused=!0,this.$wrapper.addClass("focus"),this.$input.is(document.activeElement)&&(this.$wrapper.find(".active").removeClass("active"),this.firstActiveToken=null,this.options.showAutocompleteOnFocus&&this.search())},blur:function(t){this.focused=!1,this.$wrapper.removeClass("focus"),this.preventDeactivation||this.$element.is(document.activeElement)||(this.$wrapper.find(".active").removeClass("active"),this.firstActiveToken=null),!this.preventCreateTokens&&(this.$input.data("edit")&&!this.$input.is(document.activeElement)||this.options.createTokensOnBlur)&&this.createTokensFromInput(t),this.preventDeactivation=!1,this.preventCreateTokens=!1},paste:function(t){var e=this;setTimeout(function(){e.createTokensFromInput(t)},1)},change:function(t){"tokenfield"!==t.initiator&&this.setTokens(this.$element.val())},createTokensFromInput:function(t,e){if(!(this.$input.val().length<this.options.minLength)){var i=this.getTokensList();return this.setTokens(this.$input.val(),!0),i==this.getTokensList()&&this.$input.val().length?!1:(this.$input.hasClass("tt-query")?this.$input.typeahead("setQuery",""):this.$input.val(""),this.$input.data("edit")&&this.unedit(e),!1)}},next:function(t){if(t){var e=this.$wrapper.find(".active:first"),i=e&&this.firstActiveToken?e.index()<this.firstActiveToken.index():!1;if(i)return this.deactivate(e)}var n=this.$wrapper.find(".active:last"),s=n.nextAll(".token:first");return s.length?(this.activate(s,t),void 0):(this.$input.focus(),void 0)},prev:function(t){if(t){var e=this.$wrapper.find(".active:last"),i=e&&this.firstActiveToken?e.index()>this.firstActiveToken.index():!1;if(i)return this.deactivate(e)}var n=this.$wrapper.find(".active:first"),s=n.prevAll(".token:first");return s.length||(s=this.$wrapper.find(".token:first")),s.length||t?(this.activate(s,t),void 0):(this.$input.focus(),void 0)},activate:function(e,i,n,s){if(e&&this.$wrapper.find(".token.active").length!==this.$wrapper.find(".token").length){if("undefined"==typeof s)var s=!0;if(n)var i=!0;if(this.$copyHelper.focus(),i||(this.$wrapper.find(".active").removeClass("active"),s?this.firstActiveToken=e:delete this.firstActiveToken),n&&this.firstActiveToken){var a=this.firstActiveToken.index()-2,r=e.index()-2,o=this;this.$wrapper.find(".token").slice(Math.min(a,r)+1,Math.max(a,r)).each(function(){o.activate(t(this),!0)})}e.addClass("active"),this.$copyHelper.val(this.getTokensList(null,null,!0)).select()}},activateAll:function(){var e=this;this.$wrapper.find(".token").each(function(i){e.activate(t(this),0!==i,!1,!1)})},deactivate:function(t){t&&(t.removeClass("active"),this.$copyHelper.val(this.getTokensList(null,null,!0)).select())},toggle:function(t){t&&(t.toggleClass("active"),this.$copyHelper.val(this.getTokensList(null,null,!0)).select())},edit:function(e){if(e){var i=e.data("value"),n=e.find(".token-label").text(),s=t.Event("beforeEditToken");if(s.token={value:i,label:n},s.relatedTarget=e.get(0),this.$element.trigger(s),s.token){i=s.token.value,n=s.token.label,e.find(".token-label").text(i);var a=e.outerWidth(),r=this.$input.hasClass("tt-query")?this.$input.parent():this.$input;e.replaceWith(r),this.preventCreateTokens=!0,this.$input.val(i).select().data("edit",!0).width(a)}}},unedit:function(t){var e=this.$input.hasClass("tt-query")?this.$input.parent():this.$input;if(e.appendTo(this.$wrapper),this.$input.data("edit",!1),this.update(),t){var i=this;setTimeout(function(){i.$input.focus()},1)}},remove:function(e,i){if(!this.$input.is(document.activeElement)&&!this.disabled){var n="click"===e.type?t(e.target).closest(".token"):this.$wrapper.find(".token.active");if("click"!==e.type){if(!i)var i="prev";if(this[i](),"prev"===i)var s=0===n.first().prevAll(".token:first").length}var a=t.Event("removeToken");a.token=this.getTokenData(n);var r=t.Event("change");r.initiator="tokenfield",n.remove(),this.$element.val(this.getTokensList()).trigger(a).trigger(r),(!this.$wrapper.find(".token").length||"click"===e.type||s)&&this.$input.focus(),this.$input.css("width",this.options.minWidth+"px"),this.update(),e.preventDefault(),e.stopPropagation()}},update:function(){var t=this.$input.val(),e=parseInt(this.$input.css("padding-left"),10),i=parseInt(this.$input.css("padding-right"),10),n=e+i;if(this.$input.data("edit")){if(t||(t=this.$input.prop("placeholder")),t===this.$mirror.text())return;this.$mirror.text(t);var s=this.$mirror.width()+10;if(s>this.$wrapper.width())return this.$input.width(this.$wrapper.width());this.$input.width(s)}else{if(this.$input.css("width",this.options.minWidth+"px"),"rtl"===this.textDirection)return this.$input.width(this.$input.offset().left+this.$input.outerWidth()-this.$wrapper.offset().left-parseInt(this.$wrapper.css("padding-left"),10)-n-1);this.$input.width(this.$wrapper.offset().left+this.$wrapper.width()+parseInt(this.$wrapper.css("padding-left"),10)-this.$input.offset().left-n)}},focusInput:function(e){if(!t(e.target).closest(".token").length&&!t(e.target).closest(".token-input").length){var i=this;setTimeout(function(){i.$input.focus()},0)}},search:function(){this.$input.data("ui-autocomplete")&&this.$input.autocomplete("search")},disable:function(){this.disabled=!0,this.$input.prop("disabled",!0),this.$element.prop("disabled",!0),this.$wrapper.addClass("disabled")},enable:function(){this.disabled=!1,this.$input.prop("disabled",!1),this.$element.prop("disabled",!1),this.$wrapper.removeClass("disabled")},destroy:function(){this.$element.val(this.getTokensList()),this.$element.css(this.$element.data("original-styles")),this.$element.prop("tabindex",this.$element.data("original-tabindex"));var e=t('label[for="'+this.$input.prop("id")+'"]');e.length&&e.prop("for",this.$element.prop("id")),this.$element.insertBefore(this.$wrapper),this.$element.removeData("original-styles"),this.$element.removeData("original-tabindex"),this.$element.removeData("bs.tokenfield"),this.$wrapper.remove();var i=this.$element;return delete this,i}};var i=t.fn.tokenfield;return t.fn.tokenfield=function(i){var n,s=[];Array.prototype.push.apply(s,arguments);var a=this.each(function(){var a=t(this),r=a.data("bs.tokenfield"),o="object"==typeof i&&i;"string"==typeof i&&r&&r[i]?(s.shift(),n=r[i].apply(r,s)):r||a.data("bs.tokenfield",r=new e(this,o))});return"undefined"!=typeof n?n:a},t.fn.tokenfield.defaults={minWidth:60,minLength:0,allowDuplicates:!1,allowEditing:!0,limit:0,autocomplete:{},typeahead:{},showAutocompleteOnFocus:!1,createTokensOnBlur:!1,delimiter:",",beautify:!0},t.fn.tokenfield.Constructor=e,t.fn.tokenfield.noConflict=function(){return t.fn.tokenfield=i,this},e});