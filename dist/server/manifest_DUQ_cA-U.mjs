import 'piccolore';
import { j as decodeKey } from './chunks/astro/server_m-MB8ZxY.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DgzkkA4Q.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/rahaman/nehak.site/","cacheDir":"file:///home/rahaman/nehak.site/node_modules/.astro/","outDir":"file:///home/rahaman/nehak.site/dist/","srcDir":"file:///home/rahaman/nehak.site/src/","publicDir":"file:///home/rahaman/nehak.site/public/","buildClientDir":"file:///home/rahaman/nehak.site/dist/client/","buildServerDir":"file:///home/rahaman/nehak.site/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/ai.CdWJIdIR.css"}],"routeData":{"route":"/ai","isIndex":false,"type":"page","pattern":"^\\/ai\\/?$","segments":[[{"content":"ai","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ai.astro","pathname":"/ai","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/chat","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/chat\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"chat","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/chat.ts","pathname":"/api/chat","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/ai.CdWJIdIR.css"}],"routeData":{"route":"/blogs","isIndex":false,"type":"page","pattern":"^\\/blogs\\/?$","segments":[[{"content":"blogs","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blogs.astro","pathname":"/blogs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/ai.CdWJIdIR.css"}],"routeData":{"route":"/gallery","isIndex":false,"type":"page","pattern":"^\\/gallery\\/?$","segments":[[{"content":"gallery","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/gallery.astro","pathname":"/gallery","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/ai.CdWJIdIR.css"}],"routeData":{"route":"/projects","isIndex":false,"type":"page","pattern":"^\\/projects\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects.astro","pathname":"/projects","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/ai.CdWJIdIR.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/home/rahaman/nehak.site/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/home/rahaman/nehak.site/src/pages/projects.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/projects@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/rahaman/nehak.site/src/pages/ai.astro",{"propagation":"none","containsHead":true}],["/home/rahaman/nehak.site/src/pages/blogs.astro",{"propagation":"none","containsHead":true}],["/home/rahaman/nehak.site/src/pages/gallery.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/ai@_@astro":"pages/ai.astro.mjs","\u0000@astro-page:src/pages/api/chat@_@ts":"pages/api/chat.astro.mjs","\u0000@astro-page:src/pages/blogs@_@astro":"pages/blogs.astro.mjs","\u0000@astro-page:src/pages/gallery@_@astro":"pages/gallery.astro.mjs","\u0000@astro-page:src/pages/projects@_@astro":"pages/projects.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DUQ_cA-U.mjs","/home/rahaman/nehak.site/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/home/rahaman/nehak.site/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_2Ef8gTOj.mjs","/home/rahaman/nehak.site/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/home/rahaman/nehak.site/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_DMaYhWhv.mjs","/home/rahaman/nehak.site/src/components/react/ai-chat":"_astro/ai-chat.DC8f0MN5.js","/home/rahaman/nehak.site/src/components/react/project-list":"_astro/project-list.Bi499KSa.js","@astrojs/react/client.js":"_astro/client.B_5Eb-fr.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/ai.CdWJIdIR.css","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/project-list.Bi499KSa.js","/_astro/client.B_5Eb-fr.js","/_astro/index.6otl1p8d.js","/_astro/ai-chat.DC8f0MN5.js","/fonts/Gambarino_Complete (1).zip","/fonts/Switzer_Complete.zip","/fonts/Gambarino/Gambarino_Complete/License/FFL.txt","/fonts/Switzer/Switzer_Complete/License/FFL.txt","/fonts/Gambarino/Gambarino_Complete/Fonts/WEB/README.md","/fonts/Switzer/Switzer_Complete/Fonts/WEB/README.md","/fonts/Gambarino/Gambarino_Complete/Fonts/OTF/Gambarino-Regular.otf","/fonts/Switzer/Switzer_Complete/Fonts/OTF/Switzer-BlackItalic.otf","/fonts/Switzer/Switzer_Complete/Fonts/OTF/Switzer-Black.otf","/fonts/Switzer/Switzer_Complete/Fonts/OTF/Switzer-ExtraboldItalic.otf","/fonts/Switzer/Switzer_Complete/Fonts/OTF/Switzer-Extrabold.otf","/fonts/Switzer/Switzer_Complete/Fonts/OTF/Switzer-BoldItalic.otf","/fonts/Switzer/Switzer_Complete/Fonts/OTF/Switzer-Bold.otf","/fonts/Switzer/Switzer_Complete/Fonts/OTF/Switzer-SemiboldItalic.otf","/fonts/Switzer/Switzer_Complete/Fonts/OTF/Switzer-Semibold.otf","/fonts/Switzer/Switzer_Complete/Fonts/OTF/Switzer-MediumItalic.otf","/fonts/Switzer/Switzer_Complete/Fonts/OTF/Switzer-Medium.otf","/fonts/Switzer/Switzer_Complete/Fonts/OTF/Switzer-Italic.otf","/fonts/Switzer/Switzer_Complete/Fonts/OTF/Switzer-Regular.otf","/fonts/Switzer/Switzer_Complete/Fonts/OTF/Switzer-LightItalic.otf","/fonts/Switzer/Switzer_Complete/Fonts/OTF/Switzer-Light.otf","/fonts/Switzer/Switzer_Complete/Fonts/OTF/Switzer-ExtralightItalic.otf","/fonts/Switzer/Switzer_Complete/Fonts/OTF/Switzer-Extralight.otf","/fonts/Switzer/Switzer_Complete/Fonts/OTF/Switzer-ThinItalic.otf","/fonts/Switzer/Switzer_Complete/Fonts/OTF/Switzer-Thin.otf","/fonts/Switzer/Switzer_Complete/Fonts/TTF/Switzer-VariableItalic.ttf","/fonts/Switzer/Switzer_Complete/Fonts/TTF/Switzer-Variable.ttf","/fonts/Gambarino/Gambarino_Complete/Fonts/WEB/css/gambarino.css","/fonts/Gambarino/Gambarino_Complete/Fonts/WEB/fonts/Gambarino-Regular.eot","/fonts/Gambarino/Gambarino_Complete/Fonts/WEB/fonts/Gambarino-Regular.woff2","/fonts/Gambarino/Gambarino_Complete/Fonts/WEB/fonts/Gambarino-Regular.woff","/fonts/Gambarino/Gambarino_Complete/Fonts/WEB/fonts/Gambarino-Regular.ttf","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-VariableItalic.eot","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-VariableItalic.woff2","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-VariableItalic.woff","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-VariableItalic.ttf","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Variable.eot","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Variable.woff2","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Variable.woff","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Variable.ttf","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-BlackItalic.eot","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-BlackItalic.woff2","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-BlackItalic.woff","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-BlackItalic.ttf","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Black.eot","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Black.woff2","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Black.woff","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Black.ttf","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-ExtraboldItalic.eot","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-ExtraboldItalic.woff2","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-ExtraboldItalic.woff","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-ExtraboldItalic.ttf","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Extrabold.eot","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Extrabold.woff2","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Extrabold.woff","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Extrabold.ttf","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-BoldItalic.eot","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-BoldItalic.woff2","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-BoldItalic.woff","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-BoldItalic.ttf","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Bold.eot","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Bold.woff2","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Bold.woff","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Bold.ttf","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-SemiboldItalic.eot","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-SemiboldItalic.woff2","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-SemiboldItalic.woff","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-SemiboldItalic.ttf","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Semibold.eot","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Semibold.woff2","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Semibold.woff","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Semibold.ttf","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-MediumItalic.eot","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-MediumItalic.woff2","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-MediumItalic.woff","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-MediumItalic.ttf","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Medium.eot","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Medium.woff2","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Medium.woff","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Medium.ttf","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Italic.eot","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Italic.woff2","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Italic.woff","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Italic.ttf","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Regular.eot","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Regular.woff2","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Regular.woff","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Regular.ttf","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-LightItalic.eot","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-LightItalic.woff2","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-LightItalic.woff","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-LightItalic.ttf","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Light.eot","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Light.woff2","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Light.woff","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Light.ttf","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-ExtralightItalic.eot","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-ExtralightItalic.woff2","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-ExtralightItalic.woff","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-ExtralightItalic.ttf","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Extralight.eot","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Extralight.woff2","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Extralight.woff","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Extralight.ttf","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-ThinItalic.eot","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-ThinItalic.woff2","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-ThinItalic.woff","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-ThinItalic.ttf","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Thin.eot","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Thin.woff2","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Thin.woff","/fonts/Switzer/Switzer_Complete/Fonts/WEB/fonts/Switzer-Thin.ttf","/fonts/Switzer/Switzer_Complete/Fonts/WEB/css/switzer.css"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"aXYsBRb2pHd/7mzd5JLI3HUUE6GYdbFkIpHFnO6OleA=","sessionConfig":{"driver":"fs-lite","options":{"base":"/home/rahaman/nehak.site/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
