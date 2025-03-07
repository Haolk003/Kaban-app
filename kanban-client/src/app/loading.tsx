import "./globals.css";

export default function Loading() {
  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-screen h-screen z-[999] flex items-center justify-center bg-black/50">
        <div className="loader"></div>
      </div>
    </div>
  );
}
