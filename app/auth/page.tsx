import GoogleIcon from '@/components/custom/icons/GoogleIcon';
import Logo from '@/components/custom/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';

const Login = () => {
    return (
        <main className="bg-white/90 w-full h-full">
            <div className="w-full h-screen flex flex-col place-items-center justify-center gap-6">
                <Logo />
                <Button className=" w-[200px] h-[44px] bg-[#F7F7F8] text-slate-800 font-semibold hover:bg-slate-300 flex mt-4">
                    <GoogleIcon />
                    Google
                </Button>

                <div className="flex gap-1 place-items-center">
                    <span className="w-[60px] h-[2px] bg-slate-200"></span>Or
                    <span className="w-[60px] h-[2px] bg-slate-200"></span>
                </div>

                <form>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Email address
                        </label>
                        <Input placeholder="Email" />
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Login;
