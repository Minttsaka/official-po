import { htmlToText } from "html-to-text";

export function stripHtml(content:string) {
    return htmlToText(content, {
        selectors: [
            { selector: 'p', format: 'inline' },
            { selector: 'img', format: 'skip' }, // Skip images
            { selector: 'video', format: 'skip' }, // Skip videos
            { selector: 'a', options: { ignoreHref: true } }, // Ignore links
            // Add more selectors as needed
          ],
      });
  }