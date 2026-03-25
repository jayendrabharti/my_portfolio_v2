import { Field } from "payload";

const fields: Field[] = [
  {
    type: "tabs",
    tabs: [
      {
        label: "Features",
        fields: [
          {
            type: "checkbox",
            name: "workExperience",
            label: "Work Experience",
            defaultValue: true,
          },
          {
            type: "checkbox",
            name: "education",
            label: "Education",
            defaultValue: true,
          },
          {
            type: "checkbox",
            name: "projects",
            label: "Projects",
            defaultValue: true,
          },
          {
            type: "checkbox",
            name: "blogs",
            label: "Blogs",
            defaultValue: true,
          },
          {
            type: "checkbox",
            name: "skills",
            label: "Skills",
            defaultValue: true,
          },
          {
            type: "checkbox",
            name: "github",
            label: "GitHub Activity",
            defaultValue: true,
          },
        ],
      },
    ],
  },
];

export default fields;
