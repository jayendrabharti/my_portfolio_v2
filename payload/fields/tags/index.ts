import { ArrayField } from "payload";

export default function tagsField(props?: Partial<ArrayField>): ArrayField {
  return {
    ...props,
    name: "tags",
    type: "array",
    fields: [
      {
        name: "tag",
        type: "text",
        required: true,
        admin: {
          description: "Enter a tag",
        },
      },
    ],
  };
}
