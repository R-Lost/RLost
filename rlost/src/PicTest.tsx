import {useState} from "react";
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import {storage,dataConnect} from "./firebase";
import {createItem} from "@dataconnect/generated";

export function CreateItemForm() {
    const [itemName,setItemName] = useState("");
    const [description,setDescription] = useState("");
    const [location,setLocation] = useState("");
    const [imageFile,setImageFile] = useState<File | null>(null);
    const [category,setCategory] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        try{
            let imageURL = "";
            if(imageFile){
                // 1. Create a unique path in Firebase Storage (e.g. items/<timestamp>_<filename>)
                const storagePath = 'items/' + imageFile.name;
                const storageRef = ref(storage,storagePath);
                // 2. Upload the file binary
                const snapshot = await uploadBytes(storageRef,imageFile);
                // 3. Obtain the accessible HTTPS URL
                imageURL = await getDownloadURL(snapshot.ref);
            }
            // Save metadata and image URL to Data Connect PostgreSQL
            await createItem(dataConnect,{
                itemName,
                description,
                location,
                imageURL,
                category
            });
            setItemName("");
            setDescription("");
            setLocation("");
            setImageFile(null);
            setCategory("");
            alert("Item created successfully!");
        } catch (error) {
            console.error("Error creating item:", error);
            alert("Failed to create item. Please try again.");
        } finally {
            setUploading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} />
            <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <button type="submit" disabled={uploading}>{uploading ? "Uploading..." : "Create Item"}</button>
        </form>
    );
}