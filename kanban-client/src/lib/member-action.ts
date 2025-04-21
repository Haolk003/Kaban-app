"use server";

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

type Role = "admin" | "member" | "viewer";

export async function searchUserByEmail(email: string): Promise<User | null> {
  // This would be replaced with your actual database query
  // For demo purposes, we'll simulate a delay and return mock data
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock user data - in a real app, you would query your database
  const mockUsers: Record<string, User> = {
    "user@example.com": {
      id: "1",
      name: "John Doe",
      email: "user@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    "jane@example.com": {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  };

  return mockUsers[email] || null;
}

export async function addMemberToBoard(
  boardId: string,
  userId: string,
  role: Role
): Promise<{ success: boolean; message: string }> {
  // This would be replaced with your actual database operation
  // For demo purposes, we'll simulate a delay and return success
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real app, you would add the member to your database
  console.log(`Adding user ${userId} to board ${boardId} with role ${role}`);

  return {
    success: true,
    message: "Member added successfully",
  };
}
