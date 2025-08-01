import { DateField } from "payload";

export default function publishedAtField(
  props?: Partial<DateField>
): DateField {
  return {
    ...props,
    name: "publishedAt",
    type: "date",
    defaultValue: () => new Date(),
    hooks: {
      beforeChange: [
        ({ siblingData, value }) => {
          if (siblingData._status === "published" && !value) {
            return new Date();
          }
          return value;
        },
      ],
    },
  };
}
