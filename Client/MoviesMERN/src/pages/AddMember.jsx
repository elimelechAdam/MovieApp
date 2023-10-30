import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Grid,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { addData as AddMemberUtil } from "../utils/apiUtils";
import { Link, useNavigate } from "react-router-dom";

export const AddMember = () => {
  const navigate = useNavigate();
  const [memberData, setMemberData] = useState({
    name: "",
    email: "",
    city: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(memberData);
    // Handle form submission logic here
    try {
      const result = await AddMemberUtil("/members", memberData);
      console.log("Member added successfully:", result);
      setSuccess(result);
      setError(""); // Clear any previous error message
      navigate("/subs");
    } catch (error) {
      console.error("Error while adding member:", error);
      setSuccess(""); // Clear success messages
      setError(error || "An unexpected error occurred."); // Handle other errors
      // Handle error, like showing an error message to the user
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="name"
              label="Name"
              value={memberData.name}
              onChange={(e) =>
                setMemberData({ ...memberData, name: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              value={memberData.email}
              onChange={(e) =>
                setMemberData({
                  ...memberData,
                  email: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="city"
              label="City"
              value={memberData.city}
              onChange={(e) =>
                setMemberData({ ...memberData, city: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" fullWidth className="simpleBtn">
              Add Member
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Link to={"/movies"}>
              <Button type="submit" fullWidth className="simpleBtn">
                Cancel
              </Button>
            </Link>
          </Grid>
        </Grid>
        <br />
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
      </form>
    </Container>
  );
};
