export const FixLinkText = (text: string = "") => {
  return text.replaceAll("'", "").toLocaleLowerCase().trim();
}
