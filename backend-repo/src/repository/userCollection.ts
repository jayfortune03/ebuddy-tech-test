import db from "../config/firebase";
import { User } from "../entities/user";

const collectionRef = db.collection("users");

export const getUsersService = async ({
  page,
  rowsPerPage,
}: {
  page: number;
  rowsPerPage: number;
}): Promise<{ users: User[]; totalUsers: number }> => {
  const pageNumber = Number(page);
  const limit = Number(rowsPerPage);

  const usersRef = db.collection("users");
  const snapshot = await usersRef
    .select(
      "id",
      "name",
      "totalScore",
      "numberOfRents",
      "recentlyActive",
      "totalAverageWeightRatings"
    )
    .orderBy("totalScore", "desc")
    .limit(limit)
    .offset(pageNumber * limit)
    .get();

  const totalSnapshot = await usersRef.get();
  const totalUsers = totalSnapshot.size;

  const users = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  }) as User[];
  return { totalUsers, users };
};

export const getUserByUserNameService = async (
  userName: string
): Promise<User | null> => {
  const querySnapshot = await collectionRef
    .where("userName", "==", userName)
    .select(
      "userName",
      "passwordHash",
      "name",
      "totalAverageWeightRatings",
      "numberOfRents",
      "recentlyActive"
    )
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

export const getUserByIdService = async (
  userId: string
): Promise<User | null> => {
  const docRef = db.collection("users").doc(userId);
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    return { id: docSnap.id, ...docSnap.data() } as User;
  } else {
    console.log("No user found");
    return null;
  }
};

export const updateUserService = async (
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
