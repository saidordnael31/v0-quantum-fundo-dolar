import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 items-center justify-center bg-gray-50 py-12 md:py-20">
        <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
          <LoginForm />
        </div>
      </main>
    </div>
  )
}
