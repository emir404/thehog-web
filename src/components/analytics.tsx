import Script from "next/script";

// Google Tag Manager container + Google Analytics 4 property. These IDs ship
// in the client HTML by design, so they live as constants here rather than env
// vars — keeping the snippet identical to what Google generated.
const GTM_ID = "GTM-TF22TW7V";
const GA_ID = "G-JF4RBNNKRL";

/**
 * Loads GTM and GA4. Both write to the same `window.dataLayer`; GTM's injector
 * and gtag coexist on it safely. Rendered only in production so local dev and
 * preview traffic never reaches the live analytics properties.
 *
 * IMPORTANT: gtag.js loads GA4 ({@link GA_ID}) directly here. Do NOT also add a
 * GA4 Configuration tag for the same property inside the GTM container, or every
 * pageview gets counted twice. Use GTM for other tags; GA4 is wired directly.
 */
export function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      {/* Google Tag Manager — seeds the gtm.start event, then injects gtm.js. */}
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>

      {/* Google Analytics 4 (gtag.js). */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}

/**
 * GTM <noscript> fallback. Must render as the first thing inside <body>. Kept
 * separate from {@link Analytics} because <Script> can't live in a <noscript>,
 * and because this needs a fixed DOM position while the scripts are hoisted.
 */
export function AnalyticsNoScript() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
