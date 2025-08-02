import { Field } from "payload";
import tagsField from "@/payload/fields/tags";

const fields: Field[] = [
  {
    name: "companyName",
    type: "text",
    required: true,
  },
  {
    name: "companyWebsiteUrl",
    type: "text",
    required: true,
  },
  {
    name: "position",
    type: "text",
    required: true,
  },
  {
    name: "location",
    type: "text",
    required: false,
  },
  {
    name: "startDate",
    type: "date",
    required: true,
    admin: {
      date: {
        pickerAppearance: "dayOnly",
      },
    },
  },
  {
    name: "endDate",
    type: "date",
    required: false,
    admin: {
      date: {
        pickerAppearance: "dayOnly",
      },
    },
  },
  {
    name: "current",
    type: "checkbox",
    label: "Currently working here",
    admin: {
      position: "sidebar",
    },
    defaultValue: false,
  },
  {
    name: "description",
    type: "textarea",
    required: true,
  },
  {
    name: "logo",
    type: "upload",
    relationTo: "media",
    required: false,
  },
  tagsField({
    admin: {
      position: "sidebar",
    },
  }),
];

export default fields;
