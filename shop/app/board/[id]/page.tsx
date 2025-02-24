import BoardDetail from "../../components/BoardDetail";

export default function BoardDetailPage({
    params,
    }: {
    params: Promise<{ id: string }>;
    }) {

    return <BoardDetail />;
}