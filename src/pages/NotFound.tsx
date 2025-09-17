import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Not Found</h1>
      <p>Heyy there, you seem to be a bit lost.</p>
      <button onClick={() => navigate("/")}>Back to Safety</button>
    </div>
  );
}
