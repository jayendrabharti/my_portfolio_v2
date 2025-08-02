import { Field } from "payload";

const fields: Field[] = [
  {
    name: "avatar",
    type: "upload",
    relationTo: "media",
    required: false,
  },
  {
    name: "name",
    type: "text",
    required: true,
  },
  {
    name: "email",
    type: "text",
    required: true,
  },
  {
    name: "logoText",
    type: "text",
    required: true,
  },
  {
    name: "bio",
    label: "Your bio",
    type: "richText",
    required: true,
  },
  {
    name: "location",
    label: "Your Location",
    type: "text",
    required: false,
  },
  {
    name: "locationUrl",
    label: "Your Location URL",
    type: "text",
    required: false,
  },
  {
    name: "githubUrl",
    type: "text",
    required: false,
  },
  {
    name: "linkedinUrl",
    type: "text",
    required: false,
  },
  {
    name: "websiteUrl",
    type: "text",
    required: false,
  },
  {
    name: "resume",
    type: "upload",
    relationTo: "media",
    required: false,
  },
  {
    name: "socials",
    type: "array",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
      },
      {
        name: "url",
        type: "text",
        required: true,
      },
    ],
  },
];

export default fields;
