import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { authClient } from '../lib/auth-client';
import { useHistory } from '@docusaurus/router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { data, error: authError } = await authClient.signIn.email({
            email,
            password,
        });

        setLoading(false);

        if (authError) {
            setError(authError.message || 'Login failed');
        } else {
            history.push('/');
        }
    };

    return (
        <Layout title="Log In" description="Access your account">
            <div className="container margin-vert--xl">
                <div className="row">
                    <div className="col col--6 col--offset-3">
                        <div className="card shadow--md">
                            <div className="card__header">
                                <h3>Welcome Back</h3>
                                <p>Log in to your AI for Humanity account</p>
                            </div>
                            <div className="card__body">
                                {error && (
                                    <div className="alert alert--danger margin-bottom--md" role="alert">
                                        {error}
                                    </div>
                                )}
                                <form onSubmit={handleLogin}>
                                    <div className="margin-bottom--md">
                                        <label className="form__label">Email</label>
                                        <input
                                            className="button button--outline button--secondary button--block text--left"
                                            style={{ cursor: 'text', textTransform: 'none' }}
                                            type="email"
                                            placeholder="email@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="margin-bottom--md">
                                        <label className="form__label">Password</label>
                                        <input
                                            className="button button--outline button--secondary button--block text--left"
                                            style={{ cursor: 'text', textTransform: 'none' }}
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button
                                        className="button button--primary button--block margin-top--lg"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Logging In...' : 'Log In'}
                                    </button>
                                </form>
                            </div>
                            <div className="card__footer text--center">
                                <p>New here? <a href="/signup">Create an account</a></p>
                                <div className="margin-top--md">
                                    <p className="small text--muted">Or sign in with</p>
                                    <div className="flex gap-2 justify-center">
                                        <button
                                            onClick={() => authClient.signIn.social({ provider: 'github' })}
                                            className="button button--secondary"
                                        >
                                            GitHub
                                        </button>
                                        <button
                                            onClick={() => authClient.signIn.social({ provider: 'google' })}
                                            className="button button--secondary"
                                        >
                                            Google
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
