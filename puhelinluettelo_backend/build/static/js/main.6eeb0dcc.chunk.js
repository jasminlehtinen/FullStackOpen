(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{ 15:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){'use strict';n.r(t);var a=n(0),c=n.n(a),r=n(14),u=n.n(r),o=n(4),l=n(2),i=n(3),m=n.n(i),f='/api/persons',d=function(){return m.a.get(f).then((function(e){return e.data}))},s=function(e){return m.a.post(f,e).then((function(e){return e.data}))},h=function(e){return m.a.delete(''.concat(f,'/').concat(e)).then((function(e){return e.data}))},b=function(e,t){return m.a.put(''.concat(f,'/').concat(e),t).then((function(e){return e.data}))},v=function(e){var t=e.text;return c.a.createElement('h2',null,t)},E=function(e){var t=e.text;return c.a.createElement('h3',null,t)},p=function(e){var t=e.search,n=e.handleSearchName;return c.a.createElement('div',null,'filter: ',c.a.createElement('input',{ value:t,onChange:n }))},w=function(e){var t=e.addContact,n=e.newName,a=e.handleNewName,r=e.newNumber,u=e.handleNewNumber;return c.a.createElement('form',{ onSubmit:t },c.a.createElement('div',null,'name: ',c.a.createElement('input',{ value:n,onChange:a })),c.a.createElement('div',null,'number: ',c.a.createElement('input',{ value:r,onChange:u })),c.a.createElement('div',null,c.a.createElement('button',{ type:'submit' },'add')))},N=function(e){var t=e.searchPhonebook,n=e.removeContact;return c.a.createElement('div',null,t.map((function(e){return c.a.createElement('p',{ key:e.name },e.name,' ',e.number,' ',c.a.createElement('button',{ onClick:function(){window.confirm('Remove '.concat(e.name,'?'))&&n(e.id,e.name)} },'Delete'))})))},j=function(e){var t=e.message;return null===t?null:c.a.createElement('div',{ className:'notification' },t)},O=function(e){var t=e.message;return null===t?null:c.a.createElement('div',{ className:'error' },t)},g=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],r=t[1],u=Object(a.useState)(''),i=Object(l.a)(u,2),m=i[0],f=i[1],g=Object(a.useState)(''),C=Object(l.a)(g,2),S=C[0],k=C[1],x=Object(a.useState)(''),T=Object(l.a)(x,2),y=T[0],P=T[1],D=Object(a.useState)(null),J=Object(l.a)(D,2),L=J[0],R=J[1],A=Object(a.useState)(null),B=Object(l.a)(A,2),F=B[0],I=B[1];Object(a.useEffect)((function(){d().then((function(e){r(e)}))}),[]);var U=function(e,t,a){var c=Object(o.a)(Object(o.a)({},e),{},{ number:a });b(t,c).then((function(e){r(n.map((function(n){return n.id!==t?n:e}))),R('Updated phone number for \''.concat(m,'\'')),setTimeout((function(){R(null)}),5e3)})).catch((function(a){I('The contact information for \''.concat(e.name,'\' was already deleted from the server!')),setTimeout((function(){I(null)}),5e3),r(n.filter((function(e){return e.id!==t})))}))},q=n.filter((function(e){return e.name.toLowerCase().includes(y.toLowerCase())}));return c.a.createElement(c.a.Fragment,null,c.a.createElement(v,{ text:'Phonebook' }),c.a.createElement(j,{ message:L }),c.a.createElement(O,{ message:F }),c.a.createElement(p,{ search:y,handleSearchName:function(e){P(e.target.value)} }),c.a.createElement(E,{ text:'Add a new contact' }),c.a.createElement(w,{ addContact:function(e){e.preventDefault();var t={ name:m,number:S },a=n.find((function(e){return e.name===m}));a?window.confirm(''.concat(m,' is already added to phonebook, replace the old number with a new one?'))&&U(a,a.id,S):s(t).then((function(e){r(n.concat(e)),f(''),k(''),R('New contact \''.concat(m,'\' added')),setTimeout((function(){R(null)}),5e3)})).catch((function(e){var t=Object.values(e.response.data);I('Person validation failed: \''.concat(t,'\'')),setTimeout((function(){I(null)}),5e3)}))},newName:m,handleNewName:function(e){f(e.target.value)},newNumber:S,handleNewNumber:function(e){k(e.target.value)} }),c.a.createElement(E,{ text:'Numbers' }),c.a.createElement(N,{ searchPhonebook:q,removeContact:function(e,t){h(e).then((function(a){r(n.filter((function(t){return t.id!==e}))),R('Removed contact \''.concat(t,'\'')),setTimeout((function(){R(null)}),5e3)}))} }))};n(37);u.a.render(c.a.createElement(g,null),document.getElementById('root'))} },[[15,1,2]]])
//# sourceMappingURL=main.6eeb0dcc.chunk.js.map