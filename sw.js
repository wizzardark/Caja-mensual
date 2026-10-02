// Service worker de Caja del Día
// Estrategia: cache-first. Todo lo necesario para abrir la app se guarda
// en la primera visita, así que después funciona sin conexión.

const CACHE_NAME = "caja-del-dia-v2";
const ARCHIVOS_PRECACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-192-maskable.png",
  "./icon-512.png",
  "./icon-512-maskable.png"
];

self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(ARCHIVOS_PRECACHE);
    }).then(function(){
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(nombres){
      return Promise.all(
        nombres.filter(function(n){ return n !== CACHE_NAME; })
               .map(function(n){ return caches.delete(n); })
      );
    }).then(function(){
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function(event){
  if(event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(function(cacheado){
      if(cacheado) return cacheado;

      return fetch(event.request).then(function(respuesta){
        // Guarda copia en caché para la próxima vez que esté offline
        var copia = respuesta.clone();
        caches.open(CACHE_NAME).then(function(cache){
          cache.put(event.request, copia);
        });
        return respuesta;
      }).catch(function(){
        // Sin red y sin caché: si pidieron una página, devuelve el index
        if(event.request.mode === "navigate"){
          return caches.match("./index.html");
        }
      });
    })
  );
});
