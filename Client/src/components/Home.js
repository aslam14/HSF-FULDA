import React, { useContext } from "react";
import Listing from "./Listing";
import "../css/home.css";
import { HeaderContext } from "./HeaderContext";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

/**
 * landing page includes listing component
 * and passes context values as props to it
 */
const Home = () => {
  const [values, setValues] = useContext(HeaderContext);
  return (
    <div className="container">
    <Container maxWidth="sm">
      <br/><br/>
        <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
          Our Products
        </Typography>
      
    </Container>
      
      <div className="row">
        <Listing
          searchTerm={values.searchTerm}
          searchType={values.searchType}
        />
      </div>
    </div>
    
    
  );
};
export default Home;
