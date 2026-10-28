import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, dataConnect } from "./firebase";
import { createItem, listLostItems, type ListLostItemsData } from "@dataconnect/generated";

// Tbh I was just using this for testing but should probably be redone for proper frontend use. 

export function CreateItemForm() {
    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [category, setCategory] = useState("");
    const [uploading, setUploading] = useState(false);
    
    // State to store the list of lost items
    const [lostItems, setLostItems] = useState<ListLostItemsData["items"]>([]);

    // Function to fetch lost items from Data Connect
    const fetchLostItems = async () => {
        try {
            const result = await listLostItems(dataConnect);
            setLostItems(result.data.items);
        } catch (error) {
            console.error("Error fetching lost items:", error);
        }
    };

    // Fetch items when the component first loads
    useEffect(() => {
        fetchLostItems();
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
                location,
                imageLink: imageURL || null,
                category,
                lostStatus: true,
            });

            // Reset form fields
            setItemName("");
            setDescription("");
            setLocation("");
            setImageFile(null);
            setCategory("");
            
            alert("Item created successfully!");

            // Refresh the list immediately so the new item shows up below
            await fetchLostItems();
        } catch (error) {
            console.error("Error creating item:", error);
            alert("Failed to create item. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
            <h2>Report a Lost Item</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <input type="text" placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="text" placeholder="Location Lost" value={location} onChange={(e) => setLocation(e.target.value)} />
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} />
                <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                
                <div style={{ fontSize: "0.95rem" }}>
                    Status: <span style={{ color: "#d9534f", fontWeight: "bold" }}>Lost Item</span>
                </div>

                <button type="submit" disabled={uploading}>
                    {uploading ? "Uploading..." : "Create Item"}
                </button>
            </form>

            <hr style={{ margin: "2rem 0" }} />

            <h2>Current Lost Items ({lostItems.length})</h2>
            {lostItems.length === 0 ? (
                <p style={{ color: "#666" }}>No lost items reported yet.</p>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {lostItems.map((item) => (
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