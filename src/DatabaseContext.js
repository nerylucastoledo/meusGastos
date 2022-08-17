import React from "react"
import { db } from "./firebase/firebaseConfig"
import { onValue, ref } from "firebase/database"

export const DatabaseContext = React.createContext()

export function DatabaseStorage( {children }) {
    const [data, setData]= React.useState([])
    const [cards, setCards]= React.useState([])
    const [categorys, setCategorys]= React.useState([])
    const [peoples, setPeoples]= React.useState([])
    const [date, setDate]= React.useState()

    React.useEffect(() => {
        let peoplesAux = []
        let cateroysAux = []
        const displayName = localStorage.getItem('displayName')

        if (displayName && date) {
            const database = ref(db, `${displayName}/${date}`)

            onValue(database, (snapshot) => {
                if (snapshot.exists()) {
                    setData(snapshot.val())
                    setCards(Object.keys(snapshot.val()))
                    getPeoples(snapshot.val())
                } else {
                    setData({})
                }
            })
        }

        function getPeoples(values) {
            Object.keys(values).forEach(card => {
                Object.keys(values[card]).forEach(people => {
                    if (!peoplesAux.includes(people) && people !== 'cor') {
                        getCategorys(values, card, people)
                        peoplesAux.push(people)
                    }
                })
            })
            setPeoples(peoplesAux)
        }
    
        function getCategorys(values, card, people) {
            Object.keys(values[card][people]).forEach(item => {
                const category = values[card][people][item]['categoria']
                if (!cateroysAux.includes(category)) cateroysAux.push(category)
            })
            setCategorys(cateroysAux)
        }

    }, [date])

    return (
        <DatabaseContext.Provider value={{ 
                data, 
                date,
                cards,
                categorys,
                peoples,
                setDate
            }}>
            {children}
        </DatabaseContext.Provider>
    )
}