import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, dataConnect } from "./firebase";
import { upsertUser } from "@dataconnect/generated";
import { Link } from "react-router";



interface AuthButtonProps {
  className?: string;
}
export function AuthButton({ className }: AuthButtonProps){
    const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user && !user.email?.endsWith("@ucr.edu")) {
            signOut(auth);
            setCurrentUser(null);
            return;
          }
            setCurrentUser(user);
            if (user) {
              try {
                upsertUser(dataConnect, {
                username: user.displayName || "",
                email: user.email || "",
                photoUrl: user.photoURL || ""
            });
              } catch (error) {
                console.error("Error upserting user:", error);
              }
            }
        });
        return () => unsubscribe();
    }, []);
    const handleGoogleSignIn = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({hd: "ucr.edu", prompt: "select_account"});
        try {
            const userResult = await signInWithPopup(auth, provider);
            const email = userResult.user.email;
          
            if (!email || !email.endsWith("@ucr.edu")) {
              await handleSignOut();
              alert("Sign in with @ucr.edu email!");
            }
        } catch (error) {
            console.error("Error signing in with Google:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleSignOut = async () => {
        await signOut(auth);
    };
    if (currentUser) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem"}}>
      <Link to="/profile"
      style={{ display: "flex", alignItems: "center", gap: "0.75rem", color:"inherit", cursor: "pointer", textDecoration: "none" }}>
        {currentUser.photoURL && (
          <img
            src={currentUser.photoURL}
            alt="Profile"
            referrerPolicy="no-referrer"
            style={{ width: "32px", height: "32px", borderRadius: "50%" }}
          />
        )}
        <span>{currentUser.displayName}</span>
      </Link>
        <button onClick={handleSignOut} className = {className}>Sign Out</button>
      </div>
    );
  }

  return (
    <button onClick={handleGoogleSignIn} disabled={loading} className = {className}>
      {loading ? "Signing in..." : "Sign in with Google"}
    </button>
  );
}