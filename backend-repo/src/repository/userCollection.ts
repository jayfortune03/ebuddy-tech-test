import { db } from "../config/firebase";
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
