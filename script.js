const supabaseClient=window.supabase.createClient("https://jmokyjytdtqelqqjkzbe.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imptb2t5anl0ZHRxZWxxcWpremJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5ODkwODIsImV4cCI6MjA5ODU2NTA4Mn0.XtjWE3XEPGqLmVvJPJT6hBCqWJMRRHbllF6LfDF17R8");
const form=document.getElementById('profileForm');
const profiles=document.getElementById('profiles');
const search=document.getElementById('search');
let cache=[];
async function load(){const {data}=await supabaseClient.from('classmates').select('*').order('created_at',{ascending:false});cache=data||[];render(cache);} 
function render(arr){profiles.innerHTML='';arr.forEach(p=>{const d=document.createElement('div');d.className='profile';d.innerHTML=`${p.photo_url?`<img src="${p.photo_url}">`:''}<h3>${p.full_name||''}</h3><p>🎓 ${p.nickname||''}</p><p>📍 ${p.location||''}</p><p>💼 ${p.occupation||''}</p><p><a href='${p.instagram||'#'}' target='_blank'>Instagram</a></p><p>❤️ ${p.memory||''}</p><p>😂 ${p.funny_story||''}</p><p>🎵 ${p.favourite_song||''}</p><p>🎯 ${p.dream||''}</p>`;profiles.appendChild(d);});}
form.addEventListener('submit',async(e)=>{e.preventDefault();let photoUrl='';const file=document.getElementById('photo').files[0];if(file){const filename=Date.now()+'-'+file.name;const up=await supabaseClient.storage.from('classmate-photos').upload(filename,file);if(!up.error){photoUrl=supabaseClient.storage.from('classmate-photos').getPublicUrl(filename).data.publicUrl;}}
await supabaseClient.from('classmates').insert([{full_name:fullName.value,nickname:nickname.value,location:location.value,occupation:occupation.value,instagram:instagram.value,photo_url:photoUrl,memory:memory.value,funny_story:funnyStory.value,favourite_song:song.value,dream:dream.value}]);form.reset();load();});
search.addEventListener('input',()=>{const q=search.value.toLowerCase();render(cache.filter(x=>(x.full_name||'').toLowerCase().includes(q)||(x.nickname||'').toLowerCase().includes(q)));});
load();
