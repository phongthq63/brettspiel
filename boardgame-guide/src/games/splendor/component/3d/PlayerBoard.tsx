import GemToken from "@/games/splendor/component/3d/GemToken";
import GemCard from "@/games/splendor/component/3d/GemCard";
import React, {memo} from "react";
import {useGameSplendor} from "@/games/splendor/store/game.context";
import {useSharedRef} from "@/games/splendor/store/ref.context";
import NobleCard from "@/games/splendor/component/3d/NobleCard";
import {useGameController} from "@/games/splendor/hooks/useGameController";


interface PlayerBoardProps {
    playerId: string
}

const PlayerBoard = ({playerId} : PlayerBoardProps) => {
    const {cardRefs, nobleRefs, gemRefs} = useSharedRef()
    const {players} = useGameSplendor()
    const {onClickPlayerGem, onClickPlayerReserveCard} = useGameController()
    const player = players[playerId]


    return (
        <group>
            <group>
                {player.gems.diamond.map((gem) => (
                    <GemToken key={gem.id}
                              id={gem.id}
                              type={gem.type}
                              onClick={() => onClickPlayerGem(playerId, gem)}
                              position={gem.position}
                              rotation={gem.rotation}
                              ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                ))}
                {player.cards.diamond.map((card) => (
                    <GemCard key={card.id}
                             id={card.id}
                             position={card.position}
                             rotation={card.rotation}
                             ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                ))}
            </group>
            <group>
                {player.gems.sapphire.map((gem) => (
                    <GemToken key={gem.id}
                              id={gem.id}
                              type={gem.type}
                              onClick={() => onClickPlayerGem(playerId, gem)}
                              position={gem.position}
                              rotation={gem.rotation}
                              ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                ))}
                {player.cards.sapphire.map((card) => (
                    <GemCard key={card.id}
                             id={card.id}
                             position={card.position}
                             rotation={card.rotation}
                             ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                ))}
            </group>
            <group>
                {player.gems.emerald.map((gem) => (
                    <GemToken key={gem.id}
                              id={gem.id}
                              type={gem.type}
                              onClick={() => onClickPlayerGem(playerId, gem)}
                              position={gem.position}
                              rotation={gem.rotation}
                              ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                ))}
                {player.cards.sapphire.map((card) => (
                    <GemCard key={card.id}
                             id={card.id}
                             position={card.position}
                             rotation={card.rotation}
                             ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                ))}
            </group>
            <group>
                {player.gems.ruby.map((gem) => (
                    <GemToken key={gem.id}
                              id={gem.id}
                              type={gem.type}
                              onClick={() => onClickPlayerGem(playerId, gem)}
                              position={gem.position}
                              rotation={gem.rotation}
                              ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                ))}
                {player.cards.ruby.map((card) => (
                    <GemCard key={card.id}
                             id={card.id}
                             position={card.position}
                             rotation={card.rotation}
                             ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                ))}
            </group>
            <group>
                {player.gems.onyx.map((gem) => (
                    <GemToken key={gem.id}
                              id={gem.id}
                              type={gem.type}
                              onClick={() => onClickPlayerGem(playerId, gem)}
                              position={gem.position}
                              rotation={gem.rotation}
                              ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                ))}
                {player.cards.onyx.map((card) => (
                    <GemCard key={card.id}
                             id={card.id}
                             position={card.position}
                             rotation={card.rotation}
                             ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                ))}
            </group>

            {player.gems.gold.map(gem => (
                <GemToken key={gem.id}
                          id={gem.id}
                          type={gem.type}
                          onClick={() => onClickPlayerGem(playerId, gem)}
                          position={gem.position}
                          rotation={gem.rotation}
                          ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
            ))}

            {player.reserveCards.map(card => (
                <GemCard key={card.id}
                         id={card.id}
                         onClick={() => onClickPlayerReserveCard(playerId, card)}
                         position={card.position}
                         rotation={card.rotation}
                         ref={(element: any) => (cardRefs.current[card.id] = element)}/>
            ))}

            {player.nobles.map((noble) => (
                <NobleCard key={noble.id}
                           id={noble.id}
                           position={noble.position}
                           rotation={noble.rotation}
                           ref={(element: any) => nobleRefs.current[noble.id] = element}/>
            ))}
        </group>
    )
}

export default memo(PlayerBoard)