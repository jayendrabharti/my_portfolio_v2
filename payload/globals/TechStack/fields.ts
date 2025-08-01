import { Field } from "payload";

const fields: Field[] = [
  {
    name: "items",
    type: "array",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
      },
      {
        name: "icon",
        type: "upload",
        relationTo: "media",
        required: true,
      },
      {
        name: "url",
        type: "text",
        required: false,
      },
      {
        name: "description",
        type: "textarea",
        required: false,
      },
    ],
  },
];

export default fields;
