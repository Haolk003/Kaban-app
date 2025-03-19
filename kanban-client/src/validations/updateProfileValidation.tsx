import * as yup from "yup";

export const updateProfileSchema = yup.object().shape({
  name: yup.string().trim().required("Name is required"),
  jobName: yup.string().trim().optional(),
  location: yup.string().trim().optional(),
  bio: yup.string().max(300, "Bio must be less than 300 characters").optional(),
});

export type UpdateProfileFormValue = yup.InferType<typeof updateProfileSchema>;
