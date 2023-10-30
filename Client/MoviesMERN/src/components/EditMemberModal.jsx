import React from "react";
import { Button, Typography, Grid, TextField, Modal, Box } from "@mui/material";

export const EditMemberModal = ({
  isOpen,
  onClose,
  memberData,
  setMemberData,
  handleFormSubmit,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 5,
        }}
      >
        <Typography gutterBottom variant="overline" fontSize={20}>
          Edit Member
        </Typography>
        <form onSubmit={handleFormSubmit}>
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
                Save
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth className="simpleBtn" onClick={onClose}>
                Cancel
              </Button>
            </Grid>
          </Grid>
          <br />
        </form>
      </Box>
    </Modal>
  );
};
