import React from "react"

import { onValue, ref } from "firebase/database"
import { db } from "./firebase/firebaseConfig"

export const DatabaseContext = React.createContext()

export function DatabaseStorage( {children }) {
    const [data, setData]= React.useState([])
    const [allData, setAllData]= React.useState([])
    const [cards, setCards]= React.useState([])
    const [categorys, setCategorys]= React.useState([])
    const [peoples, setPeoples]= React.useState([])
    const [date, setDate]= React.useState()
    const [loading, setLoading]= React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        let peoplesAux = []
        let cateroysAux = []
        const displayName = localStorage.getItem('displayName')

        if (displayName && date) {
            const database = ref(db, `${displayName}`)

            onValue(database, (snapshot) => {
                setAllData(snapshot.val())
                if (snapshot.exists()) {
                    setData(snapshot.val()[date])
                    setCards(Object.keys(snapshot.val()[date]))
                    getPeoples(snapshot.val()[date])
                } else {
                    setData({})
                }
                setLoading(false)
            })
        }

        function getPeoples(values) {
            Object.keys(values).forEach(card => {
                Object.keys(values[card]).forEach(people => {
                    if (people !== 'cor') {
                        getCategorys(values, card, people)
                        if (!peoplesAux.includes(people)) peoplesAux.push(people)
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
                allData,
                date,
                cards,
                categorys,
                peoples,
                setDate,
                loading
            }}
            >
            {children}
        </DatabaseContext.Provider>
    )
}