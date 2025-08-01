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
    name: "description",
    type: "textarea",
    required: true,
  },
  {
    name: "githubUrl",
    type: "text",
    required: true,
  },
  {
    name: "liveUrl",
    type: "text",
    required: true,
  },
  {
    name: "featured",
    type: "checkbox",
    admin: {
      position: "sidebar",
    },
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
