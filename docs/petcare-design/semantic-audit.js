
const p=await figma.getNodeByIdAsync('269:4528');await figma.setCurrentPageAsync(p);const checks=[],geometry=[],invalid=[],exportEdges=[];let links=0;const roots={};for(const [k,id]of Object.entries(g.screens))roots[k]=await figma.getNodeByIdAsync(id);const inverse=Object.fromEntries(Object.entries(g.screens).map(([k,id])=>[id,k])),graph={};function textOf(k){return roots[k].findAllWithCriteria({types:['TEXT']}).filter(t=>t.visible).map(t=>t.characters).join(' | ');}function check(name,ok,details){checks.push({name,pass:!!ok,...(!ok?{details}: {})});}
for(const [key,r]of Object.entries(roots)){graph[key]=[];for(const n of [r,...r.findAll(()=>true)]){for(const re of n.reactions??[])for(const a of re.actions??[]){if(a.type!=='NODE'||a.navigation!=='NAVIGATE')continue;links++;const dest=await figma.getNodeByIdAsync(a.destinationId);if(!dest||dest.parent.id!==p.id)invalid.push({from:key,to:a.destinationId});const target=inverse[a.destinationId]??a.destinationId;graph[key].push(target);exportEdges.push({node:n.id,from:key,target,back:false,timer:re.trigger.type==='AFTER_TIMEOUT'});if(re.trigger.type==='ON_CLICK'&&(n.width<48||n.height<48))geometry.push({key,id:n.id,reason:'target'});if(g.group.startsWith('Reduced')&&a.transition&&(a.transition.type!=='DISSOLVE'||a.transition.duration>.101))geometry.push({key,id:n.id,reason:'reduced motion'});}
if(n.type==='TEXT'&&n.visible&&n.parent.type!=='INSTANCE'&&n.x+n.width>n.parent.width+1)geometry.push({key,id:n.id,reason:'text overflow'});
if(n.name==='Species / explicit choices')for(const b of n.children)if(b.children[0].width>b.width+1)geometry.push({key,id:b.id,reason:'surface overflow'});}}
function path(name,keys){for(let i=0;i<keys.length-1;i++)check(name+': '+keys[i]+' → '+keys[i+1],graph[keys[i]].includes(keys[i+1]),graph[keys[i]]);}
function reachable(start){const seen=new Set(),q=[start];while(q.length){const k=q.shift();if(seen.has(k)||!graph[k])continue;seen.add(k);q.push(...graph[k]);}return [...seen];}
path('Dog setup',['noPets','addPetEmpty','petRequired','addPetFilled','petSaving','miloDog','petsMilo','accountMilo']);
path('Cat setup',['addPetEmpty','addPetEmptyCat','petRequiredCat','addPetCat','petSavingCat','miloCat','petsMiloCat','accountMiloCat']);
path('Cat account context',['accountMiloCat','editProfile__MiloCat','profileSaving__MiloCat','profileSaved__MiloCat','accountMiloCat','appearance__MiloCat']);
path('Cat signed out return',['accountMiloCat','signOutConfirm__MiloCat','signedOut__MiloCat','miloCat']);
path('Pet retry',['petSaveError','petSaving','miloDog']);
path('Invite',['todayAlex','account','petProfile','sharing','inviteForm','inviteSending','invitePending','inviteCancelConfirm','inviteCancelled','sharing']);
path('Resend',['invitePending','inviteSending','invitePending']);
path('Accepted handover',['recipientSignIn','invitation','accepting','joined','todaySam','samDose','samObservation','samSaving','samSaved','todaySamAfter']);
path('Access removal',['todayAlexAfter','ownerMembers','removeConfirm','removed','todayAlexRemoved','historyRemoved','todayAlexRemoved']);
path('Reinvite preserves history',['sharing__Removed','inviteForm__Removed','inviteSending__Removed','invitePending__Removed','sharing__RemovedPending','petProfile__RemovedPending','todayAlexRemovedPending','historyRemovedPending','todayAlexRemovedPending']);
path('Reinvite cancellation',['invitePending__Removed','inviteCancelConfirm__Removed','inviteCancelled__Removed','sharing__Removed']);
path('Personal profile',['account','editProfile','profileSaving','profileSaved','account']);
path('Profile rejected save recovery',['profileSaveError','profileSaving','profileSaved','account']);
check('Profile rejection retains entered name',textOf('profileSaveError').includes('Alex')&&textOf('profileSaveError').includes('Your entered details are kept'),textOf('profileSaveError'));
check('Sign out returns to welcome email entry',textOf('signedOut').includes('Welcome back')&&textOf('signedOut').includes('Email address'),textOf('signedOut'));
path('Personal sign out',['account','signOutConfirm','signedOut','todayAlex']);
path('Wrong account',['wrongEmail','recipientSignIn','invitation']);
check('Wrong account has no direct acceptance view',!graph.wrongEmail.includes('invitation'),graph.wrongEmail);
for(const key of ['expired','cancelledRecipient','revoked']){const reached=reachable(key);check(key+' cannot reach pet data',!reached.some(k=>/today|Dose|Observation|Members|joined|invitation$/i.test(k)),reached);}
for(const key of ['miloDog','miloCat']){const t=textOf(key);check(key+' has empty plan',t.includes('No medication plan yet')&&!t.includes('Recovery tablets'),t);}
for(const key of ['todayAlex','todaySam']){const t=textOf(key);check(key+' original report only',t.includes('Alex · event 18:16 · added 18:17')&&!t.includes('Observation · Sam'),t);}
for(const key of ['todayAlexAfter','todaySamAfter','todayAlexRemoved','todayAlexRemovedPending']){const t=textOf(key);check(key+' retains independent author entries',t.includes('Alex · event 18:16 · added 18:17')&&t.includes('Observation · Sam: vomited 18:20')&&t.includes('Added at 18:21'),t);}
check('Removed caregiver is absent from active identity',textOf('todayAlexRemoved').includes('Cared for by Alex |'),textOf('todayAlexRemoved'));
check('Pending is not accepted',textOf('invitePending').includes('Sam does not have access until'),textOf('invitePending'));
check('Appearance current selection explicit',textOf('appearance').includes(g.group.endsWith('/Dark')?'Dark (current)':'Light (current)'),textOf('appearance'));
check('No geometry or reduced-motion violations',geometry.length===0,geometry);
check('All destinations local and present',invalid.length===0,invalid);
return {group:g.group,frames:Object.keys(roots).length,links,passed:checks.filter(c=>c.pass).length,total:checks.length,failures:checks.filter(c=>!c.pass),checks,geometry,invalid,edges:exportEdges.map(e=>[e.node,e.from,e.target,e.timer])};
