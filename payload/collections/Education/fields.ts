import { Field } from "payload";

const fields: Field[] = [
  {
    name: "logo",
    type: "upload",
    relationTo: "media",
    required: true,
  },
  {
    name: "schoolName",
    type: "text",
    label: "Name of School/Institution",
    required: true,
  },
  {
    name: "course",
    type: "text",
    label: "Course",
    required: false,
  },
  {
    type: "row",
    fields: [
      {
        name: "fromYear",
        type: "text",
        label: "From Year",
        required: true,
        admin: {
          width: "50%",
        },
      },
      {
        name: "toYear",
        type: "text",
        label: "To Year",
        required: true,
        admin: {
          width: "50%",
        },
      },
    ],
  },
  {
    type: "row",
    fields: [
      {
        name: "gradingSystem",
        type: "radio",
        label: "Grading System",
        options: [
          {
            label: "CGPA",
            value: "cgpa",
          },
          {
            label: "Percentage",
            value: "percentage",
          },
        ],
        defaultValue: "cgpa",
        required: true,
        admin: {
          width: "50%",
        },
      },
      {
        name: "gradeValue",
        type: "text",
        label: "Grade Value",
        required: true,
        admin: {
          width: "50%",
        },
      },
    ],
  },
];

export default fields;
