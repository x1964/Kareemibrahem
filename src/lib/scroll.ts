export function scrollToHash(hash: string) {
  const lenis = window.__lenis;
  if (lenis) {
    if (hash === "#top") {
      lenis.scrollTo(0, { offset: 0 });
    } else {
      lenis.scrollTo(hash, { offset: -72 });
    }
    return;
  }
  if (hash === "#top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.querySelector(hash);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}
