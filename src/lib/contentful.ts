import contentful from "contentful";
import type { EntryFieldTypes } from "contentful";

export interface Video {
  contentTypeId: "video";
  fields: {
    title: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    video: EntryFieldTypes.Object;
    videoPoster: EntryFieldTypes.Object;
    description: EntryFieldTypes.RichText;
    inHome: EntryFieldTypes.Boolean;
  };
}
export interface Home {
  contentTypeId: "home";
  fields: {
    slug: EntryFieldTypes.Text;
    onomatopeaIntro: EntryFieldTypes.Text;
    openingText: EntryFieldTypes.RichText;
    valuesTitle: EntryFieldTypes.Text;
    valuesText1: EntryFieldTypes.RichText;
    valuesText2: EntryFieldTypes.RichText;
    servicesTitle: EntryFieldTypes.Text;
    services: EntryFieldTypes.Object;
    workTitle: EntryFieldTypes.Text;
  };
}

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});
