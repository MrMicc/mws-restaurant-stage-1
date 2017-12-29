let globalCacheName = 'rest-cache-v2';

self.addEventListener('install', (event)=>{
    event.waitUntil(
        caches.open(globalCacheName)
            .then((cached)=>{
                let toBeCached = [];

                for(let i=1; i<=10;i++){
                    toBeCached.push('/img/'+i+'.jpg');
                }
                toBeCached.push('/index.html');
                toBeCached.push('/restaurant.html');
                toBeCached.push('/data/restaurants.json');
                toBeCached.push('/css/styles.css');
                toBeCached.push('/js/dbhelper.js');
                toBeCached.push('/js/main.js');
                toBeCached.push('/js/restaurant_info.js');


                console.log(toBeCached);
                return cached.addAll(toBeCached);
            }).catch((erro)=>{
            console.error('Error at open cache: '+erro);
        })
    );
});


self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('rest-') &&
                        cacheName != globalCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch',(event)=>{
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});