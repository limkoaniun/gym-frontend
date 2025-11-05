import {Button} from "@/components/ui/button";
import {GoogleIcon, WeChatIcon} from "@/components/ui/icons";
import {Apple, Phone} from "lucide-react";
import React from "react";

const SocialMediaButtons = () => {
    return (
        <div className="space-y-3">
            <Button variant="outline"
                    className="w-full h-12 py-3 text-white rounded-lg justify-start border-input hover:bg-accent/10">
                <GoogleIcon/> Continue with Google
            </Button>

            <Button variant="outline"
                    className="w-full h-12 py-3 text-white rounded-lg justify-start border-input hover:bg-accent/10">
                <WeChatIcon/> Continue with WeChat
            </Button>

            <Button variant="outline"
                    className="w-full h-12 py-3 text-white rounded-lg justify-start border-input hover:bg-accent/10">
                <Apple className="mr-2 h-5 w-5"/> Continue with Apple
            </Button>

            <Button variant="outline"
                    className="w-full h-12 py-3 text-white rounded-lg justify-start border-input hover:bg-accent/10">
                <Phone className="mr-2 h-5 w-5"/> Continue with phone
            </Button>
        </div>
    );
}

export default SocialMediaButtons;