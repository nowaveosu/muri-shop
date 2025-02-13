import Card from "../components/Card"

import dermab from "../../public/lotion/epiceram.jpg"
export default function Lotion() {

    return (
      <div>
        <Card 
          productImg="/lotion/epiceram.jpg"
          productName="dermab"
          rating={4}
        />
      </div>
    );
  }
  