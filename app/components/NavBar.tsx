import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function NavBar() {
    return (
        <div className="h-[0.8rem] flex px-[0.24rem] justify-between relative text-[0.14rem] items-center border-b-[#E5E7EB] border-b-[1px] border-solid">
            <Link href="/">
                <div className="w-[0.98rem] h-[0.33rem]">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={0}
                        height={0}
                        className="w-full h-auto"
                        priority
                    />
                </div>
            </Link>
            <ConnectButton
                label="Connect Wallet"
                accountStatus="full"
                chainStatus="none"
                showBalance={false}
            />
        </div>
    );
}
export default NavBar;
