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
  const extensions = {
    $$: this.querySelectorAll.bind(this),
    $: this.querySelector.bind(this),
    on: function(ev, ef){on(this,ev,ef.bind(this))}.bind(this),
    request: request,
    fetch: (u,o) => { return request(u, { headers: { 'X-Requested-With': 'fetch' } }) },
    xhr:   (u,o) => { return request(u, { headers: { 'X-Requested-With': 'XMLHttpRequest' } }) },
  };
  const NewCls = Object.assign(Cls)
  Object.assign(NewCls.prototype, extensions);
  const o = new NewCls(Array.prototype.slice.call(arguments,1));
  const m = Object.assign(this, o, extensions); // merged Node
  const opn=Object.getOwnPropertyNames(Cls.prototype); opn.forEach(p=>binder(p, o, m));
  function binder(k, o, m, fn) {
    if(k.length > 2 && k.substring(0,2)=='on') { on(m, k.substring(2), (fn || o[k]).bind(m)); }
  };
  if(o.members instanceof Array) o.members?.forEach(function(slctr){
    const elt = m.$$(slctr), _slctr=slctr.replace(/[\\.-\s]/g,'_'); elt.forEach(el => opn.forEach(k => {
      if(k.substring(0, _slctr.length) != _slctr) return;
      if(k == _slctr) return o[k].call(m, el);
      if(k[_slctr.length] == '_') return binder(k.substring(_slctr.length+1), o, Object.assign(el, o, extensions), o[k]);
    }));
  });
  function request(url, opts, fn) { return (fn||fetch)(url, { credentials: 'same-origin', headers: {'X-Requested-With': 'XMLHttpRequest'}, ...opts }); }
}

NodeList.prototype.extends = function(Cls) {this.forEach(function(n){n.extends(Cls);}) }

ready(extendReady);

function extendReady() {
  all('.extends').forEach(function(el) {
    el.classList.forEach(function(c){
      c.substring(0,5)=='class' && typeof w[c.substring(5)] == 'function' && el.extends(w[c.substring(5)])
    })
  });
  all('[data-bind]').forEach(function(el) {
    const dbv = el.attributes['data-bind'].value;
    if(dbv && typeof w[dbv] == 'function') el.extends(w[dbv]);
  });
}
})(document,this)

//class MyComponent{constructor(){} members = ['.btn']; _btn_onclick(){ } }
//HTML: <ul class="extends classMyComponent"><li data-bind="li"></li></ul>
