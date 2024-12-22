export function setCookie(name: string, value: string, days: number): void {
  let expires: string = "";
  if (days) {
    const date: Date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  document.cookie =
    name + "=" + encodeURIComponent(value) + expires + "; path=/";
}
