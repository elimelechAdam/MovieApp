import { Grid } from "@mui/material/";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MemberCard } from "../components/MemberCard";

export const Member = () => {
  const { memberid } = useParams();
  const memberData = useSelector((state) => state.search.members);
  console.log(memberData);

  const findMember = () => memberData.find((member) => member._id == memberid);
  console.log(findMember());

  return (
    <Grid item xs={4}>
      <MemberCard {...findMember()} />
    </Grid>
  );
};
