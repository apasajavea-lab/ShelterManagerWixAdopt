import { notFound, redirect, WixRouterSitemapEntry } from "wix-router";
import { fetch } from "wix-fetch";

const FEED_URL = "https://service.sheltermanager.com/asmservice?method=animal_view_adoptable_js&account=zz1727";

function dogSlug(value) {
  return String(value || "dog")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "dog";
}

function ageInMonths(dog) {
  const date = String(dog.DATEOFBIRTH || "").slice(0, 10);
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return -1;
  const now = new Date();
  let months = (now.getUTCFullYear() - Number(match[1])) * 12 + now.getUTCMonth() - (Number(match[2]) - 1);
  if (now.getUTCDate() < Number(match[3])) months -= 1;
  return Math.max(0, months);
}

function dogSize(dog) {
  const value = String(dog.SIZENAME || "");
  if (/small|peque|klein/i.test(value)) return "small";
  if (/medium|medio|mittel/i.test(value)) return "medium";
  if (/large|grande|groß|gross/i.test(value)) return "large";
  const numeric = Number(dog.SIZE);
  return numeric === 3 ? "small" : numeric === 2 ? "medium" : numeric === 1 || numeric === 0 ? "large" : "";
}

function isReserved(dog) {
  return [dog.ANIMALISRESERVED, dog.HASACTIVERESERVE, dog.ISRESERVED, dog.RESERVED]
    .some(value => /^(1|true|yes|si|sí|ja)$/i.test(String(value || "").trim())) ||
    /reserved|reservad[oa]|reserviert/i.test(String(dog.ADOPTIONSTATUS || dog.RESERVATIONSTATUS || ""));
}

function addSlugs(dogs) {
  const groups = new Map();
  dogs.forEach(dog => {
    const baseSlug = dogSlug(dog.ANIMALNAME);
    if (!groups.has(baseSlug)) groups.set(baseSlug, []);
    groups.get(baseSlug).push(dog);
  });
  groups.forEach((group, baseSlug) => {
    group.sort((left, right) => Number(left.ID) - Number(right.ID));
    group.forEach((dog, index) => { dog.profileSlug = index ? `${baseSlug}-${index + 1}` : baseSlug; });
  });
  return dogs;
}

async function currentDogs() {
  const response = await fetch(FEED_URL, { method: "get" });
  if (!response.ok) throw new Error(`ShelterManager returned ${response.status}`);
  const source = await response.text();
  const match = source.match(/var adoptables\s*=\s*(\[[\s\S]*?\]);\s*var account\s*=/);
  if (!match) throw new Error("Could not read the ShelterManager dog list");
  return addSlugs(JSON.parse(match[1]));
}

function languageFromRequest(request) {
  const url = String(request.url || request.baseUrl || "");
  const match = url.match(/\/(es|de)(?:\/|$)/i);
  return match ? match[1].toLowerCase() : "en";
}

export async function adopt_Router(request) {
  if (!request.path || request.path.length !== 1) return notFound();

  try {
    const requestedSlug = dogSlug(decodeURIComponent(request.path[0]));
    const dog = (await currentDogs()).find(item => item.profileSlug === requestedSlug);
    if (!dog) return notFound();

    const lang = languageFromRequest(request);
    const languagePrefix = lang === "en" ? "" : `/${lang}`;
    const siteBase = String(request.baseUrl).replace(/\/$/, "").replace(/\/(?:es|de)$/i, "");
    const target = new URL(`${siteBase}${languagePrefix}/dogprofile`);
    target.searchParams.set("animalid", String(dog.ID));
    target.searchParams.set("lang", lang);
    target.searchParams.set("slug", dog.profileSlug);
    const colour = String(dog.BASECOLOURNAME || dog.ADOPTAPETCOLOUR || "").trim();
    if (colour) target.searchParams.set("colour", colour);
    const size = dogSize(dog);
    if (size) target.searchParams.set("size", size);
    if (ageInMonths(dog) >= 120) target.searchParams.set("senior", "1");
    if (isReserved(dog)) target.searchParams.set("reserved", "1");
    const returnLocation = request.query && request.query.return;
    if (returnLocation) target.searchParams.set("return", String(returnLocation));

    return redirect(target.toString(), "302");
  } catch (error) {
    console.error("APASA adopt router failed", error);
    return notFound();
  }
}

export async function adopt_SiteMap(sitemapRequest) {
  try {
    return (await currentDogs()).map(dog => {
      const entry = new WixRouterSitemapEntry(dog.ANIMALNAME);
      entry.pageName = sitemapRequest.pages[0];
      entry.url = `/adopt/${dog.profileSlug}`;
      entry.title = `${dog.ANIMALNAME} | Adopt a dog from APASA`;
      return entry;
    });
  } catch (error) {
    console.error("APASA adopt sitemap failed", error);
    return [];
  }
}
