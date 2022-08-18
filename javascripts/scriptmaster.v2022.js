/* Sheriff's < 20KB JS framework */
(function(doc,w){
const d = { id: 'getElementById', q: 'querySelector',qa:'querySelectorAll', aEL:'addEventListener',rEL:'removeEventListener' };
w.on = function (el, ev, ef) { if(!el) return; if(typeof el=='string')el=all(el); if(!el.forEach)el=[el]; el.forEach(function(e){ e[d.aEL](ev, ef) }) }
w.once = function(el,ev,ef){var c=function(p){el[d.rEL](ev,c);ef(p)};on(el,ev,c)}
var starters = [];
w.ready = function (f) { if (starters) starters.push(f); else f() };
once(doc, 'DOMContentLoaded', function(){starters.forEach(function(f){f()});starters=null;})
w.id = function (e) { return doc[d.id](e) };
w.first = function (e) { return doc[d.q](e) };
w.all = function (e) { return doc[d.qa](e) };
w.style = function (el, s, v) { if (el) { if (!el.forEach) el = [el]; el.forEach(function (e) { e.style[s] = v; }) } }
w.create = function(e){return document.createElement(e)}

Node.prototype.extends = function(Cls) {
  if(!Cls) throw new Error('Required Parameter "Class" missing.');
  const extensions = { $$: (function(s){ return this.querySelectorAll(s) }).bind(this) };
  const NewCls = Object.assign(Cls)
  Object.assign(NewCls.prototype, extensions);
  const o = new NewCls(Array.prototype.slice.call(arguments,1));
  const r = Object.assign(this, o, extensions);
  Object.getOwnPropertyNames(Cls.prototype).forEach(function(k){
    if(k.length > 2 && k.substring(0,2)=='on') on(r, k.substring(2), o[k].bind(r));
  })
}

NodeList.prototype.extends = function(Cls) {this.forEach(function(n){n.extends(Cls);}) }

ready(function(){setTimeout(extendReady,10)})

function extendReady(){
  all('.extends').forEach(function(el){
    el.classList.forEach(function(c){
      c.substring(0,5)=='class' && typeof window[c.substring(5)] == 'function' && el.extends(window[c.substring(5)])
    })
  })
}
})(document,this)

//class MyComponent{constructor(){}}
//HTML: <ul class="extends classMyComponent">...</ul>
