import {uniqueWords,majorWords,pegs,defaultRoute,names,cards,modes} from './curriculum.js';
import {pictureWords} from './visuals.js';
export const DAY=86400000;
export const uid=()=>`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`;
export function shuffle(a,rng=Math.random){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export const normal=s=>String(s??'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/♠/g,'S').replace(/♥/g,'H').replace(/♦/g,'D').replace(/♣/g,'C').toLowerCase().trim().replace(/[’']/g,'').replace(/[^a-z0-9]/g,'');
export const match=(a,b)=>normal(a)!==''&&normal(a)===normal(b);
export const localDay=ms=>{const d=new Date(ms);return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;};
export function newProfile(name='Learner'){return {id:uid(),name,created:Date.now(),lessons:[],history:[],reviews:[],notes:[],routes:[{id:uid(),name:'Practice home',locations:[...defaultRoute]}],numberImages:[...majorWords],cardImages:cards.map(c=>c.image),pegs:[...pegs],pao:{},minutes:10};}
export function initialStore(){const p=newProfile();return {version:1,active:p.id,profiles:[p]};}
export function generate(mode,count,p,{routeId=null,rng=Math.random,visual=false,responseMode='typed'}={}){
 if(!modes[mode])throw new Error('Choose a training mode.');
 count=Math.max(3,Math.min(modes[mode].max,Math.floor(Number(count)||5)));
 const ws=shuffle(visual?pictureWords:uniqueWords,rng);let items=[],route=null;
 if(mode==='palace'){route=p.routes.find(r=>r.id===routeId)||p.routes[0];if(!route||route.locations.length<count)throw new Error(`This route needs at least ${count} locations. Add them in My toolkit or choose a smaller list.`);if(p.reviews.some(r=>r.routeId===route.id))throw new Error('This route has a pending retention test. Complete it when due, or choose another route to avoid mixing lists.');}
 for(let i=0;i<count;i++)items.push({cue:String(i+1),answer:ws[i],hint:''});
 if(mode==='pairs')items=items.map((x,i)=>({...x,cue:ws[count+i],hint:`Make ${ws[count+i]} interact with ${x.answer}.`}));
 if(mode==='palace')items=items.map((x,i)=>({...x,cue:route.locations[i],hint:`Make ${x.answer} act on ${route.locations[i]}.`}));
 if(mode==='pegs')items=items.map((x,i)=>({...x,hint:p.pegs[i]}));
 if(mode==='numbers')items=shuffle(Array.from({length:100},(_,i)=>i),rng).slice(0,count).map((n,i)=>({cue:String(i+1),answer:String(n).padStart(2,'0'),hint:p.numberImages[n]}));
 if(mode==='names'){const ns=shuffle(names,rng),faces=shuffle(Array.from({length:24},(_,i)=>i),rng);items=items.map((x,i)=>({cue:`Person ${i+1}`,answer:ns[i],face:faces[i],hint:'Connect the name to a distinctive, respectful detail.'}));}
 if(mode==='cards')items=shuffle(cards.map((c,i)=>({...c,image:p.cardImages[i]})),rng).slice(0,count).map((c,i)=>({cue:String(i+1),answer:c.code,card:c.display,red:c.red,hint:c.image}));
 return {id:uid(),mode,count,items,visual,responseMode,order:['names','pegs','pairs'].includes(mode)?shuffle(items.map((_,i)=>i),rng):items.map((_,i)=>i),created:Date.now(),routeId:route?.id||null,routeName:route?.name||null};
}
export function score(items,answers){const results=items.map((x,i)=>({answer:x.answer,given:String(answers[i]??''),correct:match(answers[i],x.answer)}));return {results,correct:results.filter(r=>r.correct).length,total:items.length,accuracy:items.length?results.filter(r=>r.correct).length/items.length:0};}
export function assessMastery(p,chapter){const eligible=p.history.filter(h=>h.mode===chapter.mode&&h.count>=chapter.target&&!h.assisted&&h.responseMode!=='choices');const fresh=eligible.filter(h=>!h.delayed&&h.accuracy>=.9);const unique=[...new Map(fresh.map(h=>[h.setId,h])).values()];const dates=new Set(unique.map(h=>localDay(h.at)));const delayed=eligible.some(h=>h.delayed&&h.delayMs>=DAY&&h.accuracy>=.9);const lessons=chapter.lessons.every(l=>p.lessons.includes(l.id));return {fresh:Math.min(3,unique.length),days:Math.min(2,dates.size),delayed,lessons,mastered:lessons&&unique.length>=3&&dates.size>=2&&delayed};}
export function recommendCount(p,mode){const last=p.history.filter(h=>h.mode===mode&&!h.delayed&&!h.assisted).slice(-2);if(!last.length)return 5;let n=last.at(-1).count;if(last.length===2&&last.every(h=>h.accuracy>=.9&&h.count===n))n+=2;else if(last.at(-1).accuracy<.7)n-=2;return Math.max(3,Math.min(modes[mode].max,n));}
export function recordSession(p,session,answers,{at=Date.now(),encodingMs=0,recallMs=0,assisted=false,reviewId=null}={}){
 const result=score(session.items,answers);const review=reviewId?p.reviews.find(r=>r.id===reviewId):null;
 if(reviewId&&!review)throw new Error('This review was already completed.');
 const history={id:uid(),setId:session.id,responseMode:session.responseMode||'typed',mode:session.mode,count:session.items.length,at,accuracy:result.accuracy,correct:result.correct,encodingMs,recallMs,assisted,delayed:!!review,delayMs:review?Math.max(0,at-review.lastStudyAt):0};
 p.history.push(history);
 if(review){if(result.accuracy>=.9&&!assisted){p.reviews=p.reviews.filter(r=>r.id!==reviewId);}else{review.lastStudyAt=at;review.due=at+DAY;review.attempts=(review.attempts||0)+1;}}
 else{p.reviews.push({...JSON.parse(JSON.stringify(session)),id:uid(),setId:session.id,lastStudyAt:at,due:at+DAY,attempts:0});}
 return {...result,history};
}
export function dueReviews(p,at=Date.now()){return p.reviews.filter(r=>r.due<=at).sort((a,b)=>a.due-b.due);}
export function updateNote(note,correct,at=Date.now()){note.interval=correct?Math.min(60,note.interval?note.interval*2:1):0;note.due=at+(correct?note.interval*DAY:600000);note.reviews=(note.reviews||0)+1;}
export function validStore(x){
 const str=(s,max=500)=>typeof s==='string'&&s.length<=max;
 const safeId=s=>typeof s==='string'&&/^[a-zA-Z0-9_-]{1,100}$/.test(s);
 const finite=n=>typeof n==='number'&&Number.isFinite(n)&&n>=0;
 const strings=(a,n)=>Array.isArray(a)&&a.length===n&&a.every(s=>str(s,120)&&s.trim());
 if(!x||x.version!==1||!Array.isArray(x.profiles)||x.profiles.length<1||x.profiles.length>20)return false;
 const ids=new Set();
 for(const p of x.profiles){
  if(!p||!safeId(p.id)||ids.has(p.id)||!str(p.name,60)||!finite(p.created)||![5,10,15].includes(p.minutes)||!strings(p.numberImages,100)||!strings(p.cardImages,52)||!strings(p.pegs,10))return false;ids.add(p.id);
  if(!Array.isArray(p.lessons)||!p.lessons.every(s=>str(s,40))||!Array.isArray(p.routes)||!p.routes.length||p.routes.length>50||!p.routes.every(r=>safeId(r.id)&&str(r.name,60)&&Array.isArray(r.locations)&&r.locations.length>=3&&r.locations.length<=50&&r.locations.every(s=>str(s,100)&&s.trim())))return false;
  if(!Array.isArray(p.history)||p.history.length>20000||!p.history.every(h=>modes[h.mode]&&finite(h.at)&&finite(h.count)&&h.count<=52&&finite(h.accuracy)&&h.accuracy<=1&&finite(h.encodingMs)&&finite(h.recallMs)&&finite(h.delayMs)&&typeof h.assisted==='boolean'&&typeof h.delayed==='boolean'&&(h.responseMode===undefined||['typed','choices'].includes(h.responseMode))&&safeId(h.setId)))return false;
  if(!Array.isArray(p.reviews)||p.reviews.length>2000||!p.reviews.every(r=>modes[r.mode]&&safeId(r.id)&&safeId(r.setId)&&(r.responseMode===undefined||['typed','choices'].includes(r.responseMode))&&finite(r.lastStudyAt)&&finite(r.due)&&Array.isArray(r.items)&&r.items.length>=3&&r.items.length<=52&&r.items.every(i=>str(i.answer,120)&&str(i.cue,120)&&str(i.hint,250)&&(i.face===undefined||Number.isInteger(i.face)&&i.face>=0&&i.face<24))&&Array.isArray(r.order)&&r.order.length===r.items.length&&new Set(r.order).size===r.items.length&&r.order.every(i=>Number.isInteger(i)&&i>=0&&i<r.items.length)))return false;
  if(!Array.isArray(p.notes)||p.notes.length>5000||!p.notes.every(n=>safeId(n.id)&&str(n.question,300)&&str(n.answer,2000)&&str(n.cue,1000)&&finite(n.due)&&finite(n.interval)))return false;
  if(!p.pao||typeof p.pao!=='object'||Array.isArray(p.pao)||!Object.entries(p.pao).every(([k,v])=>/^\d{2}$/.test(k)&&v&&str(v.person,100)&&str(v.action,100)&&str(v.object,100)))return false;
 }
 return ids.has(x.active);
}
