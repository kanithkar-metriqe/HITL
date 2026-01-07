import { cn } from "@/lib/utils";
import type { IconProps } from "@/types/layout.type";


export default function HITLLogo({ className = "", onClick }: IconProps) {
    return (

        <svg className={cn("w-3 h-4", className)} width="24" onClick={onClick} height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.1695 5.89831V3H3V22H9.11864M12.339 22V20.3898C12.339 19.5006 13.0599 18.7797 13.9492 18.7797H20.3898C21.2791 18.7797 22 19.5006 22 20.3898V22H12.339Z" stroke="#00a769" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.45105 7.63125L9.6314 8.7L11.9921 6.5625M6.5625 12.975H10.9691M6.5625 15.825H9.39533M15.6905 17.25C15.6905 17.25 14.9036 11.5526 14.9036 10.8375C14.9036 9.65699 15.9605 8.7 17.2643 8.7C18.5681 8.7 19.625 9.65699 19.625 10.8375C19.625 11.5526 18.8381 17.25 18.8381 17.25" stroke="#00a769" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>


    );
}
