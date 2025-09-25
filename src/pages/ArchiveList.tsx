import { useQuery } from "@tanstack/react-query";
import { getArchives } from "../services/archive.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CreateArchiveModal from "../components/CreateArchiveModal";

export default function ArchiveList() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const navigate = useNavigate();

  const {
    data: archives,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["archives", "get-all"], // this should also contain pagination related data
    queryFn: getArchives,
  });

  const isEmpty = archives?.data.length === 0;

  const statusMsg = isLoading || isRefetching ? "Loading..." : isError ? "Error :(" : "Should have data";

  return (
    <div>
      <h1>Archives</h1>

      <div>
        <strong>Status:</strong> <span>{statusMsg}</span>
      </div>

      <div>
        <strong>Data:</strong> <span>{isEmpty ? "No Data found" : "Data Available"}</span>
      </div>

      <div>
        <button disabled={isRefetching || isLoading} onClick={() => refetch()}>
          Refetch
        </button>
      </div>

      <div>
        <button onClick={() => setShowCreateForm((val) => !val)}>Create Archive</button>

        {showCreateForm && (
          <dialog open={showCreateForm} onClose={() => setShowCreateForm(false)}>
            <CreateArchiveModal />
          </dialog>
        )}
      </div>

      <div>
        <ul>
          {archives?.data?.map(({ id, name, description }) => (
            <li key={id} onClick={() => navigate(`/archives/${id}`)}>
              Name: {name} | {description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
