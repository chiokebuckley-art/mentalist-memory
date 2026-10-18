import {picture,connectionScene,routeScene} from './visuals.js';
const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const slide=(title,caption,scene)=>({title,caption,scene});
export const visualLessons={
 attention:[slide('Start with one thing.','Look at the apple on the screen. You do not need to picture it inside your head.','notice'),slide('Give it your attention.','Notice its red skin and green leaf. Say “red apple” aloud if that helps.','notice-detail'),slide('Look away. Bring back a detail.','Hide the picture. Say “red” or “green leaf.” Words count, too.','hide')],
 association:[slide('Two things. One connection.','Here are a key and a balloon. First, know exactly what each picture means.','pair'),slide('Make something happen.','The balloon lifts the key. Watch the movement and say the connection aloud.','pair-lift'),slide('Let one thing cue the other.','When you see the key, try to recall “balloon.” You can remember the sentence instead of a mental picture.','pair-hide')],
 retrieval:[slide('Study the apple.','Look, point, and say “apple.” Use more than one way to notice it.','notice'),slide('Hide it before answering.','Try to say the answer without the picture. It is okay to need another look.','hide'),slide('Check, then come back later.','Compare your answer, fix any mistake, and practice again after a delay.','review')],
 link:[slide('Start with two objects.','An apple pushes a hammer. Watch it, then say those words.','link'),slide('Add the next link.','The hammer taps a tiger. Now the hammer connects the first scene to the second.','link-next'),slide('Follow the order.','Apple → hammer → tiger. Point along the pictures, then try it without them.','chain')],
 organization:[slide('Find things that belong together.','Apple and lemon are fruit. Hammer and key are tools.','groups'),slide('Give each group a meaning.','Say “fruit” for the first pair and “tools” for the second.','groups'),slide('Keep meaning and order.','A group helps only if you can recover its members. Test each group without looking.','groups-hide')],
 repair:[slide('Find the mixed-up place.','The learned order is apple, hammer, tiger. Below, two items have traded places.','order-wrong'),slide('Repair the connection.','Put hammer before tiger. Watch the order change.','chain'),slide('Test a fresh chain.','Practice new objects next. Repeating one list is not the same as learning the method.','fresh')],
 route:[slide('Choose places you know.','Start with door, couch, and sink—or three places from your own home.','route'),slide('Travel in one direction.','Follow each location from left to right. The order should stay the same.','route'),slide('Practice the route by itself.','Say the place names without the diagram. You can use a verbal route, too.','route-hide')],
 placement:[slide('Give the apple a place.','An apple is at the door. Watch the object move into its location.','place-one'),slide('Give the next object its place.','The hammer is on the couch. Each place gets one object to start.','place-two'),slide('Let the place cue the item.','Door → apple. Couch → hammer. Hide the objects and try to retrieve them.','places-hide')],
 interference:[slide('Keep this list in its own route.','These locations hold a list you want to remember tomorrow.','place-two'),slide('Use another route for another list.','Mixing lists at the same locations can make the old and new objects compete.','two-routes'),slide('Build slowly.','Add locations only when the route is familiar. Say, point, or walk through it.','route')],
 pegs:[slide('Learn three permanent pegs.','One is bun. Two is shoe. Three is tree. The pictures stay fixed.','peg-base'),slide('Attach something new.','The third item is violin. Watch a violin beside the tree: tree cues violin.','peg-violin'),slide('Answer by position.','Asked for item three? Use tree to recover violin.','peg-question')],
 random:[slide('Fix each item to its number.','One: apple. Two: hammer. Three: tiger.','numbered'),slide('Ask out of order.','What was item three? You should retrieve tiger without reciting everything first.','position-three'),slide('Keep the original addresses.','The questions move. The number-to-item links stay the same.','numbered')],
 bidirectional:[slide('Code to image.','See 3. Produce “tree.” The code is the cue.','peg-forward'),slide('Image to code.','See the tree. Produce 3. Now the picture is the cue.','peg-reverse'),slide('Train both directions.','Test each direction separately. One successful direction does not prove the other.','peg-both')],
 major:[slide('Use sounds to build a picture.','In the Major System, 1 gives a t or d sound. 2 gives n.','major-sounds'),slide('Join the sounds.','t + n can become “tin.” Vowels help form the word.','major-tin'),slide('Translate it back.','Tin → t/n → 12. Practice both directions.','major-reverse')],
 numberbook:[slide('A number needs a steady cue.','In this example, 12 always means tin and 32 always means moon.','number-pair'),slide('Learn a small group.','Start with a few codes. Look at the picture, say its name, and recover the number.','number-pair'),slide('Keep your code consistent.','Open the illustrated codebook. Learn one batch before adding more.','major-reverse')],
 digitsequence:[slide('Split into pairs.','01 · 32 · 90. Keep the zero in 01; it changes the code.','digits'),slide('Follow the pictured chain.','Seat → moon → bus. Use a short spoken story or the moving pictures.','number-chain'),slide('Decode the sequence.','Recover 01 · 32 · 90 in that order.','digits')],
 names:[slide('Hear the name correctly.','This example person is Rose. Say the name once and notice the flower cue.','name'),slide('Connect name and person.','The rose sits beside the person. Make a respectful association with one distinct detail.','name'),slide('Hide the name.','Try to say “Rose” from the person and your learned connection.','name-hide')],
 namedelay:[slide('Study one name at a time.','Notice the face and say its name. The app keeps the original pairing.','name'),slide('Remove the label.','Produce the name before revealing it. Picture choices are optional practice support.','name-hide'),slide('Try after a delay.','A later retest checks whether the same name-person link lasted.','review')],
 realnames:[slide('Practice an introduction.','Listen. Confirm the name. Say it naturally once.','listen'),slide('Use a useful connection.','A name, a shared topic, or a detail can be a cue. You do not need a vivid inner image.','name'),slide('Test it in real life.','An illustrated-face score is practice. Check your recall in actual conversations, too.','conversation')],
 cardcode:[slide('A card gets a fixed image.','Example code: ace of spades → apple. Your own codebook can be different.','card-image'),slide('Learn the reverse.','Apple → ace of spades. Test the association both ways.','card-image'),slide('Put cards in order.','A fresh shuffle changes the sequence, not each card’s assigned image.','card-chain')],
 pao:[slide('Choose three components.','12: pilot. 34: kneading. 56: drum. Each pair supplies a different part.','pao-parts'),slide('Make one visible scene.','The pilot kneads the drum. Person → action → object.','pao-scene'),slide('Recover all three codes.','Pilot gives 12; kneading gives 34; drum gives 56.','pao-codes')],
 deck:[slide('Know which task you are doing.','A fixed stack uses one permanent order.','card-chain'),slide('A shuffle creates a new order.','The same three cards move to different positions.','card-shuffle'),slide('Build length gradually.','Begin with three cards. Use picture support first, then independent recall when ready.','card-chain')],
 meaning:[slide('Understand the idea first.','A picture can cue a word. It does not automatically explain what the word means.','meaning'),slide('Add a question and a cue.','Write a short question in My notebook. Draw on meaning, sound, or a picture.','notebook'),slide('Explain it without the source.','Say what it means and give an example. Remembering the label is only one part.','explain')],
 performance:[slide('Start with a small demonstration.','Learn three objects at three numbered places.','numbered'),slide('Answer a position question.','Ask for item three, then one, then two. Keep the original assignments.','position-three'),slide('Show the skill honestly.','Call it practiced memory. Build reliability before adding speed or length.','success')],
 mastery:[slide('Watch your support fade.','Begin with visible examples and picture choices. This is guided practice.','support'),slide('Try recall without choices.','When ready, switch to typing or saying the answer before checking.','hide'),slide('Check whether it lasts.','Fresh unaided success and delayed recall count toward mastery. Picture-choice scores stay separate.','review')]
};
const tile=(word,label='')=>`<div class="coach-tile">${picture(word)}<span>${e(label||word)}</span></div>`;
const badge=(n,word)=>`<div class="number-picture"><b>${e(n)}</b>${picture(word,{label:true})}</div>`;
const routeNames=['Front door','Couch','Kitchen sink'];
export function coachScene(scene,playing=false,revealed=false){
 switch(scene){
 case 'notice':return `<div class="notice-stage">${picture('apple',{label:true})}</div>`;
 case 'notice-detail':return `<div class="notice-stage detail">${picture('apple',{label:true})}<span class="detail-tag tag-one">red skin</span><span class="detail-tag tag-two">green leaf</span></div>`;
 case 'hide':return revealed?`<div class="notice-stage">${picture('apple',{label:true})}</div>`:`<div class="hidden-memory"><span>?</span><p>What did you notice?</p></div>`;
 case 'pair':return connectionScene('key','balloon');
 case 'pair-lift':return connectionScene('key','balloon','lift',playing);
 case 'pair-hide':return revealed?connectionScene('key','balloon'):`<div class="coach-row">${tile('key')}<b>→</b><div class="hidden-memory small-hidden">?</div></div>`;
 case 'link':return connectionScene('apple','hammer','bump',playing);
 case 'link-next':return connectionScene('hammer','tiger','bump',playing);
 case 'chain':return `<div class="coach-row sequence">${tile('apple')}<b>→</b>${tile('hammer')}<b>→</b>${tile('tiger')}</div>`;
 case 'groups':return `<div class="coach-groups"><div><h3>Fruit</h3><div class="coach-row">${tile('apple')}${tile('lemon')}</div></div><div><h3>Tools</h3><div class="coach-row">${tile('hammer')}${tile('key')}</div></div></div>`;
 case 'groups-hide':return revealed?coachScene('groups'):`<div class="coach-groups"><div><h3>Fruit</h3><div class="hidden-memory small-hidden">?</div></div><div><h3>Tools</h3><div class="hidden-memory small-hidden">?</div></div></div>`;
 case 'order-wrong':return `<div class="coach-row sequence wrong-order">${tile('apple')}${tile('tiger')}${tile('hammer')}</div>`;
 case 'fresh':return `<div class="coach-row sequence">${tile('umbrella')}<b>→</b>${tile('candle')}<b>→</b>${tile('bicycle')}</div>`;
 case 'route':return routeScene(routeNames,[],playing?2:0);
 case 'route-hide':return revealed?routeScene(routeNames):`<div class="coach-row"><span class="number-disc">1</span><b>→</b><span class="number-disc">2</span><b>→</b><span class="number-disc">3</span></div>`;
 case 'place-one':return routeScene(routeNames,playing?['apple']:[],0);
 case 'place-two':return routeScene(routeNames,['apple',...(playing?['hammer']:[])],1);
 case 'places-hide':return routeScene(routeNames,revealed?['apple','hammer','tiger']:[],0);
 case 'two-routes':return `<div class="split-route"><div><span>Route A</span>${tile('door','apple at the door')}${picture('apple')}</div><div><span>Route B</span>${tile('gate','lemon at the gate')}${picture('lemon')}</div></div>`;
 case 'peg-base':return `<div class="coach-row">${badge('1','bun')}${badge('2','shoe')}${badge('3','tree')}</div>`;
 case 'peg-violin':return `<div class="peg-example"><span class="number-disc">3</span>${connectionScene('tree','violin','spin',playing)}</div>`;
 case 'peg-question':return `<div class="coach-row"><span class="number-disc">3</span><b>→</b>${tile('tree')}<b>→</b>${revealed?tile('violin'):'<div class="hidden-memory small-hidden">?</div>'}</div>`;
 case 'numbered':return `<div class="coach-row">${badge('1','apple')}${badge('2','hammer')}${badge('3','tiger')}</div>`;
 case 'position-three':return `<div class="coach-row"><span class="number-disc">3</span><b>→</b>${revealed?tile('tiger'):'<div class="hidden-memory small-hidden">?</div>'}</div>`;
 case 'peg-forward':return `<div class="coach-row"><span class="number-disc">3</span><b>→</b>${tile('tree')}</div>`;
 case 'peg-reverse':return `<div class="coach-row">${tile('tree')}<b>→</b><span class="number-disc">3</span></div>`;
 case 'peg-both':return `<div class="coach-row"><span class="number-disc">3</span><b>↔</b>${tile('tree')}</div>`;
 case 'major-sounds':return `<div class="coach-row"><div class="sound-tile"><b>1</b><span>t / d</span></div><div class="sound-tile"><b>2</b><span>n</span></div></div>`;
 case 'major-tin':return `<div class="coach-row"><span class="sound-formula">t + n<br><small>add a vowel</small></span><b>→</b>${tile('tin')}</div>`;
 case 'major-reverse':return `<div class="coach-row">${tile('tin')}<b>→</b><span class="sound-formula">t / n</span><b>→</b><span class="number-disc">12</span></div>`;
 case 'number-pair':return `<div class="coach-row">${badge('12','tin')}${badge('32','moon')}</div>`;
 case 'digits':return `<div class="coach-row"><span class="number-disc">01</span><b>→</b><span class="number-disc">32</span><b>→</b><span class="number-disc">90</span></div>`;
 case 'number-chain':return `<div class="coach-row">${badge('01','seat')}${badge('32','moon')}${badge('90','bus')}</div>`;
 case 'name':return `<div class="coach-row"><div class="coach-tile">${picture('portrait')}<span>Rose</span></div><b>↔</b>${tile('rose')}</div>`;
 case 'name-hide':return `<div class="coach-row">${tile('portrait',revealed?'Rose':'Name?')}${revealed?tile('rose'):'<div class="hidden-memory small-hidden">?</div>'}</div>`;
 case 'listen':return `<div class="coach-row">${tile('ear','listen')}<b>→</b>${tile('portrait','say the name')}</div>`;
 case 'conversation':return `<div class="coach-row">${tile('portrait','introduce')}<b>↔</b>${tile('ear','listen')}</div>`;
 case 'card-image':return `<div class="coach-row"><div class="playingcard">A♠</div><b>↔</b>${tile('apple')}</div>`;
 case 'card-chain':case 'card-shuffle':return `<div class="coach-row card-sequence">${(scene==='card-chain'?['A♠','2♠','3♠']:['3♠','A♠','2♠']).map((v,i)=>`<div><span class="small muted">${i+1}</span><div class="playingcard">${v}</div></div>`).join('')}</div>`;
 case 'pao-parts':return `<div class="coach-row">${badge('12 · person','pilot')}<div class="sound-tile"><b>34</b><span>kneading</span>${picture('hand')}</div>${badge('56 · object','drum')}</div>`;
 case 'pao-scene':return `<div class="pao-demo ${playing?'is-playing':''}">${picture('pilot')}<span class="kneading-hand">${picture('hand')}</span>${picture('drum')}</div>`;
 case 'pao-codes':return `<div class="coach-row"><span class="number-disc">12</span><span class="number-disc">34</span><span class="number-disc">56</span></div>`;
 case 'meaning':return `<div class="coach-row">${tile('puzzle','understand')}<b>→</b>${tile('key','make a cue')}</div>`;
 case 'notebook':return `<div class="coach-row">${tile('book','question')}<b>→</b>${tile('pencil','answer')}</div>`;
 case 'explain':return `<div class="coach-row">${tile('ear','say it')}<b>→</b>${tile('checklist','check it')}</div>`;
 case 'success':return `<div class="coach-row">${tile('checklist','reliable recall')}${tile('flag','a trained skill')}</div>`;
 case 'support':return `<div class="coach-row">${tile('apple')}${tile('moon')}${tile('key')}</div>`;
 case 'review':return `<div class="coach-row">${tile('checklist','check')}<b>→</b>${tile('calendar','return later')}</div>`;
 default:return `<div class="coach-row">${tile('eye','see it')}${tile('hand','do it')}${tile('key','recall it')}</div>`;
 }
}
export const hiddenScenes=new Set(['hide','pair-hide','groups-hide','route-hide','places-hide','peg-question','position-three','name-hide']);
