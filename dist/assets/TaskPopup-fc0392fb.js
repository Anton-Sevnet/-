var x=(l,t,e)=>{if(!t.has(l))throw TypeError("Cannot "+e)};var s=(l,t,e)=>(x(l,t,"read from private field"),e?e.call(l):t.get(l)),a=(l,t,e)=>{if(t.has(l))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(l):t.set(l,e)},i=(l,t,e,o)=>(x(l,t,"write to private field"),o?o.call(l,e):t.set(l,e),e);var n,d,r,c,u,p;class w{constructor(t,e,o,f,b){a(this,n,void 0);a(this,d,void 0);a(this,r,void 0);a(this,c,void 0);a(this,u,void 0);a(this,p,"");i(this,n,t),i(this,d,e),i(this,r,o),i(this,c,f),i(this,u,b)}set taskTitle(t){console.log("taskTitle",t),i(this,p,t)}render(){const t=document.createElement("div");t.innerHTML=`
      <div data-testId="task-popup" class="flex flex-col relative min-w-[377px] bg-white p-6 rounded-2xl gap-y-4">
        <button class="absolute top-4 right-4" data-id="btnClose">
          <i class="i-material-symbols-cancel-outline block text-neutral-400 hover:text-neutral-800 text-2xl"></i>
        </button>
        <div class="flex flex-row">
          <span class="text-xl font-bold">${s(this,n)}</span>
        </div>
        <div class="flex flex-row">
          <div class="flex flex-col w-full">
            <label class="ml-1 text-sm text-neutral-600" for="inpDate">Title: </label>
            <input
              class="bg-neutral-100 p-1.5 rounded w-full border-1 border-neutral-200"
              data-id="inpTitle"
              type="text"
              value="${s(this,p)}"
              placeholder="e.g. Read books"
            />
          </div>
        </div>
        <div class="flex flex-row">
          <div class="flex flex-col w-full">
            <label class="ml-1 text-sm text-neutral-600" for="inpDate">End date: </label>
            <input
              class="bg-neutral-100 p-1.5 rounded w-full border-1 border-neutral-200"
              type="date"
              id="inpDate"
              name="trip-start"
              min="2018-01-01"
            />
          </div>
        </div>
        <div class="flex flex-row">
          <div class="flex flex-col w-full">
            <label for="countries" class="ml-1 text-sm text-neutral-600">Select tag:</label>
            <select
              id="countries"
              class="bg-neutral-100 p-1.5 rounded w-full border-1 border-neutral-200 focus:border-none"
            >
              <option selected>Choose a tag</option>
              <option value="web">Web</option>
              <option value="update">Update</option>
              <option value="design">Design</option>
              <option value="content">Content</option>
            </select>
          </div>
        </div>
        <div class="flex flex-row pt-2">
          <button data-id="btnConfirm" class="bg-teal-600 text-white p-2 rounded-lg w-full font-bold">
            ${s(this,r)}
          </button>
        </div>
      </div>
    `,console.log("div.firstChild",t.children);const e=t.children[0],o=e.querySelector('[data-id="btnClose"]'),f=e.querySelector('[data-id="btnConfirm"]'),b=e.querySelector('[data-id="inpTitle"]');return o.onclick=()=>{o.onclick=null,f.onclick=null,s(this,u).call(this)},f.onclick=()=>{const v=b.value,h=Date.now(),m=s(this,d)[0];s(this,c).call(this,v,h,m)},t.children[0]}}n=new WeakMap,d=new WeakMap,r=new WeakMap,c=new WeakMap,u=new WeakMap,p=new WeakMap;export{w as default};
