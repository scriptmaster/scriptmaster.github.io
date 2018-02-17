/* Sheriff's 1KB JS framework */
(function(){
var doc = document, d = { id: 'getElementById', q: 'querySelector', qa: 'querySelectorAll' }, w = window;
w.on = function (el, ev, ef, c) { if (!el) return; ev = 'on' + ev; if (!(el instanceof Array)) el = [el]; el.forEach(function (e) { if (e[ev]) c = e[ev]; else c = function(){ }; e[ev] = function(e) { c.call(this,e); ef.call(this,e); } }) } // no attachEvent addEventHandler
w.ready = function (f) { if (readies) readies.push(f); else f() }; readies = []; document.onreadystatechange = function (ev) { document.onreadystatechange = null; body = document.body; readies.forEach(function(f){f()}); readies = null };
w.id = function (e) { return doc[d.id](e) };
w.first = function (e) { return doc[d.q](e) };
w.all = function (e) { return doc[d.qa](e) };
w.style = function (el, s, v) { if (el) { if (!(el instanceof Array)) el = [el]; el.forEach(function (e) { e.style[s] = v; }) } }
w.create = function(e){return document.createElement(e)}
})()
//class{constructor(){}}

ready(function () {
    on(first('header'), 'click', function (e) {
        if (e.target.nodeName.toLowerCase() == 'header') {
            location.href = '/pro';
        }
    });

    if(Math.random() < 0.5) {
        document.body.classList.add('stripe')
    }
});
