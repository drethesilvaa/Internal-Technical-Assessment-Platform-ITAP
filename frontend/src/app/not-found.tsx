// app/not-found.tsx

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-lg text-gray-600">Page not found.</p>
      <a href="/" className="mt-6 text-blue-600 underline">
        Go back home
      </a>
    </div>
  );
}
