const cacheName = 'shah-sport-v1'
const dynamicCacheName = 'shah-sport-dynamic-v1';
const precachedResources = [
    '/',
    './index.html',
    './manifest.json',
    './assets/js/js.js',
    './assets/css/bootstrap.css',
    './assets/css/styles.css',
    'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
]

const limitCacheSize = async (name, size) => {
    const cache = await caches.open(name);
    const keys = await cache.keys();
    if (keys.length > size) {
        await cache.delete(keys[0]);
        await limitCacheSize(name, size);
    }
};

self.addEventListener('install', async event => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(cacheName);
            await cache.addAll(precachedResources);
        })()
    );
});

self.addEventListener('activate', async event => {
    event.waitUntil(
        (async () => {
            const keys = await caches.keys();
            await Promise.all(keys
                .filter(key => key !== cacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            );
        })()
    );
});

self.addEventListener('fetch', event => {
    event.respondWith((async () => {
            const cacheRes = await caches.match(event.request);
            if (cacheRes) {
                return cacheRes;
            } else {
                try {
                    const fetchRes = await fetch(event.request);
                    const cache = await caches.open(dynamicCacheName);
                    await cache.put(event.request.url, fetchRes.clone());
                    await limitCacheSize(dynamicCacheName, 20);
                    return fetchRes;
                } catch (error) {
                }
            }
        })()
    );
});
