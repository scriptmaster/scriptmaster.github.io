/* Sheriff's 1KB JS framework */
(function(doc,w){
var d = { id: 'getElementById', q: 'querySelector',qa:'querySelectorAll', aEL:'addEventListener',rEL:'removeEventListener' };
w.on = function (el, ev, ef) { if(!el) return; if(typeof el=='string')el=all(el); if(!el.forEach)el=[el]; el.forEach(function(e){ e[d.aEL](ev, ef) }) }
w.once = function(el,ev,ef){var c=function(p){el[d.rEL](ev,c);ef(p)};on(el,ev,c)}
var readies = [];
w.ready = function (f) { if (readies) readies.push(f); else f() };
once(doc, 'readystatechange', function(){readies && readies.forEach(function(f){f()})})
w.id = function (e) { return doc[d.id](e) };
w.first = function (e) { return doc[d.q](e) };
w.all = function (e) { return doc[d.qa](e) };
w.style = function (el, s, v) { if (el) { if (!el.forEach) el = [el]; el.forEach(function (e) { e.style[s] = v; }) } }
w.create = function(e){return document.createElement(e)}
Node.prototype.extends = function(Cls) {if(!Cls) throw new Error('Required Parameter "Class" missing.'); Object.assign(this, Cls.prototype); Cls.prototype.constructor.apply(this) }
NodeList.prototype.extends = function(Cls) {this.forEach(function(n){n.extends(Cls);}) }
ready(function(){
  all('.extends').forEach(function(el){
    this.classList.forEach(function(c){
      c.substr(0,5)=='class' && typeof window[c.substr(5)] == 'function' && el.extends([c.substr(5)])
    })
  })
})
})(document,this)
//class{constructor(){}}
// I like angular.js (1.x) not 2, ionic, react, preact, markojs and hyperapp, so chill. be fun.

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
