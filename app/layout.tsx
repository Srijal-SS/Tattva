import type { Metadata } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import { DemoProvider } from "@/lib/demo-context";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display-face",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tattva — Learning Beyond the Classroom",
  description:
    "Tattva helps children build life skills, values, and civic sense through short, engaging, interactive learning experiences.",
  keywords: [
    "tattva",
    "life skills",
    "civic sense",
    "children education",
    "values",
    "learning platform",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
      { url: "/logo.png" },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function clean() {
                  var els = document.querySelectorAll('[bis_skin_checked]');
                  for (var i = 0; i < els.length; i++) {
                    els[i].removeAttribute('bis_skin_checked');
                  }
                }
                clean();
                if (typeof MutationObserver !== 'undefined') {
                  new MutationObserver(clean).observe(document.documentElement, {
                    attributes: true,
                    subtree: true,
                    attributeFilter: ['bis_skin_checked']
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
