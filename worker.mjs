const HOST = 'mahaneyehuda.org';
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // אכיפת HTTPS וביטול תת־הדומיין www
    if (url.protocol !== 'https:' || url.hostname === `www.${HOST}`) {
      url.protocol = 'https:';
      url.hostname = HOST;
      url.port = '';
      return Response.redirect(url.href, 301);
    }
    // נרמול סלאש סופי לנתיבים ללא סיומת קובץ (מסלולי עמודים)
    const hasExt = /\.[a-z0-9]{2,}$/i.test(url.pathname);
    if (!url.pathname.endsWith('/') && !hasExt) {
      const target = new URL(url);
      target.pathname += '/';
      return Response.redirect(target.href, 301);
    }
    const assetURL = new URL(request.url);
    const explicitError = ['/404', '/404/', '/404.html'].includes(url.pathname);
    if (explicitError) assetURL.pathname = '/__missing_error_page__';
    const response = await env.ASSETS.fetch(new Request(assetURL, request));
    if (response.status === 404 || explicitError) {
      const headers = new Headers(response.headers);
      headers.set('X-Robots-Tag', 'noindex');
      return new Response(request.method === 'HEAD' ? null : response.body, {
        status: 404,
        headers
      });
    }
    return response;
  }
};
