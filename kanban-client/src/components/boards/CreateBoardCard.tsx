import Link from "next/link";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

export function CreateBoardCard() {
  return (
    <Link href="/board/new" className="block h-full">
      <Card className="h-full border-dashed transition-all hover:border-primary hover:shadow-sm">
        <CardContent className="p-0">
          <div className="flex flex-col items-center justify-center h-full py-12">
            <div className="rounded-full bg-primary/10 p-3 mb-3">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-primary">Create New Board</h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
