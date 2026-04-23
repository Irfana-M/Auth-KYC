import { useState, useEffect } from "react";
import { getPaginatedUsers } from "../services/authService";
import { toast } from "react-toastify";
import ProtectedLayout from "../components/layout/ProtectedLayout";
import Button from "../components/common/Button";

const Dashboard = () => {
  const [data, setData] = useState<any>({ users: [], total: 0, pages: 1 });
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getPaginatedUsers(page, limit, search);
      setData(res.data || { users: [], total: 0, pages: 1 });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-900">User Dashboard</h1>

          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="px-5 py-3 border border-gray-300 rounded-xl w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8 text-gray-500">Loading users...</div>
        )}

        {!loading && (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">ID</th>
                  <th className="px-6 py-4 text-left font-semibold">Email</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    KYC Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.users.length > 0 ? (
                  data.users.map((user: any) => (
                    <tr key={user.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm text-gray-500">
                        {user.id}
                      </td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.kycSubmitted
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {user.kycSubmitted ? "Submitted" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-between items-center">
          <Button
            variant="secondary"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
          >
            Previous
          </Button>

          <span className="text-gray-600 font-medium">
            Page {page} of {data.pages || 1} | Total {data.total || 0} users
          </span>

          <Button
            variant="secondary"
            onClick={() => setPage((p) => Math.min(data.pages || 1, p + 1))}
            disabled={page === (data.pages || 1) || loading}
          >
            Next
          </Button>
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default Dashboard;
