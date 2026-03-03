async function findTheFlag(url) {
  const resp = await fetch(url);
  const html = await resp.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const links = Array.from(doc.querySelectorAll("a"));

  for (let link of links) {
    const href = link.getAttribute("href");
    if (href === "../") continue;

    if (href === "README") {
      const fileResp = await fetch(url + href);
      const content = await fileResp.text();

      // Comprehensive noise filter based on the French clues
      const isNoise =
        content.includes("Demande") ||
        content.includes("Toujours") ||
        content.includes("Non") ||
        content.includes("Tu veux") ||
        content.includes("proche") ||
        content.includes("voisin") ||
        content.includes("Moi aussi");

      if (!isNoise && content.trim().length > 0) {
        console.log(
          "%c🎯 FLAG FOUND!",
          "color: #00ff00; font-weight: bold; font-size: 20px;",
        );
        console.log("%cLocation: " + url + href, "color: #00aaff;");
        console.log(
          "%cContent: " + content.trim(),
          "background: #222; color: #bada55; padding: 5px;",
        );
      }
    } else if (href.endsWith("/")) {
      await findTheFlag(url + href);
    }
  }
}

console.log("🚀 Scanning deep directory tree... This takes about 1-2 minutes.");
findTheFlag("http://192.168.64.2/.hidden/").then(() => {
  console.log(
    "%c✅ SCRIPT COMPLETE: All directories searched.",
    "color: orange; font-weight: bold; font-size: 16px;",
  );
});
