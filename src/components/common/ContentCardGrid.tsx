import { Link } from "react-router-dom";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyP } from "@/components/ui/typography";

import { formatCreationDate } from "./util";

export type BaseEntity = {
  id: string | number;
  name: string;

  content?: string;
  description?: string;
  department?: string;

  createdAt?: string | number | Date;
};

export type ContentCardGridProps<T extends BaseEntity> = {
  data?: T[];
  isLoading: boolean;
  redirectEntity: string;
};

export default function ContentCardGrid<T extends BaseEntity>({
  data,
  isLoading,
  redirectEntity,
}: ContentCardGridProps<T>) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4 animate-pulse">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Card key={idx}>
            <CardHeader>
              <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
                <div className="h-3 bg-gray-200 rounded w-4/6" />
                <div className="h-3 bg-gray-200 rounded w-3/6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
        <div className="text-5xl mb-4">📭</div>
        <p className="text-lg font-medium">No items found</p>
        <p className="text-sm mt-2">Try a different query or create new items.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
      {data?.map((entity) => (
        <Card key={entity.id} className="cursor-pointer">
          <Link to={`/${redirectEntity}/${entity.id}`}>
            <CardHeader>
              <CardTitle>{entity.name}</CardTitle>
              <CardDescription>{formatCreationDate(entity.createdAt)}</CardDescription>
            </CardHeader>

            {entity.content && (
              <CardContent>
                <TypographyP
                  className="overflow-hidden text-ellipsis break-words"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {entity?.content || entity?.description}
                </TypographyP>
              </CardContent>
            )}
          </Link>
        </Card>
      ))}
    </div>
  );
}
