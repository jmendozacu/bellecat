"use strict";var waitFor=function(e,n){var t=setInterval(function(){var r=e();if(null==r)return!1;clearInterval(t),n(r)},500)},hasClass=function(e,n){return(" "+e.className+" ").indexOf(" "+n+" ")>-1},resetValidations=function(e,n){Array.from(e.querySelectorAll(n)).forEach(function(e){e.classList.remove("required-entry","validation-failed","brand-required"),e.nextElementSibling&&hasClass(e.nextElementSibling,"validation-advice")&&(e.nextElementSibling.style.display="none")})},addRequiredClassToInputs=function(e,n,t,r){resetValidations(t,r),Array.from(e).forEach(function(e){e.classList.add(n),hasClass(e,"hidden-input-brand")&&(e.classList.add("brand-required"),e.classList.remove("required-entry"))})},validationFormListener=function(e,n){var t=".required-entry-input",r=".required-entry-select";Array.from(n).forEach(function(n){n.querySelector("input[type=radio]").addEventListener("change",function(n){addRequiredClassToInputs(n.target.parentElement.querySelectorAll(t),"required-entry",e,t),addRequiredClassToInputs(n.target.parentElement.querySelectorAll(r),"validate-select",e,r)})})},initCreditCardOption=function(e,n){var t=e.querySelector("input[type=radio]"),r=".required-entry-input";t.checked=!0,addRequiredClassToInputs(t.parentElement.querySelectorAll(r),"required-entry",n,r)},initCreditCardWithoutSavedCards=function(e){e.querySelectorAll(".required-entry-input").forEach(function(e){e.classList.add("required-entry")}),e.querySelectorAll(".required-entry-select").forEach(function(e){e.classList.add("validate-select")})},initCreditCardForm=function(e,n){0!==e.length?(validationFormListener(n,e),initCreditCardOption(e[0],n)):initCreditCardWithoutSavedCards(n)},handleEbanxForm=function(e,n,t){waitFor(function(){return document.querySelector("#"+t)},function(e){var n=e.querySelectorAll(".ebanx-credit-card-option");initCreditCardForm(n,e)});var r=function(e){return document.getElementById(e)},a=null,i=r("ebanx_"+n+"_"+e+"_"+n+"_name"),d=r("ebanx_"+n+"_"+e+"_"+n+"_number"),u=r("ebanx_"+n+"_"+e+"_expiration"),l=r("ebanx_"+n+"_"+e+"_expiration_yr"),o=r("ebanx_"+n+"_"+e+"_"+n+"_cid"),s=r("ebanx_"+n+"_"+e+"_token"),c=r("ebanx_"+n+"_"+e+"_brand"),v=r("ebanx_"+n+"_"+e+"_masked_card_number"),_=r("ebanx_"+n+"_"+e+"_device_fingerprint"),f=r("ebanx_"+n+"_"+e+"_mode"),m=r("ebanx_"+n+"_"+e+"_integration_key"),y=r("ebanx_"+n+"_"+e+"_country"),b=r("ebanx-error-message"),p=void 0!==r("payment_form_ebanx_"+n+"_"+e),E="sandbox"===f.value?"test":"production",g=null;EBANX.config.setMode(E),EBANX.config.setPublishableKey(m.value),EBANX.config.setCountry(y.value);var h=function(e){var n=document.querySelector("#review-buttons-container > button");void 0!==n&&n&&(n.disabled=e)},x=function(e){if(!e.data.hasOwnProperty("status")){var n=e.error.err,t=n.message;return n.message||(EBANX.errors.InvalidValueFieldError(n.status_code),t=EBANX.errors.message||"Some error happened. Please, verify the data of your credit card and try again."),b.innerHTML=t,h(!1),setTimeout(function(){Validation.showAdvice({advices:!1},b,"ebanx-error-message")},500),!1}a=e.data,s.value=a.token,c.value=a.payment_type_code,v.value=a.masked_card_number,_.value=a.deviceId,h(!1),function(e){if(!e)return!1;var n=document.createEvent("Event");n.initEvent("click",!0,!0),e.dispatchEvent(n)}(g)},q=function(e){var n;d.value.length&&i.value.length&&u.value.length&&l.value.length&&o.value.length&&(!(n=e.relatedTarget)||"button"!==n.type&&"span"!==n.type||(g=n),a||(h(!0),EBANX.card.createToken({card_number:parseInt(d.value.replace(/ /g,"")),card_name:i.value,card_due_date:(parseInt(u.value)||0)+"/"+(parseInt(l.value)||0),card_cvv:o.value},x)))},C=function(){a=null,s.value="",c.value="",v.value="",_.value="",Validation.hideAdvice({advices:!1},b)};p&&(i.addEventListener("blur",q,!1),d.addEventListener("blur",q,!1),u.addEventListener("blur",q,!1),l.addEventListener("blur",q,!1),o.addEventListener("blur",q,!1),i.addEventListener("change",C,!1),d.addEventListener("change",C,!1),u.addEventListener("change",C,!1),l.addEventListener("change",C,!1),o.addEventListener("change",C,!1)),d.addEventListener("input",function(e){setInterval(function(){o.setAttribute("maxlength",3),(" "+e.target.className+" ").indexOf(" amex ")>-1&&o.setAttribute("maxlength",4),(" "+e.target.className+" ").indexOf(" unknown ")>-1&&(o.value="")},200)})};
//# sourceMappingURL=checkout.js.map