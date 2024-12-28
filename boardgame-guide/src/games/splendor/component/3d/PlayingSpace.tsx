import {CardGemLevel1, CardGemLevel2, CardGemLevel3} from "@/games/splendor/component/3d/CardGem";
import {
    TokenDiamond,
    TokenEmerald,
    TokenGemSize,
    TokenGold,
    TokenOnyx,
    TokenRuby,
    TokenSapphire
} from "@/games/splendor/component/3d/TokenGem";
import {GEM_POSITION, ingameData} from "@/games/splendor/constants/game";
import {CardNoble} from "@/games/splendor/component/3d/CardNoble";
import React from "react";
import {useThree} from "@react-three/fiber";
import {useGameSplendor} from "@/games/splendor/store/game";
import gsap from "gsap";
import {Vector3} from "three";


function PlayingSpace() {
    const { camera } = useThree()
    const { cardRefs, nobleRefs } = useGameSplendor();

    let looking;


    const onClickNoble = (nobleId: string) => {
        console.log("nobleId", nobleId);

        const nobleInstance = nobleRefs.current[nobleId]
        if (nobleId != looking?.id) {
            looking = {id: nobleId, position: {...nobleInstance.position}, rotation: {...nobleInstance.rotation}}
        }

        //
        const direction = new Vector3()
        camera.getWorldDirection(direction) // Get the camera's forward direction
        direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
        const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
        const targetLookAt = camera.position.clone()  // The object will look at the camera's position
        gsap.timeline()
            .to(nobleInstance.position, {
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 1.5
            }, 0)
            .to(nobleInstance.rotation, {
                duration: 5,
                onUpdate: () => nobleInstance.lookAt(targetLookAt),
            }, 0)
    }

    const test = (nobleId: string) => {
        console.log("MISS", nobleId);
    }


    return (
        <>
            <group>
                <group>
                    {
                        ingameData.deskCardLevel3.map((item) => {
                            return <CardGemLevel3 key={item.id}
                                                  cardRef={(element: any) => (cardRefs.current[item.id] = element)}
                                                  url={item.url} position={item.position} rotation={item.rotation}/>
                        })
                    }
                    {
                        ingameData.fieldCardLevel3.filter(item => item.card)
                            .map((item: any) => {
                                return <CardGemLevel3 key={item.card.id}
                                                      cardRef={(element: any) => (cardRefs.current[item.card.id] = element)}
                                                      url={item.card.url} position={item.position}
                                                      rotation={item.card.rotation}/>
                            })
                    }
                </group>
                <group>
                    {
                        ingameData.deskCardLevel2.map((item) => {
                            return <CardGemLevel2 key={item.id}
                                                  cardRef={(element: any) => (cardRefs.current[item.id] = element)}
                                                  url={item.url} position={item.position} rotation={item.rotation}/>
                        })
                    }
                    {
                        ingameData.fieldCardLevel2.filter(item => item.card)
                            .map((item: any) => {
                                return <CardGemLevel2 key={item.card.id}
                                                      cardRef={(element: any) => (cardRefs.current[item.card.id] = element)}
                                                      url={item.card.url} position={item.position}
                                                      rotation={item.card.rotation}/>
                            })
                    }
                </group>
                <group>
                    {
                        ingameData.deskCardLevel1.map((item) => {
                            return <CardGemLevel1 key={item.id}
                                                  cardRef={(element: any) => (cardRefs.current[item.id] = element)}
                                                  url={item.url} position={item.position} rotation={item.rotation}/>
                        })
                    }
                    {
                        ingameData.fieldCardLevel1.filter(item => item.card)
                            .map((item: any) => {
                                return <CardGemLevel1 key={item.card.id}
                                                      cardRef={(element: any) => (cardRefs.current[item.card.id] = element)}
                                                      url={item.card.url} position={item.position}
                                                      rotation={item.card.rotation}/>
                            })
                    }
                </group>
                <group>
                    {
                        Array.from({length: ingameData.gold}, (_, i) => i)
                            .map(index => {
                                return (<TokenGold key={`gold-${index}`}
                                                   position={[GEM_POSITION.gold.x, GEM_POSITION.gold.y, GEM_POSITION.gold.z + (index + 0.5) * TokenGemSize.depth]}/>)
                            })
                    }
                    {
                        Array.from({length: ingameData.onyx}, (_, i) => i)
                            .map(index => {
                                return (<TokenOnyx key={`onyx-${index}`}
                                                   position={[GEM_POSITION.onyx.x, GEM_POSITION.onyx.y, GEM_POSITION.onyx.z + (index + 0.5) * TokenGemSize.depth]}/>)
                            })
                    }
                    {
                        Array.from({length: ingameData.ruby}, (_, i) => i)
                            .map(index => {
                                return (<TokenRuby key={`ruby-${index}`}
                                                   position={[GEM_POSITION.ruby.x, GEM_POSITION.ruby.y, GEM_POSITION.ruby.z + (index + 0.5) * TokenGemSize.depth]}/>)
                            })
                    }
                    {
                        Array.from({length: ingameData.emerald}, (_, i) => i)
                            .map(index => {
                                return (<TokenEmerald key={`emerald-${index}`}
                                                      position={[GEM_POSITION.emerald.x, GEM_POSITION.emerald.y, GEM_POSITION.emerald.z + (index + 0.5) * TokenGemSize.depth]}/>)
                            })
                    }
                    {
                        Array.from({length: ingameData.sapphire}, (_, i) => i)
                            .map(index => {
                                return (<TokenSapphire key={`sapphire-${index}`}
                                                       position={[GEM_POSITION.sapphire.x, GEM_POSITION.sapphire.y, GEM_POSITION.sapphire.z + (index + 0.5) * TokenGemSize.depth]}/>)
                            })
                    }
                    {
                        Array.from({length: ingameData.diamond}, (_, i) => i)
                            .map(index => {
                                return (<TokenDiamond key={`diamond-${index}`}
                                                      position={[GEM_POSITION.diamond.x, GEM_POSITION.diamond.y, GEM_POSITION.diamond.z + (index + 0.5) * TokenGemSize.depth]}/>)
                            })
                    }
                </group>

                <group>
                    {
                        ingameData.deskNoble.map((item) => {
                            return <CardNoble key={item.id}
                                              cardRef={(element: any) => nobleRefs.current[item.id] = element}
                                              url={item.url}
                                              onClick={() => onClickNoble(item.id)}
                                              position={item.position}
                                              rotation={item.rotation}/>
                        })
                    }
                    {
                        ingameData.fieldNoble.filter(item => item.noble)
                            .map((item: any) => {
                                return <CardNoble key={item.noble.id}
                                                  cardRef={(element: any) => (nobleRefs.current[item.noble.id] = element)}
                                                  url={item.noble.url}
                                                  onClick={() => onClickNoble(item.noble.id)}
                                                  onClickNotThis={() => test(item.noble.id)}
                                                  position={item.position}
                                                  rotation={item.noble.rotation}/>
                            })
                    }
                </group>
            </group>

            <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
                <group>
                    {
                        Array.from({length: 4}, (_, i) => i)
                            .map(index => {
                                return (<TokenDiamond key={`diamond-${index}`}
                                                      position={[-1.6, -2.4, GEM_POSITION.diamond.z + (index + 0.5) * TokenGemSize.depth]}/>)
                            })
                    }
                    {
                        Array.from({length: 4}, (_, i) => i)
                            .map(index => {
                                return (<TokenSapphire key={`sapphire-${index}`}
                                                       position={[-0.8, -2.4, GEM_POSITION.sapphire.z + (index + 0.5) * TokenGemSize.depth]}/>)
                            })
                    }
                    {
                        Array.from({length: 4}, (_, i) => i)
                            .map(index => {
                                return (<TokenEmerald key={`emerald-${index}`}
                                                      position={[0, -2.4, GEM_POSITION.emerald.z + (index + 0.5) * TokenGemSize.depth]}/>)
                            })
                    }
                    {
                        Array.from({length: 4}, (_, i) => i)
                            .map(index => {
                                return (<TokenRuby key={`ruby-${index}`}
                                                   position={[0.8, -2.4, GEM_POSITION.ruby.z + (index + 0.5) * TokenGemSize.depth]}/>)
                            })
                    }
                    {
                        Array.from({length: 4}, (_, i) => i)
                            .map(index => {
                                return (<TokenOnyx key={`onyx-${index}`}
                                                   position={[1.6, -2.4, GEM_POSITION.onyx.z + (index + 0.5) * TokenGemSize.depth]}/>)
                            })
                    }
                    {
                        Array.from({length: 4}, (_, i) => i)
                            .map(index => {
                                return (<TokenGold key={`gold-${index}`}
                                                   position={[2.4, -2.4, GEM_POSITION.gold.z + (index + 0.5) * TokenGemSize.depth]}/>)
                            })
                    }
                </group>
                <group>
                    <CardGemLevel3 url={"/game/splendor/card/3/sapphire_3335.jpg"} position={[1.6, -3.2, 0]}
                                   rotation={[0, 0, 0]}/>
                    <CardGemLevel3 url={"/game/splendor/card/3/sapphire_3335.jpg"} position={[0.8, -3.2, 0]}
                                   rotation={[0, 0, 0]}/>
                    <CardGemLevel3 url={"/game/splendor/card/3/sapphire_3335.jpg"} position={[0, -3.2, 0]}
                                   rotation={[0, 0, 0]}/>
                    <CardGemLevel3 url={"/game/splendor/card/3/sapphire_3335.jpg"} position={[-0.8, -3.2, 0]}
                                   rotation={[0, 0, 0]}/>
                    <CardGemLevel3 url={"/game/splendor/card/3/sapphire_3335.jpg"} position={[-1.6, -3.2, 0]}
                                   rotation={[0, 0, 0]}/>
                </group>
            </group>
            {/*<group rotation={[0, 0, Math.PI]}>*/}
            {/*    <group>*/}
            {/*        {*/}
            {/*            Array.from({length: 4}, (_, i) => i)*/}
            {/*                .map(index => {*/}
            {/*                    return (<TokenDiamond key={`diamond-${index}`}*/}
            {/*                                          position={[-1.6, -2.4, GEM_POSITION.diamond.z + (index + 0.5) * TokenGemSize.depth]}/>)*/}
            {/*                })*/}
            {/*        }*/}
            {/*        {*/}
            {/*            Array.from({length: 4}, (_, i) => i)*/}
            {/*                .map(index => {*/}
            {/*                    return (<TokenSapphire key={`sapphire-${index}`}*/}
            {/*                                           position={[-0.8, -2.4, GEM_POSITION.sapphire.z + (index + 0.5) * TokenGemSize.depth]}/>)*/}
            {/*                })*/}
            {/*        }*/}
            {/*        {*/}
            {/*            Array.from({length: 4}, (_, i) => i)*/}
            {/*                .map(index => {*/}
            {/*                    return (<TokenEmerald key={`emerald-${index}`}*/}
            {/*                                          position={[0, -2.4, GEM_POSITION.emerald.z + (index + 0.5) * TokenGemSize.depth]}/>)*/}
            {/*                })*/}
            {/*        }*/}
            {/*        {*/}
            {/*            Array.from({length: 4}, (_, i) => i)*/}
            {/*                .map(index => {*/}
            {/*                    return (<TokenRuby key={`ruby-${index}`}*/}
            {/*                                       position={[0.8, -2.4, GEM_POSITION.ruby.z + (index + 0.5) * TokenGemSize.depth]}/>)*/}
            {/*                })*/}
            {/*        }*/}
            {/*        {*/}
            {/*            Array.from({length: 4}, (_, i) => i)*/}
            {/*                .map(index => {*/}
            {/*                    return (<TokenOnyx key={`onyx-${index}`}*/}
            {/*                                       position={[1.6, -2.4, GEM_POSITION.onyx.z + (index + 0.5) * TokenGemSize.depth]}/>)*/}
            {/*                })*/}
            {/*        }*/}
            {/*        {*/}
            {/*            Array.from({length: 4}, (_, i) => i)*/}
            {/*                .map(index => {*/}
            {/*                    return (<TokenGold key={`gold-${index}`}*/}
            {/*                                       position={[2.4, -2.4, GEM_POSITION.gold.z + (index + 0.5) * TokenGemSize.depth]}/>)*/}
            {/*                })*/}
            {/*        }*/}
            {/*    </group>*/}
            {/*    <group>*/}
            {/*        <CardGemLevel3 url={"/game/splendor/card/3/sapphire_3335.jpg"} position={[1.6, -3.2, 0]}*/}
            {/*                       rotation={[0, 0, 0]}/>*/}
            {/*        <CardGemLevel3 url={"/game/splendor/card/3/sapphire_3335.jpg"} position={[0.8, -3.2, 0]}*/}
            {/*                       rotation={[0, 0, 0]}/>*/}
            {/*        <CardGemLevel3 url={"/game/splendor/card/3/sapphire_3335.jpg"} position={[0, -3.2, 0]}*/}
            {/*                       rotation={[0, 0, 0]}/>*/}
            {/*        <CardGemLevel3 url={"/game/splendor/card/3/sapphire_3335.jpg"} position={[-0.8, -3.2, 0]}*/}
            {/*                       rotation={[0, 0, 0]}/>*/}
            {/*        <CardGemLevel3 url={"/game/splendor/card/3/sapphire_3335.jpg"} position={[-1.6, -3.2, 0]}*/}
            {/*                       rotation={[0, 0, 0]}/>*/}
            {/*    </group>*/}
            {/*</group>*/}
        </>
    )
}

export default PlayingSpace;