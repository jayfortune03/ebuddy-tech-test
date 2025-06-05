import db from "../config/firebase";
import { User } from "../entities/user";

const collectionRef = db.collection("users");

export const addUser = async (user: User) => {
  const docRef = await collectionRef.add(user);
  return docRef.id;
};

export const getUsers = async (): Promise<User[]> => {
  const snapshot = await collectionRef.get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as User[];
};

export const getUserByUserName = async (
  userName: string
): Promise<User | null> => {
  const querySnapshot = await collectionRef
    .where("userName", "==", userName)
    .select("userName", "passwordHash", "name")
    .get();

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as User;
  } else {
    console.log("No user found!");
    return null;
  }
};

export const getUserById = async (userId: string): Promise<User | null> => {
  const docRef = db.collection("users").doc(userId);
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    return { id: docSnap.id, ...docSnap.data() } as User;
  } else {
    console.log("No user found");
    return null;
  }
};

export const updateUser = async (
  userId: string,
  updates: Partial<User>
): Promise<void> => {
  const docRef = collectionRef.doc(userId);

  try {
    await docRef.update(updates);
    console.log("User updated successfully!");
  } catch (error) {
    console.error("Error updating user:", error);
  }
};
