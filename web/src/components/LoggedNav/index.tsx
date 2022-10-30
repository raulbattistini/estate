import { useContext } from "react";
import { Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { api } from "../../services/api";
import { IUserAuth } from "../../interfaces";

export const LoggedNav = () => {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();
  const { id } = useParams();

  const logout = () => {
    auth.signout();
    navigate("/login");
  };

  const getUser = async () => {
    const res = await api.get(`/users/${id}`);
  };
  return (
    <div className="w-full bg-[#21a0a0]">
      <Grid container className="pt-3 pb-3">
        <Grid item xs={6}>
          <div className="float-left ml-5">
          {auth.user !== null ? (
          <div className="text-white">
            {/* @ts-ignore */}
            {auth!.user!.map((userInfo: IUserAuth, key: number) => {
              return (
                <div>
                  <Link to={`/users/${userInfo.id}`}>
                    <CgProfile className="text-white text-4xl flex cursor-pointer" title="Edit your profile" />
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="mr-5">
            <RiLogoutBoxRLine
              className="text-white text-4xl flex float-right rounded-md cursor-pointer"
              onClick={logout}
              title="Logout"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
