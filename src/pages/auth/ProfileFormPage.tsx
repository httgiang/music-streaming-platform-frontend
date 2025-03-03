import { Box, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import {
  initialUserProfileValues,
  userProfileValidationSchema,
} from "@/types/user";

const ProfileFormPage = () => {
  const formik = useFormik({
    initialValues: initialUserProfileValues,
    validationSchema: userProfileValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box width="100%">
      <form onSubmit={formik.handleSubmit}>
        <Stack flexDirection="column" spacing={2}>
          <TextField
            required
            fullWidth
            autoFocus
            placeholder="Enter name"
            type="text"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            size="small"
          ></TextField>
        </Stack>
      </form>
    </Box>
  );
};

export default ProfileFormPage;
