import {Grid} from "@mui/material";
import {Header} from '../../components/Header';
import {Footer} from '../../components/Footer';


export const RegisterProperty = () => {
  return (
    <div className="w-full bg-[#046865]">
      <Header />
      <Grid container>
        <Grid item xs={12}>
          Register form for property
        </Grid>
      </Grid>
      <Footer />
    </div>
  )
}
