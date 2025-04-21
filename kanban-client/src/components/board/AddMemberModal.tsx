"use client";

import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check, Loader2, Search, UserPlus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addMemberToBoard } from "@/lib/member-action";
import { FIND_USER_BY_EMAIL } from "@/lib/graphql/actions/auth/findUserByEmail.action";
import { useMutation } from "@apollo/client";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  role: z.enum(["ADMIN", "MEMBER", "VIEWER"], {
    required_error: "Please select a role",
  }),
});

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

interface AddMemberModalProps {
  boardId: string;
  onMemberAdded?: () => void;
}

export function AddMemberModal({
  boardId,
  onMemberAdded,
}: AddMemberModalProps) {
  const [findUserByEmail, { data: userData, error: errorSearchUser }] =
    useMutation(FIND_USER_BY_EMAIL);
  const [open, setOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [foundUser, setFoundUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: "member",
    },
  });

  const handleSearch = async (email: string) => {
    if (!email) return;

    setIsSearching(true);
    setError(null);
    setFoundUser(null);

    await findUserByEmail({ variables: { email } });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!foundUser) {
      setError("Please search for a valid user first");
      return;
    }

    setIsAdding(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await addMemberToBoard(boardId, foundUser.id, values.role);
      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => {
          setOpen(false);
          if (onMemberAdded) onMemberAdded();
          // Reset form
          form.reset();
          setFoundUser(null);
          setSuccess(null);
        }, 1500);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred while adding the member");
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (userData && userData.findUserByEmail) {
      const user = userData.findUserByEmail;
      setFoundUser(user);
      setIsSearching(false);
    } else if (errorSearchUser) {
      setIsSearching(false);
      setError("No user found with this email");
    }
  }, [userData]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Member to Board</DialogTitle>
          <DialogDescription>
            Search for a user by email and assign them a role on this board.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          placeholder="user@example.com"
                          {...field}
                          disabled={isSearching || !!foundUser}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        disabled={isSearching || !field.value}
                        onClick={() => handleSearch(field.value)}
                      >
                        {isSearching ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Search className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <div className="text-sm font-medium text-destructive">
                  {error}
                </div>
              )}

              {foundUser && (
                <div className="flex items-center gap-3 p-3 border rounded-md bg-muted/50">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={foundUser.avatar || "/placeholder.svg"}
                      alt={foundUser.name}
                    />
                    <AvatarFallback>{foundUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{foundUser.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {foundUser.email}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setFoundUser(null);
                      form.setValue("email", "");
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {foundUser && (
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isAdding}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {success && (
              <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                <Check className="h-4 w-4" />
                {success}
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isAdding}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!foundUser || isAdding}
                className="gap-2"
              >
                {isAdding ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Member"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
