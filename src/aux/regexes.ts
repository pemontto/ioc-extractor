import { tldRegexString } from "./tlds";

function check(s: string, regex: RegExp): boolean {
  if (s.match(regex)) {
    return true;
  }
  return false;
}

export const md5Regex = /\b[A-Fa-f0-9]{32}\b/gi;
export function isMD5(s: string): boolean {
  return check(s, md5Regex);
}

export const sha1Regex = /\b[A-Fa-f0-9]{40}\b/gi;
export function isSHA1(s: string): boolean {
  return check(s, sha1Regex);
}

export const sha256Regex = /\b[A-Fa-f0-9]{64}\b/gi;
export function isSHA256(s: string): boolean {
  return check(s, sha256Regex);
}

export const sha512Regex = /\b[A-Fa-f0-9]{128}\b/gi;
export function isSHA512(s: string): boolean {
  return check(s, sha512Regex);
}

export const ssdeepRegex = /\b\d{1,}:[A-Za-z0-9/+]{3,}:[A-Za-z0-9/+]{3,}/gi;
export function isSSDEEP(s: string): boolean {
  return check(s, ssdeepRegex);
}

export const asnRegex = /(AS|ASN)\d+/gi;
export function isASN(s: string): boolean {
  return check(s, asnRegex);
}

const domain = `([a-z\\u00a1-\\uffff0-9-]+(\\.[a-z\\u00a1-\\uffff0-9]+)*\\.(${tldRegexString})\\b)`;
export const domainRegex = new RegExp(domain, "giu");
export function isDomain(s: string): boolean {
  return check(s, domainRegex);
}

export const emailRegex = new RegExp(`[A-Za-z0-9_.]+@${domain}`, "giu");
export function isEmail(s: string): boolean {
  return check(s, emailRegex);
}

const ipv4 =
  "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\[?\\.]?){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
export const ipv4Regex = new RegExp(ipv4, "gi");
export function isIPv4(s: string): boolean {
  return check(s, ipv4Regex);
}

const v6seg = "[a-fA-F\\d]{1,4}";
const ipv6 = `
(
(?:${v6seg}:){7}(?:${v6seg}|:)|                                // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:${v6seg}:){6}(?:${ipv4}|:${v6seg}|:)|                         // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:${v6seg}:){5}(?::${ipv4}|(:${v6seg}){1,2}|:)|                 // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:${v6seg}:){4}(?:(:${v6seg}){0,1}:${ipv4}|(:${v6seg}){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:${v6seg}:){3}(?:(:${v6seg}){0,2}:${ipv4}|(:${v6seg}){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:${v6seg}:){2}(?:(:${v6seg}){0,3}:${ipv4}|(:${v6seg}){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:${v6seg}:){1}(?:(:${v6seg}){0,4}:${ipv4}|(:${v6seg}){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::((?::${v6seg}){0,5}:${ipv4}|(?::${v6seg}){1,7}|:))           // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(%[0-9a-zA-Z]{1,})?                                           // %eth0            %1
`
  .replace(/\s*\/\/.*$/gm, "")
  .replace(/\n/g, "")
  .trim();

export const ipv6Regex = new RegExp(ipv6, "gi");
export function isIPv6(s: string): boolean {
  return check(s, ipv6Regex);
}

const protocol = "(?:(?:https?)://)";
const auth = "(?:\\S+(?::\\S*)?@)?";
const port = "(?::\\d{2,5})?";
const path = '(?:[/?#][^\\s"]*)?';
const url = `(?:${protocol})${auth}(?:localhost|${ipv4}|${domain})${port}${path}`;

export const urlRegex = new RegExp(url, "gi");
export function isURL(s: string): boolean {
  return check(s, urlRegex);
}

export const cveRegex = /(CVE-(19|20)\d{2}-\d{4,7})/gi;
export function isCVE(s: string): boolean {
  return check(s, cveRegex);
}

export const btcRegex = /\b[13][a-km-zA-HJ-NP-Z0-9]{26,33}\b/gi;
export function isBTC(s: string): boolean {
  return check(s, btcRegex);
}

export const xmrRegex = /\b4[0-9AB][1-9A-HJ-NP-Za-km-z]{93}\b/gi;
export function isXMR(s: string): boolean {
  return check(s, xmrRegex);
}

export const gaPubIDRegex = /pub-\d{16}/gi;
export function isGAPubID(s: string): boolean {
  return check(s, gaPubIDRegex);
}

export const gaTrackIDRegex = /UA-\d{4,9}(-\d{1,2})?/gi;
export function isGATrackID(s: string): boolean {
  return check(s, gaTrackIDRegex);
}

export const macAddressRegex = /\b(?:[A-Fa-f0-9]{2}([-:]))(?:[A-Fa-f0-9]{2}\1){4}[A-Fa-f0-9]{2}\b/gi;
export function isMacAddress(s: string): boolean {
  return check(s, macAddressRegex);
}
