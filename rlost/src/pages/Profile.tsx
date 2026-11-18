import { useEffect, useState } from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { dataConnect, auth } from "../firebase";
import { searchFoundItems, type SearchFoundItemsData } from "@dataconnect/generated";

const Profile = () => {
    const [foundItems, setFoundItems] = useState<SearchFoundItemsData["items"]>([]);
    const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (!user) {
        setFoundItems([]);
        setLoading(false);
        return;
      }

      try {
        // Match the variable name (e.g., userId) to whatever you named it in queries.gql
        const result = await searchFoundItems(dataConnect);
        setFoundItems(result.data.items);
      } catch (error) {
        console.error("Error fetching found items:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!currentUser) {
        return <div>Please sign in to view your profile.</div>;
    } 

    return (
       <div>
      <h1>Profile</h1>
      <h2>My Found Items</h2>
      {foundItems.length === 0 ? (
        <p>You haven't posted any found items yet.</p>
      ) : (
        <ul>
          {foundItems.map((item) => (
            <li key={item.id}>
              <strong>{item.itemName}</strong> - {item.description} - {item.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;