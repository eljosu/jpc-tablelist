(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const w="/assets/javascript-8dac5379.svg",N="/vite.svg",P=`\r
<div class="modal-dialog">\r
    <form novalidate>\r
        <span>User</span>\r
        <input type="text" name="firstName" placeholder="First Name" />\r
        <input type="text" name="lastName" placeholder="Last Name" />\r
        <input type="number" name="balance" placeholder="Balance" />\r
\r
        <div>\r
            <input type="checkbox" id="is-active" name="isActive" checked/>\r
            <label for="is-active">is active?</label>\r
        </div>\r
\r
        <button type="submit">\r
            Save\r
        </button>\r
\r
    </form>\r
\r
</div>`;class v{constructor({id:t,isActive:a,balance:n,avatar:s,firstName:r,lastName:c,gender:m}){this.id=t,this.isActive=a,this.balance=n,this.avatar=s,this.firstName=r,this.lastName=c,this.gender=m}}const p=e=>{const{avatar:t,balance:a,first_name:n,gender:s,id:r,isActive:c,last_name:m}=e;return new v({avatar:t,balance:a,firstName:n,gender:s,id:r,isActive:c,lastName:m})},T=async e=>{const t=`https://endurable-climbing-becklespinax.glitch.me/users/${e}`,n=await(await fetch(t)).json(),s=p(n);return console.log(s),s};let i,d,f={};const y=async e=>{if(i==null||i.classList.remove("hide-modal"),f={},!e)return;const t=await T(e);$(t)},b=()=>{i==null||i.classList.add("hide-modal"),d==null||d.reset()},$=e=>{d.querySelector('[name="firstName"]').value=e.firstName,d.querySelector('[name="lastName"]').value=e.lastName,d.querySelector('[name="balance"]').value=e.balance,d.querySelector('[name="isActive"]').checked=e.isActive,f=e},S=(e,t)=>{i||(i=document.createElement("div"),i.innerHTML=P,i.className="modal-container hide-modal",d=i.querySelector("form"),i.addEventListener("click",a=>{a.target.className==="modal-container"&&b()}),d.addEventListener("submit",async a=>{a.preventDefault();const n=new FormData(d);n.get("isActive")||n.append("isActive","off");const s={...f};for(const[r,c]of n){if(r==="balance"){s[r]=+c;continue}if(r==="isActive"){s[r]=c==="on";continue}s[r]=c}console.log(s),await t(s),b()}),e.append(i))};const x=e=>{const t=document.createElement("button");t.innerText="+",t.classList.add("fab-button"),e.append(t),t.addEventListener("click",()=>{y()})},h=async(e=1)=>{const t=`https://endurable-climbing-becklespinax.glitch.me/users?_page=${e}`;return(await(await fetch(t)).json()).map(p)},o={currentPage:0,users:[]},A=async()=>{const e=await h(o.currentPage+1);e.length!==0&&(o.currentPage+=1,o.users=e)},L=async()=>{if(o.currentPage===1)return;const e=await h(o.currentPage-1);o.users=e,o.currentPage-=1},E=e=>{let t=!1;o.users=o.users.map(a=>a.id===e.id?(t=!0,e):a),o.users.length<10&&!t&&o.users.push(e)},U=async()=>{const e=await h(o.currentPage);if(e.length===0){await L();return}o.users=e},l={loadNextPage:A,loadPreviousPage:L,onUserChanged:E,reloadPage:U,getUsers:()=>[...o.users],getCurrentPage:()=>o.currentPage},M=async e=>{const t=`https://endurable-climbing-becklespinax.glitch.me/users/${e}`,n=await(await fetch(t,{method:"DELETE"})).json();return console.log({deleteResult:n}),!0};let u;const k=()=>{const e=document.createElement("table"),t=document.createElement("thead");t.innerHTML=`
    <tr>
        <th>#ID</th>
        <th>Balance</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Active</th>
        <th>Actions</th>
    </tr>
    `;const a=document.createElement("tbody");return e.append(t,a),e},B=e=>{const t=e.target.closest(".select-user");if(!t)return;const a=t.getAttribute("data-id");y(a)},q=async e=>{const t=e.target.closest(".delete-user");if(console.log(t),!t)return;const a=t.getAttribute("data-id");if(confirm(`Are you sure you want to delete records of #ID ${a}: ?`))try{await M(a),await l.reloadPage(),document.querySelector("#current-page").innerText=l.getCurrentPage(),g()}catch(n){console.log(n),alert("No se pudo eliminar")}},g=e=>{const t=l.getUsers();u||(u=k(),e.append(u),u.addEventListener("click",B),u.addEventListener("click",q));let a="";t.forEach(n=>{a+=`
        <tr>
            <td>${n.id}</td>
            <td>${n.balance}</td>
            <td class="first-name">${n.firstName}</td>
            <td class="last-name">${n.lastName}</td>
            <td>${n.isActive}</td>
            <td>
                <a href="#/" class="select-user" data-id="${n.id}">Select</a>
                |
                <a href="#/" class="delete-user" data-id="${n.id}">Delete</a>
            </td>
        </tr>
        
        `}),u.querySelector("tbody").innerHTML=a};const H=e=>{const t=document.createElement("button");t.innerText="< Prev ";const a=document.createElement("span");a.id="current-page",a.innerText=l.getCurrentPage();const n=document.createElement("button");n.innerText=" Next >",e.append(t,a,n),n.addEventListener("click",async()=>{await l.loadNextPage(),a.innerText=l.getCurrentPage(),g()}),t.addEventListener("click",async()=>{await l.loadPreviousPage(),a.innerText=l.getCurrentPage(),g()})},j=e=>{const{avatar:t,balance:a,firstName:n,gender:s,id:r,isActive:c,lastName:m}=e;return{avatar:t,balance:a,first_name:n,gender:s,id:r,isActive:c,last_name:m}},C=async e=>{const t=new v(e);if(!t.firstName||!t.lastName)throw"First & Last name are required";const a=j(t);let n;return t.id?n=await D(a):n=await O(a),p(n)},O=async e=>{const n=await(await fetch("https://endurable-climbing-becklespinax.glitch.me/users",{method:"POST",body:JSON.stringify(e),headers:{"Content-type":"application/json"}})).json();return console.log({newUser:n}),n},D=async e=>{const t=`https://endurable-climbing-becklespinax.glitch.me/users/${e.id}`,n=await(await fetch(t,{method:"PATCH",body:JSON.stringify(e),headers:{"Content-type":"application/json"}})).json();return console.log({updatedUser:n}),n},F=async e=>{e.innerHTML="Loading...",await l.loadNextPage(),console.log(l.getUsers()),e.innerHTML="",g(e),H(e),x(e),S(e,async t=>{const a=await C(t);l.onUserChanged(a),g()})};document.querySelector("#app").innerHTML=`
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${N}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${w}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1 id="app-title">Hello Vite!</h1>
    <div class="card">


    </div>
    
  </div>
`;const _=document.querySelector(".card");F(_);
