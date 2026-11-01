import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, dataConnect } from "../firebase";
import { createItem, listFoundItems, type ListFoundItemsData } from "@dataconnect/generated"; 
import styles from "./FoundForm.module.css";

export function FoundItemForm() {
    const [itemName, setItemName] = useState("");
    const [locationFound, setLocationFound] = useState("");
    const [locationTurnedIn, setLocationTurnedIn] = useState("");
    const [category, setCategory] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [timeFound, setTimeFound] = useState("");
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);
    
    // State to store the list of found items
    const [foundItems, setFoundItems] = useState<ListFoundItemsData["items"]>([]);

    // Function to fetch found items from Data Connect
    const fetchFoundItems = async () => {
        try {
            const result = await listFoundItems(dataConnect); 
            setFoundItems(result.data.items);
        } catch (error) {
            console.error("Error fetching found items:", error);
        }
    };

    // Fetch items when the component first loads
    useEffect(() => {
        fetchFoundItems();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        try {
            let imageURL = "";
            if (imageFile) {
                const storagePath = 'items/' + imageFile.name;
                const storageRef = ref(storage, storagePath);
                const snapshot = await uploadBytes(storageRef, imageFile);
                imageURL = await getDownloadURL(snapshot.ref);
            }
            // Save metadata and image URL to Data Connect PostgreSQL
            await createItem(dataConnect, {
                itemName,
                description,
                locationFound,
                locationTurnedIn,
                imageLink: imageURL || null,
                category,
                timeFound,
                lostStatus: false,
            });

            // Reset form fields
            setItemName("");
            setDescription("");
            setLocationFound("");
            setLocationTurnedIn("");
            setTimeFound("");
            setImageFile(null);
            setCategory("");
            
            alert("Report for an Item found was created successfully!");

            // Refresh the list immediately so the new item shows up below
            await fetchFoundItems();
        } catch (error) {
            console.error("Error creating item:", error);
            alert("Failed to create item. Please try again.");
        } finally {
            setUploading(false);
        }
    };

  return (
        <div className={styles.container}>
            <h2>Report a Found Item</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="text" placeholder="Item Name (such as green Nike sweater)" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <select value="LocationsFound">
                  <option value="Orbach Library"> Orbach Library</option>
                  <option value="The HUB"> The HUB</option>
                  <option value="SRC"> Student Recreation Center</option>
                  <option value="Other"> Location not listed</option>
                </select>
                <select value="LocationsTurnedIn">
                  <option value="UCR Police station"> UC Police Station</option>
                  <option value="The HUB"> The HUB (front desk)</option>
                  <option value="SRC"> Student Recreation Center (front desk)</option>
                  <option value="Other"> Location not listed</option>
                </select>
                <input  className={styles.dateTime} type="datetime-local"/>
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} />
                <select value="Category">
                  <option value="Electronics"> Electronics</option>
                  <option value="Clothing"> Clothing</option>
                  <option value="Accessories"> Accessories</option>
                  <option value="Documents"> Documents</option>
                  <option value="Other"> Category not listed</option>
                </select>
                <button type="submit" disabled={uploading}>
                    {uploading ? "Uploading..." : "Create Item"}
                </button>
            </form> 

            <h2>Current Found Items ({foundItems.length})</h2>
            {foundItems.length === 0 ? (
                <p>No found items reported yet.</p>
            ) : (
                <div className={styles.itemList}>
                {foundItems.map((item) => (
                    <div key={item.id} style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "8px", background: "#f9f9f9" }}>
                        <h3 style={{ margin: "0 0 0.5rem 0" }}>{item.itemName}</h3>
                        
                        {/* Display Status Badge */}
                        <p style={{ margin: "0.25rem 0" }}>
                            <strong>Status:</strong>{" "}
                            <span style={{ color: item.lostStatus ? "#d9534f" : "#5cb85c", fontWeight: "bold" }}>
                                {item.lostStatus ? "Lost Item" : "Found Item"}
                            </span>
                        </p>

                        {item.description && <p style={{ margin: "0.25rem 0" }}><strong>Description:</strong> {item.description}</p>}
                        {item.location && <p style={{ margin: "0.25rem 0" }}><strong>Location:</strong> {item.location}</p>}
                        {item.category && <p style={{ margin: "0.25rem 0" }}><strong>Category:</strong> {item.category}</p>}
                        
                        {item.imageLink && (
                            <div style={{ marginTop: "0.5rem" }}>
                                <img src={item.imageLink} alt={item.itemName} style={{ maxWidth: "150px", borderRadius: "4px" }} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            )}
        </div>
    );
} 