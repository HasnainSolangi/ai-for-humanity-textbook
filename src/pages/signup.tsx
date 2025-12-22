import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { authClient } from '../lib/auth-client';
import { useHistory } from '@docusaurus/router';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [softwareBackground, setSoftwareBackground] = useState('');
    const [hardwareBackground, setHardwareBackground] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { data, error: authError } = await authClient.signUp.email({
            email,
            password,
            name,
            softwareBackground,
            hardwareBackground,
        });

        setLoading(false);

        if (authError) {
            setError(authError.message || 'Signup failed');
        } else {
            history.push('/');
        }
    };

    return (
        <Layout title="Sign Up" description="Create your account">
            <div className="container margin-vert--xl">
                <div className="row">
                    <div className="col col--6 col--offset-3">
                        <div className="card shadow--md">
                            <div className="card__header">
                                <h3>Create Account</h3>
                                <p>Join the AI for Humanity learning portal</p>
                            </div>
                            <div className="card__body">
                                {error && (
                                    <div className="alert alert--danger margin-bottom--md" role="alert">
                                        {error}
                                    </div>
                                )}
                                <form onSubmit={handleSignup}>
                                    <div className="margin-bottom--md">
                                        <label className="form__label">Full Name</label>
                                        <input
                                            className="button button--outline button--secondary button--block text--left"
                                            style={{ cursor: 'text', textTransform: 'none' }}
                                            type="text"
                                            placeholder="John Doe"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
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

                                    <hr />
                                    <h5>Personalization Details</h5>
                                    <p className="text--muted small">To help us personalize your learning experience</p>

                                    <div className="margin-bottom--md">
                                        <label className="form__label">Software Background</label>
                                        <select
                                            className="button button--outline button--secondary button--block text--left"
                                            value={softwareBackground}
                                            onChange={(e) => setSoftwareBackground(e.target.value)}
                                            required
                                        >
                                            <option value="">Select your experience...</option>
                                            <option value="beginner">Beginner (No coding experience)</option>
                                            <option value="intermediate">Intermediate (Some coding/logic knowledge)</option>
                                            <option value="expert">Expert (Software Engineer/Developer)</option>
                                        </select>
                                    </div>

                                    <div className="margin-bottom--md">
                                        <label className="form__label">Hardware Background</label>
                                        <select
                                            className="button button--outline button--secondary button--block text--left"
                                            value={hardwareBackground}
                                            onChange={(e) => setHardwareBackground(e.target.value)}
                                            required
                                        >
                                            <option value="">Select your experience...</option>
                                            <option value="beginner">Beginner (No robotics/hardware experience)</option>
                                            <option value="intermediate">Intermediate (Hobbyist/Arduino/RPi)</option>
                                            <option value="expert">Expert (Robotics Engineer/Embeded Systems)</option>
                                        </select>
                                    </div>

                                    <button
                                        className="button button--primary button--block margin-top--lg"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Creating Account...' : 'Sign Up'}
                                    </button>
                                    <div className="margin-top--md">
                                        <p className="small text--muted">Or sign up with</p>
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
                                </form>
                            </div>
                            <div className="card__footer text--center">
                                <p>Already have an account? <a href="/login">Log In</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
