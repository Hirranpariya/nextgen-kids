import React from 'react';
import ParentLayout from '../../layouts/ParentLayout';
import { Users, Search, MessageSquare, Heart } from 'lucide-react';
import Button from '../../components/ui/Button';

const Community = () => {
    return (
        <ParentLayout>
            <div className="mb-8 text-center">
                <h1 className="text-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Parent Community</h1>
                <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    Connect with other parents, share experiences, and get expert advice on raising digital natives.
                </p>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="card text-center p-8">
                    <Users size={64} className="text-primary mx-auto mb-6" />
                    <h2 className="text-2xl font-bold mb-4">Community Features Coming Soon!</h2>
                    <p className="text-muted mb-8">
                        We are building a safe space for you to discuss parenting in the digital age.
                        Soon you'll be able to join groups, read guidelines, and ask experts.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button>Join Waitlist</Button>
                        <Button variant="secondary">Browse Articles</Button>
                    </div>
                </div>
            </div>
        </ParentLayout>
    );
};

export default Community;
