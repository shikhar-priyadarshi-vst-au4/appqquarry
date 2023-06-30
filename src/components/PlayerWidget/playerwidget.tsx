import Image from "next/image"

interface PlayerWidgetProps{
    playerName: string,
    playerPoints: number,
    playerImage: string | any
}

export default function PlayerWidget(props: PlayerWidgetProps){
    return <div className="flex flex-col bg-darkVariantOne">
        <Image src={props?.playerImage} alt={props?.playerName}/>
        <div className="flex flex-col gap-8 py-2 items-center bg-darkVariantTwo font-light leading-normal text-2xl text-white/[0.9]">
            <h4>{props?.playerName}</h4>
            <p className="text-7xl">{props?.playerPoints}</p>
            <small className="text-sm">Points</small>
        </div>
    </div>
}