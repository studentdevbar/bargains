"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";

const DashboardPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const {user} = useAuthStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");

  useEffect(() => {
    setFirstName(user?.name?.split(" ")[0] || "");
    setLastName(user?.name?.split(" ")[1] || "");
    setEmail(user?.email || "");
  }, [user]);

  const onSaveAccount = () => {
    // TODO: Hook up to account update action
  };

  const onUpdatePassword = () => {
    // TODO: Hook up to password update action
  };

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Account</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-neutral-700">First Name</label>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200" placeholder="Abdul" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-neutral-700">Last Name</label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200" placeholder="Saboor" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-neutral-700">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200" placeholder="info@wizerdui.com" />
          </div>
          <div className="md:col-span-2 mt-2">
            <Button onClick={onSaveAccount} type="submit" className="h-10 px-6">Save Change</Button>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-neutral-200" />

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Your Password</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-neutral-700">Current Password</label>
            <div className="relative">
              <input
                type={showPasswordCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
       
              />
              <button
                type="button"
                aria-label={showPasswordCurrent ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-2 grid place-items-center text-neutral-600"
                onClick={() => setShowPasswordCurrent((v) => !v)}
              >
                {showPasswordCurrent ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-neutral-700">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
             
              />
              <button
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-2 grid place-items-center text-neutral-600"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-neutral-700">Repeat New Password</label>
            <div className="relative">
              <input
                type={showPassword2 ? "text" : "password"}
                value={repeatNewPassword}
                onChange={(e) => setRepeatNewPassword(e.target.value)}
                className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
            
              />
              <button
                type="button"
                aria-label={showPassword2 ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-2 grid place-items-center text-neutral-600"
                onClick={() => setShowPassword2((v) => !v)}
              >
                {showPassword2 ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          <div className="md:col-span-2 mt-2">
            <Button type="submit" className="h-10 px-6">Update Password</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;