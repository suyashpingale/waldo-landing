import localFont from "next/font/local";

export const mottle = localFont({
  src: [
    { path: "../public/fonts/Mottle[wght].ttf", weight: "400 900", style: "normal" },
    { path: "../public/fonts/Mottle-Italic[wght].ttf", weight: "400 900", style: "italic" },
  ],
  variable: "--font-headline",
  display: "swap",
});

export const sfProRounded = localFont({
  src: [
    { path: "../public/fonts/SF-Pro-Rounded-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/SF-Pro-Rounded-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});
