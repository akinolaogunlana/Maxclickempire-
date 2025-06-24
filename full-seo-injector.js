(function () {
  const getText = (selector) => document.querySelector(selector)?.innerText?.trim() || "";
  const getAttr = (selector, attr) => document.querySelector(selector)?.getAttribute(attr) || "";

  const title = getText("h1.post-title") || document.title || "MaxClickEmpire – Affiliate Marketing, Google Docs Templates, AI Tools";
  
  const description = document.querySelector("meta[name='description']")?.content?.trim() ||
    "MaxClickEmpire empowers creators and marketers with proven affiliate marketing strategies, AI-powered productivity tools, Google Docs resume & planner templates, blogging monetization hacks, SEO tips, and digital business blueprints.";

  const url = window.location.href;
  const author = "Ogunlana Akinola Okikiola";
  const logo = "https://www.maxclickempire.com/favicon.ico";
  const image = document.querySelector("img")?.src || logo;
  const publishedTime = getAttr("abbr.published", "title") || new Date().toISOString();
  const modifiedTime = new Date().toISOString();

  // Remove conflicting meta tags
  const removeOld = [
    "og:title", "og:description", "og:url", "og:type",
    "twitter:title", "twitter:description", "twitter:image", "twitter:card"
  ];
  removeOld.forEach(name => {
    const el = document.querySelector(`meta[property='${name}'], meta[name='${name}']`);
    if (el) el.remove();
  });

  // Inject meta tags with keyword optimization
  const metas = [
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image }
  ];

  metas.forEach(tag => {
    const meta = document.createElement("meta");
    Object.keys(tag).forEach(k => meta.setAttribute(k, tag[k]));
    document.head.appendChild(meta);
  });

  // Inject structured JSON-LD schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author
    },
    "datePublished": publishedTime,
    "dateModified": modifiedTime,
    "image": image,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "publisher": {
      "@type": "Organization",
      "name": "MaxClickEmpire",
      "logo": {
        "@type": "ImageObject",
        "url": logo
      }
    }
  };

  const schemaScript = document.createElement("script");
  schemaScript.type = "application/ld+json";
  schemaScript.textContent = JSON.stringify(schema);
  document.head.appendChild(schemaScript);
})();
