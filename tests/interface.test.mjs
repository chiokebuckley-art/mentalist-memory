import test from 'node:test';
import assert from 'node:assert/strict';
// Render/event smoke tests. Layout, actual audio and pointer behavior require browser QA.
test('Visual lesson, guided choices, independent recall, assistance, profiles and backup flows',async()=>{
 const handlers={},elements=new Map(),memory=new Map();let answers=[];
 const el=id=>{if(!elements.has(id))elements.set(id,{innerHTML:'',textContent:'',value:'',style:{},focus(){}});return elements.get(id);};
 globalThis.document={querySelector:el,querySelectorAll:()=>answers,addEventListener:(name,fn)=>handlers[name]=fn,body:{classList:{toggle(){},remove(){}}},createElement:()=>({click(){}})};
 globalThis.window={scrollTo(){}};globalThis.localStorage={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)};globalThis.confirm=()=>true;
 globalThis.FormData=class{constructor(form){this.data=form.data||{};}get(k){return this.data[k]??null;}};
 const realFetch=globalThis.fetch,cloudSaves=new Map();globalThis.fetch=async(url,options)=>{assert.ok(url.startsWith('https://wordraiders-sync.wordraiders.workers.dev/v1/save/MM'));const previous=cloudSaves.get(url);if(options.method==='POST'){const b=JSON.parse(options.body);if(b.baseRev!==(previous?.rev||0))return Response.json({conflict:true,...previous},{status:409});const next={data:b.data,rev:(previous?.rev||0)+1,savedAt:Date.now()};cloudSaves.set(url,next);return Response.json(next);}return Response.json(previous||{}, {status:previous?200:404});};
 const realInterval=globalThis.setInterval,realTimeout=globalThis.setTimeout;globalThis.setInterval=()=>0;globalThis.setTimeout=()=>0;
 const click=async(data)=>handlers.click({target:{closest:()=>({dataset:data})},preventDefault(){}});
 const submit=async(id,data={})=>handlers.submit({target:{id,data},preventDefault(){}});
 const html=()=>el('#app').innerHTML;
 const currentWords=()=>[...html().matchAll(/class="picture-label">([^<]+)</g)].map(m=>m[1]);
 const begin=async(mode,support='typed',count=3)=>{await click({action:'setup',mode});el('#minutes').value='5';el('#count').value=String(count);el('#limit').value='0';el('#route').value=undefined;el('#response-mode').value=support;await submit('setup-form');};
 try{
  await import('../app.js');assert.match(html(),/See it happen/);
  await click({page:'settings'});await click({action:'sync-create'});const initialSave=JSON.parse(memory.get('mentalist-memory.v1'));assert.ok(JSON.parse(memory.get('mentalist-memory.sync.v1'))[initialSave.active]);await click({action:'sync-disconnect'});
  await click({action:'lesson',id:'attention'});assert.match(html(),/Start with one thing/);assert.match(html(),/aria-label="apple"/);assert.doesNotMatch(html(),/ONE QUICK CHECK/);
  await click({action:'coach-step',index:'2'});assert.match(html(),/ONE QUICK CHECK/);assert.match(html(),/What did you notice/);
  await click({action:'coach-reveal'});assert.match(html(),/Hide again/);await click({action:'answer-lesson',index:'1'});
  let state=JSON.parse(memory.get('mentalist-memory.v1'));assert.deepEqual(state.profiles[0].lessons,['attention']);
  await begin('words');const target=[];for(let i=0;i<3;i++){target.push(currentWords().at(-1));if(i<2)await click({action:'study-next'});}assert.equal(new Set(target).size,3);
  await click({action:'recall'});assert.doesNotMatch(html(),/picture-choices/);assert.doesNotMatch(html(),/picture-label/);
  for(let i=0;i<3;i++){answers=[{dataset:{answer:String(i)},value:target[i]}];await click({action:i<2?'recall-next':'submit-recall'});}assert.match(html(),/3 of 3 recalled correctly/);
  state=JSON.parse(memory.get('mentalist-memory.v1'));assert.equal(state.profiles[0].history[0].responseMode,'typed');assert.equal(state.profiles[0].reviews.length,1);
  answers=[];await click({action:'finish'});await begin('words','choices');const guided=[];for(let i=0;i<3;i++){guided.push(currentWords().at(-1));if(i<2)await click({action:'study-next'});}await click({action:'recall'});
  for(let i=0;i<3;i++){assert.equal((html().match(/data-action="choose-picture"/g)||[]).length,4);assert.ok(html().includes(`data-answer-value="${guided[i]}"`));await click({action:'choose-picture',answerValue:guided[i]});assert.match(html(),/aria-pressed="true"/);await click({action:i<2?'recall-next':'submit-recall'});}
  state=JSON.parse(memory.get('mentalist-memory.v1'));assert.equal(state.profiles[0].history[1].responseMode,'choices');assert.equal(state.profiles[0].history[1].accuracy,1);assert.match(html(),/Guided recognition · not a mastery pass/);
  await click({action:'finish'});await begin('pairs');await click({action:'recall'});await click({action:'another-look'});assert.match(html(),/ASSISTED PRACTICE/);await click({action:'recall'});await click({action:'submit-recall'});state=JSON.parse(memory.get('mentalist-memory.v1'));assert.equal(state.profiles[0].history[2].assisted,true);
  await click({action:'finish'});await click({page:'review'});assert.match(html(),/Not due yet/);
  await click({action:'tool-tab',tab:'numbers'});assert.match(html(),/aria-label="tin"/);assert.equal((html().match(/name="num-/g)||[]).length,100);
  await click({action:'code-setup',code:'numbers'});await submit('code-start',{direction:'reverse',batch:'0'});assert.match(html(),/CODE PRACTICE/);assert.match(html(),/class="picture/);await click({action:'close-modal'});
  await click({action:'tool-tab',tab:'notes'});await submit('note-form',{question:'My question?',answer:'My answer',cue:'A useful cue'});state=JSON.parse(memory.get('mentalist-memory.v1'));assert.equal(state.profiles[0].notes[0].answer,'My answer');
  await click({page:'settings'});await submit('new-profile-form',{name:'Second learner'});state=JSON.parse(memory.get('mentalist-memory.v1'));assert.equal(state.profiles.length,2);assert.equal(state.profiles[1].history.length,0);assert.equal(state.profiles[0].history.length,3);
  await submit('import-form',{backup:{size:5000,text:async()=>JSON.stringify(state)}});state=JSON.parse(memory.get('mentalist-memory.v1'));assert.equal(state.profiles.length,4);
  assert.match(html(),/Create my sync code/);await click({action:'sync-create'});assert.match(html(),/Show my code/);const linked=JSON.parse(memory.get('mentalist-memory.sync.v1'))[state.active];assert.ok(linked.code.startsWith('MM'));await click({action:'sync-reveal'});assert.ok(html().includes(linked.code.slice(0,4)+'-'));
  await submit('rename-form',{name:'Synced learner'});await click({action:'sync-now'});assert.match(html(),/Progress synced/);await click({action:'sync-disconnect'});assert.match(html(),/Create my sync code/);await submit('sync-join-form',{syncCode:linked.code});state=JSON.parse(memory.get('mentalist-memory.v1'));assert.equal(state.profiles.length,5);assert.equal(state.profiles.at(-1).name,'Synced learner');assert.match(html(),/Connected/);
  for(const page of ['today','course','train','toolkit','review','progress','science','settings']){await click({page});assert.match(html(),/<main id="main"/);assert.doesNotMatch(html(),/\[object Object\]|undefined/);}
 }finally{globalThis.setInterval=realInterval;globalThis.setTimeout=realTimeout;globalThis.fetch=realFetch;}
});
