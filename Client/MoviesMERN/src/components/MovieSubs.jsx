import { CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const MovieSubs = ({ movieId }) => {
  const subs = useSelector((state) => state.search.subs);
  const members = useSelector((state) => state.search.members);

  const filtered = subs.filter((sub) => sub.movieId == movieId);
  return (
    <CardContent sx={{ padding: 1 }}>
      <Typography gutterBottom variant="button" component="div">
        Subscribers
      </Typography>
      {console.log("subs ", subs)}
      {console.log("filtered ", filtered)}

      {filtered.map((sub, idx) => {
        const memberName = members.find(
          (member) => member._id === sub.memberId
        )?.name;

        return (
          <Link to={`/subs/${sub.memberId}`} key={idx}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              fontSize={12}
              key={idx}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "black",
                },
              }}
            >
              {memberName} , {sub.date}
            </Typography>
          </Link>
        );
      })}
    </CardContent>
  );
};
