import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

export const AdminSection = () => {
  return (
    <div className="bg-[#046865]">
      <Grid container>
        <Grid item xs={12}>
          <span className="float-right text-xs text-white pr-5 pt-2 underline">
            <Link to="/admin"> Admin Area</Link>{" "}
          </span>
        </Grid>
      </Grid>
    </div>
  );
};
