
import { FileCode, Star, GitFork } from "lucide-react";
import { Link } from "react-router-dom";

interface BoilerplateCardProps {
  id: string;
  title: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  author: {
    name: string;
    avatar: string;
  };
}

export const BoilerplateCard = ({
  id,
  title,
  description,
  language,
  stars,
  forks,
  author,
}: BoilerplateCardProps) => {
  return (
    <Link to={`/code/${id}`} className="block">
      <div className="group rounded-lg border bg-card p-4 transition-colors hover:bg-accent card-hover">
        <div className="flex gap-4">
          <div className="mt-1">
            <FileCode className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs bg-secondary px-2 py-1 rounded">
                {language}
              </span>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  <span>{stars}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="h-3 w-3" />
                  <span>{forks}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <img
                src={author.avatar}
                alt={author.name}
                className="h-5 w-5 rounded-full"
              />
              <span className="text-xs text-muted-foreground">{author.name}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
