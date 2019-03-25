importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js");

workbox.setConfig({
  debug: true
});

workbox.skipWaiting();
workbox.clientsClaim();

const headerStrategy = workbox.strategies.networkOnly({
  cacheName: "partials"
});

// Use a stale-while-revalidate strategy as a source for part of the response.
const apiStrategy = workbox.strategies.networkOnly({
  cacheName: 'apiStrategy',
});

const streamsStrategy = workbox.streams.strategy([
  // () => fetch("header.partial.html"),
  // console.log(event)
  ({ event }) => headerStrategy.makeRequest({ event, request: "partials/header.html" }),
  ({ event }) => {
    console.log(event);
    let pathname = (new URL(event.request.url)).pathname;
    let requestURL = pathname.replace("checkout", "partials");
    return apiStrategy.makeRequest({
      event,
      request: requestURL,
    })
  },
  // ({ event }) => partialsStrategy.makeRequest({ event, request: "partials/body.partial.0.html" }),
  // ({ event }) => partialsStrategy.makeRequest({ event, request: "partials/body.partial.1.html" }),
  // ({ event }) => partialsStrategy.makeRequest({ event, request: "partials/body.partial.2.html" }),
  // ({ event }) => partialsStrategy.makeRequest({ event, request: "partials/body.partial.3.html" }),
  // ({ event }) => partialsStrategy.makeRequest({ event, request: "partials/footer.partial.html" }),
  // () => fetch("body.partial.html"),
  // () => fetch("footer.partial.html"),
], { 'content-type': 'text/html' });

workbox.routing.registerRoute(
  /checkout/,
  streamsStrategy
);