import Image from "next/image"

interface CardProps {
    productImg: string;
    productName: string;
    rating: number;
}


export default function Card({productImg, productName, rating}: CardProps) {
    <div>this is card</div>
}