import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { userProfile } from "../services/auth.service";
import { useQuery } from "@tanstack/react-query";

export default function MainDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const {
    data: profile,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["auth", "profile"],
    queryFn: userProfile,
    enabled: false,
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>MainDashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => refetch()}>Profile Query</button>
      <hr />
      <div>
        <h5>isLoading:</h5> <span>{isLoading && "Loading..."}</span>
      </div>
      <div>
        <h5>isError:</h5> <span>{isError && "Error"}</span>
      </div>
      <pre>{JSON.stringify(profile)}</pre>
    </div>
  );
}
