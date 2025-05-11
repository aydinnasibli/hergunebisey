"use client";

import { useState } from 'react';
import { submitContactForm } from '../app/actions';

interface FormState {
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
}

const ContactForm = () => {
    const [formState, setFormState] = useState<FormState>({
        status: 'idle',
        message: '',
    });

    const handleSubmit = async (formData: FormData) => {
        setFormState({ status: 'submitting', message: 'Gönderiliyor...' });

        try {
            const result = await submitContactForm(formData);

            if (result.success) {
                setFormState({
                    status: 'success',
                    message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.'
                });
                // Reset the form
                const form = document.getElementById('contactForm') as HTMLFormElement;
                if (form) form.reset();
            } else {
                setFormState({
                    status: 'error',
                    message: result.message || 'Bir hata oluştu. Lütfen tekrar deneyiniz.'
                });
            }
        } catch (error) {
            setFormState({
                status: 'error',
                message: 'Bir hata oluştu. Lütfen tekrar deneyiniz.'
            });
        }
    };

    return (
        <div className="w-full">
            <div className="w-10 h-1 bg-yellow-500 mb-8"></div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">BİZE ULAŞIN<span className="text-yellow-500">.</span></h2>

            <form
                id="contactForm"
                action={handleSubmit}
                className="space-y-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-white/80">
                            İsim
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 text-white backdrop-blur-sm transition-all"
                            placeholder="Adınız"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-white/80">
                            E-posta
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 text-white backdrop-blur-sm transition-all"
                            placeholder="ornek@email.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-white/80">
                        Konu
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 text-white backdrop-blur-sm transition-all"
                        placeholder="Mesajınızın konusu"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-white/80">
                        Mesaj
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 text-white backdrop-blur-sm transition-all resize-none"
                        placeholder="Mesajınızı buraya yazınız..."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={formState.status === 'submitting'}
                    className={`w-full sm:w-auto px-6 py-3 rounded-lg bg-yellow-500 text-black font-medium 
            hover:bg-yellow-400 transition-colors duration-300 flex items-center justify-center
            ${formState.status === 'submitting' ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                    {formState.status === 'submitting' ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Gönderiliyor...
                        </>
                    ) : 'Gönder'}
                </button>

                {formState.status !== 'idle' && (
                    <div className={`mt-4 p-4 rounded-lg ${formState.status === 'success' ? 'bg-green-500/20 text-green-200' :
                        formState.status === 'error' ? 'bg-red-500/20 text-red-200' :
                            'bg-yellow-500/20 text-yellow-200'
                        }`}>
                        <p>{formState.message}</p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ContactForm;