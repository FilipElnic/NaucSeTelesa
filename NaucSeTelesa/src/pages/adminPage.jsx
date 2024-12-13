import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

const supabase = createClient(
  "https://bviuhriolcuvayzbgzum.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aXVocmlvbGN1dmF5emJnenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1MDgyOTksImV4cCI6MjA0NTA4NDI5OX0.A5c9eHjNu37OaCt9DTCr-aKFHvyG8z1X_dHLpxl7aRc"
);

function AdminPage() {
  const [authUser, setAuthUser] = useState(null); // Authenticated user
  const [isAdmin, setIsAdmin] = useState(null); // Admin status
  const [users, setUsers] = useState([]); // All users list
  const [showUsers, setShowUsers] = useState(false); // Toggle user visibility

  // Fetch authenticated user details
  useEffect(() => {
    async function fetchAuthUser() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
      } else if (session) {
        setAuthUser(session.user); // Set the authenticated user in state
      }
    }

    fetchAuthUser();
  }, []);

  // Fetch admin status from the database
  useEffect(() => {
    async function fetchAdminStatus() {
      if (authUser) {
        const { data, error } = await supabase
          .from("user")
          .select("admin")
          .eq("authid", authUser.id);

        if (error) {
          console.error("Error fetching admin status:", error);
        } else if (data && data.length > 0) {
          setIsAdmin(data[0].admin); // Set the admin status in state
        }
      }
    }

    fetchAdminStatus();
  }, [authUser]);

  // Fetch all users
  const fetchAllUsers = async () => {
    if (!showUsers) {
      const { data, error } = await supabase.from("user").select("*");
      console.log("All users:", data);

      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data); // Set the users in state
      }
    }
    setShowUsers((prev) => !prev); // Toggle user visibility
  };

  return (
    <>
      <div className="">
        {authUser ? (
          <div>
            {isAdmin && (
              <div>
                <button onClick={fetchAllUsers}>
                  {showUsers ? "Hide Users" : "Show All Users"}
                </button>
                {/* Add other admin buttons as needed */}
              </div>
            )}
            {showUsers && users.length > 0 && (
              <div>
                <h2>All Users:</h2>
                <ul>
                  {users.map((user) => (
                    <li key={user.id}>
                      User id: {user.id}, name: {user.name}, surname:{" "}
                      {user.surname}, nickname: {user.nickname}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </>
  );
}

export default AdminPage;
