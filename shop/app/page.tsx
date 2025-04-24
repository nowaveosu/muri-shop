import Link from "next/link";

export default function Home() {
    return (
        <div className="h-[480px] flex flex-col items-center justify-center p-4">
            <section className="text-center max-w-2xl mx-auto">
                <h1 className="lg:text-4xl md:text-3xl sm:text-2xl font-bold text-gray-800 mb-4">
                    아토피 피부 고민, 여기서 해결하세요!
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                    아토피 피부에 좋은 제품 추천과 치료법을 공유해보세요.<br />
                    댓글과 게시판에서 다양한 정보를 함께 나누며 피부 건강을 지켜요.
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/lotion">
                        <button className="bg-blue-700 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition">
                            추천 제품 보기
                        </button>
                    </Link>
                    <Link href="/board">
                        <button className="bg-green-700 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition">
                            게시판으로 이동
                        </button>
                    </Link>
                </div>
            </section>

            <section className="mt-12 text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                    아토피 피부 관리 팁
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                    아토피 피부는 꾸준한 보습과 올바른 제품 선택이 중요합니다. <br />
                    커뮤니티에서 다른 사용자들의 경험을 통해 더 나은 관리법을 찾아보세요.
                </p>
            </section>
        </div>
    );
}