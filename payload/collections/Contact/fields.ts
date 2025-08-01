import { Field } from "payload";

const fields: Field[] = [
  {
    name: "name",
    type: "text",
    label: "Your Name",
    required: false,
  },
  {
    name: "email",
    type: "email",
    label: "Your Email",
    required: true,
  },
  {
    name: "subject",
    type: "text",
    label: "Subject",
    required: true,
  },
  {
    name: "message",
    type: "textarea",
    label: "Message",
    required: true,
    minLength: 10,
  },
  {
    name: "read",
    type: "checkbox",
    label: "Read",
    defaultValue: false,
    admin: {
      position: "sidebar",
    },
  },
];

export default fields;
