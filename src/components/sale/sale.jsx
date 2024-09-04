import { Navigate } from "react-router-dom";


const Sale = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }

  return (
    <div>
   
    </div>
  );
};

export default Sale;
