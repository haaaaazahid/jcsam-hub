import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_EMAIL = "juniorcollegesportsassociation@gmail.com";

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        if (user.email !== ADMIN_EMAIL) {
          alert("Access denied: Only admin allowed");
          await supabase.auth.signOut();
          setUser(null);
        } else {
          setUser(user);
        }
      }
      setLoading(false);
    };

    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const user = session?.user;

        if (user) {
          if (user.email !== ADMIN_EMAIL) {
            alert("Access denied: Only admin allowed");
            await supabase.auth.signOut();
            setUser(null);
          } else {
            setUser(user);
          }
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {user ? (
        <h1>Admin Panel</h1>
      ) : (
        <h1>Please login with admin account</h1>
      )}
    </div>
  );
}

export default App;