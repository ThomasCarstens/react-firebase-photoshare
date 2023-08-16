

// import {useState, useEffect} from 'react'
// import { ref as ref_d, set, get, onValue } from 'firebase/database'
// import { storage, database } from './firebase'



// // const [gameFile, setGameFile] = useState()
// // // const [spoofMacroGameSets, setSpoofMacroGameSets] = useState()
// // const [spoofInstructions, setSpoofInstructions] = useState()
// // const [spoofGameFolders, setSpoofGameFolders] = useState()
// // const [spoofGameAllocation, setSpoofGameAllocation] = useState()
// // const [spoofGameHashtags, setSpoofGameHashtags] = useState()
// // const [spoofGameMetrics, setSpoofGameMetrics] = useState()
// // const [spoofGameSets, setSpoofGameSets] = useState()
// // const [spoofUnits, setSpoofUnits] = useState()
// // const [spoofCorrectTag, setSpoofCorrectTag] = useState()
// // const [spoofIncorrectTag, setSpoofIncorrectTag] = useState()

// //GameFile loaded on Firebase Realtime Database.
// const gameFileRef = ref_d(database, "gameFile" );

// onValue(gameFileRef, (snapshot) => {
//     const data = snapshot.val();

//     console.log('Gamefile downloaded and set to state.')
//     // console.log(gameFile.spoofMacroGameSets.Dogs.Hounds[1][0]);
//     setGameFile(data)
//     let spoofMacroGameSets =data.spoofMacroGameSets
//     setSpoofInstructions(data.spoofInstructions)
//     setSpoofGameFolders(data.spoofGameFolders)

//     setSpoofGameAllocation(data.spoofGameAllocation)
//     setSpoofGameHashtags(data.spoofGameHashtags)
//     setSpoofGameMetrics(data.spoofGameMetrics)
//     setSpoofGameSets(data.spoofGameSets)  
//     setSpoofUnits(data.spoofUnits)
//     setSpoofCorrectTag(data.spoofCorrectTag)
//     setSpoofIncorrectTag(data.spoofIncorrectTag)
//         // import { spoofGameAllocation, spoofGameFolders, spoofGameHashtags, spoofGameMetrics, spoofGameSets, spoofMacroGameSets } from '../gameFile'


// })


// export {spoofGameAllocation, spoofGameSets, spoofMacroGameSets, spoofGameMetrics, spoofUnits, spoofGameFolders, spoofGameHashtags, spoofInstructions, spoofCorrectTag, spoofIncorrectTag}