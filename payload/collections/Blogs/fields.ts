import publishedAt from "@/payload/fields/publishedAt";
import { slugField } from "@/payload/fields/slug";
import tagsField from "@/payload/fields/tags";
import { Field } from "payload";

const fields: Field[] = [
  {
    name: "coverImage",
    type: "upload",
    relationTo: "media",
  },
  {
    name: "title",
    type: "text",
    required: true,
  },
  {
    name: "content",
    type: "richText",
    required: true,
  },
  {
    name: "featured",
    type: "checkbox",
    admin: {
      position: "sidebar",
    },
    defaultValue: true,
  },
  {
    name: "views",
    type: "number",
    admin: {
      position: "sidebar",
    },
    defaultValue: 0,
  },
  ...slugField(),
  publishedAt({
    admin: {
      date: {
        pickerAppearance: "dayAndTime",
      },
      position: "sidebar",
    },
  }),
  tagsField({
    admin: {
      position: "sidebar",
    },
  }),
];

export default fields;
