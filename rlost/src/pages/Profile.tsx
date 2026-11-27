import { useEffect, useState } from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { dataConnect, auth } from "../firebase";
import { listUserFoundItems, type ListUserFoundItemsData } from "@dataconnect/generated";
import styles  from "./Profile.module.css";
import formsStyle from "../components/FoundForm.module.css";

const Profile = () => {
    const [foundItems, setFoundItems] = useState<ListUserFoundItemsData["items"]>([]);
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
        const result = await listUserFoundItems(dataConnect);
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

       <div className={styles.container}>
       <h1> My Profile </h1>

        {currentUser.photoURL && (
          <img
            src={currentUser.photoURL}
            alt="Profile"
            referrerPolicy="no-referrer"
            style={{ width: "64px", height: "64px", borderRadius: "50%" }}
          />
        )}
        <span>{currentUser.displayName}</span>
      <h2>My Found Items</h2>
      {foundItems.length === 0 ? (
        <p>You haven't posted any found items yet.</p>
      ) : (
        <div className={formsStyle.itemSpace}>
        {foundItems.map((item) => (
          <div key={item.id} className={formsStyle.itemList}>
          <h3 style={{ margin: "0 0 0.5rem 0" }}><strong>{item.itemName}</strong></h3>
        {/* Display Status Badge */}
      <p style={{ margin: "0.25rem 0" }}>
          <strong>Status:</strong>{" "}
          <span style={{ color: formsStyle.lostStatus ? "#d9534f" : "#5cb85c", fontWeight: "bold" }}>
          {formsStyle.lostStatus ? "Lost Item" : "Found Item"}
          </span>
      </p>

      {item.description && <p style={{ margin: "0.25rem 0" }}><strong>Description:</strong> {item.description}</p>}
      {item.location && <p style={{ margin: "0.25rem 0" }}><strong>Location:</strong> {item.location}</p>}
      {item.category && <p style={{ margin: "0.25rem 0" }}><strong>Category:</strong> {item.category}</p>}
      
      {item.imageLink && (
          <div className={formsStyle.image}>
              <img src={item.imageLink} alt={item.itemName} className={formsStyle.image} 
              />
          </div>
          )}
          </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;