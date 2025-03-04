import { Double, Int32 } from "mongodb";
import Image from "next/image"

interface CardProps {
    productImg: string;
    productName: string;
    likes: number;
}


export default function Card({productImg, productName, likes}: CardProps) {
    return (
        <div className="w-64 border border-gray-300 rounded-md shadow-sm p-4 flex flex-col items-center">

            <div className="w-full h-40 relative mb-3">
                <Image
                    src={productImg} 
                    alt={productName}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-md"
                />
            </div>

        <h2 className="text-lg font-semibold mb-1">{productName}</h2>
        <div className="text-yellow-600">👍 {likes}</div>
        
        </div>
);
}