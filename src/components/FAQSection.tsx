import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ShieldCheck, HelpCircle } from "lucide-react";

const FAQSection = () => {
    return (
        <div className="max-w-3xl mx-auto mt-20 mb-12 px-4">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 animate-pulse">
                    <HelpCircle className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Common Questions</h2>
                <p className="text-muted-foreground text-sm">Everything you need to know about safety and privacy 🔒</p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border border-white/10 rounded-2xl bg-white/5 px-6">
                    <AccordionTrigger className="hover:no-underline hover:text-primary transition-colors py-4 text-left font-semibold">
                        Is my personal information safe?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                        Absolutely. We use <span className="text-white font-bold">256-bit SSL encryption</span>. We do not store your payment details, and your phone number is only used to connect the call via WhatsApp/Telegram.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border border-white/10 rounded-2xl bg-white/5 px-6">
                    <AccordionTrigger className="hover:no-underline hover:text-primary transition-colors py-4 text-left font-semibold">
                        Is this a real video call?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                        Yes! If you book a <span className="text-white font-bold">Live Naughty Call</span>, it is 100% real-time interactions with Anushka. For the "Recorded Video" plan, you receive a pre-made high-quality video.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border border-white/10 rounded-2xl bg-white/5 px-6">
                    <AccordionTrigger className="hover:no-underline hover:text-primary transition-colors py-4 text-left font-semibold">
                        What will show on my bank statement?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                        Your privacy is our priority. The transaction will appear as a generic name like <span className="text-white font-bold">"Razorpay"</span> or <span className="text-white font-bold">"UPI Payment"</span>. No adult content references.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border border-white/10 rounded-2xl bg-white/5 px-6">
                    <AccordionTrigger className="hover:no-underline hover:text-primary transition-colors py-4 text-left font-semibold">
                        What if the call disconnects?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                        Don't worry! If there's a network issue on our end, we will call you back immediately or refund your money. We ensure you get your full paid time.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-4">
                <ShieldCheck className="w-8 h-8 text-green-500 flex-shrink-0" />
                <div>
                    <h4 className="font-bold text-green-500 text-sm">100% Satisfaction Guarantee</h4>
                    <p className="text-xs text-green-400/80">If you are not happy with the service, contact support for a resolution.</p>
                </div>
            </div>
        </div>
    );
};

export default FAQSection;
