import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/apiUtils";
import { Grid, Fade } from "@mui/material/";
import { MemberCard } from "../components/MemberCard";
import CircularProgress from "@mui/material/CircularProgress";

export const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const deleteMember = (id) => {
    const newMembers = members.filter((member) => member._id !== id);
    return setMembers(newMembers);
  };

  const editMember = (id, obj) => {
    const objData = {
      _id: id,
      ...obj,
    };
    const updatedMembers = members.map((member) =>
      member._id === id ? objData : member
    );
    return setMembers(updatedMembers);
  };
  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      const members = await fetchData("/members");
      setMembers(members);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch members:", error.message);
    }
  };
  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <>
      {!isLoading ? (
        members.map((member, idx) => {
          return (
            <Fade in={members.length > 0} timeout={500} key={idx}>
              <Grid item xs={4} key={idx}>
                <MemberCard
                  {...member}
                  deleteMember={deleteMember}
                  editMember={editMember}
                />
              </Grid>
            </Fade>
          );
        })
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
