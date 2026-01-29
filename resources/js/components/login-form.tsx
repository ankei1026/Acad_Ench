import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Link, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
    const { data, setData, processing, errors, post } = useForm({
        email: '',
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/authentication/login', {
            onFinish: () => {
                // Clear password field after submission
                setData('password', '');
            },
            // onSuccess: () => {
            //     router.redirect(`'/${role}/dashboard'`);
            // }
        });
    };

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card className='dark:bg-white'>
                <CardHeader>
                    <center>
                        <img src="/assets/Logo.png" alt="AcadEnch Logo" className="h-24 w-36" />
                    </center>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>Enter your email below to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required

                                />
                                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Link
                                        href="/auth/forgot-password"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                            </Field>
                            <Field>
                                <Button
                                    className="w-full bg-yellow-300 text-black hover:cursor-pointer hover:bg-yellow-400"
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? 'Logging in...' : 'Login'}
                                </Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <Link href="/authentication/signup">Signup</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
