import { Suspense } from "react";
import { ResetPasswordContent } from "@/components/resetPasswordContent";

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#faf7f3] to-[#f0eae4] px-4">
      <Suspense fallback={<div className="text-[#9b8b78] text-sm">Loading...</div>}>
        <ResetPasswordContent />
      </Suspense>
    </main>
  );
}