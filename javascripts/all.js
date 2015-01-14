/* Sheriff's 2KB JS framework */
doc = document, d = { id: 'getElementById', q: 'querySelector', qa: 'querySelectorAll' };
on = function (el, ev, ef, c) { if (!el) return; ev = 'on' + ev; if (!(el instanceof Array)) el = [el]; el.forEach(function (e) { if (e[ev]) c = e[ev]; else c = function(){ }; e[ev] = function(e) { c.call(this,e); ef.call(this,e); } }) } // no attachEvent addEventHandler BS
ready = function (f) { if (readies) readies.push(f); else f() }; readies = []; document.onreadystatechange = function (ev) { document.onreadystatechange = null; body = document.body; readies.forEach(function (f) { f() }); readies = null };
id = function (e) { return doc[d.id](e) };
first = function (e) { return doc[d.q](e) };
all = function (e) { return doc[d.qa](e) };
style = function (el, s, v) { if (el) { if (!(el instanceof Array)) el = [el]; el.forEach(function (e) { e.style[s] = v; }) } }
create = function(e){return document.createElement(e)}
/* Sheriff's 2KB JS framework */

ready(function () {
    on(first('header'), 'click', function (e) {
        if (e.target.nodeName.toLowerCase() == 'header') {
            location.href = '/pro';
        }
    });
});
