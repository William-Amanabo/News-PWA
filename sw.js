const staticAssets = [
    './',
    './styles.css',
    './app.js',
	'./images/dog.jpeg',
	'./fallback.json'
];

self.addEventListener('install',async event=>{
    console.log('install');
    const cache = await caches.open('news-static');
    cache.addAll(staticAssets); 
})
self.addEventListener('fetch',event=>{
    console.log('fetch');
    const req = event.request;
    //event.respondWith(cacheFirst(req));
    const url = new URL(req.url);

    if(url.origin === location.origin){
        event.respondWith(cacheFirst(req));
    }else{
		event.respondWith(networkFirst(req));
		/*console.log(req);
		try{
			
		} catch(error){
			console.log(error)
			//networkFirst(req)
		}*/
    }
})
async function cacheFirst(req){
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}
async function networkFirst(req) {
	//console.log(req);
    const cache = await caches.open('news-dynamic');
    try {
        const res = await fetch(req);
		//console.log(res);
		//console.log("it did pass the point");
        cache.put(req,res.clone())
        return res;
    } catch (error) {
		//console.log("it got to the catch statement");
       const cachedResponse = await cache.match(req);
	   //console.log(cachedResponse);
	   
	   return  cachedResponse || await caches.match('./fallback.json');
	   
	   /*if (cachedResponse == undefined){
		   //console.log("if statement undefined")
		   return await caches.match('./fallback.json');
	   }else{
		  // console.log("if statement not undefined");
		   return  cachedResponse;
	   }*/
       
    }
}