export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl text-muted-foreground">Page not found</p>
      <a
        href="/"
        className="text-sm underline underline-offset-4 hover:text-primary"
      >
        Go back home
      </a>
    </div>
  );
}