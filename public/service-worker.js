self.addEventListener("fetch", (event) => {
  if (
    event.request.url.endsWith("jpg") ||
    event.request.url.endsWith("png") ||
    event.request.url.endsWith("mp3") ||
    event.request.url.includes("supabase.co/storage/v1/object/sign")
  ) {
    event.respondWith(cacheResponse(event.request));
    console.log("Caching response for:", event.request.url);
  }
});

async function cacheResponse(request) {
  const cache = await caches.open("music-cache");
  const match = await cache.match(request.url);
  if (match) {
    return match;
  }

  const response = await fetch(request);
  const responseClone = response.clone();
  await cache.put(request, responseClone); // Cache the cloned response
  return response;
}
