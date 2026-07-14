import { BrandBackground } from "../BrandBackground";

export default function WholesaleAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <BrandBackground fixed />
      <div className="relative z-10 w-full max-w-sm">{children}</div>
    </div>
  );
}
