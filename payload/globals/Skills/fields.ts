import { Field } from "payload";

const fields: Field[] = [
  {
    name: "items",
    type: "array",
    admin: {
      description: "List of skills you want to showcase.",
    },
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
      },
      {
        name: "iconUrl",
        type: "text",
        required: true,
        admin: {
          description:
            "URL to the icon representing the skill. You can find icons for Tech products at devicon.dev or similar icon libraries.",
        },
      },
      {
        name: "url",
        type: "text",
        required: false,
      },
    ],
  },
];

export default fields;
