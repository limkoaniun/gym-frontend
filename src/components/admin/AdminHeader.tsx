//<AdminHeader title="Traning Method" icon={<Heart />} subtitle="Manage xxxx"/>
import React from "react";

type AdminHeaderProps = {
    title: string;
    icon: React.ReactNode;
    subtitle: string;
}
const AdminHeader = ({title, icon, subtitle}: AdminHeaderProps) => {
    return (
        <>
            <div className="border-b-solid border-b-[1px] flex p-3">
                <div className="ml-4 mt-4 text-gray-500">{icon}</div>
                <div>
                    <p className="ml-4 text-xl mt-2 font-[550]">{title}</p>
                    <p className="ml-4 text-xs text-gray-400 mt-1">{subtitle}</p>
                </div>
            </div>
        </>
    );
}
export default AdminHeader;